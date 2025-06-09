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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->enum('inventory_type', ['RAW MATERIAL', 'FINISHED PRODUCT']);
            $table->string('item_name');
            $table->integer('quantity_on_hand');
            $table->string('location');
            $table->date('last_updated');
            $table->foreignId('material_id')->nullable();
            $table->foreignId('car_model_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
