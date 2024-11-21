<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;

class Role
{
    public function handle($request, $next, $role)
    {
        if (Auth::check() && Auth::user()->role->name === $role) {
            return $next($request);
        }

        return redirect('home')->with('error', 'Permission Denied! You do not have access.');
    }
}
