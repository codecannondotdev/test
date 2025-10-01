<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OperatingRoom>
 */
class OperatingRoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_number' => fake()->randomNumber(9),
            'status' => fake()->randomElement(['Available', 'In Use', 'Maintenance']),
            'equipment_list' => fake()->text(),
        ];
    }
}
