'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', ( table ) => {
      // table.integer( 'id' ).notNullable().unsigned().primary();
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string( 'profile_img', 200 ).notNullable().defaultTo(
        '/uploads/default.jpg'
      );
      table.string( 'bio', 255 );
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
