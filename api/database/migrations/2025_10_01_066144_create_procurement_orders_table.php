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
        Schema::create('procurement_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->date('order_date')->nullable();
            $table->enum('status', ['Ordered', 'Received', 'Cancelled'])->nullable();
            $table->foreignId('stock_id')->nullable();
            $table->foreignId('supplier_id')->nullable();
            $table->foreignId('donor_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_orders');
    }
};
