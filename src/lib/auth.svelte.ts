import { app } from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export interface AuthState {
	loading: boolean;
	user: {
		uid: string;
	} | null;
}

export const auth = getAuth(app);

export function listenToAuthState(onStateChange: (state: AuthState) => void) {
	return auth.onAuthStateChanged(
		(user) => {
			onStateChange({
				loading: false,
				user: user ? { uid: user.uid } : null
			});
		},
		(error) => {
			console.error(error);
			onStateChange({
				loading: false,
				user: null
			});
		}
	);
}

const googleProvider = new GoogleAuthProvider();
export function loginWithGoogle() {
	signInWithPopup(auth, googleProvider).catch((e) => {
		console.error(e);
	});
}
export function logout() {
	signOut(auth).catch((e) => {
		console.error(e);
	});
}

export function createAuthState() {
	const initial = {
		loading: true,
		user: null
	};
	const userState = $state<AuthState>(initial);

	return {
		...initial,
		get user() {
			return userState.user;
		},
		set user(value) {
			userState.user = value;
		},
		get loading() {
			return userState.loading;
		},
		set loading(value) {
			userState.loading = value;
		}
	};
}
