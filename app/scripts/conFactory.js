angular
	.module('agendaApp')
	.factory('conFactory', function(){

		var con = [];

		for (x=0; x<=localStorage.length-1; x++)  {  
  		clave = localStorage.key(x); 
  		con.push(JSON.parse(localStorage.getItem(clave)));  
		};

		var conData = con;

		function getCon() {
			return conData;
		}

		return {
			getCon: getCon
		}
	})