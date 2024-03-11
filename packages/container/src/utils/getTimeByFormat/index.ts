export const getTimeByFormat = (time: Date, format: Intl.DateTimeFormatOptions) =>
	new Intl.DateTimeFormat(globalThis.navigator.language, format).format(
		typeof time === 'number' ? time * 1000 : time,
	);
