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
            if ($item->seo->category === 'Knife') {
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
