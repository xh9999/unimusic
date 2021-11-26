import {
	createStore
} from "vuex"
const store = createStore({
	state: {
		// 对应的音乐id
		id: '',
		likeSongs: [],
		songsList: '',
		flag: ''
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
		addSong(state, obj) {
			state.likeSongs.push(obj)
		},
		modifySongList(state, asg) {
			state.songsList = asg;
		},
		modifyState(state,asg){
			state.flag = asg
		}
	},
	actions: {

	}
});
export default store
