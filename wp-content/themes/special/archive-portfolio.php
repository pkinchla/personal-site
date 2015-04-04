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

require_once('resp-hero.php');

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main site-content__portfolio" role="main">
      <figure class="wrapper">
        <img class="site-content__portfolio__heroimg" src="<?php echo $medium; ?>" srcset="<?php echo $hero_cinema_large .' '. $hero_cinema_large_width; ?>w, <?php echo $hero_cinema .' '. $hero_cinema_width; ?>w, <?php echo $hero_x_large .' '. $hero_x_large_width; ?>w, <?php echo $hero_large .' '. $hero_large_width; ?>w, <?php echo $hero_medium .' '. $hero_medium_width; ?>w, <?php echo $portfolio_x_large .' '. $portfolio_x_large_width; ?>w, <?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="(min-width:120em) 62vw, (min-width:64) 72vw, (min-width:40em) 57vw, 90vw" alt="<?php echo $alt ?>">
      </figure>
      <div class="wrapper">
        <h1 class="entry-title"><?php the_title(); ?></h1>
         <ul class="site-content__portfolio__list">
            <?php while ( $loop->have_posts() ) : $loop->the_post(); 
                $list_image = get_field('list_image');

                if( !empty($list_image)): 

                // vars
                $url = $list_image['url'];
                $title = $list_image['title'];
                $alt = $list_image['alt'];
                $caption = $list_image['caption'];

                // image sizes and widths
                $size_thumbnail = 'thumbnail';
                $thumbnail = $list_image['sizes'][$size_thumbnail];
                $width_thumbnail = 'thumbnail-width';
                $thumbnail_width = $list_image['sizes'][$width_thumbnail];

                $size_medium = 'medium';
                $medium = $list_image['sizes'][$size_medium];
                $width_medium = 'medium-width';
                $medium_width = $list_image['sizes'][$width_medium];

                $size_large = 'large';
                $large = $list_image['sizes'][$size_large];
                $width_large = 'large-width';
                $large_width = '1024';

                $size_portfolio_small = 'portfolio_small';
                $portfolio_small = $list_image['sizes'][$size_portfolio_small];
                $width_portfolio_small = 'portfolio_small-width';
                $portfolio_small_width = $list_image['sizes'][$width_portfolio_small];

                $size_portfolio_medium = 'portfolio_medium'; 
                $portfolio_medium = $list_image['sizes'][$size_portfolio_medium];
                $width_portfolio_medium = 'portfolio_medium-width';
                $portfolio_medium_width = $list_image['sizes'][$width_portfolio_medium];

                $size_portfolio_large = 'portfolio_large';
                $portfolio_large = $list_image['sizes'][$size_portfolio_large];
                $width_portfolio_large = 'portfolio_large-width';
                $portfolio_large_width = $list_image['sizes'][$width_portfolio_large];

              endif;
              ?>
            <li>
              <a class="site-content__portfolio__listlink" href="<?php the_permalink(); ?>">
                <h4 class="title"><?php the_title(); ?> | <em><?php echo get_the_excerpt(); ?></em></h4>  
                <img src="<?php echo $medium; ?>" srcset="<?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="(min-width:120em) 14vw, (min-width:64em) 20vw, (min-width:40em) 30vw, 90vw" alt="<?php echo $alt ?>">
              </a>
            </li>           
            <?php endwhile; ?>
          </ul>
        </div>
      <?php echo $copy; ?>
    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>
