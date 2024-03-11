export const getDomainName = (url: string) =>
	url
		?.replace(/^https?:\/\//, '')
		.replace(/^www\./, '')
		.replace(/\..*/, '');
