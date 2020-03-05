<template>
	<div class="TripMap">
		<div id="mapContainer"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import L from 'leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

const CURRENT_LOCATION_ICON = L.icon({
	iconUrl: MarkerIcon,
	shadowUrl: MarkerShadow,
	iconSize: [25, 41],
	iconAnchor: [12.5, 41]
})

function sortByDate(post_a, post_b) {
	return post_a.date > post_b.date
}

export default {
	name: 'TripMap',
	data: () => ({
		map: null
	}),
	computed: {
		...mapState('posts', ['posts'])
	},
	watch: {
		posts() {
			this.addLines()
			this.addMarkers()
		}
	},
	methods: {
		addMarker(map, post, icon) {
			const coords = post.coords
			const days = post.getDayRelativeTo(this.posts[0].date)
			const marker = L.marker(coords, { icon })

			marker.bindTooltip(`Day ${days}: ${post.title} (${post.distance}km)`)

			marker.on('click', () => this.$emit('postClick', post.id))

			marker.addTo(map)
		},
		addLines() {
			const coords = [...this.posts].sort(sortByDate).map(p => p.coords)
			const polyline = L.polyline(coords, {
				color: 'black',
				dashArray: '5,3,2'
			}).addTo(this.map)

			this.map.fitBounds(polyline.getBounds())
		},
		addMarkers() {
			this.posts.map(post => {
				this.addMarker(this.map, post, CURRENT_LOCATION_ICON)
			})
		}
	},
	mounted() {
		this.map = L.map('mapContainer', { zoomControl: false })

		L.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(this.map)
	}
}
</script>

<style lang="scss" scoped>
@import '~leaflet/dist/leaflet.css';

#mapContainer {
	width: calc(100%);
	height: calc(100%);
}
</style>
