angular
	.module('agendaApp')
	.controller('agendaController', function($scope, conFactory) {

		var c = conFactory.getCon();
		$scope.contactos = c;
		$scope.nuevoContacto = {};

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
			if(verificar(newCotnact)){
				$scope.contactos.push(newCotnact);
				localStorage.setItem(newCotnact.Nombre , JSON.stringify(newCotnact));
				$scope.nuevoContacto = {};
				$scope.addContact = false;
				console.log(JSON.stringify($scope.contactos));
			}
		}

		$scope.deleteCon = function(contacto) {
			var index = $scope.contactos.indexOf(contacto);
			$scope.contactos.splice(index, 1);
			localStorage.removeItem(contacto.Nombre);
			console.log(JSON.stringify($scope.contactos));
		}

		$scope.editContacto =function(contacto) {
			$scope.editContact = true;
			$scope.existingContacto = contacto;
			$scope.deleteCon(contacto);
		}

		$scope.guardarContacto = function(contacto) {
			if (verificar(contacto)){
				$scope.editContact = false;
				$scope.existingContacto = {};
				$scope.agregarContacto(contacto);
			}
		}
		
	});

