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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['Consultation', 'Follow-up', 'Procedure', 'Telemedicine'])->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->enum('status', ['Scheduled', 'Completed', 'Cancelled', 'No-show'])->nullable();
            $table->longText('reason')->nullable();
            $table->text('location')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('doctor_id')->nullable();
            $table->foreignId('nurse_id')->nullable();
            $table->foreignId('department_id')->nullable();
            $table->foreignId('discharge_id')->nullable();
            $table->foreignId('location_id')->nullable();
            $table->foreignId('queue_id')->nullable();
            $table->foreignId('type_id')->nullable();
            $table->foreignId('referral_source_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
