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
        Schema::create('kartas', function (Blueprint $table) {
            $table->id();
            $table->string('ime')->nullable();
            $table->string('oceno')->nullable();
            $table->string('edition')->nullable();
            $table->string('card_number')->nullable();
            $table->string('condition')->nullable();
            $table->foreignId('predal_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kartas');
    }
};
