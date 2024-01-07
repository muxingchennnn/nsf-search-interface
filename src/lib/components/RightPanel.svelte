<script>
	import * as Tabs from '$lib/components/ui/tabs';
	import FilterPanel from './FilterPanel.svelte';
	import {
		activeTab,
		awardData,
		searchResults,
		filterStates,
		activeTabChanged,
		filterStatesChanged
	} from '$lib/store';

	// $: console.log($activeTab);
	// $: if ($activeTab) {
	// 	$activeTabChanged = true;

	// }

	function handleActiveTabChanged() {
		$activeTabChanged = true;
		$filterStatesChanged = false;
	}

	function handleFilterStates(tab, value, checked) {
		if (!checked) {
			$filterStates[tab] = [...$filterStates[tab], value];
		} else {
			$filterStates[tab] = $filterStates[tab].filter((v) => v !== value);
		}
		// console.log($filterStates);
	}
</script>

<Tabs.Root bind:value={$activeTab} class="w-full">
	<Tabs.List class="w-full">
		<Tabs.Trigger value="program" class="w-full" on:click={handleActiveTabChanged}
			>Program</Tabs.Trigger
		>
		<Tabs.Trigger value="institution" class="w-full" on:click={handleActiveTabChanged}
			>Institution</Tabs.Trigger
		>
		<Tabs.Trigger value="investigator" class="w-full" on:click={handleActiveTabChanged}
			>Investigator</Tabs.Trigger
		>
	</Tabs.List>
	{#if $activeTab === 'program'}
		<Tabs.Content value="program">
			<FilterPanel tab={'program'} {handleFilterStates} />
		</Tabs.Content>
	{:else if $activeTab === 'institution'}
		<Tabs.Content value="institution">
			<FilterPanel tab={'institution'} {handleFilterStates} />
		</Tabs.Content>
	{:else if $activeTab === 'investigator'}
		<Tabs.Content value="investigator">
			<FilterPanel tab={'investigator'} {handleFilterStates} />
		</Tabs.Content>
	{/if}
</Tabs.Root>
<!-- <span class="reminder">scroll to see more &darr;</span> -->
