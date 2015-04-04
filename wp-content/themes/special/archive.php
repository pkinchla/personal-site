<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package special
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main site-content__default" role="main">
			<figure class="wrapper">
				<img class="site-content__default__heroimg" src="<?php echo get_template_directory_uri() ?>/images/cham.jpg" alt="max headroom">
			</figure>
			<div class="wrapper">
				<div class="site-content__default__body">
					<?php if ( have_posts() ) : ?>

						<header class="page-header">
							<?php
								the_archive_title( '<h1 class="page-title">', '</h1>' );
								the_archive_description( '<div class="taxonomy-description">', '</div>' );
							?>
						</header><!-- .page-header -->
						<div class="site-content__blog__archives">
							<?php /* Start the Loop */ ?>
							<?php while ( have_posts() ) : the_post(); ?>
								<h2><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
								<div class="entry-meta">
									<time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time>
								</div>
							<?php endwhile; ?>
							<?php the_posts_navigation(); ?>
						</div>
					<?php else : ?>

						<?php get_template_part( 'content', 'none' ); ?>

					<?php endif; ?>
				</div>
			</div>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
