<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filename' => fake()->slug(),
            'content_type' => fake()->word(),
            'uploaded_at' => fake()->dateTime(),
            'description' => fake()->text(),
            'medical_record_id' => fake()->numberBetween(1, 50),
            'imaging_study_id' => fake()->numberBetween(1, 50),
            'legal_hold_id' => fake()->numberBetween(1, 50),
        ];
    }
}
