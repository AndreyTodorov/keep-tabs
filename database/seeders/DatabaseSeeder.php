<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Tab;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		// Users
		$andrey = User::factory()
			->create([
				'name' => 'Andrey',
				'email' => 'andrei.m.todorov@gmail.com',
				'password' => 'test',
			]);
		$sonya = User::factory()
			->create([
				'name' => 'Sonya',
				'email' => 'sonya@abv.bg',
				'password' => 'Sonya',
			]);

		$randomUser = User::factory()->count(1)
			->create([
				'password' => 'test',
			]);

		// Tabs
		$sonyaTab1 = Tab::factory()
			->hasAttached($sonya, [], 'users')
			->hasAttached($andrey, [], 'users')
			->create([
				'creator_id' => $sonya->id,
			]);

		$sonyaTab2 = Tab::factory()
			->hasAttached($sonya, [], 'users')
			->hasAttached($andrey, [], 'users')
			->create([
				'creator_id' => $sonya->id,
			]);

		$andreyTab1 = Tab::factory()
			->hasAttached($randomUser, [], 'users')
			->hasAttached($andrey, [], 'users')
			->create([
				'creator_id' => $andrey->id,
			]);

		// Transactions
		Transaction::factory()
			->for($sonyaTab1, 'tab')
			->for($sonya, 'user')
			->count(10)
			->create();
		Transaction::factory()
			->for($sonyaTab1, 'tab')
			->for($andrey, 'user')
			->count(10)
			->create();

		Transaction::factory()
			->for($sonyaTab2, 'tab')
			->for($sonya, 'user')
			->count(10)
			->create();
		Transaction::factory()
			->for($sonyaTab2, 'tab')
			->for($andrey, 'user')
			->count(10)
			->create();

		Transaction::factory()
			->for($andreyTab1, 'tab')
			->for($sonya, 'user')
			->count(10)
			->create();
		Transaction::factory()
			->for($andreyTab1, 'tab')
			->for($andrey, 'user')
			->count(10)
			->create();
	}
}
