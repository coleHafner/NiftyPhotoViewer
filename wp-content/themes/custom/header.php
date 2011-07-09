<!DOCTYPE html PUBLIC *-//W3C//DTD XHTML 1.0 transitional//EN* "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>

<head profile="http://gmpg.org/xfn/11">

<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>" charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php if( is_single() || is_page() || is_archive() ) { wp_title( '', true ); echo " | "; } bloginfo( 'name' ); ?></title>

<link type="text/css" rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" media="screen" />
<link type="text/css" rel="stylesheet" href="<?php bloginfo( 'stylesheet_directory' ); ?>/js/shadowbox/shadowbox.css" media="screen" />
<link type="application/rss+xml" rel=alternamte href="<?php bloginfo( 'rss2_url' ); ?>" title="<?php bloginfo( 'name' ); ?> RSS Feed" />

<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link rel="shortcut icon" href="<?php bloginfo( 'template_directory' ); ?>/favicon.ico" />

<script type="text/javascript" src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/jquery-1.6.2.js"></script>
<script type="text/javascript" src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/common.js"></script>

<script type="text/javascript" src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/shadowbox/shadowbox.js"></script>
<script type="text/javascript" src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/api_common.js"></script>
<script type="text/javascript" src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/api_google_picasa.js"></script>

<script type="text/javascript">
	$( document ).ready( function() { 
		
		//auto height
		resizeSidebar();
		
		//load album onClick
		$( "#album_list li a" )
			.live( "click", function(){
			
				//load album
				loadPhotoGrid( "album", $( this ).attr( "album_id" ), $( this ).attr( "user" ) );

				//deactivate
				deactivateAlbumList();

				//activate
				$( this ).parent().find( "div.album_list_checked" ).css( "display", "block" );
				$( this ).parent().addClass( "active_selected" );
				$( this ).addClass( "link_active_selected" );
				$( this ).blur();
			});

		//change bg on hover
		$( "#album_list li" )
			.live( "mouseenter", function(){ $( this ).addClass( "active" ); $( this ).find( 'a' ).addClass( "link_active" ); } )
			.live( "mouseleave", function(){ $( this ).removeClass( "active" ); $( this ).find( 'a' ).removeClass( "link_active" ); } );

		$( ".grid_pic a" )
			.live( "mouseenter", function(){ $( this ).parent().find( ".grid_pic_meta" ).slideDown( 300 ); });

		$( ".grid td" )
			.live( "mouseleave", function(){ $( ".grid_pic_meta" ).slideUp( 300 ); });

		$( ".grid_pic_meta a" )
			.live( "click", function(){
				var base_url_split = $( this ).attr( "href" ).toString().split( "#" );
				var user = base_url_split[1];
				var callback = function(){ buildPagination(); toggleSearch( "hide" ); }
				pwaLoadAlbumList( user, callback );
			});
		
		$( "#search_query" )
			.click( function(){
				
				var cur_val = $.trim( $( this ).attr( "value" ).toLowerCase() );
				var default_val = $.trim( $( this ).attr( "default_value" ).toLowerCase() );
				var new_val = ( cur_val == default_val ) ? "" : cur_val;
				$( this ).attr( "value", new_val );
			})
			
			.keyup( function( event ) {
				
				var key = event.which.toString();
				
				if( key == "13" )
				{
					//save search
					var cur_val = $( this ).attr( "value" );
					cur_val = cur_val.replace( " ", "%20" );
					var base_url_split = window.location.toString().split( "#" );
					var base_url = base_url_split[0];
					window.location = base_url + '#' + cur_val;
					
					//run search
					loadPhotoGrid( "search", cur_val, false );
					$( this ).blur();

					//deactivate
					deactivateAlbumList();
				}
				else
				{
					$( "#text_input_close" ).css( "display", "block" );
				}	
			});

		$( "#search_query_submit" )
		
			.click( function( event ){
				
				event.preventDefault();
				var el = $( "#search_query" );
				var cur_val = $.trim( el.attr( "value" ).toLowerCase() );
				var default_val = $.trim( el.attr( "default_value" ).toLowerCase() );
				
				if( cur_val != default_val && cur_val.length > 0 )
				{	
					//save search
					cur_val = cur_val.replace( " ", "%20" );
					var base_url_split = window.location.toString().split( "#" );
					var base_url = base_url_split[0];
					window.location = base_url + '#' + cur_val;

					//run search
					loadPhotoGrid( "search", cur_val, false );

					//deactivate
					deactivateAlbumList();
				}
				else
				{
					alert( "Please define a search term." );
				}
			});

		$( "#search_toggle" ) .click( function( event ){ event.preventDefault(); toggleSearch( "show" ); });
		$( "#sidebar_logo" ).click( function( event ){ event.preventDefault(); toggleSearch( "hide" ); });

		$( ".sidebar_pagination a" ).live( "click", function(){
			
			//get page num and list height
			var page_height = getHeight( "#album_list_container" );
			var list_item_height = getHeight( "#album_list li" );
			var num_items = $( "#album_list" ).children().length;
			var list_height = list_item_height * num_items;
			var max_items_per_page = page_height/list_item_height;
			var true_page_height = max_items_per_page * list_item_height;
			//alert( "page_height: " + page_height + " li height: " + list_item_height + " total_list height: " + list_height );
			
			var href_split = $( this ).attr( "href" ).split( "/" );
			var last_key = href_split.length - 1;
			var page_num = href_split[last_key];   

			//deactivate
			$( ".sidebar_pagination a" ).removeClass( "active" );
			$( this ).addClass( "active" );

			//calc slide
			var requested_position = page_num * true_page_height;
			var scroll_to = ( requested_position * -1 ) + true_page_height;

			//scroll list
			$( "#album_slider" ).animate( { top:scroll_to.toString() }, 1000, function(){} );
				
		});

		$( "#text_input_close" )
		
			.click(  function( event ){
	
				event.preventDefault();
				$( "#search_query" ).attr( "value", "" );
				$( this ).css( "display", "none" );
				$( "#search_query" ).focus();
			});
		
		//init shadowbox
		Shadowbox.init({ 
			continuous:true, 
			handleOversize:'none', 
			overlayOpacity:0.8, 
			overlayColor:'#000000',
			displayNav:true,
			counterType:'default',
			modal:false
		});
	});
	
	$( window ).resize( function(){
		
		//auto height
		resizeSidebar();
		
		//auto-resize photo
		//resizeGridCell();
	});
	
	$( window ).load( function() {

		//load list of albums
		var callback = function(){ buildPagination(); toggleSearch( "hide" ); }
		pwaLoadAlbumList( false, callback );
		
		//if album id defined, load album
		loadPhotoGrid( "album", false, false );
	});
	
</script>

<?php wp_head(); ?>

</head>

<body class="bg_tan">

<!-- php vars -->
<input type="hidden" id="root_url" value="<?php bloginfo( 'url' ); ?>" />
<input type="hidden" id="pwa_username" value="colehafner" />
<!-- end php vars -->

<!-- start wrapper -->
<div class="wrapper">
	
	<div class="sidebar_offset fl_left bg_tan">&nbsp;</div>
	
	<!-- content start -->
	<div class="content fl_left bg_tan">