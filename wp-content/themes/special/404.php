<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package special
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main site-content__default">
			<figure class="wrapper hero-interior">
				<img class="site-content__default__heroimg" src="<?php echo get_template_directory_uri() ?>/images/max.gif" alt="max headroom">
			</figure>
			<div class="wrapper">
						<h1 class="page-title"><?php _e( '404', 'special' ); ?></h1>
				<section class="error-404 not-found site-content__default__body">
					<div class="page-content">
						<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'special' ); ?></p>

						<?php get_search_form(); ?>

					</div><!-- .page-content -->
				</section><!-- .error-404 -->
			</div>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
