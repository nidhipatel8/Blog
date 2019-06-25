'use strict'

class GuestOnly {
  async handle ({ request, auth, response }, next) {
    try{
        await auth.check();
    } catch( error ){
         // call next to advance the request
        await next();
        return null;
    }
    
    response.redirect( '/' );
  }
}

module.exports = GuestOnly
