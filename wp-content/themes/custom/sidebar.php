

<!-- start sidebar -->
<div class="sidebar bg_black" id="sidebar">

	<div class="pa_15">
	
		<div class="sidebar_header" >
			<a href="#" id="sidebar_logo">
				<div class="sidebar_logo bg_green ma_10_right fl_left border_rounded al_center">
					<span>N</span>
					<div class="sidebar_logo_gloss border_rounded_top">&nbsp;</div>
				</div>
			</a>
			
			<div class="sidebar_title fl_left">Nifty Photo Viewer</div>
			<div class="clear"></div>
		</div>
		
		<div class="sidebar_search pa_20_top" id="sidebar_search">
			<div class="fl_left" style="position:relative;width:75%;">
				<input type="text" class="text_input" name="search_query" id="search_query" value="Search..." default_value="Search..." />
				<a href="#" id="text_input_close" style="display:none;">
					<div class="text_input_close_button bg_grey al_center">X</div>
				</a>
			</div>		
			<div class="fl_left" style="width:25%;">
				<a href="#" id="search_query_submit">
					<div class="text_input_button bg_green">
						<div class="text_input_button_inner al_center" >Go</div>
					</div>
				</a>
			</div>
			<div class="clear"></div>
		</div>
		
		<div class="sidebar_search_toggle" >
			<a href ="#" id="search_toggle" style="display:none;">
				<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/icon_search.png" />
			</a>
		</div>
		
	</div>
	
	<div id="album_list" class="pa_10_top"></div>
</div>
<!-- end sidebar -->

<!-- copyright info -->
<div class="sidebar_copy">
	<div class="pa_10 al_center">
		&copy; 2011 <a href="http://colehafner.com" target="_blank">Cole Hafner</a>&nbsp;&nbsp;|&nbsp;&nbsp; 
		<a href="http://www.shadowbox-js.com/" target="_blank">Shadowbox.js</a>
	</div>
</div>
<!-- end copyright info -->