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
            $table->decimal('amount');
            $table->date('date');
            $table->enum('method', ['Cash', 'Card', 'Check', 'Insurance', 'Online'])->nullable();
            $table->text('reference')->nullable();
            $table->foreignId('billing_account_id')->nullable();
            $table->foreignId('invoice_id')->nullable();
            $table->foreignId('payment_method_id')->nullable();
            $table->foreignId('currency_id')->nullable();
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
