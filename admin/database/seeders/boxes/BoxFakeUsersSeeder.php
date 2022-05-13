<?php

namespace Database\Seeders\boxes;

use App\Models\BoxFakeUserModel;
use Illuminate\Database\Seeder;

class BoxFakeUsersSeeder extends Seeder
{
    public function run()
    {
        $path = 'database\seeders\boxes\fake_users.json';
        $json = file_get_contents( $path );
        $fake_users_list = json_decode( $json, true, 512, JSON_THROW_ON_ERROR );

        foreach ( $fake_users_list as $user_name ) {
            ( new BoxFakeUserModel( [ 'name' => $user_name ] ) )->save();
        }
    }
}
