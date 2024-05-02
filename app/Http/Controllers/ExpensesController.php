<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpensesController extends Controller
{
    public function index()
    {
        return Inertia::render('Expenses/Index');
    }

    public function getExpenses()
    {
        $user = Auth::user();
        $expenses = $user->expenses()->with('payment', 'shoppingList', 'transaction', 'insurance', 'subscription', 'user')->get();
        return json_encode(['expenses' => $expenses]);
    }
}
