
//define globals
uri  = window.location.href.replace(/&amp;/g, '&');

function readGet() 
{
	var get = false
	var para_arr, para_split;
	
	if( uri.indexOf('?') > -1 ) 
	{
		var uri_split = uri.split('?');
		var para_str = uri_split[1];
		get = new Array();
		
		if( para_str.indexOf( '&' ) > -1 ) 
		{ 
			para_arr = para_str.split( '&' );
		} 
		else 
		{ 
			para_arr = new Array( para_str );
		}
		
		for( var i = 0; i < para_arr.length; i++ )
		{
			para_arr[i] = para_arr[i].indexOf('=') > -1 ? para_arr[i] : para_arr[i] + '=';
			para_split  = para_arr[i].split('=');
			get[para_split[0]] = decodeURI( para_split[1].replace(/\+/g, ' ' ) );
		}
	}
	
	return get;
	
}//readGet()

function readAnchor()
{
	var anchor = false;
	
	if( uri.indexOf('#') > -1 ) 
	{
		var anchor_split = uri.split('#');
		anchor = anchor_split[1];
	}
	
	return anchor;
	
}//readAnchor()

function showLoader( class_or_id )
{
	if( validateElement( class_or_id ) == true )
	{
		$( class_or_id ).html( "Loading..." ); 
	}
	
}//showLoader()

function validateElement( class_or_id )
{
	var is_valid = true;
	class_or_id = class_or_id.toString();
	var first_char = class_or_id.charAt( 0 ); 
	
	if( ( first_char != "." && first_char != "#" ) ||
		$( class_or_id ).length == 0 ) 
	{
		is_valid = false;
		alert( "Error: Element '" + class_or_id + "' does not exist." );
	}
	
	return is_valid;
	
}//validateElement()

function getHeight( el )
{
	if( validateElement( el ) == true )
	{
		return parseInt( $( el ).css( "height" ).toString().replace( "px", "" ) );
	}
}//getHeight()