'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments();
      table.string( 'title', 100 ).notNullable();
      table.string( 'img_url', 255 ).notNullable();
      table.text( 'post_content' );
      table.integer( 'uid' ).unsigned().notNullable();
      table.integer( 'cid' ).unsigned().notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
