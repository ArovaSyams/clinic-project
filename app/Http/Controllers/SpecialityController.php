<?php

namespace App\Http\Controllers;

use App\Models\Speciality;
use App\Http\Requests\StoreSpecialityRequest;
use App\Http\Requests\UpdateSpecialityRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpecialityController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'speciality' => 'required|unique:specialities,speciality',
            // 'image' => 'required'
        ]);

        if ($request->file('image')) {
            Speciality::create([
                'speciality' => $request->speciality,
                'image' => $request->file('image')->store('image')
            ]); 
        } else {
            Speciality::create([
                'speciality' => $request->speciality,
                'image' => 'image/default-speciality.png'
            ]);
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Speciality $speciality)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Speciality $speciality)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'speciality' => 'required',
            'image' => 'required'
        ]);

        $specialityDb = Speciality::where('speciality', $id)->first();
    
        if($request->file('image')) {

            if($specialityDb->image !== 'image/default-speciality.png') {
                $currentImage = Speciality::where('speciality', $id)->first()->image;
                Storage::delete($currentImage);
            }

            $specialityDb->speciality = $request->speciality;
            $specialityDb->image = $request->file('image')->store('image');
        } 
        else {
            $specialityDb->speciality = $request->speciality;

        }

        $specialityDb->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $speciality = Speciality::where('speciality', $id)->first();

        if($speciality->image) {
            if($speciality->image !== 'image/default-speciality.png') {
                Storage::delete($speciality->image);
            }
        }

        $speciality->delete();

        return redirect()->back();
    }
}
