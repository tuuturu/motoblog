import Axios from 'axios'
import { models } from '@tuuturu/motoblog-common'

const axios = Axios.create({
	baseURL: process.env.VUE_APP_POST_SERVICE_URL
})

const local_state = {
	posts: []
}

const local_getters = {
	posts: (state) => {
		return state.posts
	},
	hasPosts: (state) => {
		return state.posts.length > 0
	}
}

const local_mutations = {
	posts(state, posts) {
		state.posts = posts
	}
}

const local_actions = {
	async refreshPosts({ commit, getters }) {
		if (getters['hasPosts']) return

		const { data } = await axios.get('/posts')

		commit('posts', data.map(post => new models.Post(post)))
	},
	async getPosts({ dispatch, getters }) {
		await dispatch('refreshPosts')

		return getters['posts']
	},
	async getPost({ dispatch, getters }, { id }) {
		await dispatch('refreshPosts')

		const results = getters['posts'].filter(p => p.id === id)

		if (results.length === 1) return results[0]

		return null
	}
}

export default {
	namespaced: true,
	state: local_state,
	getters: local_getters,
	actions: local_actions,
	mutations: local_mutations
}
