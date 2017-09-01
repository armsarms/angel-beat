// import Mock from 'mockjs';
$(document).ready(function() {
    $("#myCarousel").carousel('cycle');
    tabColor();
    textAjax();
    hammerCarousel();
})

function tabColor() {
    var $li = $('#tab li');
    var $ul = $('#content ul');
    $li.mouseover(function() {
        var $this = $(this);
        var $t = $this.index();
        $li.removeClass();
        $this.addClass('current');
        $ul.css('display', 'none');
        $ul.eq($t).css('display', 'block');
    })
}
function textAjax() {
    $.ajax({
    url: 'http://g.cn',
    dataType:'json'
    }).done(function(data, status, xhr){
      // var imgurl = data.image;
      // $(".shopli img").attr({
      //   "src":imgurl
      // })
      // console.log($(".shopli img").attr("src"))  
   console.log(JSON.stringify(data, null, 4))    
    });

}

function hammerCarousel(){
    var myElement = document.getElementById('myCarousel')
    var hm = new Hammer(myElement);
    hm.on("swipeleft",function(){
        $('#myCarousel').carousel('next')
    })
    hm.on("swiperight",function(){
        $('#myCarousel').carousel('prev')
    })
} 

