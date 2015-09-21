<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package special
 */

require_once('resp-hero.php');

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<figure class="wrapper hero-interior">
		<img class="site-content__default__heroimg" src="<?php echo $medium; ?>" srcset="<?php echo $hero_cinema .' '. $hero_cinema_width; ?>w, <?php echo $hero_x_large .' '. $hero_x_large_width; ?>w, <?php echo $hero_large .' '. $hero_large_width; ?>w, <?php echo $hero_medium .' '. $hero_medium_width; ?>w, <?php echo $portfolio_x_large .' '. $portfolio_x_large_width; ?>w, <?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="(min-width:120em) 62vw, (min-width:64em) 72vw, (min-width:40em) 57vw, 100vw" alt="<?php echo $alt ?>">
	</figure>
	<div class="wrapper">
		<div class="site-content__default__body">
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</header><!-- .entry-header -->

			<div class="entry-content">
				<?php the_content(); ?>
				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . __( 'Pages:', 'special' ),
						'after'  => '</div>',
					) );
				?>
			</div><!-- .entry-content -->

			<footer class="entry-footer">
				<?php edit_post_link( __( 'Edit', 'special' ), '<span class="edit-link">', '</span>' ); ?>
			</footer><!-- .entry-footer -->
		</div>
	</div>
</article><!-- #post-## -->
