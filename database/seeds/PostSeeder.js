'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PostSeeder {
  async run () {
    await Factory.model( 'App/Models/Post' )
                 .createMany( 20 );
  }
}

module.exports = PostSeeder
