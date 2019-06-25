'use strict'

/*
|--------------------------------------------------------------------------
| SettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory                   =   use('Factory');
const Setting                   =   use( 'App/Models/Setting' );

class SettingSeeder {
  async run () {
    const new_setting           =   new Setting();

    new_setting.site_name       =   'Blog';
    new_setting.cta_message     =   'Check this out!';
    new_setting.cta_url         =   'https://google.com/';
    new_setting.copyright_text  =   'Copyrights &copy; 2018 All Rights Reserved';

    await new_setting.save();
  }
}

module.exports = SettingSeeder
