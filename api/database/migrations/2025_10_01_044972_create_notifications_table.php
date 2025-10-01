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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('body');
            $table->dateTime('sent_at')->nullable();
            $table->boolean('read')->nullable();
            $table->foreignId('related_patient_id')->nullable();
            $table->foreignId('allergy_id')->nullable();
            $table->foreignId('contact_id')->nullable();
            $table->foreignId('credential_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
