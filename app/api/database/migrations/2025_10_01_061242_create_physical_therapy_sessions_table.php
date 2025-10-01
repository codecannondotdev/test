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
        Schema::create('physical_therapy_sessions', function (Blueprint $table) {
            $table->id();
            $table->date('session_date');
            $table->integer('duration_minutes')->nullable();
            $table->longText('therapist_notes')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physical_therapy_sessions');
    }
};
