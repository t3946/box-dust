<?php

namespace Database\Seeders\boxes;

use App\Models\BoxRareStatusModel;
use Illuminate\Database\Seeder;

class BoxRareStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //init
        $statuses = [
            new BoxRareStatusModel([
                'slug' => 'frequently',
                'name' => 'Часто',
            ]),
            new BoxRareStatusModel([
                'slug' => 'normal',
                'name' => 'Средне',
            ]),
            new BoxRareStatusModel([
                'slug' => 'rare',
                'name' => 'Редко',
            ]),
        ];

        //save
        array_walk($statuses, static fn($model) => $model->save());
    }
}
