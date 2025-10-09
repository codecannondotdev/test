<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Receipt>
 */
class ReceiptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'file_name' => fake()->fileExtension(),
            'file_type' => fake()->fileExtension(),
            'uploaded_at' => fake()->dateTime(),
            'notes' => fake()->realText(),
            'file_size' => fake()->randomNumber(9),
            'expense_id' => fake()->numberBetween(1, 50),
        ];
    }
}
