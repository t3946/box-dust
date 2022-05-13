<?php

namespace Database\Seeders\boxes;

use App\Models\BoxImageModel;
use Illuminate\Database\Seeder;

class BoxImagesSeeder extends Seeder
{
    public function run()
    {
        ( new BoxImageModel( [
            'name' => 'box-default',
            'width' => 970,
            'height' => 815,
        ] ) )->save();

        ( new BoxImageModel( [
            'name' => 'item-default',
            'width' => 296,
            'height' => 406,
        ] ) )->save();
    }
}
