auth.$inject = ['$authProvider', 'apiUrl'];

export default function auth( $rootScope, userService, ngDialog, $state ) {

  $rootScope.$on('$stateChangeStart', ( event, toState, toParams ) => {

    if ( toState.data && toState.data.requiresAuth && !userService.isAuthenticated() ) {
      
      event.preventDefault();
        
      const dialog = ngDialog.open({ 
        // template: '<user-auth success="success()"></user-auth>',
        template: '<p>Hell YEah</p>' ,
        plain: true,
        controller: [ '$scope', function( $scope ){
          $scope.success = function(){
            dialog.close();
            return $state.go( toState.name, toParams );
          };
        }]
      });
      
      dialog.closePromise
        .catch( err => alert( 'failure!\n\n' + err ) );
    }

  });
}