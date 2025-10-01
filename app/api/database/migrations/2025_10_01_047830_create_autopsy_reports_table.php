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
        Schema::create('autopsy_reports', function (Blueprint $table) {
            $table->id();
            $table->longText('findings')->nullable();
            $table->longText('conclusion')->nullable();
            $table->date('report_date')->nullable();
            $table->foreignId('mortality_report_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('autopsy_reports');
    }
};
