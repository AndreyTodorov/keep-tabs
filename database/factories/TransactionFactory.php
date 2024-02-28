<?php

namespace Database\Factories;

use App\Models\Tab;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => fake()->dateTimeBetween('-1 year', 'now'),
            'amount' => fake()->randomFloat(12, 5, 70),
            'comment' => fake()->sentence(),
            'action' => Tab::STATUS_ACTIVE,
            'user_id' => 1,
            'tab_id' => 1,
        ];
    }
}
