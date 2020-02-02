<template>
	<div id="mapContainer" class="CurrentLocationMap"></div>
</template>

<script>
import L from 'leaflet'
import PostManager from '@/service/post_service'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

const ICON = L.icon({
	iconUrl: MarkerIcon,
	shadowUrl: MarkerShadow,
	iconSize: [25, 41],
	iconAnchor: [12.5, 41]
})

export default {
	name: 'CurrentLocationMap',
	data: () => ({
		map: null,
		post: null
	}),
	watch: {
		post(p) {
			const marker = L.marker(p.coords, { icon: ICON })

			marker.addTo(this.map)

			this.map.setView(p.coords, 18)
		}
	},
	async created() {
		this.post = await PostManager.getPost(this.$route.params.id)
	},
	mounted() {
		this.map = L.map('mapContainer')

		L.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(this.map)
	}
}
</script>

<style lang="scss" scoped>
@import '~leaflet/dist/leaflet.css';

.CurrentLocationMap {
	height: 100%;
}
</style>
