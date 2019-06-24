'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get( '/', 'HomeController.index' );
Route.on( '/login' ).render( 'auth' ).middleware([ 'guest_only' ]);
Route.post( '/login', 'AuthController.auth' ).middleware([ 'guest_only' ]);
Route.get( '/logout', 'AuthController.logout' );
Route.post( '/register', 'RegisterController.register' ).middleware([ 'guest_only' ]);
Route.on( '/submit' ).render( 'submit' ).middleware([ 'auth_required' ]);
Route.post( '/submit', 'PostSubmissionController.submit' ).middleware([ 'auth_required' ]);
Route.get( '/post/:id', 'PostController.page' ).as( 'post' );
Route.post( '/create-comment', 'CommentController.create' ).middleware(['auth_required']);
Route.get( '/get-comments', 'CommentController.get_comments' );
Route.get( '/admin/categories', 'CategoryController.manage' ).middleware([
    'auth_required', 'admin_only'
]);
Route.post( '/add-category', 'CategoryController.add' ).middleware([
    'auth_required', 'admin_only'
]);
Route.post( '/remove-category', 'CategoryController.remove' ).middleware([
    'auth_required', 'admin_only'
]);
Route.get( '/category/:id', 'CategoryController.page' ).as( 'category' );
Route.get( '/edit-profile', 'ProfileController.edit_page' ).middleware([
    'auth_required'
]).as( 'edit_profile' );
Route.post( '/edit-profile', 'ProfileController.update' ).middleware([
    'auth_required'
]);
Route.get( '/author/:username', 'ProfileController.profile' ).as( 'profile' );
Route.get( '/admin/settings', 'SettingsController.page' ).middleware([
    'auth_required', 'admin_only'
]);
Route.post( '/admin/settings', 'SettingsController.update' ).middleware([
    'auth_required', 'admin_only'
]);
Route.get( '/search', 'SearchController.search' );
Route.get( '/sql', async ({ request, view }) => {
    const Database                  =   use( 'Database' );

    const user_id_input             =   parseInt( request.input( 'user_id', 0 ) );

    const user                      =   await Database.from( 'users' )
        .whereRaw( 
            'id = ?',
            [ user_id_input ]
        );

    return view.render( 'sql', {
        user:                           user
    });
});