var is_login = function(){
	return $.cookie('uid') != null
};
var config = {staticBasePath:"http://static.yinpushop.com/www/",staticRootPath:"http://static.yinpushop.com/",basPath:"http://www.yinpushop.com/"};
if(is_login()){
	var search_html = '<div class="search"><input id="search_input" class="search-txt" type="text" placeholder="      搜索" autocomplete="off"><a href="javascript:void(0);" class="search-btn"></a></div>';
	$(".head-bd").append(search_html);

	$.ajax({
		url: "/user/check_maker",
		success: function (result) {
			var person_html = "";
			if(result.data) {
				if($.cookie('uid') == "1" || $.cookie('uid') == "2") {
                    person_html = '<div class="person"><a class="head"></a><label id="userName"></label><div class="drop_menu" ><i class="arrow-mes"></i><dl class="acc-list"><dd><a href="/9/musicmaker/applyList"><i class="ico-fabu"></i>管理后台</a></dd><dd><a href="/user/musicadd.shtml"><i class="ico-fabu"></i>发布音乐</a></dd><dd><a href="/u/'+$.cookie('uid')+'/"><i class="ico-myhome"></i>我的主页</a></dd><dd><a href="/user/offer.shtml"><i class="ico-order"></i>我的订单</a></dd><dd><a href="/user/index.shtml"><i class="ico-mysetup"></i>个人设置</a></dd><dd class="border"><a id="a_logout" href="javascript:;"><i class="ico-layout"></i>退出&gt;&gt;</a></dd></dl></div></div>';
                } else {
                    person_html = '<div class="person"><a class="head"></a><label id="userName"></label><div class="drop_menu" ><i class="arrow-mes"></i><dl class="acc-list"><dd><a href="/user/musicadd.shtml"><i class="ico-fabu"></i>发布音乐</a></dd><dd><a href="/u/'+$.cookie('uid')+'/"><i class="ico-myhome"></i>我的主页</a></dd><dd><a href="/user/offer.shtml"><i class="ico-order"></i>我的订单</a></dd><dd><a href="/user/index.shtml"><i class="ico-mysetup"></i>个人设置</a></dd><dd class="border"><a id="a_logout" href="javascript:;"><i class="ico-layout"></i>退出&gt;&gt;</a></dd></dl></div></div>';
                }
			} else {
                if ($.cookie('uid') == "1" || $.cookie('uid') == "2") {
                    person_html = '<div class="person"><a class="head"></a><label id="userName"></label><div class="drop_menu" ><i class="arrow-mes"></i><dl class="acc-list"><dd><a href="/9/musicmaker/applyList"><i class="ico-fabu"></i>管理后台</a></dd><dd><a href="/u/' + $.cookie('uid') + '/"><i class="ico-myhome"></i>我的主页</a></dd><dd><a href="/user/offer.shtml"><i class="ico-order"></i>我的订单</a></dd><dd><a href="/user/index.shtml"><i class="ico-mysetup"></i>个人设置</a></dd><dd class="border"><a id="a_logout" href="javascript:;"><i class="ico-layout"></i>退出&gt;&gt;</a></dd></dl></div></div>';
                } else {
                    person_html = '<div class="person"><a class="head"></a><label id="userName"></label><div class="drop_menu" ><i class="arrow-mes"></i><dl class="acc-list"><dd><a href="/u/' + $.cookie('uid') + '/"><i class="ico-myhome"></i>我的主页</a></dd><dd><a href="/user/offer.shtml"><i class="ico-order"></i>我的订单</a></dd><dd><a href="/user/index.shtml"><i class="ico-mysetup"></i>个人设置</a></dd><dd class="border"><a id="a_logout" href="javascript:;"><i class="ico-layout"></i>退出&gt;&gt;</a></dd></dl></div></div>';
                }
            }
            $(".head-bd").append(person_html);
            $(".drop_menu").hide();
            $("#a_logout").click(function(){
                user_login_out();
                location.reload();
            });
            var uid = $.cookie('uid')
            var img_path = "http://static.yinpushop.com/img_head/" + uid + ".jpg";
            $('.head').css("backgroundImage", "url("+img_path+")");
            $('#userName').html($.cookie("uname"));
            $(".person").hover(function(){$(".drop_menu").show();},function(){$(".drop_menu").hide();});
        }
	})
}else{
	var login_html = '<div class="cent-wrap"><div class="login-no-box cf"><div class="login-reg r"><a href="/register.html" class="btn-reg">立即注册</a><span>已有帐号？<a href="/login.html">立即登录</a></span></div><p class="l"><span>欢迎来到音艺网</span>赶紧来找你喜欢的音乐吧！</p></div></div>';
	var reg_html = '<div class="reg-info"><img src="http://static.yinpushop.com/www/style/img/reg.jpg"> <span><a href="/login.html">登陆</a> | <a href="/register.html" class="btn-reg">注册</a></span>	</div>';

	$("#header_banner").after(login_html);
	$(".head-bd").append(reg_html);

}
var user_login_out = function(){
	$.cookie('uid', null,{expires:-1,path:"/"});
	$.cookie('JSESSIONID', null,{expires:-1,path:"/"});
}
 