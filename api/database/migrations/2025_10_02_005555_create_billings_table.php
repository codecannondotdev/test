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
        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number');
            $table->date('billing_date');
            $table->decimal('total_amount');
            $table->enum('status', ['PENDING', 'BILLED', 'PAID', 'PARTIALLY_PAID', 'DENIED', 'REFUNDED']);
            $table->enum('payment_method', ['CASH', 'CARD', 'INSURANCE', 'ELECTRONIC_TRANSFER'])->nullable();
            $table->string('insurance_claim_number')->nullable();
            $table->longText('notes')->nullable();
            $table->foreignId('patient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billings');
    }
};
