<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QualificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $qualifications = [
            'Doctor of Medicine (MD)',
            'Doctor of Osteopathic Medicine (DO)',
            'Bachelor of Medicine, Bachelor of Surgery (MBBS or MBChB)',
            'Doctor of Dental Medicine (DMD)',
            'Doctor of Dental Surgery (DDS)',
            'Doctor of Veterinary Medicine (DVM)',
            'Doctor of Pharmacy (PharmD)',
            'Doctor of Optometry (OD)',
            'Doctor of Podiatric Medicine (DPM)',
            'Doctor of Chiropractic (DC)',
            'Doctor of Nursing Practice (DNP)',
            'Doctor of Physical Therapy (DPT)',
            'Doctor of Psychology (PsyD)',
            'Doctor of Social Work (DSW or PhD in Social Work)',
            'Doctor of Occupational Therapy (OTD)',
            'Doctor of Naturopathic Medicine (ND or NMD)',
            'Doctor of Public Health (DrPH)',
            'Doctor of Science in Dentistry (DScD)',
            'Doctor of Science in Veterinary Medicine (DVSc or ScD)',
            'Doctor of Medical Science (DMSc)',

        ];

        foreach ($qualifications as $qualification) {
            DB::table('qualifications')->insert([
                'qualification' => $qualification,
            ]);
        }
    }
}
