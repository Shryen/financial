<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Expenses;
use App\Models\Items;
use App\Models\Payment;
use App\Models\ShoppingList;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        ShoppingList::factory(2)->create();
        Items::factory(100)->create();
        User::factory(2)->create();
        Payment::factory(2)->create();
        Expenses::factory(2)->create();
        Subscription::factory(2)->create();

        Expenses::factory()->create([
            'user_id' => 5
        ]);

        User::factory()->create([
            'id' => 5,
            'name' => 'Test',
            'email' => 'test@test.com',
            'password' => 'ssdqv6464'
        ]);
    }
}
