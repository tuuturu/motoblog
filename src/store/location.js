import LocationService from '@/service/location_service'

const local_state = {
	reversedCoords: {}
}

const local_getters = {
	reversedCoords: state => coords => {
		const sane_coords = coords + ''

		if (!(sane_coords in state.reversedCoords)) return null

		return state.reversedCoords[sane_coords]
	}
}

const local_mutations = {
	reversedCoords(state, { coords, location }) {
		const sane_coords = coords + ''

		state.reversedCoords[sane_coords] = location
	}
}

const local_actions = {
	async getLocation({ commit, getters }, { coords }) {
		const match = getters['reversedCoords'](coords)
		if (match) return match

		const location = await LocationService.getLocationFromCoords(coords)

		commit('reversedCoords', { coords, location })

		return location
	}
}

export default {
	namespaced: true,
	actions: local_actions,
	getters: local_getters,
	mutations: local_mutations,
	state: local_state
}
