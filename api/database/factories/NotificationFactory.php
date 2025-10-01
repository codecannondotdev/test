<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'body' => fake()->realText(),
            'sent_at' => fake()->dateTime(),
            'read' => fake()->boolean(),
            'related_patient_id' => fake()->numberBetween(1, 50),
            'allergy_id' => fake()->numberBetween(1, 50),
            'contact_id' => fake()->numberBetween(1, 50),
            'credential_id' => fake()->numberBetween(1, 50),
        ];
    }
}
