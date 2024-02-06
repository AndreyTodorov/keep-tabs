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
        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->date('date');
            $table->decimal('amount');
            $table->text('comment');
            $table->text('description');

            // Timestamps
            $table->softDeletes();
            $table->timestamps();

            // Relations
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('tab_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
