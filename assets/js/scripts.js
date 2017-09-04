var search_visible = false;
var menu_visible = false;
			
var gallery_page = Array();
var gallery_photos = Array();

$(document).ready(function(){
	if (typeof slide === "function") slide('prepare');
	
	$(".mmenu_element").bind("click", function() {
		var submenu = $(this).find("ul").html();
		$("#mmenu_right").html(submenu);
		$(".sub_arrow").css('display','none');
		$(".sub_counter").css('display','inline-block');
		$(this).find(".sub_arrow").css('display','inline-block');
		$(this).find(".sub_counter").css('display','none');
	}); 
	
	$('.grid').masonry({
		itemSelector: '.phototile'
	});
	$("a.phototile").fancybox({
		padding: 0,
		arrows: true,
		helpers:  {
			title : {
				type : 'inside',
				position : 'bottom'
			}
		},
		beforeShow : function() {
			this.title = '<div class="fancy-title">' + (this.title ? '' + this.title + '' : '') + '</div><div class="fancy-counter"><span class="fancy-index">' + (this.index + 1) + '</span>/' + this.group.length + '</div>';
		}
	});
});

function mmenu_toggle() {
	if (menu_visible) {
		$('#mobile_menu').css('left','-100%');
		menu_visible = false;
	} else {
		$('#mobile_menu').css('left','0');		
		menu_visible = true;
	}
}

function search_toggle() {
	if ($("#search_input").css("position") == 'relative') {
		if (search_visible) {
			$('#top_logo').css('top','35px');
			$('#search_input').css('right','-340px');
			$('#search_box').css('width','30px;');
			search_visible = false;
		} else {
			$('#top_logo').css('top','75px');
			$('#search_input').css('right','0px');				
			$('#search_box').css('width','auto');				
			search_visible = true;
		}
	}
}

function gallery_slide(id,mode) {

	var photos = gallery_photos[id];
	var page = gallery_page[id];
	
	if (mode == 'prepare') {
		$("#gallery_" + id + " #gallery_pages").html(photos.length);
		$("#gallery_" + id + " #gallery_counter").html(photos.length);
	}
	if (mode == 'prev') page = page - 1;
	if (mode == 'next') page = page + 1;
	
	if (page > photos.length - 1) page = 0;
	if (page < 0) page =  photos.length - 1;
	
	var nice_counter = page + 1;
	if (nice_counter.toString().length == 1) nice_counter = '0' + nice_counter.toString();
	
	$("#gallery_" + id + " #gallery_counter").html(nice_counter);
	$("#gallery_" + id + " #gallery_pageno").html(page + 1);
	$("#gallery_" + id + " #gallery_title").html(photos[page][1]);
	$("#gallery_" + id + " #gallery_descr").html(photos[page][2]);
	$("#gallery_" + id + " #gallery_img img").attr('src',photos[page][0]);
	
	gallery_page[id] = page;
}
