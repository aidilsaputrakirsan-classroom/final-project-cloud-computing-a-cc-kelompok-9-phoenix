<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'email_verified_at' => now(),
        ]);

        // Create categories
        $categories = [
            ['name' => 'Work', 'color' => '#3b82f6', 'icon' => '💼'],
            ['name' => 'Personal', 'color' => '#10b981', 'icon' => '🏠'],
            ['name' => 'Shopping', 'color' => '#f59e0b', 'icon' => '🛒'],
            ['name' => 'Health', 'color' => '#ef4444', 'icon' => '❤️'],
            ['name' => 'Learning', 'color' => '#8b5cf6', 'icon' => '📚'],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create([
                'name' => $categoryData['name'],
                'color' => $categoryData['color'],
                'icon' => $categoryData['icon'],
                'user_id' => $user->id,
            ]);

            // Create 2-3 tasks for each category
            Task::factory()->count(rand(2, 3))->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
            ]);
        }

        // Create some tasks without category
        Task::factory()->count(5)->create([
            'user_id' => $user->id,
            'category_id' => null,
        ]);
    }
}
