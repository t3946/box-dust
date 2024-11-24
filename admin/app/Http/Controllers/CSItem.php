<?php

namespace App\Http\Controllers;

use App\Models\Box\BoxItem;
use App\Models\CSItem as CSItemModel;
use App\Services\FixCsItemImage;
use Illuminate\Support\Facades\Storage;

class CSItem extends Controller
{
    public function saveImage()
    {
        $image = request()->files->get('image');
        $gdImageInstance = imagecreatefrompng($image);
        $path = Storage::disk('local')->path('');
        $pathName = $path . 'tmp.webp';
        imagewebp($gdImageInstance, $path . 'tmp.webp', 100);
        imagedestroy($gdImageInstance);
        $name = hash_file('sha1', $pathName) . '.webp';
        $item = CSItemModel::find(request()->post('csItemId'));
        Storage::disk('s3')->delete($item->image);
        Storage::disk('s3')->put($name, file_get_contents($pathName));
        $item->image = $name;
        $item->save();

        return [
            'newImageUrl' => Storage::disk('s3')->url($item->image),
        ];
    }

    public function loadImageFromSteam()
    {
        $item = CSItemModel::find(request()->post('csItemId'));
        FixCsItemImage::uploadFromSteam($item);
    }
}
