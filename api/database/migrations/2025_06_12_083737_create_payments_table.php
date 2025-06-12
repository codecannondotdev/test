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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->text('amount');
            $table->date('payment_date');
            $table->enum('payment_method', ['CREDIT CARD', 'CASH', 'BANK TRANSFER'])->nullable();
            $table->longText('note')->nullable();
            $table->foreignId('member_id')->nullable();
            $table->foreignId('subscription_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
