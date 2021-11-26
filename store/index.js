import {
	createStore
} from "vuex"
const store = createStore({
	state: {
		// 对应的音乐id
		id: '',
		likeSongs: [],
	},
	getters: {
		watcher(state) {
			return state.id
		}
	},
	mutations: {
		change(state, msg) {
			state.id = msg;
		},
		addSong(state,obj){
			state.likeSongs.push(obj)
		}
	},
	actions: {
		
	}
});
export default store
