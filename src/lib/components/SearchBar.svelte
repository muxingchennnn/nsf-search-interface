<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search, X } from 'lucide-svelte';

	import { awardData, searchTerm, searchResults } from '$lib/store';

	let isInputFocused = false;
	let textInput = '';

	function handleFocus() {
		isInputFocused = true;
	}

	function handleBlur() {
		isInputFocused = false;
	}

	function updateSearchTerm() {
		$searchTerm = textInput;
	}

	function pressEnter(event) {
		// Check if the 'return' key was pressed
		if (event.key === 'Enter' || event.keyCode === 13) {
			this.blur();
			console.log('Press!');
			updateSearchTerm();
		}
	}

	function clearSearch() {
		textInput = '';
		updateSearchTerm();
	}

	function clickSearch() {
		updateSearchTerm();
	}

	// $: console.log(keywords, exclusions, $searchResults);
</script>

<div
	class:focused-container={isInputFocused}
	class=" ml-8 flex w-full rounded-md outline outline-1 outline-gray-300"
>
	<Input
		type="text"
		placeholder="e.g. 'data visualization'"
		class="border-transparent focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:keydown={pressEnter}
		bind:value={textInput}
	/>
	<Button
		class="bg-inherit text-foreground opacity-[0.5] hover:bg-background hover:opacity-[1]"
		on:click={clearSearch}
	>
		<X size={20} />
	</Button>
	<Button class="rounded-none rounded-r-md" on:click={clickSearch}><Search size={20} /></Button>
</div>

<style>
	.focused-container {
		outline: 1px solid #030712; /* Or any style you prefer */
	}
</style>
