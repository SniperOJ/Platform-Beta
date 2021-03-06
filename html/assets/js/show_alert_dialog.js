var form_modal = $('.cd-user-modal');
var form_login = $('#cd-login');
var form_register = $('#cd-register');
var form_modal_tab = $('.cd-switcher')
var tab_login = form_modal_tab.children('li').eq(0).children('a');
var tab_register = form_modal_tab.children('li').eq(1).children('a');

$('.cd-login').on('click', function() {
    form_modal.addClass('is-visible');
    login_selected();
});

$('.cd-register').on('click', function() {
    form_modal.addClass('is-visible');
    register_selected();
});

//关闭弹出窗口
$('.cd-user-modal').on('click', function(event){
    if( $(event.target).is(form_modal) || $(event.target).is('.cd-close-form') ) {
        form_modal.removeClass('is-visible');
    }
});
//使用Esc键关闭弹出窗口
$(document).keyup(function(event){
    if(event.which=='27'){
        form_modal.removeClass('is-visible');
    }
});

//切换表单
form_modal_tab.on('click', function(event) {
    event.preventDefault();
    ( $(event.target).is( tab_login ) ) ? login_selected() : register_selected();
});

function login_selected(){
    // get captcha
    get_captcha()
    form_login.addClass('is-selected');
    form_register.removeClass('is-selected');
    // form_forgot_password.removeClass('is-selected');
    tab_login.addClass('selected');
    tab_register.removeClass('selected');
}

function register_selected(){
    get_captcha()
    form_login.removeClass('is-selected');
    form_register.addClass('is-selected');
    // form_forgot_password.removeClass('is-selected');
    tab_login.removeClass('selected');
    tab_register.addClass('selected');
}

function get_captcha() {
    $.ajax({
        type: "GET",
        url: "/user/get_captcha",
        dataType: "json",
        success: function(msg) {
            $(".captcha").html(msg.message)
        }
    });
}