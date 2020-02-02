import PostManager from '@/service/post_service'

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

		const posts = await PostManager.getPosts()

		commit('posts', posts)
	},
	async getPosts({ dispatch, getters }) {
		await dispatch('refreshPosts')

		return getters['posts']
	},
	async getPost({ dispatch, getters }, { id }) {
		await dispatch('refreshPosts')

		const results = getters['posts'].filter(p => p.id === parseInt(id))

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
