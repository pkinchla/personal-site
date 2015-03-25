<?php
/*
Template Name: Home Page
*/

$heading = get_field('heading');
$copy = get_field('copy');
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

get_header(); ?>
      
    <div id="primary" class="content-area">
      <main id="content" class="site-content__home" role="main">
        <img class="site-content__home__heroimg" src="<?php echo $small; ?>" srcset="<?php echo $hero_small; ?> 2000w, <?php echo $hero_medium; ?> 3000w, <?php echo $hero_large ?> 3500w, <?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="100vw" alt="<?php echo $alt ?>">
        <div class="wrapper">
          <h1><?php echo $heading ?></h1>
          <section class="site-content__home__copy">
            <?php echo $copy ?>
          </section>
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