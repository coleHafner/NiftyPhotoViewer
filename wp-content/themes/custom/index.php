<?php 
get_header();
$num_per_row = 5;
$num_rows = 20;
?>

<div id="content" class="pa_10">
	<?php if( !array_key_exists( "album_id", $_GET ) || !is_numeric( $_GET['album_id'] ) ) :?>
	Welcome to the main page...
	<?php endif; ?>
</div>

<?php  
get_footer();
get_sidebar();
get_html( "closing_tags" );  
?>