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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('content_type')->nullable();
            $table->dateTime('uploaded_at');
            $table->text('description')->nullable();
            $table->foreignId('medical_record_id')->nullable();
            $table->foreignId('imaging_study_id')->nullable();
            $table->foreignId('legal_hold_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
