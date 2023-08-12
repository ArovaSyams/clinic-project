<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Craftsys\Msg91\Facade\Msg91;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render('Auth/Login');
    }
    public function loginPhone(Request $request)
    {
        return Inertia::render('Auth/LoginPhone');
    }
    public function check(Request $request)
    {
        $password = $request->password;
        $email = $request->email;

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return to_route('user.dashboard');
        }
        return back()->with('error', 'Invalid credentials. Make sure to enter the right email and password');
    }
    public function sendLoginOtp(Request $request)
    {

        $phone = $request->phone;
        $user = User::where('phone', $phone)->first();
        if (!$user ) {
            return back()->with("message", "Invalid phone number.");
        }
        Cookie::queue(Cookie::make('phoneToBeVerified', $phone, 5));
        // Msg91::otp()->to($phone)->template("649d8140d6fc0515e37f5c02")->send();
        Msg91::otp()->to($phone)->template("64359010d6fc0504c7711152")->send();
        return to_route("login.otp");
    }
    public function verifyOtpLogin(Request $request)
    {
        if (Cookie::get('phoneToBeVerified')) {
            return Inertia::render('Auth/LoginOtp');
        } else {
            dd($request);
            return to_route('login')->with("message", "Something went wrong, please try again!");
        }
    }
    public function checkLoginOtp(Request $request)
    {
        $otp = $request->otp;
        $phone = Cookie::get("phoneToBeVerified");
        try {
            Msg91::otp((int) $otp)->to((int) $phone)->verify();
        } catch (\Craftsys\Msg91\Exceptions\ResponseErrorException $e) {
            return back()->with('message', 'The OTP code you entered is wrong.');
        }
        $id = User::where("phone", $phone)->first()->id;
        Auth::loginUsingId($id);
        Cookie::expire('phoneToBeVerified');

        return to_route('clinic.dashboard');
    }
    public function register(Request $request)
    {
        return view('authentication.register');
    }
    public function create(Request $request)
    {
        $request->validate(
            [
                'firstname' => 'required|alpha|max:25',
                'lastname' => 'required|alpha|max:25',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|numeric|unique:users,phone',
                'password' => 'required|min:6|alpha_num|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                'confirmpassword' => 'required|same:password'
            ],
            [
                'firstname.required' => 'The first name field is required.',
                'firstname.alpha' => 'The first name field must only contain letters.',
                'firstname.max' => 'The first name field must not be greater than 25 character.',
                'lastname.required' => 'The first name field is required.',
                'lastname.alpha' => 'The first name field must only contain letters.',
                'lastname.max' => 'The first name field must not be greater than 25 character.',
                'password.regex' => 'The password needs to contain at least one uppercase, one lowercase and one numeric character.',
                'confirmpassword.same' => 'The confirm password field must match the password.',
            ]
        );

        $phone = $request->phone;

        Cookie::queue(Cookie::make('userData', json_encode([
            "firstname" => $request->firstname,
            "lastname" => $request->lastname,
            "email" => $request->email,
            "phone" => $phone,
            "password" => Hash::make($request->password),
        ]), 5));

        // Msg91::otp()->to($phone)->template("649d8140d6fc0515e37f5c02")->send();
        Msg91::otp()->to($phone)->template("64359010d6fc0504c7711152")->send();
        return to_route('register.otp');
    }
    public function verifyOtpRegister()
    {
        if (Cookie::get('userData')) {
            return Inertia::render('Auth/RegisterOtp');
        } else {
            return to_route('register')->with("message", "Something went wrong, please try again!");
        }
    }
    public function checkRegisterOtp(Request $request)
    {
        $otp = $request->otp;
        $userData = json_decode(Cookie::get("userData"));
        $phone = $userData->phone;
        try {
            Msg91::otp((int) $otp)->to((int) $phone)->verify();
        } catch (\Craftsys\Msg91\Exceptions\ResponseErrorException $e) {
            return back()->with('message', 'Invalid otp.');
        }
        //Creating a user instance from the $userData
        $user = new User();
        $user->firstname = $userData->firstname;
        $user->lastname = $userData->lastname;
        $user->email = $userData->email;
        $user->phone = $userData->phone;
        $user->password = $userData->password;
        $user->save();

        Auth::loginUsingId($user->id);

        return to_route('user.dashboard');
    }
}
