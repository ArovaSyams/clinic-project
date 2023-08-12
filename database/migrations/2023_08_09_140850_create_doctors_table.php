<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id');
            $table->integer('clinic_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->date('birth_date');
            $table->string('image');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('country');
            $table->string('state');
            $table->string('city');
            $table->string('location');
            $table->text('introduction');
            $table->string('speciality');
            $table->string('service');
            $table->text('remarks')->nullable();
            $table->string('status')->default('Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
