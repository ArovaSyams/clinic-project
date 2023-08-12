<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicController extends Controller
{
    public function index() {
        return Inertia::render('Clinic/ClinicDashboard', [
            'user' => Auth::user(),
            'doctorCount' => Doctor::all()->count(),
            'appointmentCount' => Appointment::all()->count(),
            'appointments' => Appointment::latest()->take(10)
        ]);
    }

    public function doctor() {
        return Inertia::render('Clinic/Doctor', [
            'user' => Auth::user(),
            'doctors' => Doctor::all()
        ]);
    }
}
