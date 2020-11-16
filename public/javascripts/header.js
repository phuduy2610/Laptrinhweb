$(document).ready(function () {
    $(".dropdown img.flag").addClass("flagvisibility");

    $(".dropdown dt a").click(function () {
      $(".dropdown dd ul").toggle();
    });

    $(".dropdown dd ul li a").click(function () {
      var text = $(this).html();
      $(".dropdown dt a span").html(text);
      $(".dropdown dd ul").hide();
      $("#result").html("Selected value is: " + getSelectedValue("sample"));
    });

    function getSelectedValue(id) {
      return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown"))
        $(".dropdown dd ul").hide();
    });


    $("#flagSwitcher").click(function () {
      $(".dropdown img.flag").toggleClass("flagvisibility");
    });
    $(window).load(function () {
      $("#flexiselDemo3").flexisel({
        visibleItems: 3,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 3000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
          portrait: {
            changePoint: 480,
            visibleItems: 1
          },
          landscape: {
            changePoint: 640,
            visibleItems: 2
          },
          tablet: {
            changePoint: 768,
            visibleItems: 3
          }
        }
      });
    });
});


  
	