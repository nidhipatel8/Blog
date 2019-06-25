'use strict'

const { validate }                  =   use( 'Validator' );

class SettingsController {
    async page({ view, settings }){
        return view.render( 'admin/settings', {
            settings:           settings
        });
    }

    async update({ request, settings, view }){
        let status                  =   1;
        const settings_validation   =   await validate( request.all(), {
            site_name:                  'required|string',
            cta_url:                    'url'
        });

        if( settings_validation.fails() ){
            return view.render( 'admin/settings', {
                status:                 status,
                settings:               settings
            });
        }

        settings.site_name          =   request.input( 'site_name' );
        settings.cta_message        =   request.input( 'cta_message' );
        settings.cta_url            =   request.input( 'cta_url' );
        settings.copyright_text     =   request.input( 'copyright_text' );
        settings.facebook_handle    =   request.input( 'facebook_handle' );
        settings.twitter_handle     =   request.input( 'twitter_handle' );
        settings.github_handle      =   request.input( 'github_handle' );

        await settings.save();

        status                      =   2;

        return view.render( 'admin/settings', {
            status:                 status,
            settings:               settings
        });
    }
}

module.exports = SettingsController
