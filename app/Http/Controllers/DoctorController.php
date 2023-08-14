<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Country;
use App\Models\DoctorQualification;
use App\Models\Document;
use App\Models\Qualification;
use App\Models\Speciality;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clinic/CreateDoctor', [
            'user' => Auth::user(),
            'specialities' => Speciality::all(),
            'countries' => Country::all(),
            'states' => State::all(),
            'qualifications' => Qualification::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   

        $uniqueId = uniqid();

        $request->validate([
            "clinic_id" => 'required',
            "first_name" => 'required|unique:doctors,first_name',
            "last_name" => 'required|unique:doctors,last_name',
            "gender" => 'required',
            "birth_date" => 'required',
            "email" => 'required',
            "phone" => 'required',
            "address" => 'required',
            "country" => 'required',
            "state" => 'required',
            "city" => 'required',
            "location" => 'required',
            "introduction" => 'required',
            "speciality" => 'required',
            "qualifications" => 'required',
            "service" => 'required',
            "image" => 'required|image',
            "documents.*" => 'required|mimes:pdf|max:10000'
        ]);

        Doctor::create([
            "unique_id" => $uniqueId,
            "clinic_id" => $request->clinic_id,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "gender" => $request->gender,
            "birth_date" => $request->birth_date,
            "email" => $request->email,
            "phone" => $request->phone,
            "address" => $request->address,
            "country" => $request->country,
            "state" => $request->state,
            "city" => $request->city,
            "location" => $request->location,
            "introduction" => $request->introduction,
            "speciality" => $request->speciality,
            "qualification" => $request->qualification,
            "service" => $request->service,
            "image" => $request->file('image')->store('image'),
        ]);

        if($request->file('documents')) {
            // upload the counted doc
            foreach($request->documents as $doc) {
                
                $docDB = new Document();
                $docDB->document = $doc->store('document');
                $docDB->doctor_id = $uniqueId;
                $docDB->save();
            }

        }

        if($request->qualifications) {
            foreach($request->qualifications as $qualification) {
                $qualificationDB = new DoctorQualification();
                $qualificationDB->qualification = $qualification['qualification'];
                $qualificationDB->doctor_id = $uniqueId;
                $qualificationDB->save();
            }
        }

        return redirect('doctor')->with('message',  "Success to create doctor");
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $replaceStr = str_replace('-', ' ', $id);
        $doctorId = Doctor::where('first_name', $replaceStr)->first()->unique_id;
        
        $doctor = Doctor::where('unique_id', $doctorId)->first();
        $qualifications = DoctorQualification::where('doctor_id', $doctorId)->get();
        $documents = Document::where('doctor_id', $doctorId)->get();

        // dd($qualifications);
        return Inertia::render('Clinic/EditDoctor', [
            'user' => Auth::user(),
            'doctor' => $doctor,
            'doctorQualifications' => $qualifications,
            'documents' => $documents,
            'qualifications' => Qualification::all(),
            'countries' => Country::all(),
            'states' => State::all(),
            'specialities' => Speciality::all()
            
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {   
        
        $request->validate([
            "clinic_id" => 'required',
            "first_name" => 'required',
            "last_name" => 'required',
            "gender" => 'required',
            "birth_date" => 'required',
            "email" => 'required',
            "phone" => 'required',
            "address" => 'required',
            "country" => 'required',
            "state" => 'required',
            "city" => 'required',
            "location" => 'required',
            "introduction" => 'required',
            "speciality" => 'required',
            // "qualifications" => 'required',
            "service" => 'required',
            "image" => 'required'
        ]);
        
        $doctor = Doctor::where('unique_id', $id)->first();

        if($request->file('image')) {
            Storage::delete($doctor->image); 
            $doctor->image = $request->file('image')->store('image');
            $doctor->save();
        }

        Doctor::where('unique_id', $id)->update([
            "clinic_id" => $request->clinic_id,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "gender" => $request->gender,
            "birth_date" => $request->birth_date,
            "email" => $request->email,
            "phone" => $request->phone,
            "address" => $request->address,
            "country" => $request->country,
            "state" => $request->state,
            "city" => $request->city,
            "location" => $request->location,
            "introduction" => $request->introduction,
            "speciality" => $request->speciality,
            // "qualification" => $request->qualification,
            "service" => $request->service,
        ]);

        // QUALIFICAITIONS UPDATE
        if($request->qualifications) {
            $existQualification = DoctorQualification::where('doctor_id', $id)->get();

            foreach($existQualification as $exQual) {
                $dltQual = DoctorQualification::where('qualification', $exQual->qualification)->first();
                $dltQual->delete();
            }

            foreach($request->qualifications as $qualification) {
                $qualificationDB = new DoctorQualification();
                $qualificationDB->qualification = $qualification['qualification'];
                $qualificationDB->doctor_id = $id;
                $qualificationDB->save();
            }
        }

        // DOCUMENT UPDATE
        if($request->file('documents')) {
            $existDocument = Document::where('doctor_id', $id)->get();

            foreach($existDocument as $doc) {
                Storage::delete($doc->document);
                $doc->delete();
            }

            foreach($request->documents as $doc) {
                $docDB = new Document();
                $docDB->document = $doc->store('document');
                $docDB->doctor_id = $id;
                $docDB->save();
            }
        }

        return redirect('doctor')->with('message',  "Success to edit doctor");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $doctor = Doctor::where('unique_id', $id)->first();
        $document = Document::where('doctor_id', $id)->get();
        $qualification = DoctorQualification::where('doctor_id', $id)->get();

        if($doctor->image) {
            Storage::delete($doctor->image);
        }

        if($document) {
            foreach($document as $doc) {
                Storage::delete($doc->document);
                $doc->delete();
            }
        }

        if($qualification) {
            foreach($qualification as $qual) {
                $qual->delete();
            }
        }

        $doctor->delete();

        return redirect()->back();
    }
}
