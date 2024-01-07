import { flatRollup } from 'd3-array';

export function calculateDistribution(data, tab) {
	if (tab === 'program') {
		const allPrograms = data.map((d) => d.programs).flat(Infinity);
		return flatRollup(
			allPrograms,
			(v) => v.length,
			(d) => d
		)
			.toSorted((a, b) => b[1] - a[1])
			.map((item) => ({
				[tab]: item[0],
				count: item[1]
			}));
	} else {
		return flatRollup(
			data,
			(v) => v.length,
			(d) => d[tab]
		)
			.toSorted((a, b) => b[1] - a[1])
			.map((item) => ({
				[tab]: item[0],
				count: item[1]
			}));
	}
}
