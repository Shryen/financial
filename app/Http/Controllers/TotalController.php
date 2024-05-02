<?php

namespace App\Http\Controllers;

use App\Models\Insurances;
use App\Models\Invoices;
use App\Models\Payment;
use App\Models\ShoppingList;
use App\Models\Subscription;
use App\Models\Transaction;
use Illuminate\Http\Request;

header("Access-Control-Allow-Origin: *");

class TotalController extends Controller
{
    public function calculateTotal()
    {
        $payment = Payment::get()->sum('price');
        $invoice = Invoices::get()->sum('price');
        $transaction = Transaction::get()->sum('price');
        $shoppingList = ShoppingList::get()->sum('price');
        $insurance = Insurances::get()->sum('price');
        $subscription = Subscription::get()->sum('price');

        $total = array_sum([$payment, $invoice, $transaction, $shoppingList, $insurance, $subscription]);

        return [
            'payment' => $payment,
            'invoice' => $invoice,
            'transaction' => $transaction,
            'shoppingList' => $shoppingList,
            'insurance' => $insurance,
            'subscription' => $subscription,
            'total' => $total
        ];
    }

}
