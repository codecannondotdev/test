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
        $this->call([UserSeeder::class, ExpenseSeeder::class, CategorySeeder::class, VendorSeeder::class, ProjectSeeder::class, BudgetSeeder::class, ReceiptSeeder::class, ExpenseReportSeeder::class, TagSeeder::class, CurrencySeeder::class]);
    }
}
