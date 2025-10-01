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
        Schema::create('occupational_therapy_sessions', function (Blueprint $table) {
            $table->id();
            $table->date('session_date')->nullable();
            $table->longText('goals')->nullable();
            $table->longText('outcome')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('occupational_therapy_sessions');
    }
};
