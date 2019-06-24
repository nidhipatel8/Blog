'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory           =   use('Factory')
const User              =   use( 'App/Models/User' );

class UserSeeder {
  async run () {
    const new_user      =   new User();
    new_user.username   =   'admin';
    new_user.email      =   'admin@email.com';
    new_user.password   =   'admin' + 'blog';

    await new_user.save();
  }
}

module.exports = UserSeeder
