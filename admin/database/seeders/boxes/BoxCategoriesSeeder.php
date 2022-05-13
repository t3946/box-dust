<?php

namespace Database\Seeders\boxes;

use App\Models\BoxCategoryModel;
use Illuminate\Database\Seeder;

class BoxCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ( new BoxCategoryModel( [ 'name' => 'Телефоны' ] ) )->save();
    }
}
