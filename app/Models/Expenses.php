<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
    public function invoice()
    {
        return $this->belongsTo(Invoices::class);
    }
    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class);
    }
    public function insurance()
    {
        return $this->belongsTo(Insurances::class);
    }
    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

}
