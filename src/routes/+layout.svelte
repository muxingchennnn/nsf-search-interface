<script>
	import '../app.pcss';
	import '../font.css';
	import { inject } from '@vercel/analytics';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import { isLoading } from '$lib/store';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';

	// vercel analytics
	inject();

	// $: console.log(!!$navigating);
	let loading = true;

	onMount(() => {
		// Mocking an async operation like data fetching
		loading = false;
	});
</script>

{#if loading === true}
	<div class="loader" transition:fade>
		<p>Loading...</p>
		<SyncLoader size="2" color="#2E90FA" unit="rem" duration="1s" />
	</div>
{/if}
<slot />

<style>
	.loader {
		width: 100vw;
		height: calc(100vh - 5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		inset: 0;
		background: rgb(255 255 255);

		font-family: Inter;
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		z-index: 99;
	}
</style>
