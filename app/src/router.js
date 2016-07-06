configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('landing', {
      url: '/',
      views: {
        main: {
          template: '<h2>Welcome User</h2>'
        }
      }
    })
    .state('gallery', {
      url: '/gallery/:album?view',
      params: {
        view: {dynamic: true}
      },
      resolve: {
        images: ['imageService', '$stateParams', (imgSvc, params) => {
          if (params.album) {
            return imgSvc.getByAlbum(params.album);
          } 
          else {
            return imgSvc.get();
          }
        }],
        albumSelect: ['$stateParams', params => params.album],
        viewOption: ['$stateParams', params => params.view || 'thumb']
      },
      views: {
        main: {
          component: 'toggler'
        }
      }
    })
    .state('newPost', {
      url: '/addimage',
      views: {
        main: {
          component: 'newPost'
        }
      }
    })
    .state('albums', {
      url: '/albums',
      views: {
        main: {
          component: 'albumControl'
        }
      }
    });

  $urlRouterProvider.otherwise( '/' );

};