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
        Schema::create('palliative_care_plans', function (Blueprint $table) {
            $table->id();
            $table->longText('goals')->nullable();
            $table->longText('medications')->nullable();
            $table->longText('advance_directives')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('care_team_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('palliative_care_plans');
    }
};
