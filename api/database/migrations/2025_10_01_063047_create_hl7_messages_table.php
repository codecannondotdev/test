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
        Schema::create('hl7_messages', function (Blueprint $table) {
            $table->id();
            $table->string('message_type');
            $table->dateTime('received_at');
            $table->longText('payload')->nullable();
            $table->foreignId('integration_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hl7_messages');
    }
};
