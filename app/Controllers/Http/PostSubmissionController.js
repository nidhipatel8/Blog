'use strict'

const { validate }              =   use( "Validator" );
const Utility                   =   use( 'Utility' );
const Helpers                   =   use( 'Helpers' );
const Post                      =   use( 'App/Models/Post' );
const sanitizeHtml              =   require( 'sanitize-html' );

class PostSubmissionController {
    async submit({ request, auth }){
        let output              =   { status: 1 };
        const post_validation   =   await validate( request.all(), {
            title:                  'required|min:3|max:255|string',
            category:               'required',
            content:                'required|string'
        });

        if( post_validation.fails() ){
            return output;
        }

        const img               =   request.file( 'img', {
            types:                  [ 'image' ],
            size:                   '5mb'
        });
        const file_name         =   Utility.get_random_str( 8 ) + '.' +
                                    img.clientName.split( '.' ).pop();

        await img.move( Helpers.publicPath( 'uploads' ), {
            name:                   file_name
        });

        if( !img.moved() ){
            return output;
        }

        const { title, category, 
            content  }          =   request.all();
        const new_post          =   new Post();
        const user              =   await auth.getUser();
        
        new_post.title          =   title;
        new_post.img_url        =   '/uploads/' + file_name;
        new_post.post_content   =   sanitizeHtml( content );
        new_post.uid            =   user.id;
        new_post.cid            =   category;

        await new_post.save();

        output.status           =   2;
        output.post_id          =   new_post.id;
        return output;
    }
}

module.exports = PostSubmissionController
