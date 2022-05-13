<?php

namespace Database\Seeders\boxes;

use Illuminate\Database\Seeder;

class MainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        (new BoxFakeUsersSeeder())->run();
        (new BoxCategoriesSeeder())->run();
        (new BoxImagesSeeder())->run();
        (new BoxSeeder())->run();
        (new BoxRareStatusesSeeder())->run();
        (new BoxItemsSeeder())->run();
        (new UsersSeeder())->run();
        (new BoxPrizesTableSeeder())->run();
    }
}
