<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package Special
 * @since Special 1.0
 */
?>

	</div><!-- #main .site-main -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info group">
		 <div class="footer-col2">
		  <h5>Licensed with a Creative Commons</h5>
      <small>All associated logos are trademarks or registered trademarks or service marks of their respective owners. All rights reserved. Any use of these is done for non-commercial purposes unless otherwise noted.</small>
			<small class="copy">Paul Kinchla  &copy; 2005 - <?php echo date("Y"); ?></small>
			</div>
		<div class="footer-col1">	
			<h5>Colophon</h5>
			<dl>
			  <dt>Typefaces</dt>
			    <dd>Georgia</dd>
			    <dd>Futura</dd>
			</dl>
			<dl>
			  <dt>Code</dt>
  			  <dd><a href="http://validator.w3.org/check?uri=referer">HTML</a></dd>
  			  <dd>CSS</dd>
			    <dd><a href="http://wordpress.org/">Wordpress</a></dd>
			    <dd><a href="https://typekit.com/">Typekit</a></dd>
			</dl>
		</div>
		</div><!-- .site-info -->
		
	</footer><!-- #colophon .site-footer -->
</div><!-- #page .hfeed .site -->
    
<?php wp_footer(); ?>
</body>
</html>