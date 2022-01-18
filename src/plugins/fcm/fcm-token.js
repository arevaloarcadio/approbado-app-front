export default {
	setToken(token) {
		window.localStorage.setItem('fcm_token_upgrap', token);
	},
	getToken() {
		return window.localStorage.getItem('fcm_token_upgrap');
	},
	removeToken() {
		window.localStorage.removeItem('fcm_token_upgrap');
	}
}