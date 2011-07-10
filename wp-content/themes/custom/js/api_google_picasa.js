
/**
 * This is wrapper script to work with Google Photo API v1.0 
 * @author	hafner
 * @since	20110707
 */

function pwaLoadAlbumList( pwa_username, callback, album_id )
{
	pwa_username = ( pwa_username != false ) ? pwa_username : pwaGetAnchorVar( 0 );
	//alert( "user: " + pwa_username );
	
	if( pwa_username != false )
	{
		//loading...
		var feeds = pwaGetFeedUrls();
		var target = "#album_slider";
		showLoader( target );
		
		var feed_url = feeds.user_feed.replace( "%user%", pwa_username )
		
		$.ajax({
			url: feed_url + "?category=album&alt=json&access=public",
			crossDomain: true,
			dataType: "jsonp",
			success:function( albums ) {
			
				//build html
				var active_album_id = ( album_id != false ) ? album_id : pwaGetAnchorVar( 1 );
				var list_html = '<ul class="album_list" id="album_list">';
				
				for( i = 0; i < albums.feed.entry.length; i++ )
				{
					var img_base = albums.feed.entry[i].media$group.media$content[0].url;
					var id_begin = albums.feed.entry[i].id.$t.indexOf( 'albumid/' ) + 8;
					var id_end = albums.feed.entry[i].id.$t.indexOf( '?' );
					var cur_album_id = albums.feed.entry[i].id.$t.slice( id_begin, id_end );
					var album_title = albums.feed.entry[i].title.$t;
					album_title = ( album_title.length > 28 ) ? album_title.substr( 0, 25 ) + '...' : album_title;
					
					var is_active = ( active_album_id != false && active_album_id == cur_album_id );
					var active_li = ( is_active ) ? 'class="active_selected"' : '';
					var active_a = ( is_active ) ? 'class="link_active_selected"' : '';
					var active_checked = ( is_active ) ? 'block' : 'none';
					
					list_html += '<li ' + active_li + '><div class="album_list_checked" style="display:' + active_checked + ';"></div><a href="#' + pwa_username + '/' + cur_album_id + '" album_id="' + cur_album_id + '" user="' + pwa_username + '" ' + active_a + '>' + album_title + '</a></li>';
					
				}//end for loop
				
				list_html += '</ul>';
				
				//populate menu
				$( target ).html( list_html );
				
				//do callback
				callback();
				
			}//end function
		});
		
	}//if we have a username
	
}//pwaLoadAlbumList()

function pwaLoadPhotoGrid( type, query, callback, user )
{
	//validate vars
	var photo_feed_url = false;
	var feeds = pwaGetFeedUrls();
	type = ( ( type != false ) ) ? type : "album";
	
	//compile url
	switch( type )
	{
		case "album":
			
			var pwa_username = ( user != false ) ? user : pwaGetAnchorVar( 0 );
			query = ( query != false ) ? query : pwaGetAnchorVar( 1 );
			//alert( "user: " + pwa_username + " q: " + query );
			
			if( pwa_username != false )
			{
				photo_feed_url = feeds.user_feed.replace( "%user%", pwa_username );
				photo_feed_url = ( query != false ) ? photo_feed_url + "/albumid/" + query + "?category=photo&alt=json&access=public" : photo_feed_url;
			}
			break;
			
		case "search":
			var search_url = feeds.search;
			query = ( query != false ) ? query : pwaGetAnchorVar( 0 );
			photo_feed_url = search_url.replace( "%query%", query );
			break;
	}
	
	if( photo_feed_url != false && 
		query != false )
	{
		//loading...
		showLoader( "#content" );
		//alert( "url: " + photo_feed_url );
		//load album
		$.ajax({
			url: photo_feed_url,
			crossDomain: true,
			dataType: "jsonp",
			success:function( photos ) {
				
				//build html
				var base_url_split = window.location.toString().split( "#" );
				var show_meta = ( type == "search" ) ? true : false;
				var grid_html = '<table class="grid ma_auto"><tr>';
				var base_url = base_url_split[0];
				var columns = 5;
				
				for( i = 0; i < photos.feed.entry.length; i++ )
				{
					//basic info
					var img_base = photos.feed.entry[i].media$group.media$content[0].url;
					var img_title = photos.feed.entry[i].title.$t;
					var thumb = img_base + '?imgmax=175&crop=1';
					var full = img_base + '?imgmax=800&crop=0';
					
					//username or user id
					var id_begin = photos.feed.entry[i].id.$t.indexOf('user/')+5;
					var id_end = photos.feed.entry[i].id.$t.indexOf('/albumid');
					var user = photos.feed.entry[i].id.$t.slice(id_begin, id_end);
					
					//album id
					var id_begin = photos.feed.entry[i].id.$t.indexOf('albumid/')+8;
					var id_end = photos.feed.entry[i].id.$t.indexOf('photoid');
					var album_id = photos.feed.entry[i].id.$t.slice(id_begin, id_end);
					
					//photo id
					var id_begin = photos.feed.entry[i].id.$t.indexOf('photoid/')+8;
					var id_end = photos.feed.entry[i].id.$t.indexOf('?');
					var photo_id = photos.feed.entry[i].id.$t.slice(id_begin, id_end);
					
					grid_html += '<td>';
					grid_html += '<div class="grid_pic pa_5 box_shadow">';
					grid_html += '<a href="' + full + '" rel="shadowbox[' + query + ']" title="' + img_title + '">';
					grid_html += '<img src="' + thumb + '"/></a>';
					
					
					if( show_meta )
					{
						grid_html += '<div class="grid_pic_meta al_center" style="display:none;"><a href="' + base_url + '#' + user + '/' + album_id + '">View Album</a></div>';
					}
					
					
					grid_html += '</div></td>';
					if (i%columns == columns - 1 ) { grid_html += '</tr><tr>'; }
					
				 }//loop through photos
				 
				grid_html += '</tr></table>';
				
				//populate content
				$( "#content" ).html( grid_html );
				
				callback();
				
			}//end success function
		});
		
	}//if we have a valid album_id
	 
}//pwaLoadAlbumPreview()

function pwaGetAnchorVar( index )
{
	var return_str = false;
	var anchor = readAnchor();
	
	if( anchor != false &&
		anchor.indexOf( "/" ) > -1 )
	{
		var anchor_split = anchor.split( "/" );
		var return_str = anchor_split[index];
	}
	
	return ( return_str != false ) ? return_str.replace( " ", "%20" ) : return_str;
	
}//pwaGetAnchorVar()

function pwaGetFeedUrls()
{
	var urls = new Object();
	urls.user_entry = 'http://picasaweb.google.com/data/entry/base/user/%user%';
	urls.user_feed = 'http://picasaweb.google.com/data/feed/base/user/%user%';
	urls.search = 'https://picasaweb.google.com/data/feed/api/all?q=%query%&alt=json&max-results=100';
	
	return urls;
	
}//pwaGetFeedUrls()
