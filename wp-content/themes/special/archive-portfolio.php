<?php
/**
 * Template name: Portfolio Listings
 *
 */

// vars
$copy = get_field('copy');

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$loop = new WP_Query( array(
'post_type' => 'Portfolio',
'posts_per_page' => 24,
'orderby' => 'menu_order',
'paged'=>$paged,
));


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
    <main id="main" class="site-content__portfolio" role="main">
      <div class="wrapper">
        <img class="site-content__portfolio__heroimg" src="<?php echo $small; ?>" srcset="<?php echo $hero_small; ?> 2000w, <?php echo $hero_medium; ?> 3000w, <?php echo $hero_large ?> 3500w, <?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="100vw" alt="<?php echo $alt ?>">
        <h1 class="entry-title"><?php the_title(); ?></h1>
         <ul class="site-content__portfolio__list">
              <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
                
                  <?php $list_image = get_field('list_image'); 

                  if( !empty($list_image) ): 

                    // vars
                    $url = $list_image['url'];
                    $title = $list_image['title'];
                    $alt = $list_image['alt'];
                    $caption = $list_image['caption'];

                    // image sizes
                    $thumbnail = 'portfolio_small';
                    $small = $list_image['sizes'][ $thumbnail ];

                    $size_medium = 'portfolio_medium';
                    $medium = $list_image['sizes'][ $size_medium ];

                    $size_large = 'portfolio_large';
                    $large = $list_image['sizes'][ $size_large ];

                  endif; ?>
                  
                  <li>
                    <a class="site-content__portfolio__listlink" href="<?php the_permalink(); ?>">
                      <h4 class="title"><?php the_title(); ?> | <em><?php the_excerpt(); ?></em></h4>  
                      <img src="<?php echo $small; ?>" srcset="<?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="(max-width:40em) 85vw, (min-width: 40em) 23.33vw" alt="<?php echo $alt ?>">
                    </a>
                  </li>           
              <?php endwhile; ?>
            </ul>
        </div>
      <?php echo $copy; ?>
    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>
