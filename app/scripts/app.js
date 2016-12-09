'use strict';

angular
  .module('agendaApp', [
    'ngAnimate',
    'ngAria', 
    'ngMaterial'
    ])
    .run(function(){
      console.log('agendaApp is ready')
     });
