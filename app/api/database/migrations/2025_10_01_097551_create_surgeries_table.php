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
        Schema::create('surgeries', function (Blueprint $table) {
            $table->id();
            $table->string('procedure_name');
            $table->dateTime('scheduled_start');
            $table->dateTime('scheduled_end')->nullable();
            $table->enum('status', ['SCHEDULED', 'COMPLETED', 'CANCELLED'])->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('operating_room_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surgeries');
    }
};
