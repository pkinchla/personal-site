<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package Special
 * @since Special 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<article id="post-0" class="post error404 not-found">
				<header class="entry-header">
					<h1 class="entry-title"><?php _e( '404 Time', 'special' ); ?></h1>
				</header><!-- .entry-header -->

				<div class="entry-content">

					<p><?php _e( 'Something went wrong. Try a search to return to your regularly scheduled programming.', 'special' ); ?></p>

					<?php get_search_form(); ?>
      

				</div><!-- .entry-content -->
			</article><!-- #post-0 .post .error404 .not-found -->

		</div><!-- #content .site-content -->
	</div><!-- #primary .content-area -->

<?php get_footer(); ?>