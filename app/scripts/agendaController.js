angular
	.module('agendaApp')
	.controller('agendaController', function($scope, conFactory) {

		 var c = conFactory.getCon();
		 $scope.contactos = c;

		$scope.nuevoContacto = {};

		$scope.agregarContacto = function(newCotnact) {
			$scope.contactos.push(newCotnact);
			localStorage.setItem("contacts", JSON.stringify($scope.contactos));
			$scope.nuevoContacto = {};
			$scope.addContact = false;
			console.log(JSON.stringify($scope.contactos))
		}

		$scope.deleteCon = function(contacto) {
			var index = $scope.contactos.indexOf(contacto);
			$scope.contactos.splice(index, 1);
			localStorage.setItem("contacts", JSON.stringify($scope.contactos));
			console.log(JSON.stringify($scope.contactos))
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

