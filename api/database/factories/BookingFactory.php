<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_date' => fake()->date(),
            'status' => fake()->randomElement(['CONFIRMED', 'CANCELLED', 'PENDING']),
            'member_id' => fake()->numberBetween(1, 50),
            'session_id' => fake()->numberBetween(1, 50),
        ];
    }
}
