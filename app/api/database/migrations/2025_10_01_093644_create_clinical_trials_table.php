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
        Schema::create('clinical_trials', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->string('phase')->nullable();
            $table->enum('status', ['Recruiting', 'Active', 'Closed'])->nullable();
            $table->foreignId('research_study_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinical_trials');
    }
};
