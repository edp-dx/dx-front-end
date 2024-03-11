export const useSteps = () => {
	return [
		{
			index: 1,
			label: 'Select Template',
			description: 'Start process by selecting a complete template.',
		},
		{
			index: 2,
			label: 'Define Parameters',
			description:
				'Indicate general attributes required for successful application scaffolding.',
		},
		{
			index: 3,
			label: 'Scaffold Application',
			description: 'All is done!',
		},
	];
};
