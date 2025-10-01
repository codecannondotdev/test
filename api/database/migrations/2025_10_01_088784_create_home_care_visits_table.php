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
        Schema::create('home_care_visits', function (Blueprint $table) {
            $table->id();
            $table->date('visit_date');
            $table->longText('services_provided')->nullable();
            $table->text('distance_travelled')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('geo_location_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_care_visits');
    }
};
