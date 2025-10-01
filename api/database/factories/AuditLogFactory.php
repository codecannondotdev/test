<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_type' => fake()->word(),
            'performed_at' => fake()->dateTime(),
            'details' => fake()->realText(),
            'affected_record_id' => fake()->numberBetween(1, 50),
        ];
    }
}
