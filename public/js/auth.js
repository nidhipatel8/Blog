var app                                 =   new Vue({
    el:                                     '#app',
    data: {
        user_login: {
            _csrf:                          $( 'input[name=_csrf]' ).val(),
            username:                       '',
            password:                       ''
        },
        login_is_submitting:                false,
        login_show_alert:                   false,
        login_alert_class:                  '',
        login_alert_msg:                    '',
        user_reg: {
            _csrf:                          $( 'input[name=_csrf]' ).val(),
            email:                          '',
            username:                       '',
            password:                       '',
            re_password:                    ''
        },
        reg_is_submitting:                  false,
        reg_show_alert:                     false,
        reg_alert_class:                    '',
        reg_alert_msg:                      ''
    },
    methods: {
        login: function(){
            this.login_is_submitting    =   true;
            this.login_show_alert       =   true;
            this.login_alert_class      =   'infomsg';
            this.login_alert_msg        =   'Please wait!';

            $.post( '/login', this.user_login ).then((response) => {
                if( response.status === 2 ){
                    this.login_alert_class  =   'successmsg';
                    this.login_alert_msg    =   'Success! You are now being redirected!';
                    location.href           =   '/';
                }else{
                    this.login_is_submitting=   false;
                    this.login_alert_class  =   'errormsg';
                    this.login_alert_msg    =   'Invalid login info!';
                }
            });
        },
        register: function(){
            this.reg_is_submitting          =   true;
            this.reg_show_alert             =   true;
            this.reg_alert_class            =   'infomsg';
            this.reg_alert_msg              =   'Please wait!';

            $.post( '/register', this.user_reg ).then((response) => {
                if( response.status === 2 ){
                    this.reg_alert_class    =   'successmsg';
                    this.reg_alert_msg      =   'Success! You are now being redirected!';
                    location.href           =   '/';
                }else{
                    this.reg_is_submitting  =   false;
                    this.reg_alert_class    =   'errormsg';
                    this.reg_alert_msg      =   'Invalid registration info!';
                }
            });
        }
    }
})