$("#txt_user_email").blur(function () {
    console.log("email");
    var email_exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
    var email = $(this).val();
    if (email == "") {
        $(this).showInfo_Error('邮箱不能为空！');
    } else if (!email.match(email_exp)) {
        $(this).showInfo_Error("你输入的邮箱有误！");
    } else {
        $.post("/register/checkEmail", {
            email: email
        }, function (result) {
            if (result) {
                $("#txt_user_email").showInfo_OK();
            } else {
                $("#txt_user_email").showInfo_Error('该邮箱已被注册,您可以直接登录！');
            }
        });
    }
});

$("#txt_user_qq").blur(function () {
    var qq_exp = /^\d{5,15}$/;
    var qq = $(this).val();
    if (qq == "") {
        $(this).showInfo_Error('QQ账号不能为空！');
    } else if (!qq.match(qq_exp)) {
        $(this).showInfo_Error("你输入的QQ账号有误！");
    } else {
        $.post("/register/checkQq", {
            qq: qq
        }, function (result) {
            if (result) {
                $("#txt_user_qq").showInfo_OK();
            } else {
                $("#txt_user_qq").showInfo_Error('该QQ账号已被注册,您可以直接登录！');
            }
        });
    }
});

$("#txt_user_username").blur(function () {
    var username_exp = /^[\u4E00-\u9FA5a-zA-Z0-9]{2,10}$/;
    var username = $(this).val();
    if (username == "") {
        $(this).showInfo_Error('昵称不能为空！');
    } else if (username.getBytes() < 4) {
        $(this).showInfo_Error('昵称不能低于2个汉字或4个字符！');
    } else if (username.getBytes() > 14) {
        $(this).showInfo_Error('昵称不能超过7个汉字或14个字符！');
    } else if (!username.match(username_exp)) {
        $(this).showInfo_Error('昵称只能包含数字、字母、汉字！');
    } else {
        $.post("/register/checkUserName", {
            username: username
        }, function (result) {
            if (result) {
                $("#txt_user_username").showInfo_OK();
            } else {
                $("#txt_user_username").showInfo_Error('该用户名已被注册！');
            }
        });
    }
});
$("#txt_user_userPassword").blur(function () {
    var userPassword = $(this).val();
    if (userPassword == "") {
        $(this).showInfo_Error('密码不能为空！');
    } else if (userPassword.length < 6) {
        $(this).showInfo_Error('密码长度不能低于6位！');
    } else if (userPassword.length > 15) {
        $(this).showInfo_Error('密码长度不能超过15位！');
    } else {
        $(this).showInfo_OK();
    }
});
$("#txt_repassword").blur(function () {
    var userPassword = $("#txt_user_userPassword").val();
    var rePassword = $(this).val();
    if (rePassword == "") {
        $(this).showInfo_Error('重复密码不能为空！');
    } else if (rePassword.length < 6) {
        $(this).showInfo_Error('重复密码长度不能低于6位！');
    } else if (rePassword.length > 15) {
        $(this).showInfo_Error('重复密码长度不能超过15位！');
    } else if (userPassword != rePassword) {
        $(this).showInfo_Error('两次输入的密码不一致');
    } else {
        $(this).showInfo_OK();
    }
});

var handlerPopup = function (captchaObj) {
    $("#btn_next").click(function () {
        if ($("#btn_next").attr("disabled") == "true") {
            return;
        }
        var validate = captchaObj.getValidate();
        alert(validate);
        if (!validate) {
            alert('请先完成验证！');
            return;
        }
        $('#form_reg').append('<input type="hidden" name="geetest_challenge" value="' + validate.geetest_challenge + '">');
        $('#form_reg').append('<input type="hidden" name="geetest_validate" value="' + validate.geetest_validate + '">');
        $('#form_reg').append('<input type="hidden" name="geetest_seccode" value="' + validate.geetest_seccode + '">');
        var post_data = $('#form_reg').serialize();
        $("#btn_next").attr("disabled", "true");
        $.ajax({
            url: "/register/first",
            type: "post",
            dataType: "json",
            data: $('#form_reg').serialize(),
            success: function (result) {
                $('#form_reg input[type=hidden]').remove();
                if (result.code == 0) {
                    location.href = "/mailverify.html?uid=" + result.data.id;
                } else {
                    alert(result.info);
                }
                $("#btn_next").attr("disabled", "false");
            }
        });
    });
    captchaObj.bindOn("#btn_next");
    captchaObj.appendTo(".reg-main");
};

$.ajax({
    url: "/misc/verify",
    type: "get",
    dataType: "json",
    success: function (data) {
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            product: "popup",
            offline: !data.success
        }, handlerPopup);
    }
});

jQuery.fn.extend({
    showInfo_Error: function (msg) {
        var html_str = '<div class="box-ver"><span><i class="iconfont icon-mima"></i>' + msg + '</span></div>';        $(this).nextAll().remove();
        $(this).after(html_str);
    },
    showInfo_OK: function (msg) {
        var html_str = '<div class="box-ver"><i class="iconfont icon-qq"></i></div>';
        $(this).nextAll().remove();
        $(this).after(html_str);
    }
});
String.prototype.getBytes = function () {
    var cArr = this.match(/[^\x00-\xff]/ig);
    var utf_len = cArr == null ? 0 : cArr.length;
    return this.length + utf_len;
}

