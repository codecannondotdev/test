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
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->dateTime('admission_date');
            $table->longText('reason')->nullable();
            $table->enum('status', ['Active', 'Discharged', 'Transferred'])->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('ward_id')->nullable();
            $table->foreignId('bed_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
