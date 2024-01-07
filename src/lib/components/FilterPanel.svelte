<script>
	import * as Command from '$lib/components/ui/command';
	import Filter from './Filter.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { nanoid } from 'nanoid';
	import { Badge } from 'flowbite-svelte';
	import {
		searchResults,
		filteredResults,
		filterStates,
		checkedStates,
		activeTabChanged,
		filterStatesChanged
	} from '$lib/store';
	import Fuse from 'fuse.js';
	import { calculateDistribution } from '$lib/utils/calculateDistribution';

	export let tab;
	export let handleFilterStates;

	let filterData = [];

	$: console.log($activeTabChanged, $filterStates, $filterStatesChanged);
	$: {
		if ($activeTabChanged === false && $filterStatesChanged === false) {
			filterData = calculateDistribution($searchResults, tab);
		} else if ($activeTabChanged === true && $filterStatesChanged === false) {
			filterData = calculateDistribution($filteredResults, tab);
		}
	}

	// $: if ($filterStates) {
	// 	console.log($filterStates);
	// 	$filterStatesChanged = true;
	// 	console.log($filterStatesChanged);
	// }

	$: {
		if ($filterStatesChanged === true) {
			// console.log(tab);
			const updatedData = calculateDistribution($filteredResults, tab);
			// console.log({ filterData }, { updatedData });

			filterData = filterData.map((obj1Item) => {
				const obj2Item = updatedData.find((obj2Item) => obj2Item[tab] === obj1Item[tab]);
				return {
					[tab]: obj1Item[tab],
					count: obj2Item ? obj2Item.count : 0
				};
			});
		}
	}
	//
	$: $checkedStates = filterData.reduce((acc, item) => {
		acc[item[tab]] = $filterStates[tab].includes(item[tab]);
		return acc;
	}, {});
	// $: console.log({ $checkedStates });

	// params of VituralList
	let start;
	let end;
	const ratio = 0.4;
	const itemHeight = 32;
	$: viewportHeight = Math.round((window.innerHeight * ratio) / itemHeight) * itemHeight;
	// $: console.log(viewportHeight);

	function handleCloseFilter(tab, selectedItem) {
		console.log(tab, selectedItem);
		$filterStates[tab] = $filterStates[tab].filter((v) => v !== selectedItem);
		checkedStates[selectedItem] = false;
		console.log($filterStates);
		$filterStatesChanged = true;
	}

	function handleClearFilters(tab) {
		$filterStates[tab] = [];
		console.log($filterStates);
		$filterStatesChanged = true;
	}

	// set up filter search
	let searchFilter = '';
	// $: console.log(searchFilter);

	const fuseOptions = {
		isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: [tab]
	};
	$: fuse = new Fuse(filterData, fuseOptions);
	$: filterSearchResults = fuse.search(searchFilter);
	// $: console.log(filterSearchResults);
</script>

<Command.Root class="h-[1056px]" shouldFilter={false}>
	<div class="mb-2 mt-4 flex w-full justify-between">
		<Command.Input
			placeholder="Find {tab}s..."
			class="w-[288px] border-gray-300 focus:border-foreground focus-visible:ring-0"
			bind:value={searchFilter}
		/>
		<Button class="h-8 text-sm font-[400]" on:click={() => handleClearFilters(tab)}
			>Clear filters</Button
		>
	</div>
	<Separator />
	<Command.List class="max-h-none">
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Selected {tab}s">
			<div class="inline-flex flex-wrap gap-1">
				{#each $filterStates[tab] as selected (nanoid())}
					<Badge
						dismissable
						on:close={() => handleCloseFilter(tab, selected)}
						class="bg-brand-secondary-100 text-sm font-[400]"
						bind:value={selected}>{selected}</Badge
					>
				{/each}
			</div>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Related {tab}s">
			{#if searchFilter === ''}
				<VirtualList height="{viewportHeight}px" items={filterData} let:item bind:start bind:end>
					<Command.Item class="h-8">
						<Filter data={item} {tab} {handleFilterStates} {checkedStates} />
					</Command.Item>
				</VirtualList>
			{:else if searchFilter !== ''}
				<VirtualList
					height="{viewportHeight}px"
					items={filterSearchResults}
					let:item
					bind:start
					bind:end
				>
					<Command.Item class="h-8">
						<Filter data={item.item} {tab} {handleFilterStates} {checkedStates} />
					</Command.Item>
				</VirtualList>
			{/if}
		</Command.Group>
		<Command.Separator />
	</Command.List>
	<p class="ml-2 mt-2 text-sm">Showing {start + 1}-{end + 1} of {filterData.length} {tab}s</p>
</Command.Root>
