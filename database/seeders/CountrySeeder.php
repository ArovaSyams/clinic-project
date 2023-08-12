<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            'United States',
            'China',
            'United Kingdom',
            'Japan',
            'France',
            'Germany',
            'Italy',
            'Australia',
            'Canada',
            'Brazil',
            'India',
            'Russia',
            'South Korea',
            'Spain',
            'Mexico',
            'Thailand',
            'Egypt',
            'Greece',
            'Turkey',
            'South Africa',
        ];

        foreach ($countries as $country) {
            DB::table('countries')->insert([
                'country' => $country
            ]);
        }
    }
}
