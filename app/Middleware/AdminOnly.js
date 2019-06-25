'use strict'

class AdminOnly {
  async handle ({ request, response, auth }, next) {
    const user          = await auth.getUser();

    if( user.is_admin !== 2 ){
      response.redirect( '/' );
      return null;
    }

    // call next to advance the request
    await next()
  }
}

module.exports = AdminOnly
