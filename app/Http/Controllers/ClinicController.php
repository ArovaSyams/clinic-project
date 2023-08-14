<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\ScheduleTime;
use App\Models\TimeSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    public function availableTime() {
        return Inertia::render('Clinic/AvailableTime', [
            'user' => Auth::user(),
            'timeSlots' => TimeSlot::where('clinic_id', Auth::user()->id)->get()
        ]);
    }

    public function scheduleTime($doctor) {
        $replaceStr = str_replace('-', ' ', $doctor);

        $doctor = Doctor::where('first_name', $replaceStr)->first();

        return Inertia::render('Clinic/ScheduleTime', [
            'user' => Auth::user(),
            'doctor' => $doctor,
            'timeSlots' => TimeSlot::where('clinic_id', Auth::user()->id)->get(),
            'dates' => ScheduleTime::groupBy('date')->having('doctor_id', '=', $doctor->unique_id)->get(),
            'availableTimes' => ScheduleTime::where('doctor_id', $doctor->unique_id)->get()
        ]);
    }
}
