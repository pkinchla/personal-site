<?php
/**
 * @package special
 */

$hero_image = get_field('hero_image');

 if( !empty($hero_image)): 

	// vars
	$url = $hero_image['url'];
	$title = $hero_image['title'];
	$alt = $hero_image['alt'];
	$caption = $hero_image['caption'];

	// image sizes
	$thumbnail = 'portfolio_small';
	$small = $hero_image['sizes'][ $thumbnail ];

	$size_medium = 'portfolio_medium';
	$medium = $hero_image['sizes'][ $size_medium ];

	$size_large = 'portfolio_large';
	$large = $hero_image['sizes'][ $size_large ];
	
	$hero_large = 'hero_large';
	$hero_small = $hero_image['sizes'][ $hero_large ];

	$hero_cinema = 'hero_cinema';
	$hero_medium = $hero_image['sizes'][ $hero_cinema ];

	$hero_cinema_large = 'hero_cinema_large';
	$hero_large = $hero_image['sizes'][ $hero_cinema_large ];

endif;

$nav_args = array(
		'prev_text' => '&larr; Prev Post',
		'next_text' => 'Next Post &rarr;',
		'screen_reader_text' => 'Portfolio Navigation',
	);

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="wrapper">
		<img class="site-content__default__heroimg" src="<?php echo $small; ?>" srcset="<?php echo $hero_small; ?> 2000w, <?php echo $hero_medium; ?> 3000w, <?php echo $hero_large ?> 3500w, <?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="100vw" alt="<?php echo $alt ?>">
		<section class="site-content__default__body">
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

				<div class="entry-meta">
					<?php special_posted_on(); ?>
				</div><!-- .entry-meta -->
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
				<?php special_entry_footer(); ?>
			</footer><!-- .entry-footer -->
		</section>
		<?php the_post_navigation($nav_args); ?>
	</div>
</article><!-- #post-## -->
