<?php
/**
 * The template for displaying search results pages.
 *
 * @package special
 */

get_header(); ?>

	<section id="primary" class="content-area">
		<main id="main" class="site-main site-content__default" role="main">
			<figure class="wrapper hero-interior">
				<img class="site-content__default__heroimg" src="<?php echo get_template_directory_uri() ?>/images/sticky-helmet.gif" alt="crazy robot">
			</figure>
			<div class="wrapper">
			<section class="site-content__default__body">
			<?php if ( have_posts() ) : ?>

				<header class="page-header">
					<h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'special' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
				</header><!-- .page-header -->

				<?php /* Start the Loop */ ?>
				<?php while ( have_posts() ) : the_post(); ?>

					<?php
					/**
					 * Run the loop for the search to output the results.
					 * If you want to overload this in a child theme then include a file
					 * called content-search.php and that will be used instead.
					 */
					get_template_part( 'content', 'search' );
					?>

				<?php endwhile; ?>

				<?php the_posts_navigation(); ?>

			<?php else : ?>

				<?php get_template_part( 'content', 'none' ); ?>

			<?php endif; ?>
			</div>
		</main><!-- #main -->
		</section>
	</section><!-- #primary -->

<?php get_footer(); ?>
