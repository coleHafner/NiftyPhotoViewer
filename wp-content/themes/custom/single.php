<?php 
get_header();
$num_per_row = 5;
$num_rows = 20;
?>

<div class="pa_10">
		<table class="grid">
<?php for( $i = 0; $i < $num_rows; $i++ ) : ?>

		<tr>
	<?php for( $j = 0; $j < $num_per_row; $j++ ) : ?>
			<td>
				<div class="grid_pic"></div>
			</td>
	<?php endfor; ?>
	
		</tr>		
<?php endfor; ?>

	</table>
</div>

<?php  
get_footer();
get_sidebar();
get_html( "closing_tags" );  
?>