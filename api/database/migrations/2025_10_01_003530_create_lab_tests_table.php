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
        Schema::create('lab_tests', function (Blueprint $table) {
            $table->id();
            $table->string('test_name');
            $table->string('specimen_type')->nullable();
            $table->date('order_date');
            $table->enum('status', ['Ordered', 'Collected', 'Processing', 'Completed'])->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('ordering_doctor_id')->nullable();
            $table->foreignId('lab_order_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_tests');
    }
};
