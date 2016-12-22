angular
	.module('agendaApp')
	.controller('agendaController', function($scope, $http) {

		var c;


		$http({
        method : "GET",
        url : "http://localhost:5000/get_contactos"
    }).then(function mySucces(response) {
        c = JSON.parse(response.data);
				$scope.contactos = c;
				console.log($scope.contactos);
    }, function myError(response) {
    	console.log("Hubo un error al conectar con la Base de datos")
    });

		var reCalle = /^\w/;
		var reNum = /\d$/;
		var reCP =/ \w/;
		var reColonia = /\w+/;
		var reNombre = /\w+/;
		var reTelefono = /([0-9]{8}){1}/;
		var reMovil = /([0-9]{10}){1}/;

		verificar = function(contacto){
			var v = 
				(reNombre.test(contacto.Nombre) &&
				reTelefono.test(contacto.Telefono) &&
				reMovil.test(contacto.Movil) &&
				reCalle.test(contacto.Calle) &&
				reNum.test(contacto.Calle) &&
				reColonia.test(contacto.Colonia)); 

			return v;
		}
		$scope.agregarContacto = function(newCotnact) {
				$http({
        method : "POST",
        url : "http://localhost:5000/post_contacto/"+newCotnact.nombre+"/"+newCotnact.telefono+"/"+newCotnact.movil+"/"+newCotnact.calle+"/"+newCotnact.colonia+"/"+newCotnact.cp+""
   			}).then(function mySucces(response) {
   				console.log("agregado correctamente")
   				$scope.contactos.push(newCotnact);
   				$scope.nuevoContacto = {};
					$scope.addContact = false;
					console.log(JSON.stringify($scope.contactos));
    		}, function myError(response) {
    			console.log("Hubo un error al agregar a la Base de datos")
    		});
		}

		$scope.deleteCon = function(contacto) {

			$http({
				method: "DELETE",
				url :"http://localhost:5000/delete_contacto/"+ contacto.id + ""
			}).then(function mySucces(response){
					var index = $scope.contactos.indexOf(contacto);
					$scope.contactos.splice(index, 1);
					console.log(JSON.stringify($scope.contactos));
			}, function myError(response) {
				console.log("Hubo un error al eliminar de la Base de datos");
			});

		}

		$scope.editContacto =function(contacto) {
			$scope.editContact = true;
			$scope.existingContacto = contacto;
			$scope.deleteCon(contacto);
		}

		$scope.guardarContacto = function(contacto) {
				$scope.editContact = false;
				$scope.existingContacto = {};
				$scope.agregarContacto(contacto);
		}
		
	});

