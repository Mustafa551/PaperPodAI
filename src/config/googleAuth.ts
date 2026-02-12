import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const GOOGLE_ANDROID_CLIENT_ID =
    '496899752467-hmjs8nunhcriao8u2ipfousjgonuau40.apps.googleusercontent.com';

export const GOOGLE_IOS_CLIENT_ID =
    '496899752467-n6rr1bpt12p85clfcnog0d1g6ro1btbe.apps.googleusercontent.com';

// TODO: Replace this with your WEB Client ID from Google Cloud Console
export const GOOGLE_WEB_CLIENT_ID =
    '496899752467-hmjs8nunhcriao8u2ipfousjgonuau40.apps.googleusercontent.com'; // Using Android ID as fallback if prompt didn't provide web id, but user should replace it.

let _configured = false;

export function configureGoogleSignIn(): void {
    if (_configured) return;
    _configured = true;

    GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID, // ✅ required for idToken in many setups
        iosClientId: GOOGLE_IOS_CLIENT_ID, // ok to include
        offlineAccess: false,
        forceCodeForRefreshToken: false,
    });
}

export type GoogleAuthResult =
    | {
        ok: true;
        idToken: string;
        accessToken?: string | null;
        email: string;
        googleId: string;
        name?: string | null;
        photo?: string | null;
    }
    | { ok: false; code: string; message: string };

export async function googleSignInGetIdToken(): Promise<GoogleAuthResult> {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Ensure fresh session
        // (optional) await GoogleSignin.signOut();

        // Sign in and get user info
        const userInfo = await GoogleSignin.signIn();

        // getTokens() gives you idToken + accessToken
        const tokens = await GoogleSignin.getTokens();

        if (!tokens?.idToken) {
            return {
                ok: false,
                code: 'NO_ID_TOKEN',
                message:
                    'Google did not return an idToken. Usually caused by missing/incorrect WEB client id.',
            };
        }

        // Extract user information
        const email = userInfo.data?.user?.email;
        const googleId = userInfo.data?.user?.id;
        const name = userInfo.data?.user?.name;
        const photo = userInfo.data?.user?.photo;

        if (!email || !googleId) {
            return {
                ok: false,
                code: 'MISSING_USER_DATA',
                message: 'Google did not return user email or ID.',
            };
        }

        return {
            ok: true,
            idToken: tokens.idToken,
            accessToken: tokens.accessToken,
            email,
            googleId,
            name,
            photo,
        };
    } catch (e: any) {
        // Normalize common errors
        if (e?.code === statusCodes.SIGN_IN_CANCELLED) {
            return { ok: false, code: 'CANCELLED', message: 'User cancelled sign-in.' };
        }
        if (e?.code === statusCodes.IN_PROGRESS) {
            return { ok: false, code: 'IN_PROGRESS', message: 'Sign-in already in progress.' };
        }
        if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            return {
                ok: false,
                code: 'PLAY_SERVICES',
                message: 'Google Play Services not available / outdated.',
            };
        }

        return {
            ok: false,
            code: 'UNKNOWN',
            message: e?.message ?? 'Google sign-in failed',
        };
    }
}
