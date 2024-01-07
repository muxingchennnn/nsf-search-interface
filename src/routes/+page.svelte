<script>
	import Header from '../lib/components/Header.svelte';
	import Result from '../lib/components/Result.svelte';
	import Sort from '../lib/components/Sort.svelte';
	import RightPanel from '../lib/components/RightPanel.svelte';
	import Paginator from '../lib/components/Paginator.svelte';
	import { paginate } from '$lib/utils/paginate';
	import {
		awardData,
		searchTerm,
		searchResults,
		filterStates,
		filteredResults,
		sortingMethod,
		finalResults,
		currentPage
	} from '$lib/store';
	import { parseQuery, filteredByKW } from '$lib/utils/searchUtils';
	import { removeStopwords } from 'stopword';
	import { sortResults } from '$lib/utils/sortUtils';

	export let data;

	$: $awardData = data.awards.sort((a, b) => new Date(b.date) - new Date(a.date));

	$: keywords = removeStopwords(parseQuery($searchTerm).includes);
	$: exclusions = parseQuery($searchTerm).excludes;
	$: $searchResults = filteredByKW({
		data: $awardData,
		searchTerm: $searchTerm,
		keywords,
		exclusions
	});
	// $: console.log({ $searchResults });

	$: $filteredResults = $searchResults.filter(
		(result) =>
			($filterStates.program.length === 0 ||
				$filterStates.program.some((program) => result.programs.includes(program))) &&
			($filterStates.institution.length === 0 ||
				$filterStates.institution.includes(result.institution)) &&
			($filterStates.investigator.length === 0 ||
				$filterStates.investigator.includes(result.investigator))
	);
	// $: console.log({ $filteredResults });

	$: $finalResults =
		$searchResults.length > 0
			? sortResults({
					sortingMethod: $sortingMethod,
					data: $filteredResults,
					keywords: keywords,
					selectedProgram: $filterStates.program,
					searchTerm: $searchTerm
				})
			: $awardData;
	// $: console.log({ $finalResults });

	// pagination
	$: resultLength = $finalResults.length;
	// $: console.log(resultLength);
	const perPage = 10;
	$: paginatedResults = paginate({ items: $finalResults, perPage, currentPage: $currentPage });
</script>

<!-- header -->
<div class="sticky top-0 z-50 mb-[2rem] border-b-[1px] border-solid border-border">
	<Header />
</div>

<main class="mx-[auto] my-0 flex max-w-[1440px] justify-between gap-16 px-[2rem]">
	<!-- left panel -->
	<section class="left-panel min-w-[600px] basis-[60%]">
		<div class="mb-8">
			<Sort />
		</div>
		<div class="results flex flex-col gap-[1.5rem]">
			{#each paginatedResults as result}
				<Result {...result} />
			{/each}
		</div>
		<!-- paginator -->
		{#key resultLength}
			<div class="pb-16 pt-12">
				<Paginator count={resultLength} {perPage} />
			</div>
		{/key}
	</section>
	<!-- right panel -->
	<section class="sticky top-[7rem] w-[400px] min-w-[400px] self-start">
		<RightPanel />
	</section>
</main>
