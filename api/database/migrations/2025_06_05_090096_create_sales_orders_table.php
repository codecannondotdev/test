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
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->date('order_date');
            $table->integer('quantity');
            $table->decimal('unit_price');
            $table->decimal('total_amount');
            $table->foreignId('car_model_id')->nullable();
            $table->foreignId('customer_id')->nullable();
            $table->enum('status', ['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_orders');
    }
};
