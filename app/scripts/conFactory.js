'use strict';

angular
	.module('agendaApp')
	.factory('conFactory', function(){

		var conData = JSON.parse(localStorage.getItem("contacts"));

		function getCon() {
			return conData;
		}

		return {
			getCon: getCon
		}
	})