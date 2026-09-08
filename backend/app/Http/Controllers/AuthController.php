<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
* 認証処理を提供するコントローラ
*
* Sanctum の Stateful Authentication
* (Cookie + Session認証) を利用し、
* ログインおよびログアウト処理を行う。
*
* @see AuthService
*/
class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {
    }

    /**
    * ログイン
    *
    * Cookie(Session)認証を使用する。
    * 認証成功後はセッション固定化攻撃対策として
    * Session ID を再生成する。
    */
    public function login(
        LoginRequest $request
    ) {
        // 認証
        if (
            !$this->authService->login(
                $request->validated()
            )
        ) {

            return response()->json([
                'message' => '認証失敗'
            ], 401);
        }

        // Session Fixation対策
        $request->session()->regenerate();

        return response()->json([
            'user' => Auth::user(),
            'session_id' => session()->getId(),
        ]);
    }

    /**
    * ログアウト
    *
    * 認証情報を破棄し、
    * 現在のセッションを無効化する。
    * その後 CSRF トークンを再生成する。
    */
    public function logout(Request $request)
    {
        // 認証解除
        Auth::guard('web')->logout();

        // セッション無効化
        $request->session()->invalidate();

        // CSRFトークン再生成
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'logout'
        ]);
    }
}
