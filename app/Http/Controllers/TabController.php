<?php

namespace App\Http\Controllers;

use App\Models\Tab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'string|max:200',
            'user_id' => 'exists:App\Models\User,id'
        ]);
        $creatorUserID = $request->user()->id;

        $newTab = new Tab($validated);
        $newTab->creator_id = $creatorUserID;
        $newTab->save();

        $newTab->users()->attach([$creatorUserID, $validated['user_id']]);

        // TODO: redirect to single tab page
        return Redirect::route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tab $tab)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tab $tab)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tab $tab)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tab $tab)
    {
        //
    }
}
