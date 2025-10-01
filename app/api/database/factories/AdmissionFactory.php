<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admission>
 */
class AdmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admission_date' => fake()->dateTime(),
            'reason' => fake()->text(),
            'status' => fake()->randomElement(['Active', 'Discharged', 'Transferred']),
            'patient_id' => fake()->numberBetween(1, 50),
            'ward_id' => fake()->numberBetween(1, 50),
            'bed_id' => fake()->numberBetween(1, 50),
        ];
    }
}
