
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
        if( major_version == 6 )
        {
            innerHeight = document.documentElement.clientHeight;
            innerWidth = document.documentElement.clientWidth;
        }
        else if( major_version <= 5 )  
        {
            innerHeight = document.getElementsByTagName('body')[0].clientHeight;
            innerWidth = document.getElementsByTagName('body')[0].clientWidth;
        }
    }
    
    viewport.innerHeight = innerHeight;
    viewport.innerWidth = innerWidth;
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
	$( "#album_list ul li" ).removeClass( "active_selected" );
	$( "#album_list ul li a" ).removeClass( "link_active_selected" );
	$( ".album_list_checked" ).css( "display", "none" );
	
}//deactivateAlbumList()

function loadPhotoGrid( type, query )
{
	var callback = function(){ Shadowbox.init({ skipSetup: true }); Shadowbox.setup(); }
	pwaLoadPhotoGrid( type, query, callback );
	
}//loadPhotoGrid()