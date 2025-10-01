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
        Schema::create('insurance_claims', function (Blueprint $table) {
            $table->id();
            $table->string('claim_number')->nullable();
            $table->date('submission_date')->nullable();
            $table->enum('status', ['Submitted', 'Accepted', 'Rejected', 'Adjusted'])->nullable();
            $table->foreignId('billing_account_id')->nullable();
            $table->foreignId('insurance_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_claims');
    }
};
