<?php

namespace App\Http\Controllers;

use App\Models\Insurances;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class InsurancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Insurances/Index', ['insurances' => Insurances::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Insurances/Create', ['insurances' => Insurances::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate each item in the array
        foreach ($request->all() as $data) {
            $existing = Insurances::where('name', $data['name'])->first();
            if (!$existing) {
                $attr = Validator::make($data, [
                    'name' => 'required|max:255',
                    'price' => 'required'
                ])->validate();

                // Create a new Insurance instance for each item
                Insurances::create($attr);
            }
        }

        // Redirect or respond as needed
        return redirect()->route('insurances.index')->with('success', 'Insurance(s) created successfully!');
    }
    /**
     * Display the specified resource.
     */
    public function show(Insurances $insurances)
    {
        //
    }
    // 
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Insurances $insurances)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|max:255',
        ]);

        $insurance = Insurances::findOrFail($id);
        $insurance->update($data);

        return redirect()->route('insurances.index')->with('success', 'Insurance updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Insurances $insurances)
    {
        //
    }
}
