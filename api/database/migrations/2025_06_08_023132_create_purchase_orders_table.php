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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->date('order_date');
            $table->integer('quantity_ordered');
            $table->decimal('unit_price');
            $table->decimal('total_cost');
            $table->foreignId('material_id')->nullable();
            $table->foreignId('supplier_id')->nullable();
            $table->enum('status', ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
