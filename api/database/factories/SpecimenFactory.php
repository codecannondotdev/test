<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specimen>
 */
class SpecimenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => fake()->word(),
            'collected_at' => fake()->dateTime(),
            'storage_location' => fake()->address(),
            'pathology_report_id' => fake()->numberBetween(1, 50),
            'lab_order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
