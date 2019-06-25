'use strict'

const Schema = use('Schema')

class SettingsSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments();
      table.string( 'site_name', 100 ).notNullable();
      table.string( 'cta_message', 255 );
      table.string( 'cta_url', 255 );
      table.string( 'copyright_text', 255 );
      table.string( 'facebook_handle', 100 );
      table.string( 'twitter_handle', 100 );
      table.string( 'github_handle', 100 );
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingsSchema
