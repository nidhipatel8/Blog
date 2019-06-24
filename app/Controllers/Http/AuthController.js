'use strict'

const { validate }                  =   use( 'Validator' );

class AuthController {
    async auth({ request, response, auth }){
        let output                  =   { status: 1 };
        const user_validation       =   await validate( request.all(), {
            username:                   'required|alpha_numeric',
            password:                   'required|min:3'
        });

        if( user_validation.fails() ){
            output.messages         =   user_validation.messages();
            return output;
        }

        const { username, password }=   request.all();

        try{
            await auth.attempt( username, password + 'blog' );
        } catch( error ){
            console.log( error );
            return output;
        }

        output.status               =   2;
        return output;
    }

    async logout({ auth, response }){
        await auth.logout();
        response.redirect( '/' );
    }
}

module.exports = AuthController
