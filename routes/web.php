<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TabController;
use App\Http\Controllers\TransactionController;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	// TODO: select only what's needed
	$tabsWithTransactions = request()->user()->tabs()
		->with([
			'transactions' => function ($query) { // only for the current month
				$query
					->with('user:id,name')
					->where('transactions.created_at', '>=', Carbon::now()->startOfMonth())
					->orderBy('date', 'desc')
					->orderByDesc('created_at', 'desc');
			},
			'users:id,name',
			'transaction_summaries' => function ($query) {
				$newest_summaries = DB::table('transaction_summaries')
					->select(DB::raw('MAX(id) as id'))
					->groupBy('tab_id', 'user_id');

				$query
					->with('user:id,name')
					->joinSub($newest_summaries, 'newest_summaries', function ($join) {
						$join->on('transaction_summaries.id', '=', 'newest_summaries.id');
					});
			}
		])->get()->toArray();

	foreach ($tabsWithTransactions as $tabIndex => $tab) {
		$currentBalances = [];
		foreach ($tab['users'] as $userIndex => $user) {
			// find current month's transactions sum
			$currentUserTransactions = array_filter($tab['transactions'], fn ($transaction) => $transaction['user_id'] === $user['id']);
			$totalTransactionAmount = array_sum(array_column($currentUserTransactions, 'amount'));

			// find summary balance
			$summaryIndex = array_search($user['id'], array_column($tab['transaction_summaries'], 'user_id'));
			$userSummaryBalance = $summaryIndex !== false ? $tab['transaction_summaries'][$summaryIndex]['balance'] : 0;

			$currentBalances[] = [
				'user' => $user,
				'summaryBalance' => $userSummaryBalance,
				'transactionsSum' => $totalTransactionAmount,
				'total' => $userSummaryBalance + $totalTransactionAmount,
			];

			//TODO: calculate the diff and who owes what
			$tabsWithTransactions[$tabIndex]['currentBalances'] = $currentBalances;
		};
	}

	$tabs = array_map(function ($tab) {
		return [
			'id' => $tab['id'],
			'name' => $tab['name'],
			'description' => $tab['description'],
			'creator_id' => $tab['creator_id'],
			'transactions' => $tab['transactions'],
			'currentBalances' => $tab['currentBalances'],
			'users' => $tab['users'],
		];
	}, $tabsWithTransactions);

	return Inertia::render('Landing', [
		'tabs' => $tabs,
	]);
})->middleware(['auth', 'verified'])->name('home');

Route::get('/dashboard', function () {
	return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
	Route::post('/tab', [TabController::class, 'store'])->name('tab.store');
});

Route::middleware('auth')->group(function () {
	Route::post('/transaction/{tab}', [TransactionController::class, 'store'])->name('transaction.store');
});

require __DIR__ . '/auth.php';
