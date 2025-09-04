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
        Schema::create('testers', function (Blueprint $table) {
            $table->id();
            $table->string('asdfasdfasd')->nullable();
            $table->enum('asdffasdfasdfasdf', ['aaaaaaaaaaaaaaaa', 'sssssssssssssss', 'ddddddddddddddd']);
            $table->enum('nice_names', ['aaaaaaaaaaaaaaaaaa', 'ssssssssssssssssss', 'dddddddddddddd']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testers');
    }
};
