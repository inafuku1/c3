const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:8000';

type LoginRequest = {
    email: string;
    password: string;
};

/**
 * SanctumのCSRF Cookieを取得する。
 */
export async function csrfCookie(): Promise<Response> {
    return fetch(
        `${API_URL}/sanctum/csrf-cookie`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
            cache: 'no-store',
        }
    );
}

function getCookie(
    name: string
): string | null {
    const value = document.cookie
        .split('; ')
        .find(row =>
            row.startsWith(`${name}=`)
        );

    return value
        ? decodeURIComponent(
              value.split('=')[1]
          )
        : null;
}

/**
 * Laravelへログインする。
 */
export async function login(
    email: string,
    password: string
): Promise<Response> {

    await csrfCookie();

    const xsrfToken =
        getCookie('XSRF-TOKEN');

    return fetch(
        `${API_URL}/api/login`,
        {
            method: 'POST',
            credentials: 'include',

            headers: {
                Accept: 'application/json',
                'Content-Type':
                    'application/json',

                'X-XSRF-TOKEN':
                    xsrfToken ?? '',

                'X-Requested-With':
                    'XMLHttpRequest',
            },

            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
}


/**
 * 現在ログインしているユーザーを取得する。
 *
 * F5後はReactのstateが初期化されるため、
 * このAPIを呼び出して認証状態を復元する。
 */
export async function me(): Promise<Response> {
    return fetch(`${API_URL}/api/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        cache: 'no-store',
    });
}

/**
 * Laravelからログアウトする。
 */
export async function logout(): Promise<Response> {

    const xsrfToken =
        getCookie('XSRF-TOKEN');

    return fetch(
        `${API_URL}/api/logout`,
        {
            method: 'POST',

            credentials: 'include',

            headers: {
                Accept: 'application/json',

                'X-Requested-With':
                    'XMLHttpRequest',

                'X-XSRF-TOKEN':
                    xsrfToken ?? '',
            },

            cache: 'no-store',
        }
    );
}