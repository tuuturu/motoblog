<template>
	<div v-on.capture="$listeners" class="PostBlock" :class="{ button }">
		<slot />
		<span>{{ text }}</span>
	</div>
</template>

<script>
export default {
	name: 'PostBlock',
	props: {
		text: String,
		button: Boolean
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';

.PostBlock {
	height: 171px;

	line-height: 2em;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	cursor: default;

	font-weight: bold;
	color: $primary-color-dark;

	&.button {
		background-color: $primary-color;

		cursor: pointer;
	}
	&.button:hover {
		* {
			color: $highlight-dark;
		}
	}
}

svg {
	width: 80px;
	height: 80px;
}
</style>
