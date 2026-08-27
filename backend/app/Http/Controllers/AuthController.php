<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {
    }

    public function login(
        LoginRequest $request
    ) {
        if (
            !$this->authService->login(
                $request->validated()
            )
        ) {

            return response()->json([
                'message' => '認証失敗'
            ], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'user' => auth()->user(),
            'session_id' => session()->getId(),
        ]);
    }
    


    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'logout'
        ]);
    }
}
