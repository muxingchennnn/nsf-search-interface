export function paginate({ items, perPage, currentPage }) {
	return items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);
}
