<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'appointment_date_time' => fake()->dateTime(),
            'duration_minutes' => fake()->randomNumber(9),
            'reason' => fake()->sentence(),
            'status' => fake()->randomElement(['SCHEDULED', 'CONFIRMED', 'CHECKED IN', 'IN PROGRESS', 'COMPLETED', 'CANCELLED', 'NO-SHOW']),
            'room' => fake()->word(),
            'notes' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
            'doctor_id' => fake()->numberBetween(1, 50),
            'nurse_id' => fake()->numberBetween(1, 50),
            'department_id' => fake()->numberBetween(1, 50),
        ];
    }
}
