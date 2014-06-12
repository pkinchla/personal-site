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
		  <h5><a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Licensed with a Creative Commons</a></h5>
      <small>All associated logos are trademarks or registered trademarks or service marks of their respective owners. All rights reserved. Any use of these is done for non-commercial purposes unless otherwise noted.</small>
			</div>
		<div class="footer-col1">	
			<h5>Colophon</h5>
			<small>This site is set in Skolar Web and Futura PT. Typefaces are being served up via <a href="https://typekit.com/">Typekit</a>. Handcrafted with <a href="http://validator.w3.org/check?uri=referer">HTML</a>, CSS and built on <a href="http://wordpress.org/">Wordpress</a></small>
			<small class="copy">Paul Kinchla  &copy; 2005 - <?php echo date("Y"); ?></small>
			</div>
		</div><!-- .site-info -->
		
	</footer><!-- #colophon .site-footer -->
</div><!-- #page .hfeed .site -->
<script type="text/javascript">
  (function() {
    var config = {
      kitId: 'ltt0nnt'
    };
    var d = false;
    var tk = document.createElement('script');
    tk.src = '//use.typekit.net/' + config.kitId + '.js';
    tk.type = 'text/javascript';
    tk.async = 'true';
    tk.onload = tk.onreadystatechange = function() {
      var rs = this.readyState;
      if (d || rs && rs != 'complete' && rs != 'loaded') return;
      d = true;
      try { Typekit.load(config); } catch (e) {}
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tk, s);
  })();
</script>    
<?php wp_footer(); ?>
</body>
</html>