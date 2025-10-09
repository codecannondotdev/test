<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
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
            'amount' => fake()->randomFloat(2, 8),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']),
            'date_incurred' => fake()->date(),
            'payment_date' => fake()->date(),
            'status' => fake()->randomElement(['DRAFT', 'SUBMITTED', 'APPROVED', 'REIMBURSED', 'DECLINED']),
            'payment_method' => fake()->randomElement(['CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'OTHER']),
            'notes' => fake()->text(),
            'is_recurring' => fake()->boolean(),
            'receipt_attached' => fake()->boolean(),
            'category_id' => fake()->numberBetween(1, 50),
            'vendor_id' => fake()->numberBetween(1, 50),
            'project_id' => fake()->numberBetween(1, 50),
            'budget_id' => fake()->numberBetween(1, 50),
            'currency_id' => fake()->numberBetween(1, 50),
        ];
    }
}
