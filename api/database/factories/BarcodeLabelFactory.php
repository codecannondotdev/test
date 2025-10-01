<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BarcodeLabel>
 */
class BarcodeLabelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->ean13(),
            'type' => fake()->randomElement(['SPECIMEN', 'MEDICATION', 'DEVICE']),
            'printed_at' => fake()->dateTimeThisYear(),
            'medication_id' => fake()->numberBetween(1, 50),
            'device_id' => fake()->numberBetween(1, 50),
            'specimen_id' => fake()->numberBetween(1, 50),
        ];
    }
}
