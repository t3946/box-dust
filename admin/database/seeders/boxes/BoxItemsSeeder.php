<?php

namespace Database\Seeders\boxes;

use App\Models\BoxItemModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoxItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $image_id = DB::table( 'box_images' )->where( 'name', 'item-default' )->first()->image_id;
        $box_id = DB::table( 'cases' )->where( 'name', 'Apple' )->first()->box_id;

        if ( $image_id && $box_id ) {
            ( new BoxItemModel( [
                'name' => 'Iphone 12 Pro',
                'description' => 'The best phone for your baby',
                'cost_to_us' => 90000,
                'list_price' => 102000,
                'stock' => true,
                'demo' => true,
                'image_id' => $image_id,
                'box_id' => $box_id,
            ] ) )->save();
        }
    }
}
