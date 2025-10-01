<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabTest>
 */
class LabTestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'test_name' => fake()->word(),
            'specimen_type' => fake()->sentence(),
            'order_date' => fake()->date(),
            'status' => fake()->randomElement(['Ordered', 'Collected', 'Processing', 'Completed']),
            'patient_id' => fake()->numberBetween(1, 50),
            'ordering_doctor_id' => fake()->numberBetween(1, 50),
            'lab_order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
