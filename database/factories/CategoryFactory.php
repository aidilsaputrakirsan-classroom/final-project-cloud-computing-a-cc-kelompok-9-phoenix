<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        $icons = ['💼', '🏠', '🛒', '❤️', '📚', '🎮', '🎨', '✈️'];

        return [
            'name' => fake()->word(),
            'color' => fake()->randomElement($colors),
            'icon' => fake()->randomElement($icons),
            'user_id' => User::factory(),
        ];
    }
}
