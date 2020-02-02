import Vue from 'vue'
import Vuex from 'vuex'

import location from '@/store/location'
import posts from '@/store/posts'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		posts,
		location
	}
})
