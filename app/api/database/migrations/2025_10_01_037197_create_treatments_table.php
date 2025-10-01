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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', ['PLANNED', 'ACTIVE', 'COMPLETED', 'INTERRUPTED'])->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('supervising_doctor_id')->nullable();
            $table->foreignId('care_plan_id')->nullable();
            $table->foreignId('diagnosis_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
