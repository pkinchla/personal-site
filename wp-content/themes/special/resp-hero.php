<?php

$hero_image = get_field('hero_image');

if( !empty($hero_image)): 

  // vars
  $url = $hero_image['url'];
  $title = $hero_image['title'];
  $alt = $hero_image['alt'];
  $caption = $hero_image['caption'];

  // image sizes and widths
  $size_thumbnail = 'thumbnail';
  $thumbnail = $hero_image['sizes'][$size_thumbnail];
  $width_thumbnail = 'thumbnail-width';
  $thumbnail_width = $hero_image['sizes'][$width_thumbnail];

  $size_medium = 'medium';
  $medium = $hero_image['sizes'][$size_medium];
  $width_medium = 'medium-width';
  $medium_width = $hero_image['sizes'][$width_medium];

  $size_large = 'large';
  $large = $hero_image['sizes'][$size_large];
  $width_large = 'large-width';
  $large_width = '1024';

  $size_portfolio_small = 'portfolio_small';
  $portfolio_small = $hero_image['sizes'][$size_portfolio_small];
  $width_portfolio_small = 'portfolio_small-width';
  $portfolio_small_width = $hero_image['sizes'][$width_portfolio_small];

  $size_portfolio_medium = 'portfolio_medium'; 
  $portfolio_medium = $hero_image['sizes'][$size_portfolio_medium];
  $width_portfolio_medium = 'portfolio_medium-width';
  $portfolio_medium_width = $hero_image['sizes'][$width_portfolio_medium];

  $size_portfolio_large = 'portfolio_large';
  $portfolio_large = $hero_image['sizes'][$size_portfolio_large];
  $width_portfolio_large = 'portfolio_large-width';
  $portfolio_large_width = $hero_image['sizes'][$width_portfolio_large];

  $size_portfolio_x_large = 'portfolio_x_large';
  $portfolio_x_large = $hero_image['sizes'][$size_portfolio_x_large];
  $width_portfolio_x_large = 'portfolio_x_large-width';
  $portfolio_x_large_width = $hero_image['sizes'][$width_portfolio_x_large];
  
  $size_hero_medium = 'hero_medium';
  $hero_medium = $hero_image['sizes'][$size_hero_medium];
  $width_hero_medium = 'hero_medium-width';
  $hero_medium_width = $hero_image['sizes'][$width_hero_medium];

  $size_hero_large = 'hero_large';
  $hero_large = $hero_image['sizes'][$size_hero_large];
  $width_hero_large = 'hero_large-width';
  $hero_large_width = $hero_image['sizes'][$width_hero_large];

  $size_hero_x_large = 'hero_x_large';
  $hero_x_large = $hero_image['sizes'][$size_hero_x_large];
  $width_hero_x_large = 'hero_x_large-width';
  $hero_x_large_width = $hero_image['sizes'][$width_hero_x_large];

  $size_hero_cinema = 'hero_cinema';
  $hero_cinema = $hero_image['sizes'][$size_hero_cinema];
  $width_hero_cinema = 'hero_cinema-width';
  $hero_cinema_width = $hero_image['sizes'][$width_hero_cinema];

  $size_hero_cinema_large = 'hero_cinema_large';
  $hero_cinema_large = $hero_image['sizes'][$size_hero_cinema_large];
  $width_hero_cinema_large = 'hero_cinema_large-width';
  $hero_cinema_large_width = $hero_image['sizes'][$width_hero_cinema_large];

endif;

?>