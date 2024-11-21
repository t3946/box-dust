<?php

namespace Database\Seeders\boxes;

use App\Models\Cases\Cases;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $image_id = DB::table( 'box_images' )->where( 'name', 'box-default' )->first()->image_id;
        $category_id = DB::table( 'box_categories' )->where( 'name', 'Телефоны' )->first()->category_id;

        if ( $image_id && $category_id ) {
            ( new Cases( [
                'name' => 'Apple',
                'price' => 500,
                'big_image_id' => $image_id,
                'small_image_id' => $image_id,
                'category_id' => $category_id,
            ] ) )->save();
        }
    }
}
