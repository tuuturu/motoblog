<template>
	<div class="BlogContent">
		<div class="header">
			<div class="date">
				<h1>{{ date }}.</h1>
				<h2>{{ month }}</h2>
			</div>
			<div class="header-divider"></div>
			<div class="title">
				<h1>{{ title }}</h1>
			</div>
		</div>

		<div class="tldr">
			<div class="sidebar">
				TLDR;
			</div>
			<span>Lorem something rather obnoxious but well put and slightly funny. One must be able to write a little bit, but not too much. 160 should suffice. Thats approximat</span>
			<div class="tldr-divider"></div>
		</div>

		<main>
			<p>{{ content }}</p>
		</main>
	</div>
</template>

<script>
import PostManager from '@/service/post_service'

const MONTH = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]

export default {
	name: 'BlogContent',
	data: () => ({
		post: null
	}),
	computed: {
		date() { return this.post ? this.post.date.getDate() : '' },
		month() { return this.post ? MONTH[this.post.date.getMonth()] : '' },
		title() { return this.post ? this.post.title : '' },
		content() { return this.post ? this.post.content : '' }
	},
	async created() {
		this.post = await PostManager.getPost(this.$route.params.id)
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';

.BlogContent {
	height: 100%;

	border-right: 3px solid $primary-color;

	display: flex;
	flex-direction: column;

	color: black;
}

.header {
	border: 3px solid $primary-color;
	border-right: 0;

	display: flex;

	max-height: 10%;
	position: relative;

	color: $primary-color-dark;

	.date {
		height: 100%;
		flex-basis: 20%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			margin: 0;
		}
		h2 {
			margin: 0;
			font-size: 16px;
		}
	}
	.title {
		height: 100%;
		flex-basis: 80%;
	}
	.header-divider {
		height: 20%;
		width: 6px;

		position: absolute;
		left: 20%;
		bottom: 0;

		background-color: $primary-color;
	}
}
.tldr {
	max-height: 15%;
	padding-left: 1em;

	display: flex;
	align-items: center;

	position: relative;

	font-family: serif;

	span {
		margin: 1em;
	}

	.sidebar {
		flex-basis: 15%;
		align-self: center;

		color: $primary-color-dark;

		font-size: 16pt;
	}

	.tldr-divider {
		background-color: $primary-color;
		height: 6px;
		width: 3%;

		position: absolute;
		right: 0;
		bottom: 0;
	}
}

main {
	text-align: left;

	margin: 2em;
}
</style>
