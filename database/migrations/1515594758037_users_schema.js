'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      table.integer( 'is_admin' ).defaultTo( 1 );
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn( 'is_admin' );
    })
  }
}

module.exports = UsersSchema
