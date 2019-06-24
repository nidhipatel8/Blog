const { hooks }             =   require( '@adonisjs/ignitor' );
const moment                =   require( 'moment' );

hooks.after.providersBooted(() => {
    const View              =   use( 'View' );
    const Exception         =   use( 'Exception' );

    View.global( 'format_date', function( t ){
        return moment( t ).format( 'Do MMMM YYYY' );
    });

    View.global( 'stringify', function( o ){
        return JSON.stringify( o );
    });

    Exception.handle( 'HttpException', async ( error, { response }) => {
        response.redirect( '/' );
        return;
    });
});