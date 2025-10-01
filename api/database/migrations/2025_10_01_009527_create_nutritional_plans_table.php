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
        Schema::create('nutritional_plans', function (Blueprint $table) {
            $table->id();
            $table->string('diet_type');
            $table->integer('calorie_goal');
            $table->longText('notes')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutritional_plans');
    }
};
