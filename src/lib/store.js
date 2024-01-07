import { writable } from 'svelte/store';

export let isLoading = writable(true);

export let awardData = writable([]);

export let searchTerm = writable('');
export let searchResults = writable([]);
export let filteredResults = writable([]);
export let sortingMethod = writable('relevance');
export let finalResults = writable([]);

export let activeTab = writable('program');

// export let programOrderInitialized = writable(false);
// export let institutionOrderInitialized = writable(false);
// export let investigatorOrderInitialized = writable(false);

// for paginator
export let currentPage = writable(1);
export let filterStates = writable({ program: [], institution: [], investigator: [] });
export let checkedStates = writable({});

export let activeTabChanged = writable(false);
export let filterStatesChanged = writable(false);
