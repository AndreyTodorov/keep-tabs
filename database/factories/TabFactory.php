<?php

namespace Database\Factories;

use App\Models\Tab;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tab>
 */
class TabFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'status' => Tab::STATUS_ACTIVE,
            'creator_id' => 1,
        ];
    }
}
