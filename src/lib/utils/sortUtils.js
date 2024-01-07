// convert dollar amount into number
function convertAmount(str) {
	return parseFloat(str.replace(/[^0-9.-]+/g, ''));
}

function getMatchingKeyword(str, keywords) {
	const lowerStr = str.toLowerCase();
	return keywords.reduce((acc, keyword) => {
		return acc + (lowerStr.includes(keyword) ? 1 : 0);
	}, 0);
}

function getTotalMatchingKeyword(str, keywords) {
	const lowerStr = str.toLowerCase();
	return keywords.reduce((acc, keyword) => {
		return acc + (lowerStr.split(keyword).length - 1);
	}, 0);
}

function getMatchingProgram(programs, selectedProgram) {
	return programs.filter((program) => selectedProgram.includes(program)).length;
}

export function sortResults({ sortingMethod, data, keywords, selectedProgram, searchTerm }) {
	switch (sortingMethod) {
		case 'relevance':
			if (searchTerm !== '' || selectedProgram.length > 0) {
				return data.toSorted((a, b) => {
					// first compare the total number of unique matching keywords in title and abstract plug the number of programs
					const titleAndProgramComparison =
						getMatchingKeyword(b.title + b.abstract, keywords) +
						getMatchingProgram(b.programs, selectedProgram) -
						(getMatchingKeyword(a.title + a.abstract, keywords) +
							getMatchingProgram(a.programs, selectedProgram));

					if (titleAndProgramComparison !== 0) return titleAndProgramComparison;

					// for data have the same above number, compare the number of unique keywords in title
					const titleComparison =
						getMatchingKeyword(b.title, keywords) - getMatchingKeyword(a.title, keywords);

					if (titleComparison !== 0) return titleComparison;

					// if the number of unique keywords in title is also the same, compare the total number of keywords in title and abstract
					const totalMatchComparison =
						getTotalMatchingKeyword(b.title + b.abstract, keywords) -
						getTotalMatchingKeyword(a.title + a.abstract, keywords);
					return totalMatchComparison;
				});
			} else {
				return data.toSorted((a, b) => new Date(b.date) - new Date(a.date));
			}

		case 'date-ascending':
			return data.toSorted((a, b) => new Date(a.date) - new Date(b.date));
			break;
		case 'date-descending':
			return data.toSorted((a, b) => new Date(b.date) - new Date(a.date));
			break;
		case 'amount-descending':
			return data.toSorted((a, b) => convertAmount(b.amount) - convertAmount(a.amount));
			break;
	}
}
