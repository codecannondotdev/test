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
            'type' => fake()->randomElement(['Consultation', 'Follow-up', 'Procedure', 'Telemedicine']),
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTime(),
            'status' => fake()->randomElement(['Scheduled', 'Completed', 'Cancelled', 'No-show']),
            'reason' => fake()->text(),
            'location' => fake()->city(),
            'patient_id' => fake()->numberBetween(1, 50),
            'doctor_id' => fake()->numberBetween(1, 50),
            'nurse_id' => fake()->numberBetween(1, 50),
            'department_id' => fake()->numberBetween(1, 50),
            'discharge_id' => fake()->numberBetween(1, 50),
            'location_id' => fake()->numberBetween(1, 50),
            'queue_id' => fake()->numberBetween(1, 50),
            'type_id' => fake()->numberBetween(1, 50),
            'referral_source_id' => fake()->numberBetween(1, 50),
        ];
    }
}
