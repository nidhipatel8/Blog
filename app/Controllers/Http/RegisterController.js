'use strict'

const { validate }                  =   use( 'Validator' );
const User                          =   use( 'App/Models/User' );

class RegisterController {
    async register({ request, auth }){
        let output                  =   { status: 1 };
        const user_validation       =   await validate( request.all(), {
            email:                      'required|email',
            username:                   'required|alpha_numeric',
            password:                   'required|min:3',
            re_password:                'required|min:3|same:password'
        });

        if( user_validation.fails() ){
            return output;
        }

        const new_user              =   new User();

        new_user.username           =   request.input( 'username' );
        new_user.email              =   request.input( 'email' );
        new_user.password           =   request.input( 'password' ) + 'blog';

        try{
            await new_user.save();
        } catch( err ){
            console.log(err);
            return output;
        }

        await auth.loginViaId( new_user.id );

        output.status               =   2;
        return output;
    }
}

module.exports = RegisterController
