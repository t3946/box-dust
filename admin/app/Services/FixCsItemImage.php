<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\DomCrawler\Crawler;

class FixCsItemImage
{

    public static function uploadFromSteam($item)
    {
        $qualityMap = [
            'FN' => 'Factory New',
            'MW' => 'Minimal Wear',
            'FT' => 'Field-Tested',
            'WW' => 'Well-Worn',
            'BS' => 'Battle-Scarred',
        ];
        $url = 'https://steamcommunity.com/market/search';
        $params = [
            'q' => sprintf("%s | %s (%s)", $item->type, $item->name, $qualityMap[$item->quality]),
        ];
        $url .= '?' . http_build_query($params);
        $html = Http::get($url);
        $crawler = new Crawler($html);
        try {
            $url = $crawler->filter('#resultlink_0')->first()->attr('href');
        } catch (\Exception $e) {
            dump('Cant find link for ' . $item->id . ' ' . $url);
            return;
        }

        $html = Http::get($url);
        $crawler = new Crawler($html);
        try {
            $imageSrc = $crawler->filter('.market_listing_largeimage img')->first()->attr('src');
        } catch (\Exception $e) {
            dump('Cant find image for ' . $item->id);
            return;
        }

        Storage::disk('local')->put('img.png', Http::get($imageSrc));
        $imgPngPath = Storage::disk('local')->path('img.png');

        $gdImageInstance = imagecreatefrompng($imgPngPath);
        $path = Storage::disk('local')->path('');
        $pathName = $path . 'tmp.webp';
        imagewebp($gdImageInstance, $path . 'tmp.webp', 100);
        imagedestroy($gdImageInstance);
        $name = hash_file('sha1', $pathName) . '.webp';
        Storage::disk('s3')->delete($item->image);
        Storage::disk('s3')->put($name, file_get_contents($pathName));
        $item->image = $name;
        $item->is_image_fixed = 1;
        $item->save();
    }
}
