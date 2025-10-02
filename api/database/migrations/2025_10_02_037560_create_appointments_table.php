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
            $table->dateTime('appointment_date_time');
            $table->integer('duration_minutes')->nullable();
            $table->text('reason')->nullable();
            $table->enum('status', ['SCHEDULED', 'CONFIRMED', 'CHECKED IN', 'IN PROGRESS', 'COMPLETED', 'CANCELLED', 'NO-SHOW'])->nullable();
            $table->string('room')->nullable();
            $table->longText('notes')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('doctor_id')->nullable();
            $table->foreignId('nurse_id')->nullable();
            $table->foreignId('department_id')->nullable();
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
