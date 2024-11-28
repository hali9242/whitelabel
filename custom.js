 $(document).ready(function(){
	 var tagcount = 0;
     //20 update swati
	$val = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	 var url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

var pieces = url.split("?");
	 //$.web_url = <?php substr( $val, 0, strrpos( $val, "?"))?>;

 	var href = window.location.pathname;
	var newurl = href.replace( "index.php", "" );

 	$.web_url = href.replace( "index.php", "" );
 	//$.web_url = 'http://www.devxekera.com/quiz/';
 	$.resources = 'index.php?action=resources';
 	var newURL = window.location.href;
 	$.new_url = newURL.split("&", 1)[0];
 	$.extn = '.php';
	 var alltypesactive = $('#select-all-types').attr('active');
	 if(alltypesactive == '1'){
		$('.selectalltypes').css({
			"background": "#02a69c",
			"color": "#fff",
			"cursor": "pointer"
		});
	 }
	 var allstagesactive = $('#select-stage-all').attr('active');
	 if(allstagesactive == '1'){
		$('#select-stage-all').css({
			"background": "#02a69c",
			"color": "#fff",
			"cursor": "pointer"
		});
	 }

	 function my_function(){
	 	//////alert($(this).attr("href"));
	 	////alert("HI");
    //window.history.pushState('page2', 'Title', '/page2.php');
return false;

} 
 	$(document).on('keyup', '#resource-search-input', function() {
       //Assigning search box value to javascript variable named as "name".
       var name = $('#resource-search-input').val();

/*
if(/^[a-zA-Z0-9- ]*$/.test(name) == false) {
	name = name.replace(/[^a-zA-Z ]/g, "");
}*/


if(/^[a-zA-Z][\sa-zA-Z0-9\[\]\(\)]*$/.test(name) == false) {
	//name = name.replace(/[^a-zA-Z0-9- ()]/g, "");
	name = name.replace(/^[a-zA-Z][\sa-zA-Z0-9\[\]\(\)]/g, "");
}

       var rtypes = $(this).attr("resourcetypes");
	   var lifestage = $(this).attr("lifestage");
	   var sortid = $(this).attr("sort");
	   var tags = $(this).attr("tags");
       $('.pagination-box-n').html('');
       $('.pagination-box').html('');

       var page = "1";
	   var alltags = $(".siderbar-small-category").attr('tags');
       //Validating, if "name" is empty.
       if (name == "") {
           //Assigning empty value to "display" div in "search.php" file.
           $("#display").html("");
       }
		$('.content-inner-page').addClass('hidden').fadeIn(2000);
		$('.search-nxt-click').removeAttr('resourcetypes').attr("resourcetypes", rtypes);
	//	$('.next-btn').removeAttr('type').attr("type", rtypes);
	//	$('.pg-btn').removeAttr('typevalue').attr("typevalue", rtypes);
		$('.siderbar-small-category').removeAttr('search').attr("search", name);
		$('#select-stage-all').removeAttr('search').attr("search", name);
		$('.lifestagec').removeAttr('search').attr("search", name);
		$('.sort-form-select').removeAttr('search').attr('search', name);
		$('#select-all-types').removeAttr('search').attr('search', name);
		$('.next-btn').removeAttr('search').attr('search', name);
		$('.pg-btn').removeAttr('search').attr('search', name);
		$('.prv-btn').removeAttr('search').attr('search', name);
		$('.tag-click').removeAttr('search').attr('search', name);
		$('.closetag').removeAttr('search').attr('search', name);
		
		$('.autocomplete-tag-input').removeAttr('search').attr('search', name);
		$('.autocomplete-tag-list').removeAttr('search').attr('search', name);


		
	    $('.resource-column-new').removeClass('hidden').fadeIn(5000).html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading search results</div>');
	    // if (history.pushState) {
		// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  | Resources", $.web_url+$.resources+'?query='+name+'&pager=1');
		// } else {
		// 	document.location.href = $.web_url+$.resources+'?query='+name+'&pager=1';
		// }
		if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(page));
			//document.location.href = getURLForCache(page);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(page);
		}
	    //var postData=JSON.stringify({"query": name,"pager": page, "resourcetypes": rtypes, "lifestage": lifestage,"sort":sortid, "tags": alltags});
	    var postData=JSON.stringify({"type": rtypes,"pager": page,"lifestage": lifestage,"search": name,"sort": sortid,"tags": alltags});
//alert(postData);
		//If name is not empty.
		var sync1 = $.ajax({  
			type: "POST",  
			//url: $.web_url+"includes/core/search_query"+$.extn,
			url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
			dataType: 'JSON', //this is what we expect our returned data as  
			data: {data:postData},
			cache: false,  
			success: function(new_data)
			{
				var len = new_data.length;
//				alert(len);
				$(".resource-column-new").html('');
				//$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			    for(var i=0; i < len; i++){
			    var title = new_data[i].title;
			    var catv = new_data[i].name;
			    var url = new_data[i].slug;
			    var tpage = new_data[i].pages;
			    var message = new_data[i].message;
			    if(catv == 'article'){
					var seo_dvalue = 'articles/';
				}else if(catv == 'calculator'){
					var seo_dvalue = 'calculators/';
				}else if(catv == 'video'){
					var seo_dvalue = 'videos/';
				}else if(catv == 'newsletter'){
					var seo_dvalue = 'newsletters/';
				}else if(catv == 'podcast'){
					var seo_dvalue = 'podcasts/';
				}else if(catv == 'toolkit'){
					var seo_dvalue = 'toolkits/';
				}else if(catv == 'booklet'){
					var seo_dvalue = 'booklets/';
				} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
				var tr_str = message;
				//console.log(tr_str);
			    $(".resource-column-new").append(tr_str);
			}
			 // Update the active class on pagination
			 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
			 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
			      
		}
	});
	var postDatan=JSON.stringify({"dvalue": name, "page": page, "resourcetypes": rtypes, "lifestage": lifestage,"sort":sortid, "tags": alltags});
//alert(postDatan);

	var sync2 = $.ajax({  
	type: "POST",  
	url: $.web_url+"includes/core/search_query_pagination"+$.extn,
	dataType: 'JSON', //this is what we expect our returned data as  
	data: {data:postDatan},
	cache: false,  
	success: function(new_data)
	{
		$("#pagination-box-n").removeClass('hidden').html(new_data.message);
		$("#pagination-box").addClass('hidden').html('');
	}
});
	$.when(sync1, sync2).done(function(result2, result1) {
		console.log('both call finished');
	});
});

$(document).on('click', '.search-nxt-click', function()
	{
		var type = $(this).attr("query");
		var pager = $(this).attr("pager");
		var resourcetypes = $(this).attr("resourcetypes");
		var lifestage = $(this).attr("lifestage");
		var sortid  = $(this).attr("sort");
		var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
		$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
		$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
		var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	var postData=JSON.stringify({"query": type, "pager": pager, "resourcetypes": resourcetypes, "lifestage": lifestage,"sort":sortid, "tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/resource_search_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data){
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeClass('hidden');
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
			    var message = new_data[i].message;
			    var tr_str = message;
			    var pagern = parseInt(pager) + 1;
			    $(".resource-column-new").append(tr_str);
			}
		}
	});
	var postDatan=JSON.stringify({"dvalue": type, "page": pager, "resourcetypes": resourcetypes, "lifestage": lifestage, "tags": alltags, "sort": sortid});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/search_query_pagination"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data){
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
	});
	$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
	});
			
});
$(document).on('click', '.pg-btn-search', function()
	{
		var type = $(this).attr("queryvalue");
		var pager = $(this).attr("pagerv");
		var resourcetypes = $(this).attr("resourcetypes");
		var lifestage = $(this).attr("lifestage");
		var sortid = $(this).attr("sort");
		var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
		$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
		$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
		var url = (window.location.href);
     	mnurl = url.split('&pager')[0];
      	murl = (mnurl);
      	// if (history.pushState) {
		// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
		// } else {
		// 	document.location.href = murl+'&pager='+pager;
		// }
		if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//document.location.href = getURLForCache(pager);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(pager);
		}
		var postData=JSON.stringify({"query": type, "pager": pager, "resourcetypes": resourcetypes, "lifestage": lifestage,"sort":sortid, "tags": alltags});
		var sync1 = $.ajax({  
			type: "POST",  
			url: $.web_url+"includes/core/resource_search_pagination_content"+$.extn,
			dataType: 'JSON', //this is what we expect our returned data as  
			data: {data:postData},
			cache: false,  
			success: function(new_data){
				var len = new_data.length;
				$(".resource-column-new").html('');
				$(".content-inner-page").addClass('hidden');
				$(".resource-column-new").removeClass('hidden');
				$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			    for(var i=0; i < len; i++){
			        var message = new_data[i].message;
			        var tr_str = message;
			        var pagern = parseInt(pager) + 1;
			        $(".resource-column-new").append(tr_str);
			    }
			}
		});
		var postDatan=JSON.stringify({"dvalue": type, "page": pager, "resourcetypes": resourcetypes, "lifestage": lifestage, "tags": alltags});
		var sync2 = $.ajax({  
			type: "POST",  
			url: $.web_url+"includes/core/search_query_pagination"+$.extn,
			dataType: 'JSON', //this is what we expect our returned data as  
			data: {data:postDatan},
			cache: false,  
			success: function(new_data){
				$("#pagination-box-n").removeClass('hidden').html(new_data.message);
				$("#pagination-box").addClass('hidden').html('');
			}
		});
		$.when(sync1, sync2).done(function(result2, result1) {
    		console.log('both call finished');
		});		
});

$(document).on('click', '.search-prv-click', function(){
	var type = $(this).attr("query");
	var pager = $(this).attr("pager");
	var resourcetypes = $(this).attr("resourcetypes");
	var lifestage = $(this).attr("lifestage");
	var sortid = $(this).attr("sort");
	var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
	$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
	$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
	//	document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	var postData=JSON.stringify({"query": type, "pager": pager, "resourcetypes": resourcetypes, "lifestage": lifestage, "sort":sortid, "tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/resource_search_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data){
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeClass('hidden');
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
			    var message = new_data[i].message;
			    var tr_str = message;
			    var pagern = parseInt(pager) + 1;
			    $(".resource-column-new").append(tr_str);
			}
		}
	});
	var postDatan=JSON.stringify({"dvalue": type, "page": pager, "resourcetypes": resourcetypes, "lifestage": lifestage, "tags": alltags});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/search_query_pagination"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data){
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
	});
	$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
	});	
});

$(document).on('click', '.next-btn', function()
{	
	var type = $(this).attr("type"); // Resource Type
	var rtype = $(this).attr("resourcetypes");
	//////alert(type);
	var pager = $(this).attr("pager"); // Page number
	var lifestage = $(this).attr("lifestage");  // Life Stage 
	var search = $(this).attr("search"); // Search Keywords
	var sortid = $(this).attr("sort"); // Search Keywords
	var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
	//var s1 = $('#resource-search-input').val();
	//if(s1)
	//////alert(s1);
	//alert(s1);

	     type = $('.lifestagec').attr("resourcetypes");
		 sortid = $('.siderbar-small-category').attr("sort");
		 lifestage  = $('.siderbar-small-category').attr("lifestage");
		 search  = $('.siderbar-small-category').attr("search");

	$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
	$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	var postData=JSON.stringify({"type": type, "pager": pager, "lifestage": lifestage, "search": search,"rtype":type,"sort":sortid, "tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data){
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".resource-column-new").show();
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeAttr('style');
			$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
			    var message = new_data[i].message;
			    var tr_str = message;
			    var pagern = parseInt(pager) + 1;
			    $(".resource-column-new").append(tr_str);
			    $(".pg-btn").removeAttr("typevalue").attr('typevalue', type);
			    $(".next-btn").removeAttr("search").attr('search', search).removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			}
			 // Update the active class on pagination
			 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
			 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
		}
	});
	var postDatan=JSON.stringify({"dvalue": type, "pager": pager, "lifestage": lifestage, "search": search,"sort":sortid, "tags": alltags});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/pagination_new_check"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data){
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
		 
	});
	$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
	});
			
});

$(document).on('click', '.prv-btn', function(){
	var type = $(this).attr("type");
	var pager = $(this).attr("pager");
	var lifestage = $(this).attr("lifestage");
	var search = $(this).attr("search");
	var sortid = $(this).attr("sort");
	var tags = $(this).attr("tags");

	type = $('.lifestagec').attr("resourcetypes");
	sortid = $('.siderbar-small-category').attr("sort");
	lifestage  = $('.siderbar-small-category').attr("lifestage");
	search  = $('.siderbar-small-category').attr("search");
	   var alltags = $(".siderbar-small-category").attr('tags');
	$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
	$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);

 $('#select-all-types').removeAttr('pager').attr('pager', pager);
		  $('#select-stage-all').removeAttr('pager').attr('pager', pager);
		  $('.siderbar-small-category').removeAttr('pager').attr('pager', pager);
		  $('.sort-form-select').removeAttr('page').attr('page', pager);
		  $('.lifestagec').removeAttr('page').attr('page', pager);
		  $('.tag-click').removeAttr('pager').attr('pager', pager);
		  $('.closetag').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-input').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-list').removeAttr('pager').attr('pager', pager);
	      $('#resource-search-input').removeAttr('page').attr('page', pager);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	var postData = JSON.stringify({"type": type, "pager": pager, "lifestage": lifestage, "search": search, "sort": sortid, "tags": alltags});
var sync1 = $.ajax({
    type: "POST",
    url: $.web_url + "includes/core/resource_pagination_content" + $.extn,
    dataType: 'JSON', // Expecting returned data as JSON
    data: {data: postData},
    cache: false,
    success: function(new_data) {
        var len = new_data.length;
        $(".resource-column-new").html('');
        $(".content-inner-page").addClass('hidden');
        $(".resource-column-new").removeClass('hidden');
        $("#cd-" + name + " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
        for (var i = 0; i < len; i++) {
            var message = new_data[i].message;
            var tr_str = message;
            var pagern = parseInt(pager) - 1;
            $(".resource-column-new").append(tr_str);
            $(".pg-btn").removeAttr("typevalue").attr('typevalue', type);
            $(".next-btn").removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
        }

	}

});

var postDatan = JSON.stringify({"dvalue": type, "pager": pager, "lifestage": lifestage, "search": search, "sort": sortid, "tags": alltags});
var sync2 = $.ajax({
    type: "POST",
    url: $.web_url + "includes/core/pagination_new_check" + $.extn,
    dataType: 'JSON',
    data: {data: postDatan},
    cache: false,
    success: function(new_data) {
        $("#pagination-box-n").removeClass('hidden').html(new_data.message);
        $("#pagination-box").addClass('hidden').html('');
    }
});

$.when(sync1, sync2).done(function(result2, result1) {
    console.log('both call finished');
});


			
});
$(document).on('keyup', '.autocomplete-tag-input', function()
{
	$('.tag-search-keyword').removeClass('hidden');
	var rtypes = $('.tagsbox').attr("resourcetypes");
	var lifestage = $('.tagsbox').attr("lifestage");
	var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
	var sortid =  $(this).attr("sort");
	var searchv = $(this).val();
	if(searchv == ''){
		$('.autocomplete-tag-list').autocomplete('close');
	}
	var postData=JSON.stringify({"keyword": searchv, "rtypes": rtypes, "lifestage": lifestage, "tags": alltags,"sort":sortid});
	$('.tag-search-keyword').css({
		"background-color": "#f6f6f6",
		"margin-top": "-20px",
		"z-index": "9999",
		"padding-top": "10px",
		"height":"190px",
		"overflow": "scroll"
	}).html('').html('<div style="clear: both;padding: 5px 15px 15px;">Loading..</div>').fadeIn(2000);
	$.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/auto_search_query"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data){
			$(".autocomplete-tag-list").show();
			var message = new_data.message;
			var tr_str = message;
			$('.tag-search-keyword').css({
				"background-color": "#f6f6f6",
				"margin-top": "-20px",
				"z-index": "9999",
				"padding-top": "10px",
				"height":"190px",
		"overflow": "scroll"
			}).html(tr_str).fadeIn(2000);
		}
	});
});

// var allstagesactive = $('#select-stage-all').attr('active');
// if(allstagesactive == '1'){
// 	$('#select-stage-all').css({
// 		"background": "#02a69c",
// 		"color": "#fff",
// 		"cursor": "pointer"
// 	});
// }
 $(document).on('click', '#select-all-types', function()
 {
	//$('#select-stage-all').attr('style', '');
	$('.resourcetype').attr('style', '');
	$('.tagicon').attr('style', '');
	$('.selectalltypes').css({
		"background": "#02a69c",
		"color": "#fff",
		"cursor": "pointer"
	});
	var lifestage = $(this).attr("lifestage");
	//////alert(lifestage);
	var dvalue = $(this).attr("dvalue");
	var rtypes = $(this).attr("dvalue");
	//////alert(dvalue);
	var pager = "1";
	var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
	var search = $(this).attr("search");
	var sort = $(this).attr("sort");
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	//$('.lifestagec').removeAttr('active').attr('active', '0');
	$('.lifestagec').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('#select-stage-all').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	//$('#select-stage-all').removeAttr('lifestage').attr('lifestage', '0');
	//$('#select-stage-all').removeAttr('active').attr('active', '1');
	$('#resource-search-input').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('.tag-click').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('.closetag').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('.siderbar-small-category').removeAttr('active').attr('active', '0');
	
	$('.autocomplete-tag-input').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('.autocomplete-tag-list').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	$('.sort-form-select').removeAttr('resourcetypes').attr('resourcetypes', '0');

	$('.next-btn').removeAttr('search').attr('search', search);
	$('.pg-btn').removeAttr('search').attr('search', search);
	$('.prv-btn').removeAttr('search').attr('search', search);
	$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
	$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}

	//var postData=JSON.stringify({"dvalue": dvalue, "lifestage": lifestage, "type": rtypes, "page": pager, "tags": tags, "search": search, "sort": sort, "tags": alltags});
	var postData=JSON.stringify({"type": rtypes,"pager": pager, "lifestage": lifestage, "search": search, "sort": sort,"tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		//url: $.web_url+"includes/core/resource_all_page"+$.extn,
		url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data)
		{
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".resource-column-new").show();
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeAttr('style');
			$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
				var title = new_data[i].title;
				var catv = new_data[i].posttype;
				var url = new_data[i].postname;
				var message = new_data[i].message;
				if(catv == 'article'){
					var seo_dvalue = 'articles/';
				}else if(catv == 'calculator'){
					var seo_dvalue = 'calculators/';
				}else if(catv == 'video'){
					var seo_dvalue = 'videos/';
				}else if(catv == 'newsletter'){
					var seo_dvalue = 'newsletters/';
				}else if(catv == 'podcast'){
					var seo_dvalue = 'podcasts/';
				}else if(catv == 'toolkit'){
					var seo_dvalue = 'toolkits/';
				}else if(catv == 'booklet'){
					var seo_dvalue = 'booklets/';
				} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
				var tr_str = message;
				$(".resource-column-new").append(tr_str);
			}
			 // Update the active class on pagination
			 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
			 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
		}
	});
	var postDatan=JSON.stringify({"dvalue": dvalue, "lifestage": lifestage, "type": rtypes, "page": pager, "tags": alltags, "search": search, "sort": sort, "tags": tags});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/pagination_check"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data)
		{
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
	});
	$.when(sync1, sync2).done(function(result2, result1) {
		console.log('both call finished');
	});
 });
 $(document).on('click', '#select-stage-all', function()
 {
	var dvalue = $(this).attr("dvalue");
	$('.lfstyle').attr('style', '');
	//$('.tagicon').attr('style', '');
	$('#select-stage-all').css({
		"background": "#02a69c",
		"color": "#fff",
		"cursor": "pointer"
	});
	
	var lifestage = $(this).attr("lifestage");
	//////alert(lifestage);
	var pager = "1";
	var tags = $(this).attr("tags");
	var search = $(this).attr("search");
	var sort = $(this).attr("sort");
	//var rtypes = $('.tagsbox').attr("resourcetypes");
	var rtypes = $(this).attr("resourcetypes");
	   var alltags = $(".siderbar-small-category").attr('tags');
	//////alert(rtypes);
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	$('.siderbar-small-category').removeAttr('lifestage').attr('lifestage', dvalue);
	$('.next-btn').removeAttr('type').attr('type', rtypes);
	$('.pg-btn').removeAttr('typevalue').attr('typevalue', rtypes);
	$('.prv-btn').removeAttr('typevalue').attr('type', rtypes);
	$('#select-all-types').removeAttr('lifestage').attr('lifestage', '0');
	$('#resource-search-input').removeAttr('lifestage').attr('lifestage', dvalue);
	$('.tag-click').removeAttr('lifestage').attr('lifestage', dvalue);
	$('.closetag').removeAttr('lifestage').attr('lifestage', dvalue);
	$('.lifestagec').removeAttr('active').attr('active', '0');
	
	$('.autocomplete-tag-input').removeAttr('lifestage').attr('lifestage', dvalue);
	$('.autocomplete-tag-list').removeAttr('lifestage').attr('lifestage', dvalue);
    //$('.selectalltypes').attr('style', '');
	$('.sort-form-select').removeAttr('lifestage').attr('lifestage', '0');
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
	$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	//var postData=JSON.stringify({"lifestage": lifestage,"dvalue": dvalue,"tags":tags,"search":search,"sort":sort,"rtype":rtypes, "tags": alltags});
	var postData=JSON.stringify({"type": rtypes,"pager": pager, "lifestage": dvalue, "search": search, "sort": sort,"tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		//url: $.web_url+"includes/core/resource_all_page"+$.extn,
		url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data)
		{
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".resource-column-new").show();
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeAttr('style');
			$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
				var title = new_data[i].title;
				var catv = new_data[i].posttype;
				var url = new_data[i].postname;
				var message = new_data[i].message;
				if(catv == 'article'){
					var seo_dvalue = 'articles/';
				}else if(catv == 'calculator'){
					var seo_dvalue = 'calculators/';
				}else if(catv == 'video'){
					var seo_dvalue = 'videos/';
				}else if(catv == 'newsletter'){
					var seo_dvalue = 'newsletters/';
				}else if(catv == 'podcast'){
					var seo_dvalue = 'podcasts/';
				}else if(catv == 'toolkit'){
					var seo_dvalue = 'toolkits/';
				}else if(catv == 'booklet'){
					var seo_dvalue = 'booklets/';
				} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
				var tr_str = message;
				$(".resource-column-new").append(tr_str);
	        }	
			 // Update the active class on pagination
			 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
			 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
		}
	});
	// "dvalue": dvalue, "lifestage": lifestage, "type": rtypes, "page": pager, "tags": tags, "search": search, "sort": sort
	var postDatan=JSON.stringify({"dvalue": rtypes, "lifestage": dvalue, "pager": pager, "search": search, "sort": sort, "tags": alltags});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/pagination_new_check"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data)
		{
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
	});
	$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
	});
 });
 function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
 function setQueryStringParameter(name, value, append=false) {
    const url = new URL(window.document.URL);
    if (append) url.searchParams.append(name, value);
    else url.searchParams.set(name, value);
    window.history.replaceState(null, "", url.toString());
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
/** sort order list starts **/
$(".sort-form-select").change(function(){
	var sortid = $(this).val();
	var lifestage = $(this).attr("lifestage");
	//////alert(lifestage);
	var dvalue = $(this).attr("dvalue");
	//var pager = $(this).attr("pager");
	var tags = $(this).attr("tags");
	var search = $(this).attr("search");
	var sort = $(this).attr("sort");
	var rtype = $(this).attr("resourcetypes");
	   var alltags = $(".siderbar-small-category").attr('tags');
	   var pager = $(".siderbar-small-category").attr('pager');
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);
    // if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// } else {
	// 	document.location.href = murl+'&pager='+pager;
	// }
	if(sortid == 'nothing'){

		if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//document.location.href = getURLForCache(pager);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(pager);
		}
	}else{
		$('.siderbar-small-category').removeAttr('sort').attr('sort', sortid);
		$('#select-all-types').removeAttr('sort').attr('sort', sortid);
		$('#resource-search-input').removeAttr('sort').attr('sort', sortid);
		$('#select-stage-all').removeAttr('sort').attr('sort', sortid);
		$('.lifestagec').removeAttr('sort').attr('sort', sortid);
		$('.next-btn').removeAttr('sort').attr('sort', sortid);
		$('.pg-btn').removeAttr('sort').attr('sort', sortid);
		$('.prv-btn').removeAttr('sort').attr('sort', sortid);
		$('.search-prv-click').removeAttr('sort').attr('sort', sortid);
		$('.search-nxt-click').removeAttr('sort').attr('sort', sortid);
		$('.pg-btn-search').removeAttr('sort').attr('sort', sortid);
		$('.tag-click').removeAttr('sort').attr('sort', sortid);
		$('.closetag').removeAttr('sort').attr('sort', sortid);
		
		$('.autocomplete-tag-input').removeAttr('sort').attr('sort', sortid);

		$('.autocomplete-tag-list').removeAttr('sort').attr('sort', sortid);
	

		if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//document.location.href = getURLForCache(pager);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(pager);
		}
		//console.log(lifestage);
		//var postData=JSON.stringify({"sort": sortid,"pager": "1","lifestage":lifestage, "query":search,"resourcetypes": rtype, "tags": alltags});
		var postData=JSON.stringify({"type": rtype,"pager":"1","lifestage": lifestage,"search": search,"sort": sortid,"tags": alltags});
		var sync1 = $.ajax({  
			type: "POST",  
			//url: $.web_url+"includes/core/resource_sort_search"+$.extn,
			url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
			dataType: 'JSON', //this is what we expect our returned data as  
			data: {data:postData},
			cache: false,  
			success: function(new_data)
			{
				//const new_data = Array.from(new Set(new_datas));
				const key = 'message';

const arrayUniqueByKey = [...new Map(new_data.map(item =>
  [item[key], item])).values()];

console.log(arrayUniqueByKey);
//var new_data = new_datas.filter((v, i, a) => a.indexOf(v) === i);
				//new_data = $.uniqueSort(new_data);
				//new_data = jQuery.unique( new_data );
				var len = new_data.length;
				//$('.resource-column-new').html('');
				$('.resource-column-new').html('');
				$(".content-inner-page").addClass('hidden');
				//$(".resource-column-new").removeClass('hidden');
				$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
				for(var i=0; i < len; i++){
					var title = new_data[i].title;
					var catv = new_data[i].posttype;
					var url = new_data[i].postname;
					var message = new_data[i].message;
					if(catv == 'article'){
						var seo_dvalue = 'articles/';
					}else if(catv == 'calculator'){
						var seo_dvalue = 'calculators/';
					}else if(catv == 'video'){
						var seo_dvalue = 'videos/';
					}else if(catv == 'newsletter'){
						var seo_dvalue = 'newsletters/';
					}else if(catv == 'podcast'){
						var seo_dvalue = 'podcasts/';
					}else if(catv == 'toolkit'){
						var seo_dvalue = 'toolkits/';
					}else if(catv == 'booklet'){
						var seo_dvalue = 'booklets/';
					} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
					var tr_str = message;
					$(".resource-column-new").removeClass('hidden').append(tr_str);
				}
				 // Update the active class on pagination
				 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
				 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
			}
		});
    }
        
			 var postDatan=JSON.stringify({"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtype, "tags": alltags});
			 var sync2 = $.ajax({  
										type: "POST",  
										url: $.web_url+"includes/core/pagination_sort_check"+$.extn,
										dataType: 'JSON', //this is what we expect our returned data as  
										data: {data:postDatan},
										cache: false,  
										success: function(new_data)
											{
												$("#pagination-box-n").removeClass('hidden').html(new_data.message);
												$("#pagination-box").addClass('hidden').html('');
											}
									});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
    });

function spliceValueParam(list, value) {
  return list.replace(new RegExp(",?" + value + ",?"), function(match) {
      var begin_comma = match.charAt(0) === ',',
          last_comma;

      if (begin_comma &&
          (last_comma = match.charAt(match.length - 1) === ',')) {
        return ',';
      }
      return '';
    });
};

/** sort order list ends **/
 $(document).on('click', '.closetag', function()
	{
		$('.autocomplete-tag-list').removeAttr('style');
		//////alert('close tag clicked');
		var tagname = $(this).attr("tagname");
		
		var tagid = $(this).attr("tagid");
		var tags = $(this).attr("tags");
		var rtypes = $('.lifestagec').attr("resourcetypes");
		var pager = $(".autocomplete-tag-list").attr('pages');


		$(".tgbtn"+tagid).remove();
		
		$(".next-btn").removeAttr('resourcetypes').attr('resourcetypes', rtypes);
		
		var sortid = $('.siderbar-small-category').attr("sort");
		var lifestage  = $('.siderbar-small-category').attr("lifestage");

	
		var search  = $('.siderbar-small-category').attr("search");
	   var alltags = $(".siderbar-small-category").attr('tags');
		//get current val
		
		var val = $(".siderbar-small-category").attr('tags');

		$(".next-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".next-btn").removeAttr('type').attr('type', rtypes);
		$(".next-btn").removeAttr('sort').attr('sort', sortid);
		$(".next-btn").removeAttr('search').attr('search', search);

		$(".pg-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".pg-btn").removeAttr('type').attr('type', rtypes);
		$(".pg-btn").removeAttr('sort').attr('sort', sortid);
		$(".pg-btn").removeAttr('search').attr('search', search);

		$(".prv-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".prv-btn").removeAttr('type').attr('type', rtypes);
		$(".prv-btn").removeAttr('sort').attr('sort', sortid);
		$(".prv-btn").removeAttr('search').attr('search', search);

		var newtag = spliceValueParam(val, tagid);
		var oldertags = $(".siderbar-small-category").attr('tagnames');
		oldertags =oldertags.replace(/%20/g, " ");
		var tagNames = spliceValueParam(oldertags, tagname);
		tagNames = tagNames.replace(/%20/g, " ");
		//console.log(newtag);
		//////alert("tags= " + newtag + " tagid=" +tagid);
		//tagcount -- ;
		// if(tagcount == 0){
		// 	if(tagNames != ''){
		// 		newtag = '';
		// 		tagNames = '';
		// 	}
			
		// }

		// if(tagNames != '' || tagNames == null || tagNames == '0' || tagNames == 0){
		// 			newtag = '';
		// 			tagNames = '';
		// 		}

		if(newtag == ''){
			//newtag0 = '0';
			var newtag0 = newtag;
			$(".siderbar-small-category").removeAttr('tagnames').attr('tagnames', tagNames);
			$(".siderbar-small-category").removeAttr('tags').attr('tags', newtag0);
			$(".next-btn-tags").removeAttr('tagid').attr('tagid', newtag0);
			$(".pg-btn-tags").removeAttr('tagid').attr('tagid', newtag0);


		$('#select-all-types').removeAttr('tags').attr('tags', newtag0);
		$('#resource-search-input').removeAttr('tags').attr('tags', newtag0);
		$('#select-stage-all').removeAttr('tags').attr('tags', newtag0);
		$('.lifestagec').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn').removeAttr('tags').attr('tags', newtag0);
		$('.search-prv-click').removeAttr('tags').attr('tags', newtag0);
		$('.search-nxt-click').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-search').removeAttr('tags').attr('tags', newtag0);
		$('.tag-click').removeAttr('tags').attr('tags', newtag0);
		$('.closetag').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', newtag0);
		}else{
			var newtag0 = newtag;
			$(".siderbar-small-category").removeAttr('tagnames').attr('tagnames', tagNames);
			$(".siderbar-small-category").removeAttr('tags').attr('tags', newtag0);
			$(".next-btn-tags").removeAttr('tagid').attr('tagid', newtag0);
			$(".pg-btn-tags").removeAttr('tagid').attr('tagid', newtag0);


		$('#select-all-types').removeAttr('tags').attr('tags', newtag0);
		$('#resource-search-input').removeAttr('tags').attr('tags', newtag0);
		$('#select-stage-all').removeAttr('tags').attr('tags', newtag0);
		$('.lifestagec').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn').removeAttr('tags').attr('tags', newtag0);
		$('.search-prv-click').removeAttr('tags').attr('tags', newtag0);
		$('.search-nxt-click').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-search').removeAttr('tags').attr('tags', newtag0);
		$('.tag-click').removeAttr('tags').attr('tags', newtag0);
		$('.closetag').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', newtag0);
		
		}
			
		//var url = $(this).attr("url");
		// $(".resource-column-new").html('');
		// $(".autocomplete-tag-list").html('');
		$(".content-inner-page").removeClass('hidden').html('');
		$(".tgbtn"+tagid).html('').addClass('hidden');
		$(".tag-search-keyword").html('').addClass('hidden');
		//setQueryStringParameter('tag', tagid);
		var tag = GetURLParameter('tag');
		$('.resource-column-new').html('').fadeIn(5000).html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	  	// if(newtag == ''){
	  	// 	var postData=JSON.stringify({"dvalue": '0',"rtype": rtypes,"lifestage": lifestage, "pager": pager, "search": search, "sort": sort, "tags": tags});
		// 	var sync1 = $.ajax({  
		// 		type: "POST",  
		// 		url: $.web_url+"includes/core/resource_all_page"+$.extn,
		// 		dataType: 'JSON', //this is what we expect our returned data as  
		// 		data: {data:postData},
		// 		cache: false,  
		// 		success: function(new_data)
		// 			{
		// 				var len = new_data.length;
		// 				$(".resource-column-new").html('');
		// 				$("#cd-"+newtag0+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
		// 	            for(var i=0; i < len; i++){
		// 	                var message = new_data[i].message;
		// 	                var tr_str = message;
		// 	                $(".resource-column-new").append(tr_str);
		// 	            }
		// 			}
		// 	});
		// 	 var postDatan=JSON.stringify({"dvalue": '0', "lifestage": lifestage, "rtypes": rtypes, "tags": tags,"sort":sortid, "search": search});
		// 	 var sync2 = $.ajax({  
		// 		type: "POST",  
		// 		url: $.web_url+"includes/core/pagination_check"+$.extn,
		// 		dataType: 'JSON', //this is what we expect our returned data as  
		// 		data: {data:postDatan},
		// 		cache: false,  
		// 		success: function(new_data)
		// 		{
		// 			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
		// 			$("#pagination-box").addClass('hidden').html('');
		// 		}
		// 	});
	  	// 	}else
			  
		// 	  {
			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//	document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}


var locationValue = (new URL(location.href)).searchParams.get('tags');
//alert(locationValue);
        if(locationValue == ''){
	$('.tagcount').html("0 selected");
} else {
		var tagsValue = (new URL(location.href)).searchParams.get('tags').split(",");
	var tagArrayLength = tagsValue.length;
	$('.tagcount').html(tagArrayLength+ " selected");
}
				if(newtag == ''){
					newtag0 = '0';
					//////alert(" in o case");
				} 
	  			//var postData=JSON.stringify({"dvalue": newtag0, "lifestage": lifestage, "rtypes": rtypes, "tags": alltags,"sort":sortid, "search": search});
	  			var postData=JSON.stringify({"type": rtypes,"pager": pager,"lifestage": lifestage,"search": search,"sort": sortid,"tags": newtag0});
				var sync1 = $.ajax({  
					type: "POST",  
					url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
					//url: $.web_url+"includes/core/resource_tag_search"+$.extn,
					dataType: 'JSON', //this is what we expect our returned data as  
					data: {data:postData},
					cache: false,  
					success: function(new_data)
						{
							/*if(new_data=='null'){
								alert("null data");

							}
							alert(new_data);*/
							if(new_data == null){
								//alert("no data");*8uhnb                     	
								$('.resource-column-new').hide();	
								//$('.resource-column-new').css("display","none");	
							} else {
							var len = new_data.length;
							//$('.resource-column-new').html('');
							$('.resource-column-new').html('');
							$(".content-inner-page").addClass('hidden');
							//$(".resource-column-new").removeClass('hidden');
							$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
							for(var i=0; i < len; i++){
								var message = new_data[i].message;
								var tr_str = message;
								$(".resource-column-new").removeClass('hidden').append(tr_str);
							}
						}
						 // Update the active class on pagination
						 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
						 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
					}
			});
			 //var postDatan=JSON.stringify({"dvalue":"tags","page":"1","tagid": newtag0, "lifestage": lifestage, "rtypes": rtypes, "tags": alltags,"sort":sortid, "search": search});
			 //var postDatan=JSON.stringify({"dvalue":"tags","tagid": newtag0,"page": pager,"tags": newtag0,"sortid": sortid,"lifestage": lifestage,"search": search,"rtype": rtypes});
			 var postDatan=JSON.stringify({"sortid": sortid,"lifestage": lifestage,"search": search,"rtype": rtypes,"tags": newtag0});
			 var sync2 = $.ajax({  
				type: "POST",  
				//url: $.web_url+"includes/core/pagination_tags_check"+$.extn,
				url: $.web_url+"includes/core/pagination_sort_check"+$.extn,
				//url: $.web_url+"includes/core/pagination_tags_n_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					$("#pagination-box-n").removeClass('hidden').html(new_data.message);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
	  		//}
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
 });
  function parseURL(url) {
    const [domain, rest] = url.split("?");
    const args = {};
    for(const [k, v] of rest.split("&").map(pair => pair.split("=")))
      args[k] = v;
    return { domain, args };
 }
 //disable enter on input tag starts
 $('#resource-search-input').keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
    }
});
 var input = $('.autocomplete-tag-input');
  input.on('keydown', function() {
    var key = event.keyCode || event.charCode;

    if( key == 8 || key == 46 ){
        $('.tag-search-keyword').html('').removeAttr('style');
    }
  });
 //disable enter on input tag ends 


 function getURLForCache(page){

	    var rtypes = $('.lifestagec').attr("resourcetypes");
		var sortid = $('.siderbar-small-category').attr("sort");
		var lifestage  = $('.siderbar-small-category').attr("lifestage");
		var search  = $('.siderbar-small-category').attr("search");
		var alltags = $(".siderbar-small-category").attr('tags');
		var alltagsName = $(".siderbar-small-category").attr('tagnames');
		if(lifestage == null || lifestage ==''|| lifestage =='undefined' || lifestage == 1 || lifestage == '1'){
			lifestage ='0';
		}
		if(alltagsName == null || alltagsName ==''|| alltagsName =='undefined'){
			alltagsName ='0';
		}
		if(page == null || page ==''|| page =='undefined' || page == 0 || page == '0' ){
			return $.new_url+'&resourcetypes='+rtypes+'&lifestage='+lifestage+'&sortid='+sortid+'&search='+search+'&tags='+alltags+'&page='+1+'&tagnames='+alltagsName;
		//	return $.web_url+$.resources+'?resourcetypes='+rtypes+'&lifestage='+lifestage+'&sortid='+sortid+'&search='+search+'&page='+1;
console.log("1214");
		}else {
			return $.new_url+'&resourcetypes='+rtypes+'&lifestage='+lifestage+'&sortid='+sortid+'&search='+search+'&tags='+alltags+'&page='+page+'&tagnames='+alltagsName;
		//	return $.web_url+$.resources+'?resourcetypes='+rtypes+'&lifestage='+lifestage+'&sortid='+sortid+'&search='+search+'&page='+page;
console.log("1218");
		}
		 }
 
 $(document).on('click', '.tag-click', function()
 	{
		var lifestage = $('.tagsbox').attr("lifestage");
		$('.autocomplete-tag-list').show();
		$('.autocomplete-tag-input').html('');
		$('.autocomplete-tag-input').text('');
		$('.autocomplete-tag-input').val('');
		var tagidn = $(this).attr("tagid");
/*
alert($(this).attr('id'));
		if($(this).attr('id') == "undefined"){
			$(this).attr('id','#tgId-'+tagidn);
		} else {
			if($('#tgId-'+tagidn).attr('active') == "undefined"){
				$('#tgId-'+tagidn).attr('active','1');
			} else if($('#tgId-'+tagidn).attr('active') == "1"){
				$('#tgId-'+tagidn).removeAttr('active').attr('active','0');
			} else {
				$('#tgId-'+tagidn).removeAttr('active').attr('active','1');
			}
		}*/

		if($(this).attr("dvalue") != null || $(this).attr("dvalue") != ''){
			 tagidn = $(this).attr("dvalue");
		} else {
			 tagidn = $(this).attr("tagid");
		}
/*
		$.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    return results[1] || 0;
		}

		var TagArray = $.urlParam('tags');
		var array = TagArray.split(",");
		
		$.each(array,function(i, keyword){
			if(tagidn == keyword){
				var mytoggle = "ON";
			} else {
				var mytoggle = "OFF";
			}
		})*/
var locationValue = (new URL(location.href)).searchParams.get('tags');
//alert(locationValue);

	if(locationValue == null){
		var array = tagidn;
	} else {
		var array = locationValue.split(",");
	}
console.log($('span.tgbtn'+tagidn).length);
console.log($('span.tgbtn'+tagidn).hasClass("hidden"));
//if(jQuery.inArray(tagidn,array) == -1){tgbtn46	$('span.tgbtn'+tagidn).length
if($('span.tgbtn'+tagidn).length == 0 || $('span.tgbtn'+tagidn).hasClass("hidden") == "false"){
    
		//if(mytoggle == "OFF"){}
		$('.tag-search-keyword').html('').removeAttr('style');
	   var alltags = $(".siderbar-small-category").attr('tags');
		var typestag = $('.siderbar-small-category').attr("tags");
		var tagname = $(this).attr("tagname");
		var alltagsName = $(".siderbar-small-category").attr('tagnames');

		// var valuen = tagidn+',';
		//alert(alltagsName);
		//tagcount ++;
		if(typestag == '0'){
			//var typestag = $('.siderbar-small-category').attr("tags");
			var valuen = tagidn;
			//////alert(valuen);
			$('.siderbar-small-category').removeAttr("tagnames").attr("tagnames", tagname);
			$('.siderbar-small-category').removeAttr("tags").attr("tags", valuen);
			$('.lifestagec').removeAttr("tags").attr("tags", valuen);
			$('#resource-search-input').removeAttr("tags").attr("tags", valuen);
			$('.sort-form-select').removeAttr("tags").attr("tags", valuen);
		$('#select-all-types').removeAttr('tags').attr('tags', valuen);
		$('#resource-search-input').removeAttr('tags').attr('tags', valuen);
		$('#select-stage-all').removeAttr('tags').attr('tags', valuen);
		$('.next-btn').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn').removeAttr('tags').attr('tags', valuen);
		$('.prv-btn').removeAttr('tags').attr('tags', valuen);
		$('.search-prv-click').removeAttr('tags').attr('tags', valuen);
		$('.search-nxt-click').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn-search').removeAttr('tags').attr('tags', valuen);
		$('.tag-click').removeAttr('tags').attr('tags', valuen);
		$('.closetag').removeAttr('tags').attr('tags', valuen);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', valuen);
		$('.next-btn-tags').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', valuen);

		}else{
			var vn = $('.siderbar-small-category').attr("tags");
			alltagsName = alltagsName.replace(/%20/g, " ");
			tagname = tagname.replace(/%20/g, " ");

           if (!alltagsName.includes(tagname) || !vn.includes(tagidn)){
		if(vn == '' || vn == null){
                        var valuen = tagidn;
                        var tagnameAll = tagname;
		} else {	
			var valuen = tagidn+','+vn;
			var tagnameAll = tagname +','+alltagsName;
		}

			$('.siderbar-small-category').removeAttr("tagnames").attr("tagnames", tagnameAll);
			$('.siderbar-small-category').removeAttr("tags").attr("tags", valuen);
		   }
		

			$('.lifestagec').removeAttr("tags").attr("tags", valuen);
			$('#resource-search-input').removeAttr("tags").attr("tags", valuen);
			$('.sort-form-select').removeAttr("tags").attr("tags", valuen);
			$('.sort-form-select').removeAttr("tags").attr("tags", valuen);
		$('#select-all-types').removeAttr('tags').attr('tags', valuen);
		$('#resource-search-input').removeAttr('tags').attr('tags', valuen);
		$('#select-stage-all').removeAttr('tags').attr('tags', valuen);
		$('.next-btn').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn').removeAttr('tags').attr('tags', valuen);
		$('.prv-btn').removeAttr('tags').attr('tags', valuen);
		$('.search-prv-click').removeAttr('tags').attr('tags', valuen);
		$('.search-nxt-click').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn-search').removeAttr('tags').attr('tags', valuen);
		$('.tag-click').removeAttr('tags').attr('tags', valuen);
		$('.closetag').removeAttr('tags').attr('tags', valuen);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', valuen);
		$('.next-btn-tags').removeAttr('tags').attr('tags', valuen);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', valuen);

		}


		$(".next-btn-tags").removeAttr('tagid').attr('tagid', valuen);
		$(".pg-btn-tags").removeAttr('tagid').attr('tagid', valuen);
		//var dvalue = $(this).attr("dvalue");
		var tagname = $(this).attr("tagname");
		var tags = $(this).attr("tags");
		var rtype = $(this).attr("resourcetypes");
		//var url = $(this).attr("url");
		var dvalue = $(this).attr("dvalue");
		var pager = "1";
		var type = $(this).attr("type");
//		var url = (window.location.href);
		var new_val = $(this).attr("dvalue");
		var cur_val = GetURLParameter('tag');
		var rtypes = $('.lifestagec').attr("resourcetypes");
		var sortid = $('.siderbar-small-category').attr("sort");
		var lifestage  = $('.siderbar-small-category').attr("lifestage");
		var search  = $('.siderbar-small-category').attr("search");

		/*var url2 = (window.location.href);
		mnurl = url2.split('&pager')[0];
		murl = (mnurl);
*/
		  $('#select-all-types').removeAttr('pager').attr('pager', pager);
		  $('#select-stage-all').removeAttr('pager').attr('pager', pager);
		  $('.siderbar-small-category').removeAttr('pager').attr('pager', pager);
		  $('.sort-form-select').removeAttr('page').attr('page', pager);
		  $('.lifestagec').removeAttr('page').attr('page', pager);
		  $('.tag-click').removeAttr('pager').attr('pager', pager);
		  $('.closetag').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-input').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-list').removeAttr('pager').attr('pager', pager);
	      $('#resource-search-input').removeAttr('page').attr('page', pager);



var tagsLists= (new URL(location.href)).searchParams.get('tags');
//alert(tagsLists);
/*
if(typestag == ''){

	$('.tagcount').html("1 selected");
} else {*/

var locationValue = (new URL(location.href)).searchParams.get('tags');
//alert(locationValue);

        if(locationValue != null){

		var tagsValue = (new URL(location.href)).searchParams.get('tags').split(",");

	var tagArrayLength = tagsValue.length + 1;
	$('.tagcount').html(tagArrayLength+ " selected");
} else {
        $('.tagcount').html("1 selected");
}
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);

    if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
	if(dvalue != "0" || tagname != "0"){
		$(".autocomplete-tag-list").append('<span class="tag ng-scope tgbtn'+dvalue+'"><span tagid="'+dvalue+'" tagname="'+tagname+'" class="tagbtn">'+tagname+'</span><div class="close closetag" tagid="'+dvalue+'" url="'+url+'" tagname="'+tagname+'"></div></span>');
	}
		$('.tagsbox').val('').removeAttr('checked').removeAttr('selected');
		//var postData=JSON.stringify({"dvalue": valuen, "lifestage": lifestage, "rtypes": rtypes, "tags": alltags,"sort":sortid,"search": search,});
		var postData=JSON.stringify({"dvalue": valuen, "lifestage": lifestage, "rtypes": rtypes, "tags": valuen,"sort":sortid,"search": search,});
		var sync1 = $.ajax({  
			type: "POST",  
			url: $.web_url+"includes/core/resource_tag_search"+$.extn,
			dataType: 'JSON', //this is what we expect our returned data as  
			data: {data:postData},
			cache: false,  
			success: function(new_data)
			{
				//alert(new_data+'--val');
				if(new_data == null){
					$('.resource-column-new').hide();	
				} else {
				var len = new_data.length;
				$(".resource-column-new").html('');
				$(".content-inner-page").addClass('hidden');
				$(".resource-column-new").removeClass('hidden');
				$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			    for(var i=0; i < len; i++){
			        var message = new_data[i].message;
			        var tr_str = message;
			        $(".resource-column-new").append(tr_str);
			    }
			}
			}
			});
			 var postDatan=JSON.stringify({"dvalue": 'tags', "page": pager, "tagid": valuen, "tags": alltags,  "lifestage": lifestage, "rtypes": rtypes, "sort":sortid, "search": search});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_tags_n_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
} else {
	 //alert("OLD TAG");
	
	$('.autocomplete-tag-list').removeAttr('style');
		//////alert('close tag clicked');
		var tagname = $(this).attr("tagname");
		
		var tagid = $(this).attr("tagid");
		var tags = $(this).attr("tags");
		var rtypes = $('.lifestagec').attr("resourcetypes");
		var pager = $(".autocomplete-tag-list").attr('pages');



		if($(this).attr("dvalue") != null || $(this).attr("dvalue") != ''){
			 tagids = $(this).attr("dvalue");
		} else {
			 tagids = $(this).attr("tagid");
		}

		$(".next-btn").removeAttr('resourcetypes').attr('resourcetypes', rtypes);
		
		var sortid = $('.siderbar-small-category').attr("sort");
		var lifestage  = $('.siderbar-small-category').attr("lifestage");

	
		var search  = $('.siderbar-small-category').attr("search");
	   var alltags = $(".siderbar-small-category").attr('tags');
		//get current val
		
		var val = $(".siderbar-small-category").attr('tags');
		//var val = $(this).attr("dvalue");

		$(".next-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".next-btn").removeAttr('type').attr('type', rtypes);
		$(".next-btn").removeAttr('sort').attr('sort', sortid);
		$(".next-btn").removeAttr('search').attr('search', search);

		$(".pg-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".pg-btn").removeAttr('type').attr('type', rtypes);
		$(".pg-btn").removeAttr('sort').attr('sort', sortid);
		$(".pg-btn").removeAttr('search').attr('search', search);

		$(".prv-btn").removeAttr('lifestage').attr('lifestage', lifestage);
		$(".prv-btn").removeAttr('type').attr('type', rtypes);
		$(".prv-btn").removeAttr('sort').attr('sort', sortid);
		$(".prv-btn").removeAttr('search').attr('search', search);

		//var newtag = spliceValueParam(val, tagid);
		var newtagVal = spliceValueParam(val, tagid);
		if(newtag == ''){
			var newtag = spliceValueParam(val, tagid);
		} else {
			var newtag = spliceValueParam(val, tagids);
		}
		var newtags = spliceValueParam(tagid, val);
		var oldertags = $(".siderbar-small-category").attr('tagnames');
		oldertags =oldertags.replace(/%20/g, " ");
		var tagNames = spliceValueParam(oldertags, tagname);
		tagNames = tagNames.replace(/%20/g, " ");
		console.log(newtag);
		console.log(tagNames);
		//////alert("tags= " + newtag + " tagid=" +tagid);
		//tagcount -- ;
		// if(tagcount == 0){
		// 	if(tagNames != ''){
		// 		newtag = '';
		// 		tagNames = '';
		// 	}
			
		// }

		// if(tagNames != '' || tagNames == null || tagNames == '0' || tagNames == 0){
		// 			newtag = '';
		// 			tagNames = '';
		// 		}
		if(newtag == ''){
			//var newtag0 = tagid;
			var newtag0 = 0;
			//var newtag0 = newtag;
			$(".siderbar-small-category").removeAttr('tagnames').attr('tagnames', tagNames);
			$(".siderbar-small-category").removeAttr('tags').attr('tags', newtag0);
			$(".next-btn-tags").removeAttr('tagid').attr('tagid', newtag0);
			$(".pg-btn-tags").removeAttr('tagid').attr('tagid', newtag0);


		$('#select-all-types').removeAttr('tags').attr('tags', newtag0);
		$('#resource-search-input').removeAttr('tags').attr('tags', newtag0);
		$('#select-stage-all').removeAttr('tags').attr('tags', newtag0);
		$('.lifestagec').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn').removeAttr('tags').attr('tags', newtag0);
		$('.search-prv-click').removeAttr('tags').attr('tags', newtag0);
		$('.search-nxt-click').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-search').removeAttr('tags').attr('tags', newtag0);
		$('.tag-click').removeAttr('tags').attr('tags', newtag0);
		$('.closetag').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', newtag0);
		}else{
			var newtag0 = newtag;
			$(".siderbar-small-category").removeAttr('tagnames').attr('tagnames', tagNames);
			$(".siderbar-small-category").removeAttr('tags').attr('tags', newtag0);
			$(".next-btn-tags").removeAttr('tagid').attr('tagid', newtag0);
			$(".pg-btn-tags").removeAttr('tagid').attr('tagid', newtag0);


		$('#select-all-types').removeAttr('tags').attr('tags', newtag0);
		$('#resource-search-input').removeAttr('tags').attr('tags', newtag0);
		$('#select-stage-all').removeAttr('tags').attr('tags', newtag0);
		$('.lifestagec').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn').removeAttr('tags').attr('tags', newtag0);
		$('.search-prv-click').removeAttr('tags').attr('tags', newtag0);
		$('.search-nxt-click').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-search').removeAttr('tags').attr('tags', newtag0);
		$('.tag-click').removeAttr('tags').attr('tags', newtag0);
		$('.closetag').removeAttr('tags').attr('tags', newtag0);
		$('.prv-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.next-btn-tags').removeAttr('tags').attr('tags', newtag0);
		$('.pg-btn-tags ').removeAttr('tags').attr('tags', newtag0);
		
		}
			
		//console.log(newstring);
		//var url = $(this).attr("url");
		// $(".resource-column-new").html('');
		// $(".autocomplete-tag-list").html('');
		$(".content-inner-page").removeClass('hidden').html('');
		//$(".tgbtn"+tagids).html('').addClass('hidden');
		$(".tgbtn"+tagids).remove();
		$(".tag-search-keyword").html('').addClass('hidden');
		//setQueryStringParameter('tag', tagid);
		var tag = GetURLParameter('tag');
		$('.resource-column-new').html('').fadeIn(5000).html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	  	// if(newtag == ''){
	  	// 	var postData=JSON.stringify({"dvalue": '0',"rtype": rtypes,"lifestage": lifestage, "pager": pager, "search": search, "sort": sort, "tags": tags});
		// 	var sync1 = $.ajax({  
		// 		type: "POST",  
		// 		url: $.web_url+"includes/core/resource_all_page"+$.extn,
		// 		dataType: 'JSON', //this is what we expect our returned data as  
		// 		data: {data:postData},
		// 		cache: false,  
		// 		success: function(new_data)
		// 			{
		// 				var len = new_data.length;
		// 				$(".resource-column-new").html('');
		// 				$("#cd-"+newtag0+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
		// 	            for(var i=0; i < len; i++){
		// 	                var message = new_data[i].message;
		// 	                var tr_str = message;
		// 	                $(".resource-column-new").append(tr_str);
		// 	            }
		// 			}
		// 	});
		// 	 var postDatan=JSON.stringify({"dvalue": '0', "lifestage": lifestage, "rtypes": rtypes, "tags": tags,"sort":sortid, "search": search});
		// 	 var sync2 = $.ajax({  
		// 		type: "POST",  
		// 		url: $.web_url+"includes/core/pagination_check"+$.extn,
		// 		dataType: 'JSON', //this is what we expect our returned data as  
		// 		data: {data:postDatan},
		// 		cache: false,  
		// 		success: function(new_data)
		// 		{
		// 			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
		// 			$("#pagination-box").addClass('hidden').html('');
		// 		}
		// 	});
	  	// 	}else
			  
		// 	  {
			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//	document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}

				if(newtag == ''){
					newtag0 = 0;
					//newtag0 = tagid;
					//////alert(" in o case");
				} 
				//alert(newtag);


var locationValue = (new URL(location.href)).searchParams.get('tags');
//alert(locationValue);
        if(locationValue == ''){
        $('.tagcount').html("0 selected");
} else {
                var tagsValue = (new URL(location.href)).searchParams.get('tags').split(",");
        var tagArrayLength = tagsValue.length;
        $('.tagcount').html(tagArrayLength+ " selected");
}

				//alert(newtag0);
	  			var postData=JSON.stringify({"dvalue": newtag0, "lifestage": lifestage, "rtypes": rtypes, "tags": alltags,"sort":sortid, "search": search});
				var sync1 = $.ajax({  
					type: "POST",  
					url: $.web_url+"includes/core/resource_tag_search"+$.extn,
					dataType: 'JSON', //this is what we expect our returned data as  
					data: {data:postData},
					cache: false,  
					success: function(new_data)
						{
							/*if(new_data=='null'){
								alert("null data");

							}
							alert(new_data);*/
							if(new_data == null){
								//alert("no data");*8uhnb                     	
								$('.resource-column-new').hide();	
								//$('.resource-column-new').css("display","none");	
							} else {
		 					var len = new_data.length;
		 					//$('.resource-column-new').html('');
		 					$('.resource-column-new').html('');
		 					$(".content-inner-page").addClass('hidden');
		 					//$(".resource-column-new").removeClass('hidden');
		 					$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
		 					for(var i=0; i < len; i++){
		 						var message = new_data[i].message;
		 						var tr_str = message;
		 						$(".resource-column-new").removeClass('hidden').append(tr_str);
		 					}
		 				}
		 			}
		 	});
		 	 var postDatan=JSON.stringify({"dvalue":"tags","page":"1","tagid": newtag0, "lifestage": lifestage, "rtypes": rtypes, "tags": alltags,"sort":sortid, "search": search});
		 	 var sync2 = $.ajax({  
		 		type: "POST",  
		 		url: $.web_url+"includes/core/pagination_tags_check"+$.extn,
		 		dataType: 'JSON', //this is what we expect our returned data as  
		 		data: {data:postDatan},
		 		cache: false,  
		 		success: function(new_data)
		 		{
	
		 			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
		 			$("#pagination-box").addClass('hidden').html('');
		 		}
		 	});
	 //  		}
		 $.when(sync1, sync2).done(function(result2, result1) {
     	console.log('both call finished');
		 });
}
	});
	$(document).on('click', '.life-stage-siderbar', function()
		{
		  	var dvalue = $(this).attr("dvalue");
		  	var pager = $(this).attr("pager");
		 	var inform = $(this).attr("inform");
			var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
			//////alert(pager);
			//var postData=JSON.stringify({"dvalue": dvalue});
			$('.content-inner-page').addClass('hidden').fadeIn(2000);
			$('.resource-column-new').removeClass('hidden').fadeIn(5000).html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			// if (history.pushState) {
			// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", $.web_url+$.resources+'?type='+dvalue+'&pager=1');
			// } else {
			// 	document.location.href = $.web_url+$.resources+'?type='+dvalue+'&pager=1';
			// }
			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
	
				//document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}
	     // var postData=JSON.stringify({"dvalue": dvalue, "action": inform, "tags": alltags});
	      var postData=JSON.stringify({"dvalue": dvalue, "action": inform, "tags": alltags});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/resource_search"+$.extn,
				//url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$("#cd-"+dvalue+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].dvalue;
			                var url = new_data[i].slug;
			                var tpage = new_data[i].pages;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                $(".resource-column-new").append(tr_str);
			            }
						 // Update the active class on pagination
						 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
						 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
					}
			});
			 var postDatan=JSON.stringify({"dvalue": dvalue, "page": pager, "tags": alltags});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_new_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					$("#pagination-box-n").removeClass('hidden').html(new_data.message);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
	});		
	$(document).on('click', '.siderbar-small-category', function()
		{
			//////alert('this clicked');
		  var dvalue = $(this).attr("dvalue");
		  var pager = "1";
		  var inform = $(this).attr("inform");
		  //var active = $(this).attr("active");
		  var lifestage = $(this).attr("lifestage");
		  var search = $(this).attr("search");
		  var sort = $(this).attr("sort");
		  var tags = $(this).attr("tags");
	   var alltags = $(".siderbar-small-category").attr('tags');
	   var active = $('#cb-'+dvalue).attr('active');

		  //alert(dvalue);

		  $('#select-stage-all').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.siderbar-small-category').removeAttr('active').attr('active', '0');
		  $('.sort-form-select').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  //$('.fake-label').attr('style', '');
	        $('.selectalltypes').attr('style', '');
	        $('.resourcetype').attr('style', '');
	        //$('#select-stage-all').attr('style', '');
	        $('.tagicon').attr('style', '');
		  //////alert(pager);
		  //var postData=JSON.stringify({"dvalue": dvalue});
	      $('.lifestagec').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.tag-click').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.closetag').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.autocomplete-tag-input').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.autocomplete-tag-list').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		 
	      $('.tagsbox').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	      
		  $('.next-btn').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
		  $('.next-btn').removeAttr('type').attr('type', dvalue);
		 // ////alert(dvalue);
		  $('.pg-btn').removeAttr('typevalue').attr('typevalue', dvalue);
	      $('prv-btn').removeAttr('type').attr('type', dvalue);
		  $('prv-btn').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	      $('#resource-search-input').removeAttr('resourcetypes').attr('resourcetypes', dvalue);
	      $('.content-inner-page').addClass('hidden').fadeIn(2000);
		  if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
			//document.location.href = getURLForCache(pager);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(pager);
		}
		//alert(active);
	      if(active > 0){
$( "#select-all-types" ).trigger( "click" );
	      	/*
var query = window.location.href;
window.location.href = window.location.href.replace('key=current_val', 'key=new_val');
alert(query);
	      	alert(active+"%%"+dvalue);
	      	$('#cb-'+dvalue).removeAttr('active').attr('active', '0');
	      	$('#select-all-types').removeAttr('active').attr('active', '1');
		  $('#select-stage-all').removeAttr('resourcetypes').attr('resourcetypes', '0');
		  $('.siderbar-small-category').removeAttr('resourcetypes').attr('resourcetypes', '0');
		  $('.autocomplete-tag-input').removeAttr('resourcetypes').attr('resourcetypes', '0');
		  $('.autocomplete-tag-list').removeAttr('resourcetypes').attr('resourcetypes', '0');
		  $('#resource-search-input').removeAttr('resourcetypes').attr('resourcetypes', '0');
		  $('#sort-form-select').removeAttr('resourcetypes').attr('resourcetypes', '0');
	      	//$('.fake-label').attr('style', '');
	        $('.tagicon').attr('style', '');
	        $('.lifestagec').removeAttr('resourcetypes').attr('resourcetypes', '0');
	        $('.selectalltypes').css({
			    "background": "#02a69c",
    			"color": "#fff",
    			"cursor": "pointer"
			});
			
	        var dvaluenb = '0';
	        //var postData=JSON.stringify({"dvalue": dvaluenb,"lifestage": lifestage, "pager": pager, "search": search, "sort": sort, "tags": alltags});
	         var postData=JSON.stringify({"type": dvaluenb,"pager": pager, "lifestage": lifestage, "search": search, "sort": sort,"tags": alltags});
			var sync1 = $.ajax({  
				type: "POST",  
				//url: $.web_url+"includes/core/resource_all_page"+$.extn,
				url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".resource-column-new").show();
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeAttr('style');
						$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
						$("#cd-"+dvalue+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].dvalue;
			                var url = new_data[i].slug;
			                var tpage = new_data[i].pages;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                $(".resource-column-new").append(tr_str);
			            }
					}
			});
			 var postDatan=JSON.stringify({"dvalue": dvaluenb,"lifestage": lifestage, "pager": pager, "search": search, "sort": sort, "tags": alltags});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_new_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					$("#pagination-box-n").removeClass('hidden').html(new_data.message);
					$("#pagination-box").addClass('hidden').html('');
				}
			});*/
	      }else{
	      	//////alert('this clicked reached line 985');
	      	if($('#cb-'+dvalue).attr('active') == "1"){
		      	$('#cb-'+dvalue).removeAttr('active').attr('active', '0');
	      	} else {
		      	$('#cb-'+dvalue).removeAttr('active').attr('active', '1');
		      }
		  
	      	$('.active-'+dvalue).css({
	      	    "height": "28px",
			    "background": "#02a69c",
    			"color": "#fff",
    			"cursor": "pointer"
			});
	     	$('.icon-'+dvalue).css({
			    "background": "#02a69c",
    			"color": "#fff",
    			"cursor": "pointer"
			});
			//var postData=JSON.stringify({"dvalue": dvalue, "action": inform, "lifestage": lifestage, "search": search, "sort": sort, "tags": alltags});
			var postData=JSON.stringify({"type": dvalue,"pager":pager, "action": inform, "lifestage": lifestage, "search": search, "sort": sort, "tags": alltags});
			var postcheck = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
				//url: $.web_url+"includes/core/resource_search"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(postlist)
					{
						var len = postlist.length;
						$(".resource-column-new").html('');
						$(".resource-column-new").show();
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeAttr('style');
						$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			
						$("#cd-"+dvalue+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var message = postlist[i].message;
			                var tr_str = message;
			                $(".resource-column-new").append(tr_str);
			            }
						 // Update the active class on pagination
						 $(".pg-btn").removeClass("active"); // Remove active class from all buttons
						 $(".pg-btn[pagerv='" + pager + "']").addClass("active"); // Add active class to the clicked button
					}
			});
			 var postDatan=JSON.stringify({"dvalue": dvalue, "pager": pager, "lifestage": lifestage, "search": search, "sort": sort, "tags": alltags});
			 var paginationcheck = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_new_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(pagination)
				{
					console.log('click at line 1033');
					$("#pagination-box-n").removeClass('hidden').html(pagination.message);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
	      }
	      $('.resource-column-new').removeClass('hidden').fadeIn(5000).html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
	    //   if (history.pushState) {
		// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", $.web_url+$.resources+'?type='+dvalue+'&pager=1');
		// } else {
		// 	document.location.href = $.web_url+$.resources+'?type='+dvalue+'&pager=1';
		// }
		// if (history.pushState) {
		// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		// 	//document.location.href = getURLForCache(pager);
		// } else {
		// 	//document.location.href = murl+'&pager='+pager;
		// 	document.location.href = getURLForCache(pager);
		// }
		$.when(postcheck, paginationcheck).done(function(postlist, pagination) {
    	console.log('both post check and pagination check finishd');
		});
	});
	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	    function(m,key,value) {
	      vars[key] = value;
	    });
	    return vars;
	  }
	  $(document).ready(function() {
    // Event listener for pagination buttons
    $(document).on('click', '.pg-btn', function() {
        // Retrieve attributes from the clicked button
        var pager = $(this).attr("pagerv");
        var lifestage = $(this).attr("lifestage");
        var search = $(this).attr("search");
        var resourcetypes = $(this).attr("resourcetypes");
        var sortid = $(this).attr("sort");
        var tags = $(this).attr("tags");

        // Remove active class from all pagination buttons
        $('.pg-btn').removeClass('active');

        // Add active class to the clicked button
        $(this).addClass('active');

        // Fetch new data based on the current state
        fetchDataAndPagination({
            pager: pager,
            type: resourcetypes,
            lifestage: lifestage,
            search: search,
            sort: sortid,
            tags: tags
        });
    });

    // Function to fetch data and handle pagination
    function fetchDataAndPagination(params) {
        $(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
        $(".resource-column-new").html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');

        // Update the URL without reloading the page
        if (history.pushState) {
            window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(params.pager));
        } else {
            document.location.href = getURLForCache(params.pager);
        }

        var postData = JSON.stringify({
            type: params.type,
            pager: params.pager,
            lifestage: params.lifestage,
            search: params.search,
            sort: params.sort,
            tags: params.tags
        });

        $.ajax({
            type: "POST",
            url: $.web_url + "includes/core/resource_pagination_content" + $.extn,
            dataType: 'JSON',
            data: { data: postData },
            cache: false,
            success: function(new_data) {
                var len = new_data.length;
                $(".resource-column-new").html('');
                for (var i = 0; i < len; i++) {
                    var message = new_data[i].message;
                    $(".resource-column-new").append(message);
                }
            }
        });

        // Handle pagination updates
        var postDatan = JSON.stringify({
            dvalue: params.type,
            pager: params.pager,
            lifestage: params.lifestage,
            search: params.search,
            sort: params.sort,
            tags: params.tags
        });

        $.ajax({
            type: "POST",
            url: $.web_url + "includes/core/pagination_new_check" + $.extn,
            dataType: 'JSON',
            data: { data: postDatan },
            cache: false,
            success: function(new_data) {
                $("#pagination-box-n").removeClass('hidden').html(new_data.message);
                $("#pagination-box").addClass('hidden').html('');
            }
        });
    }
});
	
	

 $('#select-all-types').removeAttr('pager').attr('pager', pager);
		  $('#select-stage-all').removeAttr('pager').attr('pager', pager);
		  $('.siderbar-small-category').removeAttr('pager').attr('pager', pager);
		  $('.sort-form-select').removeAttr('page').attr('page', pager);
		  $('.lifestagec').removeAttr('page').attr('page', pager);
		  $('.tag-click').removeAttr('pager').attr('pager', pager);
		  $('.closetag').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-input').removeAttr('pager').attr('pager', pager);
		  $('.autocomplete-tag-list').removeAttr('pager').attr('pager', pager);
	      $('#resource-search-input').removeAttr('page').attr('page', pager);
	  
	   var alltags = $(".siderbar-small-category").attr('tags');
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
      		mnurl = url.split('&pager')[0];
      		murl = (mnurl);
    //   if (history.pushState) {
	// 			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// 		} else {
	// 			document.location.href = murl+'&pager='+pager;
	// 		}

	// if (history.pushState) {
	// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
	// } else {
	// 	//document.location.href = murl+'&pager='+pager;
	// 	document.location.href = getURLForCache(pager)
	// }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
			var postData=JSON.stringify({"type": type, "pager": pager, "lifestage": lifestage, "search": search,"rtype":resourcetypes,"sort":sortid, "tags": alltags});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data){
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".resource-column-new").show();
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeAttr('style');
						$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn").removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn").removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
			});
			var postDatan=JSON.stringify({"dvalue": type, "pager": pager, "lifestage": lifestage, "search": search,"sort":sortid, "tags": alltags});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_new_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					$("#pagination-box-n").removeClass('hidden').html(new_data.message);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    		console.log('both pagination call finished');
		});
		 //  var dvalue = $(this).attr("typevalue");
		 //  var pagerv = $(this).attr("pagerv");
		 //  var lifestage = $(this).attr("lifestage");
		 //  $('.pagination-box').addClass('hidden').fadeOut(2000);
	  //     $('.pagination-box-n').removeClass('hidden');
	  //     //////alert(dvalue+'---'+pagerv);
   //    	  //var fType = getUrlVars()["type"];
   //    	  //var fpager = getUrlVars()["pager"];
   //    	  //var totalurl = parseInt(fpager) + 1;
   //         //////alert(fType+'--type----pager--'+fpager);
	  //     if (history.pushState) {
			// window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", $.web_url+$.resources+'?type='+dvalue+'&pager='+pagerv);
		 //  } else {
			// document.location.href = $.web_url+$.resources+'?type='+dvalue+'&pager='+pagerv;
		 //  }
	  //     var postData=JSON.stringify({"type": dvalue, "page": pagerv});
			// var sync1 = $.ajax({  
			// 	type: "POST",  
			// 	url: $.web_url+"includes/core/pgn_btn_resource"+$.extn,
			// 	dataType: 'JSON', //this is what we expect our returned data as  
			// 	data: {data:postData},
			// 	cache: false,  
			// 	success: function(new_data)
			// 		{
			// 			var len = new_data.length;
			// 			var tpage = new_data.totalpagess;
			// 			$(".content-inner-page").html('').addClass('hidden');
			// 			$(".resource-column-new").removeClass('hidden').html('');
			// 			$("#cd-"+dvalue+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			// 			//////alert(len+'the length');
			//             for(var i=0; i < len; i++){
			//                 var message = new_data[i].message;
			//                 var tr_str = message;
			//                 $(".resource-column-new").append(tr_str);
			//                  //$(".content-inner-page").addClass('hidden');
			//                   $(".pg-btn").removeAttr("typevalue").attr('typevalue', dvalue);
			//             }
			// 		}
			// });
			// var postDatan=JSON.stringify({"dvalue": dvalue, "page": pagerv, "lifestage": "0"});
			//  var sync2 = $.ajax({  
			// 							type: "POST",  
			// 							url: $.web_url+"includes/core/pagination_new_check"+$.extn,
			// 							dataType: 'JSON', //this is what we expect our returned data as  
			// 							data: {data:postDatan},
			// 							cache: false,  
			// 							success: function(new_data)
			// 								{
			// 									var messagenow = new_data.message;
			// 									$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
			// 									$("#pagination-box").addClass('hidden').html('');
			// 								}
			// 						});
	});
	$(document).on('click', '.pg-btn-tags', function()
		{
		  var dvalue = $(this).attr("typevalue");
		  var tagid = $(this).attr("tagid");
		  var tags = $(this).attr("tags");
		  var pagerv = $(this).attr("pagerv");
	   var alltags = $(".siderbar-small-category").attr('tags');

		     var alltags = $(".siderbar-small-category").attr('tags');
			var rtypes = $('.lifestagec').attr("resourcetypes");
		    var sortid = $('.siderbar-small-category').attr("sort");
		    var lifestage  = $('.siderbar-small-category').attr("lifestage");
		    var search  = $('.siderbar-small-category').attr("search");
		  $('.pagination-box').addClass('hidden').fadeOut(2000);
	      $('.pagination-box-n').removeClass('hidden').fadeIn(5000);
	      //////alert(dvalue+'---'+pagerv);
      	  //var fType = getUrlVars()["type"];
      	  //var fpager = getUrlVars()["pager"];
      	  //var totalurl = parseInt(fpager) + 1;
           //////alert(fType+'--type----pager--'+fpager);
	    //   if (history.pushState) {
		// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", $.web_url+$.resources+'?type='+dvalue+'&pager='+pagerv);
		//   } else {
		// 	document.location.href = $.web_url+$.resources+'?type='+dvalue+'&pager='+pagerv;
		//   }
		if (history.pushState) {
			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pagerv));
		//	document.location.href = getURLForCache(pagerv);
		} else {
			//document.location.href = murl+'&pager='+pager;
			document.location.href = getURLForCache(pagerv);
		}
	      //var postData=JSON.stringify({"type": dvalue, "page": pagerv, "tagid": alltags, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
     var postData=JSON.stringify({"type": rtypes, "page": pagerv, "tagid": alltags, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_tags"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						var tpage = new_data.totalpagess;
						$(".content-inner-page").html('').addClass('hidden');
						$(".resource-column-new").removeClass('hidden').html('');
						$("#cd-"+dvalue+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
						//////alert(len+'the length');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].dvalue;
			                var url = new_data[i].slug;
			                var tpage = new_data[i].pages;
			                var message = new_data[i].message;
			                if(catv == 'article'){
							var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                $(".resource-column-new").append(tr_str);
			                 //$(".content-inner-page").addClass('hidden');
			                  $(".pg-btn").removeAttr("typevalue").attr('typevalue', dvalue);
			            }
					}
				});
			var postDatan=JSON.stringify({"dvalue": alltags, "page": pagerv, "tagid": alltags, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_tags_n_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
	});
	$(document).on('click', '.next-btn-tags', function()
		{
			var type = $(this).attr("type");
			var pager = $(this).attr("pager");
			var tagid = $(this).attr("tagid");
			var tags = $(this).attr("tags");
			var alltags = $(".siderbar-small-category").attr('tags');
			var rtypes = $('.lifestagec').attr("resourcetypes");
		    var sortid = $('.siderbar-small-category').attr("sort");
		    var lifestage  = $('.siderbar-small-category').attr("lifestage");
		    var search  = $('.siderbar-small-category').attr("search");
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
      mnurl = url.split('&pager')[0];
      murl = (mnurl);
    //   if (history.pushState) {
	// 			window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// 		} else {
	// 			document.location.href = murl+'&pager='+pager;
	// 		}
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
		//document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
			var postData=JSON.stringify({"type": type, "page": pager, "tagid": tagid, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_tags"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
				});
			var postDatan=JSON.stringify({"dvalue": type, "tagid": alltags, "page": pager, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_tags_n_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
	});
	$(document).on('click', '.next-btn-lifestage', function()
		{
			var type = $(this).attr("type");
			var pager = $(this).attr("pager");
			var tagid = $(this).attr("tagid");
			var rtype = $(this).attr("rtype");
			var search = $(this).attr("search");
			var tags = $(this).attr("tags");
			var sortid =  $(this).attr("sort");
	   var alltags = $(".siderbar-small-category").attr('tags');
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
			mnurl = url.split('&pager')[0];
			murl = (mnurl);
		    // if (history.pushState) {
			//  	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
			//  } else {
			//  	document.location.href = murl+'&pager='+pager;
			//  }
			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
				//document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}
			var postData=JSON.stringify({"type": tagid, "page": pager, "rtype": rtype, "searchquery": search,"tags":alltags,"sort":sortid});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_lifestage"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
				});
			var postDatan=JSON.stringify({"tagid": tagid, "page": pager, "rtypes": rtype, "searchquery": search,"tags":alltags});
			var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_life_stage_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
			
	});
	$(document).on('click', '.lifestagec', function()
		{
		console.log('lifestage clicked');
		var active = $(this).attr("active");
		//$('.lifestagec').removeAttr('active').attr('active', '0');
		//	$('.sort-form-select').removeAttr('lifestage').attr('lifestage', '0');
            console.log(active);
		var dvalue = $(this).attr("dvalue");
         	var pager = "1";
         	var resourcetypes = $(this).attr("resourcetypes");
            
            var lifestage = $(this).attr("lifestage");
            var search = $(this).attr("search");
			var tags = $(this).attr("tags");
			var sortid =  $(this).attr("sort");
	   var alltags = $(".siderbar-small-category").attr('tags');
	   var previousls = $("#select-stage-all").attr('lifestage');
	   var selectedLifestage = $("#select-all-types").attr('lifestage');
            $('.lfstyle').removeAttr('style');
				$('.lifestage'+dvalue).css({
					"background": "#02a69c",
					"color": "#fff",
					"cursor": "pointer"
				});
	var url = (window.location.href);
    mnurl = url.split('&pager')[0];
    murl = (mnurl);

    $('#select-all-types').removeAttr('lifestage').attr('lifestage', dvalue);
            $('#select-stage-all').removeAttr('active').attr('active', '0');
            $('#select-stage-all').removeAttr('lifestage').attr('lifestage', dvalue);
            $('.checkattr'+dvalue).removeAttr('style').removeAttr('active').attr('active', '1');
			$('.sort-form-select').removeAttr('lifestage').attr('lifestage', dvalue);
            $('#resource-search-input').removeAttr('lifestage').attr('lifestage', dvalue);
            $(".siderbar-small-category").removeAttr('lifestage').attr('lifestage', dvalue);
			$('.tag-click').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.closetag').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.autocomplete-tag-input').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.autocomplete-tag-list').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.next-btn').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.pg-btn').removeAttr('lifestage').attr('lifestage', dvalue);
			$('.prv-btn').removeAttr('lifestage').attr('lifestage', dvalue);

			$('#select-stage-all').attr('style', '');

			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
				//document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}
		  //alert(dvalue+"%%"+active);
		  	//if(active > 0 && dvalue != 0){

            var lifeact = $('.checkattr'+dvalue).attr("active");
		  console.log(dvalue+"%%"+lifeact+"%%"+active+"%%"+previousls);
		  	//if(active > 0 && dvalue == 0 || active > 0 && dvalue != 0){
		  	//if(active > 0 && dvalue != 0 || dvalue == previousls && dvalue != 0){
		  		if(active > 0 && dvalue != 0 && dvalue == previousls || dvalue == previousls && selectedLifestage != 0 ){
        $( "#select-stage-all" ).trigger( "click" );
        /* 	var rtypes = $(this).attr("resourcetypes");
			var sort =  $(this).attr("sort");
            //$('.checkattr'+dvalue).removeAttr('style').removeAttr('active').attr('active', '0');
            $('.lifestagec').removeAttr('active').attr('active', '0');
            $('#select-stage-all').removeAttr('active').attr('active', '1');
            $('#lifestage'+dvalue).removeAttr('active').attr('active', '1');
			$('#select-all-types').removeAttr('lifestage').attr('lifestage', '0');
			$('#resource-search-input').removeAttr('lifestage').attr('lifestage', '0');
			$('.sort-form-select').removeAttr('lifestage').attr('lifestage', '0');
            $('#resource-search-input').removeAttr('lifestage').attr('lifestage', '0');
            $(".siderbar-small-category").removeAttr('lifestage').attr('lifestage', '0');
			$('.tag-click').removeAttr('lifestage').attr('lifestage', '0');
			$('.closetag').removeAttr('lifestage').attr('lifestage', '0');
			$('.autocomplete-tag-input').removeAttr('lifestage').attr('lifestage', '0');
			$('.autocomplete-tag-list').removeAttr('lifestage').attr('lifestage', '0');
			$('.next-btn').removeAttr('lifestage').attr('lifestage', '0');
			$('.pg-btn').removeAttr('lifestage').attr('lifestage', '0');
			$('.prv-btn').removeAttr('lifestage').attr('lifestage', '0');
            $('#select-stage-all').css({
					"background": "#02a69c",
					"color": "#fff",
					"cursor": "pointer"
				});
            $('.sort-form-select').removeAttr('active').attr('active', '0');
			$('.sort-form-select').removeAttr('lifestage').attr('lifestage', '0');
            $('.lifestage'+dvalue).removeAttr('style');
            $('.checkattr'+dvalue).removeAttr('active').attr('active', '0');
            var dvalue = "0";
            //$(".siderbar-small-category").removeAttr('lifestage').attr('lifestage', dvalue);
            console.log('lifestage reset');
            //var postData=JSON.stringify({"lifestage": lifestage,"dvalue": dvalue,"tags":tags,"search":search,"sort":sort,"rtype":rtypes, "tags": alltags});
            var postData=JSON.stringify({"type": rtypes,"pager": pager, "lifestage": lifestage, "search": search, "sort": sort,"tags": alltags});
	var sync1 = $.ajax({  
		type: "POST",  
		//url: $.web_url+"includes/core/resource_all_page"+$.extn,
		url: $.web_url+"includes/core/resource_pagination_content"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postData},
		cache: false,  
		success: function(new_data)
		{
			var len = new_data.length;
			$(".resource-column-new").html('');
			$(".resource-column-new").show();
			$(".content-inner-page").addClass('hidden');
			$(".resource-column-new").removeAttr('style');
			$(".resource-column-new").removeClass('hidden').css("display","").css("display","block !important");
			
			$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			for(var i=0; i < len; i++){
				var title = new_data[i].title;
				var catv = new_data[i].posttype;
				var url = new_data[i].postname;
				var message = new_data[i].message;
				if(catv == 'article'){
					var seo_dvalue = 'articles/';
				}else if(catv == 'calculator'){
					var seo_dvalue = 'calculators/';
				}else if(catv == 'video'){
					var seo_dvalue = 'videos/';
				}else if(catv == 'newsletter'){
					var seo_dvalue = 'newsletters/';
				}else if(catv == 'podcast'){
					var seo_dvalue = 'podcasts/';
				}else if(catv == 'toolkit'){
					var seo_dvalue = 'toolkits/';
				}else if(catv == 'booklet'){
					var seo_dvalue = 'booklets/';
				} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
				var tr_str = message;
				$(".resource-column-new").append(tr_str);
	        }	
		}
	});
	// "dvalue": dvalue, "lifestage": lifestage, "type": rtypes, "page": pager, "tags": tags, "search": search, "sort": sort
	var postDatan=JSON.stringify({"dvalue": rtypes, "lifestage": lifestage, "pager": pager, "search": search, "sort": sort, "tags": alltags});
	var sync2 = $.ajax({  
		type: "POST",  
		url: $.web_url+"includes/core/pagination_new_check"+$.extn,
		dataType: 'JSON', //this is what we expect our returned data as  
		data: {data:postDatan},
		cache: false,  
		success: function(new_data)
		{
			$("#pagination-box-n").removeClass('hidden').html(new_data.message);
			$("#pagination-box").addClass('hidden').html('');
		}
	});*/
		} else {
            //$('.lifestagec').removeAttr('active').attr('active', '1');
			
            //console.log({"dvalue": dvalue, "page": pager, "active": active, "lifestage": lifestage, "search": search, "rtype": resourcetypes});
            var postData=JSON.stringify({"type": dvalue, "page": pager, "rtype": resourcetypes, "searchquery": search,"tags":alltags,"sort":sortid});
            /** action starts here **/
            var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_lifestage"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			            	console.log('im reaching at line 1441');
			                var message = new_data[i].message;
			                var tr_str = message;
			                //var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			            }
					}
			});
			console.log('im reaching at line 1449');
			var postDatan=JSON.stringify({"tagid": dvalue, "page": pager, "rtypes": resourcetypes, "searchquery": search,"tags":alltags,"sort":sortid});
			console.log('im reaching at line 1451');
			var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_life_stage_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					console.log('im reaching at line 1459');
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});

		}
		$.when(sync2, sync1).done(function(result2, result1) {
    	console.log('lifestage both result and pagination clicked' + dvalue);
		});
            /** action ends here **/
	});
	$(document).on('click', '.prv-btn-lifestage', function()
		{
			var type = $(this).attr("type");
			var pager = $(this).attr("pager");
			var tagid = $(this).attr("tagid");
			var rtype = $(this).attr("rtype");
			var search = $(this).attr("search");
			var tags = $(this).attr("tags");
			var sortid =  $(this).attr("sort");
	   var alltags = $(".siderbar-small-category").attr('tags');
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
			mnurl = url.split('&pager')[0];
			murl = (mnurl);
    //    if (history.pushState) {
	// 		 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// 		 } else {
	// 		 	document.location.href = murl+'&pager='+pager;
	// 		 }
	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
	//	document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
			var postData=JSON.stringify({"type": tagid, "page": pager, "rtype": rtype, "searchquery": search,"tags":alltags,"sort":sortid});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_lifestage"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
			});
			var postDatan=JSON.stringify({"tagid": tagid, "page": pager, "rtypes": rtype, "searchquery": search,"tags":alltags,"sort":sortid});
			var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_life_stage_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
	});	
	$(document).on('click', '.pg-btn-lifestage', function()
		{
			//////alert('im here');
			var type = $(this).attr("type");
			var pager = $(this).attr("pager");
			var tagid = $(this).attr("tagid");
			var rtype = $(this).attr("rtype");
			var search = $(this).attr("search");
			var tags = $(this).attr("tags");
			var sortid =  $(this).attr("sort");
	   var alltags = $(".siderbar-small-category").attr('tags');
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
			mnurl = url.split('&pager')[0];
			murl = (mnurl);
    //    if (history.pushState) {
	// 		 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
	// 		 } else {
	// 		 	document.location.href = murl+'&pager='+pager;
	// 		 }

	if (history.pushState) {
		window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
	//	document.location.href = getURLForCache(pager);
	} else {
		//document.location.href = murl+'&pager='+pager;
		document.location.href = getURLForCache(pager);
	}
			var postData=JSON.stringify({"type": tagid, "page": pager, "rtype": rtype, "searchquery": search,"tags":alltags,"sort":sortid});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_lifestage"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn-tags").removeAttr("tagid").attr('tagid', tagid).removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
			});
			var postDatan=JSON.stringify({"tagid": tagid, "page": pager, "rtypes": rtype, "searchquery": search,"tags":alltags,"sort":sortid});
			 var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_life_stage_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
	});	
	$(document).on('click', '.prv-btn-tags', function()
		{
			var type = $(this).attr("type");
			var pager = $(this).attr("pager");
			var tagid = $(this).attr("tagid");
			var tags = $(this).attr("tags");
			var alltags = $(".siderbar-small-category").attr('tags');
			var rtypes = $('.lifestagec').attr("resourcetypes");
	   var alltags = $(".siderbar-small-category").attr('tags');
		    var sortid = $('.siderbar-small-category').attr("sort");
		    var lifestage  = $('.siderbar-small-category').attr("lifestage");
		    var search  = $('.siderbar-small-category').attr("search");
			$(".content-inner-page").addClass('hidden').html('').fadeIn(5000);
			$(".resource-column-new").html('').html('<div style="margin-left: 42%; margin-top: 17%; padding-bottom: 30%;"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> loading</div>');
			var url = (window.location.href);
			mnurl = url.split('&pager')[0];
			murl = (mnurl);
			// if (history.pushState) {
			// 	window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", murl+'&pager='+pager);
			// } else {
			// 	document.location.href = murl+'&pager='+pager;
			// }
			if (history.pushState) {
				window.history.pushState("object or string", "BALANCE Financial Fitness Program  |  Resources", getURLForCache(pager));
				//document.location.href = getURLForCache(pager);
			} else {
				//document.location.href = murl+'&pager='+pager;
				document.location.href = getURLForCache(pager);
			}
			var postData=JSON.stringify({"type": type, "page": pager, "tagid": alltags,  "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			var sync1 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pg_btn_tags"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postData},
				cache: false,  
				success: function(new_data)
					{
						var len = new_data.length;
						$(".resource-column-new").html('');
						$(".content-inner-page").addClass('hidden');
						$(".resource-column-new").removeClass('hidden');
						$("#cd-"+name+ " span .fake-label").removeClass('fake-label').addClass('fake-label-active');
			            for(var i=0; i < len; i++){
			                var title = new_data[i].title;
			                var catv = new_data[i].posttype;
			                var url = new_data[i].postname;
			                var message = new_data[i].message;
			                if(catv == 'article'){
								var seo_dvalue = 'articles/';
							}else if(catv == 'calculator'){
								var seo_dvalue = 'calculators/';
							}else if(catv == 'video'){
								var seo_dvalue = 'videos/';
							}else if(catv == 'newsletter'){
								var seo_dvalue = 'newsletters/';
							}else if(catv == 'podcast'){
								var seo_dvalue = 'podcasts/';
							}else if(catv == 'toolkit'){
								var seo_dvalue = 'toolkits/';
							}else if(catv == 'booklet'){
								var seo_dvalue = 'booklets/';
							} else if(catv == 'worksheet'){
					var seo_dvalue = 'worksheets/';
				}else if(catv == 'checklist'){
					var seo_dvalue = 'checklists/';
				}
			                var tr_str = message;
			                var pagern = parseInt(pager) + 1;
			                $(".resource-column-new").append(tr_str);
			                $(".pg-btn").removeAttr("typevalue").attr('typevalue', type);
			                $(".next-btn").removeAttr("type").attr('type', type).removeAttr("pager").attr('pager', pagern);
			            }
					}
			});
			var postDatan=JSON.stringify({"dvalue": type, "tagid": alltags, "page": pager, "tags": alltags,"sortid": sortid,"lifestage":lifestage, "search":search,"rtype": rtypes});
			var sync2 = $.ajax({  
				type: "POST",  
				url: $.web_url+"includes/core/pagination_tags_n_check"+$.extn,
				dataType: 'JSON', //this is what we expect our returned data as  
				data: {data:postDatan},
				cache: false,  
				success: function(new_data)
				{
					var messagenow = new_data.message;
					$("#pagination-box-n").html('').removeClass('hidden').html(messagenow);
					$("#pagination-box").addClass('hidden').html('');
				}
			});
		$.when(sync1, sync2).done(function(result2, result1) {
    	console.log('both call finished');
		});
			
	});	
});// JavaScript Document
