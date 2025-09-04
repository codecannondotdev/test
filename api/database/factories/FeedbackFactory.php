<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rating' => fake()->randomDigitNotNull(),
            'comment' => fake()->realText(),
            'feedback_date' => fake()->date(),
            'member_id' => fake()->numberBetween(1, 50),
            'class_id' => fake()->numberBetween(1, 50),
        ];
    }
}
