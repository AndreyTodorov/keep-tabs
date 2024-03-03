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
			'transactions' => function ($query) {
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
		])
		->get();

	return Inertia::render('Landing', [
		'tabs' => $tabsWithTransactions,
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
