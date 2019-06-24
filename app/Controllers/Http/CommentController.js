'use strict'

const Comment                       =   use( 'App/Models/Comment' );
const { validate }                  =   use( 'Validator' );

class CommentController {
    async get_comments({ request }){
        let output                  =   { comments: [] };
        const comment_validation    =   await validate( request.all(), {
            pid:                        'required',
            cid:                        'required',
        });

        if( comment_validation.fails() ){
            return output;
        }

        const comments              =   await Comment.query()
            .where( 'pid', request.input( 'pid' ) )
            .where( 'id', '>', request.input( 'cid' ) )
            .fetch();

        output.comments             =   comments;
        return output;
    }

    async create({ request, auth }){
        let output                  =   { status: 1 };
        const comment_validation    =   await validate( request.all(), {
            'post_id':                  'required',
            'comment':                  'required|string|min:3|max:500'     
        });

        if( comment_validation.fails() ){
            return output;
        }

        const new_comment           =   new Comment();
        const user                  =   await auth.getUser();

        new_comment.pid             =   request.input( 'post_id' );
        new_comment.name            =   user.username;
        new_comment.post_comment    =   request.input( 'comment' );
    
        try{
            await new_comment.save();
        }catch(err){
            return output;
        }
        
        output.status               =   2;
        return output;
    }
}

module.exports = CommentController
