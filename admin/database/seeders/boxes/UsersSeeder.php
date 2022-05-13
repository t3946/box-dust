<?php

namespace Database\Seeders\boxes;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use TCG\Voyager\Models\Role;
use TCG\Voyager\Models\User;

class UsersSeeder extends Seeder
{
    public function run()
    {
        if ( ! DB::table( 'users' )->where( 'email', 'gamer@gamer.com' )->exists() ) {
            $role = Role::where( 'name', 'user' )->firstOrFail();

            User::create( [
                'name' => 'Gamer Name',
                'email' => 'gamer@gamer.com',
                'password' => bcrypt( 'password' ),
                'remember_token' => Str::random( 60 ),
                'role_id' => $role->id,
            ] );
        }
    }
}
