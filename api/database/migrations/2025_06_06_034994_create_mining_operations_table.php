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
        Schema::create('mining_operations', function (Blueprint $table) {
            $table->id();
            $table->date('extraction_date');
            $table->decimal('quantity_extracted');
            $table->longText('notes')->nullable();
            $table->foreignId('material_id')->nullable();
            $table->foreignId('mine_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mining_operations');
    }
};
