require('./styl/style.styl');

import React from 'react';
import MyInfo from './components/myInfo.jsx';

React.render(<MyInfo />,
	document.getElementById('content')
);
