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
        Schema::create('tabs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name', 50)->nullable(false);
            $table->string('description', 100);

            // Timestamps
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->date('date')->nullable(false);
            $table->decimal('amount')->nullable(false);
            $table->string('comment', 200);
            $table->string('description', 200);

            // Timestamps
            $table->softDeletes();
            $table->timestamps();

            // Relations
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('tab_id')->constrained()->cascadeOnDelete();
        });

        // Join table
        Schema::create('tab_user', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->ulid('tab_id');

            $table->timestamps();

            $table->foreign('user_id')->references('id')
                ->on('users')->onDelete('cascade');
            $table->foreign('tab_id')->references('id')
                ->on('tabs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('tabs');
    }
};
