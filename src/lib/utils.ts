export function sanitize(string: string) {
	return string.replace(/ /gi, '').toLowerCase();
}
