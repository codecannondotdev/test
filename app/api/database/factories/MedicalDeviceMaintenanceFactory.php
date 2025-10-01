<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalDeviceMaintenance>
 */
class MedicalDeviceMaintenanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'maintenance_date' => fake()->date(),
            'performed_by' => fake()->name(),
            'notes' => fake()->realText(),
            'supplier_id' => fake()->numberBetween(1, 50),
            'device_id' => fake()->numberBetween(1, 50),
        ];
    }
}
