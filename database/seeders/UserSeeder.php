<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'role' => 'admin',
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
        ]);
        DB::table('users')->insert([
            'role' => 'clinic',
            'first_name' => 'Healthy',
            'last_name' => 'Clinic',
            'email' => 'clinic@gmail.com',
            'phone' => '919746188288',
            'status' => 'Inactive',
            'password' => Hash::make('clinic'),
        ]);
        DB::table('users')->insert([
            'first_name' => 'Patient',
            'last_name' => 'Patient',
            'email' => 'patient@gmail.com',
            'password' => Hash::make('patient'),
        ]);
    }
}
