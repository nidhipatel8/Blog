'use strict'

const Model = use('Model')

class Post extends Model {
    static get table(){
        return 'posts';
    }

    author(){
        return this.hasOne( 'App/Models/User', 'uid', 'id' );
    }

    cat(){
        return this.hasOne( 'App/Models/Category', 'cid', 'id' );
    }
}

module.exports = Post

// var foo     =   new Post();
// foo.table();

// Post.table();