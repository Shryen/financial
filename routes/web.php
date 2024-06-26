<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\InsurancesController;
use App\Http\Controllers\InvoicesController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ShoppingListController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TotalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
    return Inertia::render('Index');
});

Route::resource('insurances', InsurancesController::class);
Route::resource('invoices', InvoicesController::class);
Route::resource('payment', PaymentController::class);
Route::resource('transaction', TransactionController::class);
Route::resource('subscription', SubscriptionController::class);
Route::get('/expenses', [ExpensesController::class, 'index'])->name('expenses')->middleware('auth');
Route::get('/getExpenses', [ExpensesController::class, 'getExpenses']);

Route::get('shops/{id}', [ShoppingListController::class, 'show'])->name('shoppinglist.show');
Route::resource('shoppinglist', ShoppingListController::class);

Route::get('/calculate-total', [TotalController::class, 'calculateTotal']);
Route::get('/auth-user', [AuthenticatedSessionController::class, 'checkAuth']);
Route::get('/get-user', [AuthenticatedSessionController::class, 'getUser']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->post('/logout', function () {
    auth()->logout();
    return redirect('/');
});

require __DIR__ . '/auth.php';
