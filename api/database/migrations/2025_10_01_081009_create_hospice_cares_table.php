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
        Schema::create('hospice_cares', function (Blueprint $table) {
            $table->id();
            $table->date('start_date')->nullable();
            $table->longText('plan_summary')->nullable();
            $table->enum('status', ['Active', 'Completed'])->nullable();
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
        Schema::dropIfExists('hospice_cares');
    }
};
