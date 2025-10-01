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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number');
            $table->date('issue_date');
            $table->date('due_date')->nullable();
            $table->decimal('total_amount');
            $table->enum('status', ['DRAFT', 'ISSUED', 'PAID', 'PARTIALLY PAID', 'VOIDED'])->nullable();
            $table->foreignId('billing_account_id')->nullable();
            $table->foreignId('insurance_claim_id')->nullable();
            $table->foreignId('currency_id')->nullable();
            $table->foreignId('tax_rate_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
