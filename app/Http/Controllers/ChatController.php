<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $user = Auth::user()->name;
        broadcast(new MessageSent($user, $request->message))->toOthers();

        return response()->json(['user' => $user, 'message' => $request->message]);
    }
}
