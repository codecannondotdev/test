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
        Schema::create('anesthesia', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['General', 'Regional', 'Local'])->nullable();
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->longText('complications')->nullable();
            $table->foreignId('anesthesiologist_id')->nullable();
            $table->foreignId('surgery_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anesthesia');
    }
};
