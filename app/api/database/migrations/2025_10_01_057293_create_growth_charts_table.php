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
        Schema::create('growth_charts', function (Blueprint $table) {
            $table->id();
            $table->date('measurement_date');
            $table->decimal('weight')->nullable();
            $table->decimal('height')->nullable();
            $table->decimal('head_circumference')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('growth_charts');
    }
};
