<script>
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	export let data;
	export let tab;
	export let handleFilterStates;
	export let checkedStates;
	import { filterStatesChanged } from '$lib/store';

	$: checked = $checkedStates[data[tab]];

	function handleLocalChange() {
		handleFilterStates(tab, data[tab], checked);
		$filterStatesChanged = true;
	}
</script>

<div class="flex w-full justify-between">
	<div class="flex items-center space-x-2">
		<Checkbox
			id="terms"
			bind:checked
			aria-labelledby="terms-label"
			onCheckedChange={handleLocalChange}
		/>
		<Label
			id="terms-label"
			for="terms"
			class="text-sm font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{data[tab]}
		</Label>
	</div>
	<div>
		{data['count']}
	</div>
</div>
