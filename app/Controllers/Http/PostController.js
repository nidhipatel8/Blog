'use strict'

const Post                  =   use( 'App/Models/Post' );

class PostController {
    async page({ params, view }){
        const single_post   =   await Post.find( params.id );

        await single_post.load( 'author' );
        await single_post.load( 'cat' );
        
        return view.render( 'single-post', {
            post:               single_post.toJSON()
        });
    }
}

module.exports = PostController
