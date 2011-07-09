

<!-- start sidebar -->
<div class="sidebar bg_black" id="sidebar">

	<!-- begin header -->
	<div class="sidebar_header_container" id="sidebar_header_container">
	
		<!-- begin padder -->
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
				<div class="sidebar_search_container">
					<div class="text_input_icon">
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/icon_search.png" />
					</div>
					<input type="text" class="text_input" name="search_query" id="search_query" value="Search..." default_value="Search..." />
					<a href="#" id="text_input_close" style="display:none;">
						<div class="text_input_close_button bg_grey al_center">X</div>
					</a>
				</div>
			</div>
			
			<div class="sidebar_search_toggle" id="search_toggle_container" style="display:none;">
			
				<div class="sidebar_pagination fl_left" id="sidebar_pagination">
							
				</div>
				
				<div class="fl_right">
					<a href ="#" id="search_toggle">
						<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/icon_search.png" />
					</a>
				</div>
			</div>
			
		</div>
		<!-- end padder -->
		
	</div>
	<!-- end header -->
	
	<!-- begin album list -->
	<div id="album_list_container" class="album_list_container pa_10_top">
		<div class="album_slider" id="album_slider">
		
		</div>
	</div>
	<!-- end album list -->
	
	<!-- copyright info -->
	<div class="sidebar_copy" id="sidebar_copy">
		<div class="pa_10 al_center">
			&copy; 2011 <a href="http://colehafner.com" target="_blank">Cole Hafner</a>&nbsp;&nbsp;|&nbsp;&nbsp; 
			<a href="http://www.shadowbox-js.com/" target="_blank">Shadowbox.js</a>
		</div>
	</div>
	<!-- end copyright info -->
	
</div>
<!-- end sidebar -->