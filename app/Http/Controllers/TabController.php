<?php

namespace App\Http\Controllers;

use App\Models\Tab;
use App\Models\User;
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
            'description' => 'nullable|string|max:200',
            'users' => 'required|array',
            'users.*.email' => 'required|email|exists:App\Models\User,email',
        ]);

        // get relevant IDs
        $creatorUserID = $request->user()->id;
        $userEmails = array_map(fn ($user) => $user['email'], $validated['users']);
        $userIDs = User::whereIn('email', $userEmails)->pluck('id')->toArray();

        // create the tab
        $newTab = new Tab();
        $newTab->creator_id = $creatorUserID;
        $newTab->name = $validated['name'];
        $newTab->description = $validated['description'];

        // save and attach users
        $newTab->save();
        $newTab->users()->attach([$creatorUserID, ...$userIDs]);

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
