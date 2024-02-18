<?php

use App\Models\Tab;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Uid\Ulid;

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
            $table->enum('status', [Tab::STATUS_ACTIVE, Tab::STATUS_PENDING])->default(Tab::STATUS_PENDING);

            // Timestamps
            $table->softDeletes();
            $table->timestamps();

            // Relations
            $table->foreignId('creator_id')->constrained('users', 'id')->cascadeOnDelete();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->date('date')->nullable(false);
            $table->decimal('amount')->nullable(false);
            $table->string('comment', 200);

            // Timestamps
            $table->softDeletes();
            $table->timestamps();

            // Relations
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('tab_id')->constrained()->cascadeOnDelete();
        });
        // Join table
        Schema::create('tab_user', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('(UUID())'));
            $table->foreignId('user_id')->constrained();
            $table->foreignUlid('tab_id')->constrained();

            // Timestamps
            $table->timestamps();
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
