<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemsController extends Controller
{
    public function show(Request $request)
    {
        $shoppingList = ShoppingList::find($request->id);
        return Inertia::render('Items', [
            'shoppingList' => $shoppingList
        ]);
    }
}
