//import user from "@/plugins/jwt/user";

/*
|--------------------------------------------------------------------------
| Mutation Types
|--------------------------------------------------------------------------
*/
export const SET_USER = 'SET_USER';
export const SET_UNIT = 'SET_UNIT';
export const UNSET_USER = 'UNSET_USER';

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const state = {
	user: {
		id: null,
		email: null,
		names: null,
		last_name: null,
		user_name: null,
		phone: null,
		picture: null,
		bio: null,
		rol: null,
		is_registered: null,
		created_at: null,
		updated_at: null,
		get_started : true,
		modal_warning : true,
	}
};

/*
|--------------------------------------------------------------------------
| Mutations
|--------------------------------------------------------------------------
*/
const mutations = {
	[SET_USER](state, payload) {
		state.user.id = payload.user.id;
		state.user.email = payload.user.email;
		state.user.names = payload.user.names;
		state.user.last_name = payload.user.last_name;
		state.user.user_name = payload.user.user_name;
		state.user.phone = payload.user.phone;
		state.user.bio = payload.user.bio;
		state.user.picture = payload.user.picture;
		state.user.rol = payload.user.rol;
		state.user.is_registered = payload.user.is_registered;
		state.user.created_at = payload.user.created_at;
		state.user.updated_at = payload.user.updated_at;
		state.user.modal_warning = payload.user.modal_warning;
		state.user.get_started = false
	},
	[UNSET_USER](state) {
		state.user.id = null;
		state.user.email = null;
		state.user.names = null;
		state.user.last_name = null;
		state.user.user_name = null;
		state.user.phone = null;
		state.user.picture = null;
		state.user.rol = null;
		state.user.is_registered = null;
		state.user.created_at = null;
		state.user.updated_at = null;
	}
};


/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/
const actions = {
	setAuthUser: (context, user) => {
		context.commit(SET_USER, {user})
	},
	setUnit: (context, unit) => {
		context.commit(SET_UNIT, {unit})
	},
	unsetAuthUser: (context) => {
		context.commit(UNSET_USER)
	}
};

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
*/
const getters = {
	isLoggedIn: (state) => {
		return !!(state.user.firstname && state.user.email);
	},
	getUser: (state) => {
		return (state.user);
	},
	getUnit: (state) => {
		return (state.user.unit);
	},
	getUnitId: (state) => {
		return (state.user.unit);
	},
	whoami: (state) => {
		return state.user.id;
	},

};

/*
|--------------------------------------------------------------------------
| Export the module
|--------------------------------------------------------------------------
*/
export default {
	state,
	mutations,
	actions,
	getters
}