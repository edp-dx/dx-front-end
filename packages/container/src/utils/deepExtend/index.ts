Object.deepExtend = function (destination: any, source: any) {
	for (const property in source) {
		if (
			source[property] &&
			source[property].constructor &&
			source[property].constructor === Object
		) {
			destination[property] = destination[property] || {};
			Object.deepExtend(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};
