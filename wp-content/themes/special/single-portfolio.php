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

get_header(); ?>

		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
			  <h1 class="entry-title"><?php the_title(); ?></h1>
			   <section>
          <?php if ($main_image_square) { ?>
            <div class="col-third">
              <?php echo $copy; ?>
            </div>
            <div class="col-two-third">		 
              <figure class="portfolio-item">
                <img src="<?php echo $small_square; ?>"
                  srcset="<?php echo $large_square; ?> 1300w, <?php echo $medium_square; ?> 800w, <?php echo $small_square; ?> 550w"
                  sizes="(min-width: 45.25em) 75.75vw, 88.8vw" alt="<?php echo $alt_square ?>" 
                />
              </figure>
              <?php if ($square_image_optional) { ?>
              <figure class="portfolio-item">
                <img src="<?php  echo $small_square_opt; ?>"
                srcset="<?php echo $large_square_opt;?> 1300w, <?php echo $medium_square_opt;?> 800w, <?php echo $small_square_opt;?> 550w"
                sizes="(min-width: 45.25em) 75.75vw, 88.8vw" alt="<?php echo $alt_square_opt; ?>"
              </figure>
              <?php }
                    else { }?>
            </div>
          <?php  } 
                else { ?>
            <div class="col-two-third">
              <?php echo $copy; ?>
            </div>
            <div class="col-third">    
              <figure class="portfolio-item">
                <img class="iphone-exmaple" src="<?php echo $medium_rectangle; ?>" alt="<?php echo $alt_rectangle ?>" />
              </figure>
            </div>    
          <?php } ?>  
        </section>
			</div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>