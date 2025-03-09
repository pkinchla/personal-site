<?php
/*
Template Name: Random
*/

$args = array(
  'orderby' => 'rand',
  'numberposts' => 1,
  'post_type' => array(
    'post'
  ),
);

query_posts($args);

while (have_posts()) : the_post();
  wp_safe_redirect(get_permalink());
  exit;
endwhile;
?>
