'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer( 'pid' ).notNullable();
      table.string( 'name', 80 ).notNullable();
      table.text( 'post_comment' );
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
