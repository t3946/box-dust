<?php

namespace App\Console\Commands;

use App\Models\Skin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadParsedSkins extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'upload-parsed-skins';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function pngToWebp($path)
    {
        try {
            $imgContent = file_get_contents($path);
        } catch (\Exception $e) {
            return false;
        }

        Storage::disk('local')->put('img.png', $imgContent);
        $path = Storage::disk('local')->path('img.png');
        $pngimg = imagecreatefrompng($path);
        $w = imagesx($pngimg);
        $h = imagesy($pngimg);
        $im = imagecreatetruecolor($w, $h);
        imageAlphaBlending($im, false);
        imageSaveAlpha($im, true);
        $trans = imagecolorallocatealpha($im, 0, 0, 0, 127);
        imagefilledrectangle($im, 0, 0, $w - 1, $h - 1, $trans);
        imagecopy($im, $pngimg, 0, 0, 0, 0, $w, $h);
        $webpPath = Storage::disk('local')->getAdapter()->getPathPrefix() . 'image.webp';
        imagewebp($im, str_replace('png', 'webp', $webpPath));
        imagedestroy($im);

        return Storage::disk('local')->get('image.webp');
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $json = Storage::disk('local')->get('parsed-market-skins.json');
        $items = json_decode($json);

        // Create a progress bar instance
        $progressBar = $this->output->createProgressBar(count($items));
        $this->info('Data processing:');

        // Start the progress bar
        $progressBar->start();
        $parseError = [];

        foreach ($items as $item) {
            $imgHash = md5($item->market_hash_name) . '.webp';
            $imgContent = $this->pngToWebp($item->image_512);

            if ($item->seo->category === 'Knife') {
                if ($imgContent) {
                    Storage::disk('s3')->put($imgHash, $imgContent);
                }

                Skin::updateOrCreate([
                    'type' => 'knife',
                    'name' => $item->market_hash_name,
                    'quality' => $item->quality,
                    'stattrak' => $item->stattrak,
                ], [
                    'category' => strtolower($item->seo->category),
                    'price' => $item->price,
                    'name_ru' => $item->market_name,
                    'rarity' => $item->rarity,
                    'popularity' => $item->popularity,
                    'image' => $imgContent ? $imgHash : null,
                ]);

                continue;
            }

            if (
                in_array($item->seo->category, [
                    'Container',
                    'Agent',
                    'Sticker',
                    'Music Kit',
                    'Patch',
                    'Collectible',
                    'Pass',
                    'Key',
                    'Graffiti',
                    'Gift',
                    'Tool',
                ])
            ) {
                continue;
            }

            preg_match('/(.+?)\|(.+?)\((.+?)\)/', $item->market_hash_name, $matches);
            $matches = array_map(fn($e) => trim($e), array_slice($matches, 1));

            try {
                $weapon = $matches[0];
                $name = $matches[1];
            } catch (\Exception $e) {
                $parseError[] = $item;
            }

            preg_match('/(.+?)\|(.+?)\((.+?)\)?/', $item->market_name, $matches);
            $matches = array_map(fn($e) => trim($e), array_slice($matches, 1));

            try {
                $name_ru = Str::title($matches[1]);
            } catch (\Exception $e) {
                $parseError[] = $item;
            }

            if ($imgContent) {
                Storage::disk('s3')->put($imgHash, $imgContent);
            }

            Skin::updateOrCreate([
                'type' => $weapon,
                'name' => $name,
                'quality' => $item->quality,
                'stattrak' => $item->stattrak,
            ], [
                'category' => strtolower($item->seo->category),
                'price' => $item->price,
                'name_ru' => $name_ru,
                'rarity' => $item->rarity,
                'popularity' => $item->popularity,
                'image' => $imgContent ? $imgHash : null,
            ]);

            $progressBar->advance();
        }

        $progressBar->finish();
        $this->line('');
        $this->info('Done!');

        Storage::disk('local')->put('market-parse-item-errors.json', json_encode($parseError, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        return 0;
    }
}
