<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            'California',
            'New York',
            'Texas',
            'Florida',
            'Tokyo',
            'Paris',
            'London',
            'Bavaria',
            'New South Wales',
            'Rio de Janeiro',
            'Beijing',
            'Maharashtra',
            'Catalonia',
            'Tuscany',
            'Western Cape',
            'Bali',
            'Alberta',
            'Scotland',
            'Dubai',
            'Victoria',
        ];

        foreach ($states as $state) {
            DB::table('states')->insert([
                'state' => $state
            ]);
        }
    }
}
