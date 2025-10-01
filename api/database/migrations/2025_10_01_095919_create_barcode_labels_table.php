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
        Schema::create('barcode_labels', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->enum('type', ['SPECIMEN', 'MEDICATION', 'DEVICE'])->nullable();
            $table->dateTime('printed_at')->nullable();
            $table->foreignId('medication_id')->nullable();
            $table->foreignId('device_id')->nullable();
            $table->foreignId('specimen_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barcode_labels');
    }
};
