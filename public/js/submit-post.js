tinymce.init({ selector:'textarea' });

var app                                 =   new Vue({
    el:                                     '#app',
    data: {
        form: {
            _csrf:                          $('input[name=_csrf]').val(),
            title:                          '',
            category:                       1
        },
        is_submitting:                      false,
        show_alert:                         false,
        alert_class:                        '',
        alert_msg:                          ''
    },
    methods: {
        submit: function(){
            this.is_submitting          =   true;
            this.show_alert             =   true;
            this.alert_class            =   'infomsg';
            this.alert_msg              =   'Please wait while your post is being processed.';

            tinymce.activeEditor.setMode( 'readonly' );

            let form_data               =   new FormData();
            form_data.append( '_csrf', this.form._csrf );
            form_data.append( 'title', this.form.title );
            form_data.append( 'category', this.form.category );
            form_data.append( 'content', tinymce.activeEditor.getContent() );

            if( !$("input[type=file]").prop( 'files' ).length ){
                this.is_submitting      =   false;
                this.alert_class        =   'errormsg';
                this.alert_msg          =   'Invalid info.'
                tinymce.activeEditor.setMode('design');
                return null;
            }

            form_data.append( 'img', $("input[type=file]").prop( 'files' )[0] );

            $.ajax({
                url: '/submit',
                data: form_data,
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false
             }).then((response) => {
                if( response.status == 2 ){
                    this.alert_class        =   'successmsg';
                    this.alert_msg          =   'Success! You are now being redirected!';
                    location.href           =   '/post/' + response.post_id;
                }else{
                    this.is_submitting      =   false;
                    this.alert_class        =   'errormsg';
                    this.alert_msg          =   'Invalid info!';
                    tinymce.activeEditor.setMode( 'design' );
                }
            });
        }
    }
});