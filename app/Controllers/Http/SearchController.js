'use strict'

const Post                          =   use( 'App/Models/Post' );

class SearchController {
    async search({ request, view }){
        const search_term           =   request.input( 'q', '' );
        const current_page          =   request.input( 'p', 1 );    
        
        const posts                 =   await Post.query()
            .with( 'author' )
            .with( 'cat' )
            .where( 'title', 'LIKE', '%' + search_term + '%' )
            .paginate( current_page, 6 );

        return view.render( 'search', {
            search_term:                search_term,
            posts:                      posts.toJSON()
        });
    }
}

module.exports = SearchController
