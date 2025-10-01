<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HL7Message>
 */
class HL7MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message_type' => fake()->word(),
            'received_at' => fake()->dateTimeThisYear(),
            'payload' => fake()->realText(),
            'integration_id' => fake()->numberBetween(1, 50),
        ];
    }
}
