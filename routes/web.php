<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleTimeController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\TimeSlotController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // dump(request('search'));
    return Inertia::render('Dashboard', [
        'searchV' => request('search'),
        'select' => request('select')
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('admin')->group(function () {
    Route::get('/admin-dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/specialities', [AdminController::class, 'specialities'])->name('specialities');
    Route::get('/admin-doctor', [AdminController::class, 'doctor'])->name('admin-doctor');
    Route::get('/admin-clinic', [AdminController::class, 'clinic'])->name('admin-clinic');

    Route::get('/clinic-request/{id}', [AdminController::class, 'clinicRequest'])->name('clinic.request');
    Route::post('/clinic-request/{id}', [AdminController::class, 'updateClinicRequest'])->name('update.clinic.request');

    Route::get('/doctor-request/{id}', [AdminController::class, 'doctorRequest'])->name('doctor.request');
    Route::post('/doctor-request/{id}', [AdminController::class, 'updateDoctorRequest'])->name('update.doctor.request');

    Route::delete('/speciality/{id}', [SpecialityController::class, 'destroy'])->name('speciality.destroy');
    Route::post('/speciality', [SpecialityController::class, 'store'])->name('speciality.store');
    Route::post('/update-speciality/{id}', [SpecialityController::class, 'update'])->name('speciality.update');

});

Route::middleware('clinic')->group(function () {
    Route::get('clinic-dashboard', [ClinicController::class, 'index'])->name('clinic.dashboard');
    Route::get('/doctor', [ClinicController::class, 'doctor'])->name('doctor');
    Route::get('/create-doctor', [DoctorController::class, 'create'])->name('create.dashboard');
    Route::get('/doctor/{id}/edit', [DoctorController::class, 'edit'])->name('edit.dashboard');
    Route::get('/available-time', [ClinicController::class, 'availableTime'])->name('available-time');
    Route::get('/schedule-time/{doctor}', [ClinicController::class, 'scheduleTime'])->name('schedule-time');
    
    Route::post('/available-time', [TimeSlotController::class, 'store'])->name('store-available-time');
    Route::post('/schedule-time', [ScheduleTimeController::class, 'store'])->name('store-schedule-time');
    Route::post('/delete-schedule-time', [ScheduleTimeController::class, 'destroy'])->name('destroy-schedule-time');

    Route::post('/doctor/{id}/edit', [DoctorController::class, 'update'])->name('update.dashboard');
    Route::post('/doctor', [DoctorController::class, 'store'])->name('doctor.store');
    Route::delete('/doctor/{id}', [DoctorController::class, 'destroy'])->name('doctor.destroy');

    Route::delete('/delete-document/{id}', [DocumentController::class, 'destroy'])->name('delete.document');

    Route::post('/add-document', [DocumentController::class, 'store'])->name('store.document');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'myProfile'])->name('myprofile');
    Route::get('/profile/{id}', [ProfileController::class, 'profile'])->name('profile');
    
    Route::post('/update-profile/{id}', [ProfileController::class, 'updateProfile'])->name('update.profile');
});

Route::controller(AuthController::class)->middleware("guest")->group(function () {
    // Route::get('/login', 'login')->name("login"); //Displays the login page
    Route::get('/login-phone', 'loginPhone')->name("login.phone"); //Displays the phone login page
    Route::post('/check', 'check')->name('check'); //Email and password login
    Route::post('/send-login-otp', 'sendLoginOtp')->name('sendLoginOtp'); //Mobile login
    Route::get('/login-otp', 'verifyOtpLogin')->name("login.otp"); //Displays the page where the user enters the OTP
    Route::post('/check-login-otp', 'checkLoginOtp')->name('check.otp'); //Checks if the OTP entered is valid and logs user in if it is
  
    // Route::get('/register', 'register')->name("register"); //Displays the register page
    Route::post('/create', 'create')->name('create'); //Saves the Register info in a cookie and sends an OTP code to the number
    Route::get('/register-otp', 'verifyOtpRegister')->name("register.otp"); //Displays the page where the user enters the OTP
    Route::post('/check-register-otp', 'checkRegisterOtp')->name('create.otp'); //Checks if the OTP is valid and creates an account for the user
  });

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
