require('./styl/style');

import React from 'react';
import MyInfo from './components/myInfo';

React.render(<MyInfo />,
	document.getElementById('content')
);
