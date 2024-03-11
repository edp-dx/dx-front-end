import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
	return <div>Name: shared react components</div>;
};

const sharedReactComponents = createRoot(document.querySelector('#shared-react-components'));
sharedReactComponents.render(<App />);
