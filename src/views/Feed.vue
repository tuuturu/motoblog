<template>
	<div class="Feed">
		<TripMap @postClick="postClick" :posts="posts" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import TripMap from '@/components/TripMap'

export default {
	name: 'Feed',
	components: { TripMap },
	computed: {
		...mapState('posts', ['posts'])
	},
	async created() {
		await this.$store.dispatch('posts/getPosts')
	},
	methods: {
		postClick(id) {
			this.$router.push('/posts/' + id)
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';

.Feed {
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.TripMap {
	height: 100%;
}
</style>
