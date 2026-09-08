<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post(
    '/login',
    [AuthController::class, 'login']
);

Route::middleware('auth:sanctum')
    ->get('/me', function (Request $request) {
        return response()->json([
            'user' => $request->user(),

            // デバッグ用
            'session_id' =>
                $request->session()->getId(),
        ]);
    });

Route::middleware('auth:sanctum')
    ->post(
        '/logout',
        [AuthController::class, 'logout']
    );