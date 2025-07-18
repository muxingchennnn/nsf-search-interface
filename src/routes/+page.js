import * as d3 from 'd3';
import moment from 'moment';

// export async function load() {
// 	const awards = await d3.csv('/cise_awards.csv', parseData);
// 	return {
// 		awards
// 	};
// }

export async function load() {
	const [awardsResponse] = await Promise.all([import('$lib/data/cise_awards.csv?raw')]);

	const awards = d3.csvParse(awardsResponse.default, parseData);
	console.log(awards);

	return {
		awards
	};
}

function parseData(d) {
	return {
		abstract: d.Abstract.replace(/<\s*br\s*\/\s*>/gi, '').replace(/\s+([,.;!?])/g, '$1'), // remove all the <br/> string and whitespaces before the punctuations
		awardNumber: d.AwardNumber,
		investigator: d.PrincipalInvestigator,
		programs: d['Program(s)'].split(', ').filter((program, i) => {
			return i === 0 ? true : program !== '';
		}),
		date: moment(d.StartDate, 'MM/DD/YY').format('ll'),
		title: d.Title,
		amount: amountFormatter.format(+d.AwardedAmountToDate),
		institution: d.Organization
	};
}

const amountFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

export const ssr = false;
