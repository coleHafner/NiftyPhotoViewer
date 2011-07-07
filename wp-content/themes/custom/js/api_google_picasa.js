
//declare globals
pwa_username = '106371500852327141618';
pwa_base_url_user_entry = 'http://picasaweb.google.com/data/entry/base/user/' + pwa_username;
pwa_base_url_user_feed = 'http://picasaweb.google.com/data/feed/base/user/' + pwa_username;
pwa_base_url_search_feed = 'https://picasaweb.google.com/data/feed/api/all?q=%query%&alt=json&max-results=150';

function pwaLoadAlbumList()
{
	//loading...
	var target = "#album_list";
	showLoader( target );
	
	$.ajax({
		url: pwa_base_url_user_feed + "?category=album&alt=json&access=public",
		success:function( albums ) {
		
			//build html
			var active_album_id = readAnchor();
			var list_html = '<ul class="album_list">';
			
			
			for( i = 0; i < albums.feed.entry.length; i++ )
			{
				var img_base = albums.feed.entry[i].media$group.media$content[0].url;
				var id_begin = albums.feed.entry[i].id.$t.indexOf( 'albumid/' ) + 8;
				var id_end = albums.feed.entry[i].id.$t.indexOf( '?' );
				var album_id = albums.feed.entry[i].id.$t.slice( id_begin, id_end );
				var album_title = albums.feed.entry[i].title.$t;
				
				var is_active = ( active_album_id != false && active_album_id == album_id );
				var active_li = ( is_active ) ? 'class="active_selected"' : '';
				var active_a = ( is_active ) ? 'class="link_active_selected"' : '';
				var active_checked = ( is_active ) ? 'block' : 'none';
				
				list_html += '<li ' + active_li + '><div class="album_list_checked" style="display:' + active_checked + ';"></div><a href="#' + album_id + '" album_id="' + album_id + '" ' + active_a + '>' + album_title + '</a></li>';
				
			}//end for loop
			
			list_html += '</ul>';
			
			//populate menu
			$( target ).html( list_html );
			
		}//end function
	});
	
}//pwaLoadAlbumList()

function pwaLoadPhotoGrid( type, query, callback )
{
	//validate vars
	var photo_feed_url = false;
	type = ( ( type != false ) ) ? type : "album";
	query = ( query != false ) ? query : readAnchor();
	
	//compile url
	switch( type )
	{
		case "album":
			photo_feed_url = pwa_base_url_user_feed + "/albumid/" + query + "?category=photo&alt=json&access=public";
			break;
			
		case "search":
			photo_feed_url = pwa_base_url_search_feed.replace( "%query%", query );
			//alert( "url: " + photo_feed_url );
			//return false;
			break;
	}
	
	if( photo_feed_url != false && 
		query != false )
	{
		//loading...
		showLoader( "#content" );
		
		//load album
		$.ajax({
			url: photo_feed_url,
			success:function( photos ) {
			
				//build html
				var grid_html = '<table class="grid ma_auto"><tr>';
				var columns = 5;
				
				for( i = 0; i < photos.feed.entry.length; i++ )
				{
					var img_base = photos.feed.entry[i].media$group.media$content[0].url;
					var img_title = photos.feed.entry[i].title.$t;
					var id_begin = photos.feed.entry[i].id.$t.indexOf('photoid/')+8;
					var id_end = photos.feed.entry[i].id.$t.indexOf('?');
					var photo_id = photos.feed.entry[i].id.$t.slice(id_begin, id_end);
					var thumb = img_base + '?imgmax=175&crop=1';
					var full = img_base + '?imgmax=800&crop=0';
					
					grid_html += '<td><div class="grid_pic pa_5 box_shadow"><a href="' + full + '" rel="shadowbox[' + query + ']" title="' + img_title + '"><img src="' + thumb + '"/></a></div></td>';
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
