<script>
	export let awardNumber;
	export let programs;
	export let investigator;
	export let title;
	export let abstract;
	export let date;
	export let amount;
	import { nanoid } from 'nanoid';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { filterStates } from '$lib/store';

	$: programList = programs;
	let expanded = false;
</script>

<div class="result">
	<!-- title -->
	<a
		class="mb-[3px] block font-sans text-base font-[600] leading-[150%] text-brand-600"
		href={`https://www.nsf.gov/awardsearch/showAward?AWD_ID=${awardNumber}&HistoricalAwards=false`}
		target="_blank"
		rel="noopener noreferrer">{@html title}</a
	>
	<!-- subline -->
	<div class="mb-[6px] inline-flex flex-wrap items-center gap-[4px] text-sm text-gray-500">
		<!-- date -->
		<span>{date}</span>
		<span>·</span>
		<!-- investigator -->
		<span>{investigator}</span>
		<span>·</span>
		<!-- program -->
		{#if !programList.includes('')}
			{#each programList as program (nanoid())}
				{#if $filterStates.program.includes(program)}
					<span class="program program-selected rounded bg-gray-100 px-2 py-0.5">{program}</span>
					<span>·</span>
				{:else}
					<span class="program rounded bg-gray-100 px-2 py-0.5">{program}</span>
					<span>·</span>
				{/if}
			{/each}
		{/if}
		<!-- amount -->
		<span>{amount}</span>
	</div>
	<!-- abstract  -->
	<div class="flex items-end gap-4">
		{#if !expanded}
			<span
				class="abstract-content line-clamp-3 font-serif text-base font-[400] leading-[150%] text-gray-900"
				>{@html abstract}</span
			>
			<span
				on:click={() => (expanded = !expanded)}
				class="stroke-foreground opacity-50 hover:opacity-100"><ChevronDown size={16} /></span
			>
		{:else}
			<span class="abstract-content font-serif text-base font-[400] leading-[150%] text-gray-900"
				>{@html abstract}</span
			>
			<span
				on:click={() => (expanded = !expanded)}
				class="stroke-foreground opacity-50 hover:opacity-100"><ChevronUp size={16} /></span
			>
		{/if}
	</div>
</div>

<style>
	.program-selected {
		background-color: rgba(250, 197, 21, 0.2);
		/* background-color: #fffaeb; */
	}
</style>
