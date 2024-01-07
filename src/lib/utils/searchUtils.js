export function parseQuery(text) {
	const matches = text.match(/-?".+?"|[^ ]+/g) || [];

	return matches.reduce(
		(acc, match) => {
			let content = '';
			if (match.startsWith('-"')) {
				content = match.slice(2, -1).trim();
				if (content) acc.excludes.push(content.toLowerCase());
			} else if (match.startsWith('-')) {
				acc.excludes.push(match.slice(1).toLowerCase());
			} else if (match.startsWith('"')) {
				content = match.slice(1, -1).trim();
				if (content) acc.includes.push(content.toLowerCase());
			} else {
				acc.includes.push(match.toLowerCase());
			}
			return acc;
		},
		{
			includes: [],
			excludes: []
		}
	);
}

function highlightKW(text, keywords) {
	// Replace each keyword in the text with a highlighted version
	keywords.forEach((keyword) => {
		// const regex = new RegExp(`(${keyword})`, "gi");
		const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
		text = text.replace(
			regex,
			'<span class="highlight" style="background-color: rgba(250, 197, 21, 0.2)">$1</span>'
		);
	});
	return text;
}

export function filteredByKW({ data, searchTerm, keywords, exclusions }) {
	data.map((result) => {
		result.title = removeHighlight(result.title);
		result.abstract = removeHighlight(result.abstract);
	});

	if (searchTerm === '') {
		return data;
	} else if (searchTerm !== '') {
		const search = data.filter((award) => {
			const content = `${award.title} ${award.abstract}`.toLowerCase();

			if (exclusions.some((term) => content.includes(term))) {
				return false;
			}

			if (keywords.some((term) => content.includes(term))) {
				return true;
			}
			return false;
		});

		// highlight keywords
		search.map((result) => {
			result.title = highlightKW(result.title, keywords);
			result.abstract = highlightKW(result.abstract, keywords);
		});
		return search;
	}
}

export function removeHighlight(text) {
	return text.replace(
		/<span class="highlight" style="background-color: rgba\(250, 197, 21, 0.2\)">([^<]*)<\/span>/gi,
		'$1'
	);
}
