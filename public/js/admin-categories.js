var app                                 =   new Vue({
    el:                                     '#content',
    data: {
        form: {
            _csrf:                          $('input[name=_csrf]').val(),
            name:                          '',
            subtitle:                      ''
        },
        is_submitting:                      false,
        show_alert:                         false,
        alert_class:                        '',
        alert_msg:                          '',
        categories:                         categories
    },
    methods: {
        add: function(){
            this.is_submitting          =   true;
            this.show_alert             =   true;
            this.alert_class            =   'infomsg';
            this.alert_msg              =   'Please wait while your category is being processed.';

            $.post( '/add-category', this.form ).then((response) => {
                if( response.status == 2 ){
                    this.alert_class    =   'successmsg';
                    this.alert_msg      =   'Success! Page being reloaded.'
                    location.reload();
                }else{
                    this.is_submitting  =   false;
                    this.alert_class    =   'errormsg';
                    this.alert_msg      =   'Invalid info.'
                }
            });
        },
        remove: function( id, index ){
            if( !confirm( 'Are you sure you want to do this?' ) ){
                return null;
            }

            $.post(
                '/remove-category',
                { _csrf: this.form._csrf, id: id }
            ).then((response) => {
                if( response.status == 2 ){
                    this.categories.splice( index, 1 );
                }else{
                    alert( 'Failed to delete category!' );
                }
            })
        }
    }
});