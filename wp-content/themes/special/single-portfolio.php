<?php
/**
 * Template name: Portfolio Single Item
 *
 */

$main_image_square = get_field('main_image_square'); 
$square_image_optional = get_field('main_image_square_optional'); 
$main_image_rectangle = get_field('main_image_rectangle'); 
$copy = get_field('copy');


  // vars
  $url_rectangle = $main_image_rectangle['url'];
  $title_rectangle = $main_image_rectangle['title'];
  $alt_rectangle = $main_image_rectangle['alt'];
  $caption_rectangle = $main_image_rectangle['caption'];

  $url_square = $main_image_square['url'];
  $title_square = $main_image_square['title'];
  $alt_square = $main_image_square['alt'];
  $caption_square = $main_image_square['caption'];

  $url_square_opt = $square_image_optional['url'];
  $title_square_opt = $square_image_optional['title'];
  $alt_square_opt = $square_image_optional['alt'];
  $caption_square_opt = $square_image_optional['caption'];

  // base image sizes
  $thumbnail = 'portfolio_small';
  $size_medium = 'portfolio_medium';
  $size_large = 'portfolio_large';

  // image sizes square
  $small_square = $main_image_square['sizes'][ $thumbnail ];
  $medium_square = $main_image_square['sizes'][ $size_medium ];
  $large_square = $main_image_square['sizes'][ $size_large ];

  // image sizes square optional
  $small_square_opt = $square_image_optional['sizes'][ $thumbnail ];
  $medium_square_opt = $square_image_optional['sizes'][ $size_medium ];
  $large_square_opt = $square_image_optional['sizes'][ $size_large ];

  // image sizes rectangle
  $small_rectangle = $main_image_rectangle['sizes'][ $thumbnail ];
  $medium_rectangle = $main_image_rectangle['sizes'][ $size_medium ];
  $large_rectangle = $main_image_rectangle['sizes'][ $size_large ];

  require_once('resp-hero.php');

get_header(); ?>

    <div id="primary" class="content-area">
      <main id="main" class="site-main site-content__portfolio__single">
      <figure class="wrapper hero-interior">
        <img class="site-content__default__heroimg" src="<?php echo $medium; ?>" srcset="<?php echo $hero_cinema_large .' '. $hero_cinema_large_width; ?>w, <?php echo $hero_cinema .' '. $hero_cinema_width; ?>w, <?php echo $hero_x_large .' '. $hero_x_large_width; ?>w, <?php echo $hero_large .' '. $hero_large_width; ?>w, <?php echo $hero_medium .' '. $hero_medium_width; ?>w, <?php echo $portfolio_x_large .' '. $portfolio_x_large_width; ?>w, <?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="100vw" alt="<?php echo $alt ?>">
      </figure>
      <div class="wrapper">
        <h1 class="entry-title"><?php the_title(); ?></h1>
          <?php 
            if ($main_image_square) { ?>  
            <div class="portfolio__single__copy--print">
              <?php echo $copy; ?>
              <strong>Filed in: <?php echo get_the_excerpt(); ?></strong>
            </div>
            <div class="portfolio__single__image--print">
                <img src="<?php echo $small_square; ?>" srcset="<?php echo $large_square; ?> 1300w, <?php echo $medium_square; ?> 800w, <?php echo $small_square; ?> 550w" sizes="(min-width:64em) 66vw, (min-width:40em) 85vw, 90vw" alt="<?php echo $alt_square ?>">
                <a class="action back-link" href="<?php echo get_page_link(7); ?>">&larr; Back to List</a>
              <?php if ($square_image_optional) { ?>
                <img src="<?php  echo $small_square_opt; ?>" srcset="<?php echo $large_square_opt;?> 1300w, <?php echo $medium_square_opt;?> 800w, <?php echo $small_square_opt;?> 550w" sizes="(min-width:64em) 66vw, (min-width:40em) 85vw, 90vw" alt="<?php echo $alt_square_opt; ?>"
                <a class="action back-link" href="<?php echo get_page_link(7); ?>">&larr; Back to List</a>
              <?php }
                  else { }?>
            </div>
          <?php  } 
            else { ?>
            <div class="portfolio__single__copy--phone">
              <?php echo $copy; ?>
              <strong>Filed in: <?php echo get_the_excerpt(); ?></strong>
            </div>
            <div class="portfolio__single__image--phone">    
              <img src="<?php echo $medium_rectangle; ?>" alt="<?php echo $alt_rectangle ?>" />
              <a class="action back-link" href="<?php echo get_page_link(7); ?>">&larr; Back to List</a>
            </div>   
          <?php } ?>
        </div>
      </main><!-- #content .site-content -->
    </div><!-- #primary .content-area -->


<?php get_footer(); ?>