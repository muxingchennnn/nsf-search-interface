<script>
	import * as Pagination from '$lib/components/ui/pagination';
	import { currentPage } from '$lib/store';

	export let count;
	export let perPage;

	function handlePageChange(page) {
		$currentPage = page;
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
</script>

<Pagination.Root {count} {perPage} let:pages let:currentPage onPageChange={handlePageChange}>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link {page} isActive={currentPage == page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
