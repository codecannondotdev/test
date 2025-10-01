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
        Schema::create('medical_device_maintenances', function (Blueprint $table) {
            $table->id();
            $table->date('maintenance_date');
            $table->string('performed_by')->nullable();
            $table->longText('notes')->nullable();
            $table->foreignId('supplier_id')->nullable();
            $table->foreignId('device_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_device_maintenances');
    }
};
