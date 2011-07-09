
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
	var list_item_height = getHeight( "#album_list li" );
	var num_items = $( "#album_list" ).children().length;
	var total_height = getHeight( "#sidebar" );
	var footer_height = getHeight( "#sidebar_copy" );
	var header_height = getHeight( "#sidebar_header_container" );
	
	var list_height = list_item_height * num_items;
	var list_area = total_height - ( header_height + footer_height + list_item_height + 17 );
	//alert( "total: " + total_height + " list_height: " + list_height + " header_height: " + header_height + " list_area: " + list_area.toString() );
	
	if( list_height > list_area )
	{
		var pagination = 'Page:&nbsp;';
		var new_list_height = list_area.toString() + "px";
		
		var items_per_page = Math.floor( list_area/list_item_height );
		var num_pages = Math.ceil(  num_items/items_per_page );
		//alert( "li height: " + list_item_height + " new_list_height " + new_list_height + " num_list_items: " + num_items + " item_per_page: " + items_per_page + " num_pages: " + num_pages );
		
		var user = pwaGetAnchorVar( 0 );
		var album_id = pwaGetAnchorVar( 1 );
		var link_base = "#" + user + "/" + album_id;
		var active_class = '';
		
		for( i = 1; i <= num_pages; i++  )
		{
			active_class = ( i == 1 ) ? 'class="active"' : '';
			pagination += '<a href="' + link_base + '/' + i + '" ' + active_class + '>' + i + '</a>&nbsp;&nbsp;';
		}
		
		$( "#album_list_container" ).css( "overflow", "hidden" );
		$( "#album_list_container" ).css( "height", new_list_height );
		$( "#sidebar_pagination" ).html( pagination );
		
	}
	else
	{
		//clear pagination
		$( "#sidebar_pagination" ).html( '' );
	}
	
}//buildPagination()