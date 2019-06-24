var app                                 =   new Vue({
    el:                                     '#comments',
    data: {
        form: {
            _csrf:                          $('input[name=_csrf]').val(),
            comment:                        '',
            post_id:                        $("#content").data( 'post-id' )
        },
        is_submitting:                      false,
        show_alert:                         false,
        alert_class:                        '',
        alert_msg:                          '',
        comments:                           [],
        last_comment_id:                    0
    },
    methods: {
        get_comments: function(){
            $.get(
                '/get-comments',
                { pid: this.form.post_id, cid: this.last_comment_id }
             ).then((response) => {
                 response.comments.forEach((e, i) => {
                    if( e.id > this.last_comment_id ){
                        this.last_comment_id    =   e.id;
                    }

                    this.comments.unshift( e );
                 });
             });
        },
        submit: function(){
            this.is_submitting          =   true;
            this.show_alert             =   true;
            this.alert_class            =   'infomsg';
            this.alert_msg              =   'Please wait while your comment is being processed.';

            $.post( '/create-comment', this.form ).then((response) => {
                this.is_submitting      =   false;

                if( response.status == 2 ){
                    app.get_comments();

                    this.alert_class    =   'successmsg';
                    this.alert_msg      =   'Comment posted!.'
                    this.form.comment   =   '';
                }else{
                    this.alert_class    =   'errormsg';
                    this.alert_msg      =   'There was an error. Try again later!'
                }
            })
        }
    }
});

app.get_comments();