<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() > 0) {
            return;
        }
        $this->call([UserSeeder::class, MemberSeeder::class, TrainerSeeder::class, ClassModelSeeder::class, SessionSeeder::class, EquipmentSeeder::class, BookingSeeder::class, PaymentSeeder::class, ScheduleSeeder::class, FacilitySeeder::class, SubscriptionSeeder::class]);
    }
}
