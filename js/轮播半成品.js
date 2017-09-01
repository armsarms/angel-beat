$(document).ready(function(){
  scrollTitle();
  mouseScorll();
  amiScorll();
})

var myScorll;

function amiScorll (){
  myScorll = setInterval(function(){
    translateImg(-324);
  },2000)
}

function scrollTitle (){

    $("#rightBtn").click(function(){         
        translateImg (-324);
    })
      $("#leftBtn").click(function(){         
        translateImg (324);
    })
}

function translateImg (a){
       var y = parseInt ($(".imgList").css("top")) + a + "px" ;
       if (y == "324px")
        y = "-972px";
      if (y == "-1296px")
        y = 0;
       console.log(y);
       $(".imgList").css({
        "top":y
       });
       var indexY = parseInt(y)/(-324);
       $(".indexList li").eq(indexY).css({"background-color":"#fff"});
}

function mouseScorll (){
  $(".indexList li").mouseenter(function(){
      var listIndex = $(this).index();
      var imgOffset = listIndex * "-324" + "px";
      console.log(imgOffset);
      $(".imgList").css({"top":imgOffset});
  })
 
}

function stopstart(){
  $(".imgList").mouseenter(console.log(1));
  $(".imgList").mouseleave(console.log(2));
}