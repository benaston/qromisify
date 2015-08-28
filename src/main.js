;(function(root) {

	'use strict';

	var namespace = {};

	@@qromisify

	if ((typeof exports === 'object') && module) {
		module.exports = namespace; // CommonJS
	} else if ((typeof define === 'function') && define.amd) {
		define(function() {
			return namespace;
		}); // AMD
	} else {
		root.qromisify = namespace.qromisify; // Browser
	}

}(this));