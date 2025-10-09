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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('amount');
            $table->date('date_incurred');
            $table->date('payment_date')->nullable();
            $table->enum('status', ['DRAFT', 'SUBMITTED', 'APPROVED', 'REIMBURSED', 'DECLINED'])->nullable();
            $table->enum('payment_method', ['CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'OTHER'])->nullable();
            $table->longText('notes')->nullable();
            $table->boolean('is_recurring');
            $table->boolean('receipt_attached');
            $table->foreignId('category_id')->nullable();
            $table->foreignId('vendor_id')->nullable();
            $table->foreignId('project_id')->nullable();
            $table->foreignId('budget_id')->nullable();
            $table->foreignId('currency_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
