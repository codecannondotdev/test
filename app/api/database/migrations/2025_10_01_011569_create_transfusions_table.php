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
        Schema::create('transfusions', function (Blueprint $table) {
            $table->id();
            $table->dateTime('transfusion_date');
            $table->string('volume')->nullable();
            $table->text('reaction_observed')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('blood_bank_id')->nullable();
            $table->foreignId('blood_product_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfusions');
    }
};
