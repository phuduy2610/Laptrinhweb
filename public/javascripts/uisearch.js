$("document").ready(function()
{
	let timer;
	$(".sb-icon-search").click(function(){
		$(".sb-search").css("width","40%");
		$(".sb-icon-search").css("background","#c0c0c0 url('../images/img-sprite.png') no-repeat 0px 1px");
		$(".sb-search-submit").css("z-index","90");
		$(".sb-icon-search").css("z-index","11");
		$(".sb-icon-search").css("color","#fff");
	})
	$("#search-form").submit(function(e){
		let value = $(".sb-search-input").val();
		let query = $("#filterForm").serialize();
		e.preventDefault();
		if(value!='')
		{
			window.location = '/search?keyword=' + value + "&" + query;
		}
		else
		{
			$(".sb-search").css("width","0%");
			$(".sb-search-submit").css("z-index","-1");
			$(".sb-icon-search").css("background","#000 url('../images/img-sprite.png') no-repeat 0px 1px");
			$(".sb-icon-search").css("z-index","90");
		}
	})
	$(".sb-search").hover(function(){
		clearTimeout(timer);
	},
	function(){
		timer = setTimeout(function(){
			$(".sb-search").css("width","0%");
			$(".sb-search-submit").css("z-index","-1");
			$(".sb-icon-search").css("background","#000 url('../images/img-sprite.png') no-repeat 0px 1px");
			$(".sb-icon-search").css("z-index","90");
		},2000);
	})
})


