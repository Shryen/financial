<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expenses>
 */
class ExpensesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'insurance_id' => fake()->numberBetween(1, 10),
            'invoice_id' => fake()->numberBetween(1, 10),
            'payment_id' => fake()->numberBetween(1, 10),
            'subscription_id' => fake()->numberBetween(1, 10),
            'transaction_id' => fake()->numberBetween(1, 10),
            'shopping_list_id' => fake()->numberBetween(1, 10),
            'user_id' => fake()->numberBetween(1, 10),
        ];
    }
}
