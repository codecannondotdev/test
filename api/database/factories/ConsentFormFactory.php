<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ConsentForm>
 */
class ConsentFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'form_type' => fake()->word(),
            'signed_date' => fake()->dateTimeThisDecade(),
            'notes' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
            'procedure_id' => fake()->numberBetween(1, 50),
        ];
    }
}
