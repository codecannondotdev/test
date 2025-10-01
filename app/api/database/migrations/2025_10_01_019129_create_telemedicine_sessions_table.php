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
        Schema::create('telemedicine_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('platform');
            $table->string('session_link')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->foreignId('appointment_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telemedicine_sessions');
    }
};
