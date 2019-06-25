'use strict'

const Category                          =   use( 'App/Models/Category' );
const { validate }                      =   use( 'Validator' );
const Post                              =   use( 'App/Models/Post' );

class CategoryController {
    async manage({ view }){
        return view.render( 'admin/categories' );
    }

    async add({ request }){
        let output                      =   { status: 1 };
        const cat_validation            =   await validate( request.all(), {
            'name':                         'required|min:3|max:80|string',
            'subtitle':                     'required|max:80|string'
        });

        if( cat_validation.fails() ){
            return output;
        }

        const new_cat                   =   new Category();
        new_cat.name                    =   request.input( 'name' );
        new_cat.subtitle                =   request.input( 'subtitle' );
        
        await new_cat.save();

        output.status                   =   2;
        return output;
    }

    async remove({ request }){
        let output                      =   { status: 1 };
        const cat_validation            =   await validate( request.all(), {
            id:                         'required',
        });

        if( cat_validation.fails() ){
            return output;
        }

        const cid                       =   request.input( 'id' );
        const cat                       =   await Category.find( cid );

        await cat.delete();

        output.status                   =   2;
        return output;
    }
    async page({ request, params, view }){
        const cat                       =   await Category.find( params.id );
        const current_page              =   parseInt( request.input( 'p', 1 ) );
        const posts                     =   await Post.query()
            .with( 'author' )
            .with( 'cat' )
            .where( 'cid', params.id )
            .orderBy( 'id', 'desc' )
            .paginate( current_page, 6 );

        return view.render( 'category', {
            cat:                            cat.toJSON(),
            posts:                          posts.toJSON()
        });
    }
}

module.exports = CategoryController
