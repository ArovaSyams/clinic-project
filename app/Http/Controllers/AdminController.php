<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\DoctorQualification;
use App\Models\Document;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AdminDashboard', [
            'user' => Auth::user(),
            'doctorCount' => Doctor::all()->count(),
            'clinicCount' => User::where('role', 'clinic')->count(),
            'doctors' => Doctor::latest()->get()->take(10),
            'clinics' => User::where('role', 'clinic')->get()
        ]);
    }

    public function specialities()
    {
        return Inertia::render('Admin/Specialities', [
            'specialities' => Speciality::latest()->get(),
            'user' => Auth::user(),
        ]);
    }

    public function doctor()
    {

        return Inertia::render('Admin/Doctor', [
            'doctors' => Doctor::all(),
            'user' => Auth::user(),
            'clinics' => User::where('role', 'clinic')->get()
        ]);
    }

    public function clinic()
    {
        return Inertia::render('Admin/Clinic', [
            'clinics' => User::where('role', 'clinic')->get(),
            'user' => Auth::user(),
        ]);
    }

    public function doctorRequest($id)
    {
        $replaceStr = str_replace('-', ' ', $id);

        $doctor = Doctor::where('first_name', $replaceStr)->first();
        $qualifications = DoctorQualification::where('doctor_id', $doctor->unique_id)->get();
        $clinic = User::where('id', $doctor->clinic_id)->first();
        $documents = Document::where('doctor_id', $doctor->unique_id)->get();

        return Inertia::render('Admin/DoctorRequest', [
            'user' => Auth::user(),
            'doctor' => $doctor,
            'qualifications' => $qualifications,
            'clinic' => $clinic,
            'documents' => $documents
        ]);
    }

    public function updateDoctorRequest(Request $request, $id)
    {
        $doctor = Doctor::where('unique_id', $id)->first();
        $doctor->remarks = $request->remarks;
        $doctor->status = $request->status;
        $doctor->save();

        return redirect('admin-doctor');
    }

    public function clinicRequest($id)
    {
        $replaceStr = str_replace('-', ' ', $id);

        $clinic = User::where('first_name', $replaceStr)->first();

        return Inertia::render('Admin/ClinicRequest', [
            'user' => Auth::user(),
            'clinic' => $clinic
        ]);
    }

    public function updateClinicRequest(Request $request, $id)
    {

        $clinic = User::where('id', $id)->first();
        $clinic->remarks = $request->remarks;
        $clinic->status = $request->status;
        $clinic->save();

        return redirect('admin-clinic');
    }
}
