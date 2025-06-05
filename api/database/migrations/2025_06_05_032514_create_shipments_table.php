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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('shipment_number');
            $table->date('shipment_date');
            $table->integer('quantity_shipped');
            $table->string('destination');
            $table->enum('status', ['PENDING', 'IN TRANSIT', 'DELIVERED']);
            $table->string('carrier')->nullable();
            $table->foreignId('sales_order_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
