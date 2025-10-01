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
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->string('referral_source')->nullable();
            $table->longText('reason')->nullable();
            $table->date('date')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('referring_provider_id')->nullable();
            $table->foreignId('receiving_provider_id')->nullable();
            $table->foreignId('referral_source_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};
