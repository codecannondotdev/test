<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HomeCareVisit>
 */
class HomeCareVisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visit_date' => fake()->date(),
            'services_provided' => fake()->text(),
            'distance_travelled' => fake()->randomFloat(2, 8),
            'patient_id' => fake()->numberBetween(1, 50),
            'geo_location_id' => fake()->numberBetween(1, 50),
        ];
    }
}
