<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import {
		sortingMethod,
		finalResults,
		searchTerm,
		searchResults,
		filteredResults
	} from '$lib/store';
	import { format } from 'd3-format';
</script>

<!-- {#if $searchResults.length > 0}
	<p>{d3.format(',')($finalResults.length)} awards are found</p>
{:else}
	<p>Sorry, there are no awards about {searchTerm}</p>
{/if} -->
<div class="flex items-center justify-between">
	{#if $searchResults.length > 0 && $filteredResults.length > 0}
		<p>{format(',')($finalResults.length)} awards are found</p>
	{:else if $searchResults.length > 0 && $filteredResults.length === 0}
		<p>No results found. Please try to remove some filters.</p>
	{:else if $searchResults.length === 0}
		<p>There are no results for {$searchTerm}</p>
	{/if}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button class="w-56 font-[400]" variant="outline" builders={[builder]}
				>Sort by {$sortingMethod}</Button
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<!-- <DropdownMenu.Label>Panel Position</DropdownMenu.Label> -->
			<!-- <DropdownMenu.Separator /> -->
			<DropdownMenu.RadioGroup bind:value={$sortingMethod}>
				<DropdownMenu.RadioItem value="relevance">Relevance</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="date-descending">Date - Descending</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="date-ascending">Date - Ascending</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="amount-descending"
					>Amount - Descending</DropdownMenu.RadioItem
				>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
