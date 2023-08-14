<?php

namespace App\Http\Controllers;

use App\Models\ScheduleTime;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;

class ScheduleTimeController extends Controller
{
    public function store(Request $request) {

        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date',
            'slot' => 'required|numeric',
            'available_times' => 'required',
        ]);

        // Step 1: Setting the Start and End Dates
        $start_date = new DateTime($request->date_from);
        $end_date = new DateTime($request->date_to);
        $updated_end_date = $end_date->modify('+1 day');
        // dd($updated_end_date);
        
        // Step 2: Defining the Date Interval
        $interval = new DateInterval('P1D');
        
        // Step 3: Creating the Date Range
        $date_range = new DatePeriod($start_date, $interval, $updated_end_date);

        // Step 4: Looping Through the Date Range
        foreach ($date_range as $date) {

            // dump($date->format('Y-m-d'));
            foreach ($request->available_times as $time) {
       
                ScheduleTime::create([
                    "doctor_id" => $request->doctor_id,
                    "date" => $date->format('Y-m-d'),
                    "available_time" => $time,
                    "slot" => $request->slot
                ]);
            }
        }

        return redirect('doctor')->with('message',  "Success to create schedule time");
    }

    public function destroy(Request $request) {
        $schedule = ScheduleTime::where('date', $request->date)->where('available_time', $request->available_time)->first();

        if(!$schedule) {
            return redirect()->back()->with('message', "Data not found");
        }
        $schedule->delete();
        return redirect('doctor')->with('message',  "Success to delete schedule time");

        
    }
}
