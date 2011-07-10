
function getViewportInfo() {
	//determine viewPort height, assume non-ie
    var innerHeight = window.innerHeight;
    var innerWidth = window.innerWidth;
    var viewport = new Object();
    
    //check for ie
    var agent = $.browser;
    var major_version = parseInt( agent.version.slice( 0, 1 ) );
    
    //get specific
    if( agent.msie == true )
    {
        if( major_version <= 5 )  
        {
            innerHeight = document.getElementsByTagName('body')[0].clientHeight;
            innerWidth = document.getElementsByTagName('body')[0].clientWidth;
        }
        else
        {
        	innerHeight = document.documentElement.clientHeight;
        	innerWidth = document.documentElement.clientWidth;
        }	
    }
    
    viewport.innerHeight = innerHeight;
    viewport.innerWidth = innerWidth;
    //alert( "H" + viewport.innerHeight + " W: " + viewport.innerWidth );
    
    return viewport;
    
}//getViewportInfo()

function resizeSidebar() 
{
	var vp = getViewportInfo();
	$( "#sidebar" ).css( "height", vp.innerHeight );
	$( ".content" ).css( "height", vp.innerHeight );
	
}//resizeSidebar()

function resizeGridCell() 
{
	var total_width = parseInt( $( ".grid" ).css( "width" ).replace( "px", "" ) );
	
	var cell_size = Math.ceil( total_width/5 - ( 5 * ( 5 - 2 ) ) );
	var pic_size = cell_size - 10;
	
	var cell_size_string = cell_size.toString() + "px";
	var pic_size_string =  pic_size.toString() + "px";
	
	$( ".grid td div.grid_pic" ).css( "height", cell_size_string );
	$( ".grid td div.grid_pic" ).css( "width", cell_size_string );
	$( ".grid td div.grid_pic img" ).css( "height", pic_size_string );
	$( ".grid td div.grid_pic img" ).css( "width", pic_size_string );
	
}//resizeGridCell()

function deactivateAlbumList()
{
	$( "#album_list li" ).removeClass( "active_selected" );
	$( "#album_list li a" ).removeClass( "link_active_selected" );
	$( ".album_list_checked" ).css( "display", "none" );
	
}//deactivateAlbumList()

function loadPhotoGrid( type, query, user )
{
	var callback = function(){ Shadowbox.init({ skipSetup: true }); Shadowbox.setup(); }
	pwaLoadPhotoGrid( type, query, callback, user );
	
}//loadPhotoGrid()

function loadAlbumList( el )
{
	var base_url_split = ( el == false ) ? false : el.attr( "href" ).toString().split( "#" );
	var user = ( base_url_split == false ) ? false : base_url_split[1];
	var album_id = false;
	
	if( user != false && user.indexOf( "/" ) > -1 )
	{
		var anchor_split = user.split( "/" );
		user = anchor_split[0];
		album_id = anchor_split[1];
	}
	
	var callback = function() { 
		
		var pagination_required = buildPagination();
		//alert( "pagination req: " + pagination_required.toString() );
		
		if( pagination_required == true ) 
		{  
			toggleSearch( "hide" );
		}
		else
		{
			toggleSearch( "show" );
		}
	}
	
	pwaLoadAlbumList( user, callback, album_id );
	
}//loadAlbumList()

function toggleSearch( cmd )
{
	switch( $.trim( cmd.toLowerCase() ) )
	{
		case "hide":
			$( "#sidebar_search" ).slideUp( "slow", function() {
				 
				$( "#search_toggle_container" ).fadeIn( "fast" ); 
			});
			break;
			
		default:
			$( "#search_toggle_container" ).fadeOut( "fast", function(){ 

				$( "#sidebar_search" ).css( "display", "block" );
				 
			});
			break;
			
	}//switch
	
}//toggleSearch()

function buildPagination()
{
	//reset slider div
	$( "#album_slider" ).animate( { top:"0" }, 1000, function(){} );
	
	var return_val = true;
	var list_item_height = getHeight( "#album_list li", false );
	var num_items = $( "#album_list" ).children().length;
	
	var total_height = getHeight( "#sidebar", false );
	var footer_height = getHeight( "#sidebar_copy", false );
	var header_height = getHeight( "#sidebar_header_container", false );
	
	var list_height = list_item_height * num_items;
	var list_area = total_height - ( header_height + footer_height + list_item_height + 17 );
	//alert( "total: " + total_height + " list_height: " + list_height + " header_height: " + header_height + " list_area: " + list_area.toString() );
	
	if( list_height > list_area )
	{
		var pagination = '';
		var active_class = '';
		var new_list_height = list_area.toString() + "px";
		
		var items_per_page = Math.floor( list_area/list_item_height );
		var num_pages = Math.ceil(  num_items/items_per_page );
		var pageset_max = 9;
		
		var cur_pageset = 0;
		var user = pwaGetAnchorVar( 0 );
		var album_id = pwaGetAnchorVar( 1 );
		var link_base = "#" + user + "/" + album_id;
		//alert( "li height: " + list_item_height + " new_list_height " + new_list_height + " num_list_items: " + num_items + " item_per_page: " + items_per_page + " num_pages: " + num_pages );
		
		for( i = 1; i <= num_pages; i++  )
		{
			cur_pageset = Math.ceil( i/pageset_max );
			active_class = ( i == 1 ) ? 'class="active"' : '';
			pagination += '<a href="' + link_base + '/' + i + '" rel="' + cur_pageset + '" ' + active_class + '>' + i + '</a>&nbsp;&nbsp;';
		}
		
		//paginate the pagination
		if( num_pages > pageset_max )
		{
			$( "#sidebar_controls" ).css( "display", "block" );
			
			//calculate pagsets and report to dom
			var num_pagesets = Math.ceil( num_pages/pageset_max );
			$( "#max_pagesets" ).attr( "value", num_pagesets );
		}
		
		$( "#album_list_container" ).css( "overflow", "hidden" );
		$( "#album_list_container" ).css( "height", new_list_height );
		$( "#sidebar_label" ).html( 'Page:' );
		$( "#sidebar_pages" ).html( pagination );
	}
	else
	{
		//clear pagination
		$( "#album_list_container" ).css( "overflow", "visible" );
		$( "#sidebar_pagination" ).html( '' );
		return_val = false;
	}
	
	return return_val;
	
}//buildPagination()

function scrollPagination( el, scroll_amt )
{
	//control scrolling
	var max_scroll = (  getHeight( "#" + el.attr( "id" ), "width" ) * -1 ) + 10;
	var position = getHeight( "#" + el.attr( "id" ), "left" );
	
	alert( "pos: " + position + " max_scroll: " + max_scroll );
	scroll = ( position == 0 || position < max_scroll ) ? false : true;
	
	if( !scrolling ) {
		
		//show other arrow
		el.stop();
	} 
	else
	{
		el.animate( {"left": scroll_amt }, "fast", function(){ 
			if( scrolling ) 
			{ 
				scrollPagination( el, scroll_amt ); 
			} 
			else
			{
				if( scroll_amt.indexOf( "-" ) > -1 && 
					$( "#sidebar_pag_prev" ).css( "display" ).toLowerCase() == "none"  )
				{
					$( "#sidebar_pag_prev" ).css( "display", "block" );
				}
			}
					
		}); 
	}
	
}//scrollPagination()

function scrollPageset( direction )
{
	//get width
	var new_pageset, scroll_width;
	var position = getHeight( "#sidebar_pages", "left" );
	var page_width = getHeight( "#sidebar_pages_container", "width" );
	
	var cur_pageset = parseInt( $( "#cur_pageset" ).attr( "value" ) );
	var max_pagesets = $( "#max_pagesets" ).attr( "value" );
	var next_pageset = cur_pageset + 1;
	var prev_pageset = cur_pageset - 1;
	
	var go = ( direction == "next" ) ? next_pageset < max_pagesets : prev_pageset >= 0; 
	//alert( "max: " + max_pagesets + " next: " + next_pageset + " prev: " + prev_pageset + " cur: " + cur_pageset );
	
	if( go )
	{
		if( direction == "next" )
		{
			scroll_width = page_width * ( next_pageset ) * -1;
			new_pageset = next_pageset;
		}
		else
		{
			scroll_width = ( page_width * ( prev_pageset ) * -1 );
			new_pageset = prev_pageset;
		} 
		
		//scroll page
		$( "#sidebar_pages" ).css( "left", scroll_width.toString() + "px" );
		//alert( "page_width: " + page_width + " scroll_width: " + scroll_width +  " cur_pageset: " + cur_pageset );
	
		//update current pageset
		$( "#cur_pageset" ).attr( "value", new_pageset.toString() );
	}
	
}//scrollPageset()