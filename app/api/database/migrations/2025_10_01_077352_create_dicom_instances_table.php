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
        Schema::create('dicom_instances', function (Blueprint $table) {
            $table->id();
            $table->string('uid');
            $table->string('sop_class')->nullable();
            $table->dateTime('stored_at')->nullable();
            $table->foreignId('imaging_study_id')->nullable();
            $table->foreignId('integration_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dicom_instances');
    }
};
