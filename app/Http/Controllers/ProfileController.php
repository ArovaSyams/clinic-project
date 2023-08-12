<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Country;
use App\Models\Doctor;
use App\Models\State;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function profile($id) {
        $replaceStr = str_replace('-', ' ', $id);
        
        $doctor = Doctor::where('first_name', $replaceStr)->first();
        $clinic = User::where('first_name', $replaceStr)->first();
        if($doctor) {
            return Inertia::render('DoctorProfile', [
                'user' => Auth::user(),
                'doctor' => $doctor
            ]);
            
        } else if($clinic) {
            return Inertia::render('DoctorProfile', [
                'user' => Auth::user(),
                'doctor' => $clinic
            ]);
        }

    }

    public function myProfile() {
        return Inertia::render('MyProfile', [
            'user' => Auth::user(),
            'countries' => Country::all(),
            'states' => State::all()
        ]);
    }

    public function updateProfile(Request $request, $id) {
        
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required'
        ]);

        if($request->file('image')) {
            
            $user = User::where('id', $id)->first();
            // if the image is uploaded before
            if($user->image != 'image/default.jpg') {
                Storage::delete($user->image);
            }
            $user->image = $request->file('image')->store('image');
            $user->save();
        }

        User::where('id', $id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'gender' => $request->gender,
            'location' => $request->location,
            'country' => $request->country,
        ]);
    }
}
