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
        Schema::create('vaccine_records', function (Blueprint $table) {
            $table->id();
            $table->string('vaccine_name');
            $table->date('date_administered');
            $table->integer('dose_number')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('immunization_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccine_records');
    }
};
