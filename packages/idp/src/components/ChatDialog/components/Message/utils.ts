export const modifyMessage = (message?: string) => {
	if (!message || typeof message !== 'string' || !message.length) {
		return message;
	}
	const firstLetter = message[0].toUpperCase();
	return `${firstLetter}${message.slice(1)}`;
};
