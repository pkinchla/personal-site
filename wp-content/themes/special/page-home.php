<?php
/*
Template Name: Home Page
*/

$heading = get_field('heading');
$copy = get_field('copy');

require_once('resp-hero.php');

get_header(); ?>
      
    <div id="primary" class="content-area">
      <main id="main" class="site-main site-content__home">
        <img class="site-content__home__heroimg" src="<?php echo $medium; ?>" srcset="<?php echo $hero_cinema_large .' '. $hero_cinema_large_width; ?>w, <?php echo $hero_cinema .' '. $hero_cinema_width; ?>w, <?php echo $hero_x_large .' '. $hero_x_large_width; ?>w, <?php echo $hero_large .' '. $hero_large_width; ?>w, <?php echo $hero_medium .' '. $hero_medium_width; ?>w, <?php echo $portfolio_x_large .' '. $portfolio_x_large_width; ?>w, <?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="100vw" alt="<?php echo $alt ?>">
        <div class="wrapper">
          <h1><?php echo $heading ?></h1>
          <div class="site-content__home__copy">
            <div class="content">
              <?php echo $copy ?>
            </div>
          </div>
          <section class="site-content__home__blog">
          <h3>Latest Writing</h3>
            <?php query_posts( 'posts_per_page=1' ); ?>
                <?php while ( have_posts() ) : the_post(); ?>
                <h4><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                  <div class="entry-meta"><time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time></div>
            <?php endwhile; // end of the loop. ?>
          </section>
        </div>
      </main><!-- #content .site-content -->
    </div><!-- #primary .content-area -->


<?php get_footer(); ?>