<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Invoices/Index', ['invoices' => Invoices::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            $existing = Invoices::where('name', $value['name'])->first();
            if (!$existing) {
                $attr = Validator::make($value, [
                    'name' => 'required|max:255',
                    'price' => 'required'
                ])->validate();
                Invoices::create($attr);
            }
        }
        return redirect()->route('invoices.index')->with('success', 'Invoice(s) created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoices, $id)
    {
        $invoice = Invoices::findorFail($id);
        return Inertia::render('Invoices/Show', ['invoices' => $invoice]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoices $invoices, $id)
    {
        $invoice = Invoices::findorFail($id);
        return Inertia::render('Invoices/Edit', ['invoices' => $invoice]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoices, $id)
    {
        $data = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required'
        ]);
        $invoice = Invoices::findorFail($id);
        $invoice->update($data);

        return redirect('/invoices')->with('success', 'Invoice updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoices)
    {
        //
    }
}
