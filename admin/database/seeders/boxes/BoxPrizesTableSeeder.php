<?php

namespace Database\Seeders\boxes;

use App\Models\BoxPrizeModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoxPrizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_id = DB::table( 'users' )->where( 'email', 'admin@admin.com' )->first()->id;
        $item_id = DB::table( 'box_items' )->where( 'name', 'Iphone 12 Pro' )->first()->item_id;

        if ( $user_id && $item_id ) {
            for ( $i = 1; $i <= 10; $i++ ) {
                ( new BoxPrizeModel( [
                    'user_id' => $user_id,
                    'item_id' => $item_id,
                ] ) )->save();
            }
        }
    }
}
