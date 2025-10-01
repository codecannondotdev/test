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
        Schema::create('blood_products', function (Blueprint $table) {
            $table->id();
            $table->enum('product_type', ['Whole Blood', 'PRBC', 'Platelets', 'Plasma']);
            $table->string('storage_temperature')->nullable();
            $table->integer('shelf_life_days')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_products');
    }
};
