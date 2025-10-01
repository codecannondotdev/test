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
        Schema::create('lab_orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime('order_date');
            $table->enum('priority', ['Routine', 'Urgent', 'Stat'])->nullable();
            $table->enum('status', ['Ordered', 'Collected', 'Completed'])->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->foreignId('ordered_by_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_orders');
    }
};
