<script context="module">
	export async function load({ url }) {
		return {
			props: { url }
		};
	}
</script>

<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import Transition from '$lib/components/Transition.svelte';

	export let url: string;
</script>

<main>
	<div class="scroll">
		<Transition {url}>
			<slot />
		</Transition>
	</div>
</main>

<style lang="scss">
	:global {
		@import 'verdu/_reset.scss';
		@import 'verdu/verdu.scss';
	}

	main {
		background: $white;

		@media (prefers-color-scheme: dark) {
			background: $black;
		}
	}
</style>
