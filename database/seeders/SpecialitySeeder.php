<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specialities = [
            'Cardiology',
            'Dermatology',
            'Gastroenterology',
            'Neurology',
            'Orthopedics',
            'Pediatrics',
            'Obstetrics and Gynecology (OB/GYN)',
            'Ophthalmology',
            'Otolaryngology (ENT)',
            'Urology',
            'Anesthesiology',
            'Radiology',
            'Psychiatry',
            'Emergency Medicine',
            'Endocrinology',
            'Rheumatology',
            'Infectious Diseases',
            'Nephrology',
            'Pulmonology',
            'Hematology',
            'Oncology',
            'Physical Medicine and Rehabilitation',
            'Allergy and Immunology',
            'Geriatrics',
            'Pain Medicine',
            'Sports Medicine',
            'Neonatology',
            'Sleep Medicine',
            'Medical Genetics',
            'Forensic Pathology',
        ];

        foreach ($specialities as $speciality) {
            DB::table('specialities')->insert([
                'speciality' => $speciality,
                'image' => 'image/default-speciality.png'
            ]);
        }
    }
}
