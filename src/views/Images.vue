<template>
	<div class="Images">
		<ul>
			<li v-for="image in images" :key="image.url">
				<img :src="image.url" alt="" />
				<div class="text-container">
					<div class="sidebar">
						<div class="picture-associator"></div>
					</div>
					<p>{{ image.description }}</p>
					<div class="sidebar"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import PostManager from '@/service/post_service'

export default {
	name: 'Images',
	data: () => ({
		images: []
	}),
	async created() {
		const post = await PostManager.getPost(this.$route.params.id)

		this.images = post.images
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';

ul {
	margin: 0;
	padding: 0;
}
li {
	list-style: none;
}

.text-container {
	display: flex;

	.sidebar {
		flex-basis: 20%;
	}
}

.picture-associator {
	border-bottom: 3px solid $primary-color;
	border-left: 3px solid $primary-color;
	height: 50%;

	margin-left: 50%;
}

img {
	max-width: 100%;
}
</style>
