<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package special
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main site-content__default" role="main">
			<figure class="wrapper">
				<img class="site-content__default__heroimg" src="<?php echo get_template_directory_uri() ?>/images/max.gif" alt="max headroom">
			</figure>
			<div class="wrapper">
				<header class="page-header">
						<h1 class="page-title"><?php _e( '404', 'special' ); ?></h1>
				</header><!-- .page-header -->
				<section class="error-404 not-found site-content__default__body">
					<div class="page-content">
						<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'special' ); ?></p>

						<?php get_search_form(); ?>

					</div><!-- .page-content -->
				</section><!-- .error-404 -->
			</div>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
