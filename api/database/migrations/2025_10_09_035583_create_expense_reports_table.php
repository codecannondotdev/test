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
        Schema::create('expense_reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('total_amount');
            $table->enum('currency', ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']);
            $table->dateTime('submitted_at')->nullable();
            $table->enum('status', ['DRAFT', 'SUBMITTED', 'APPROVED', 'REIMBURSED', 'DECLINED']);
            $table->longText('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_reports');
    }
};
