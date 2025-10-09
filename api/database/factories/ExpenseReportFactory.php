<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseReport>
 */
class ExpenseReportFactory extends Factory
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
            'total_amount' => fake()->randomFloat(2, 8),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']),
            'submitted_at' => fake()->dateTime(),
            'status' => fake()->randomElement(['DRAFT', 'SUBMITTED', 'APPROVED', 'REIMBURSED', 'DECLINED']),
            'notes' => fake()->text(),
        ];
    }
}
