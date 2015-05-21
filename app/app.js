// // require('bootstrap');
// // require('bootstrap.css');
// require('./less/main.less');
// require('./styl/style.styl');
// require('normalize.css');

// import React from 'react';
// import AppComponent from './components/appComponent.jsx';

// // React.render(<AppComponent />,
// // 	document.getElementById('content')
// // );

'use strict';

var React = require('react');

// We create a function that will lazy load modules based on the current hash
var resolveRoute = function () {

  // If no hash or hash is '#' we lazy load the Home component
  if (!location.hash || location.hash.length === 1) {
    require.ensure([], function () {
      var Home = require('./components/home.jsx');
      React.render(<Home />, document.getElementById('content'));
    });

  // Or if route is #admin we lazy load that
  } else if (location.hash === '#admin') {
    require.ensure([], function () {
      var Admin = require('./components/admin.jsx');
      React.render(<Admin />, document.getElementById('content'));
    });
  }

};

window.onhashchange = resolveRoute;

// Resolve current route
resolveRoute();