<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;

function createTOC($text) {
  preg_match_all('#<h2.*?>(.*?)</h2>#i',$text, $matches);
  
  array_walk($matches[0], function(&$item){
    $item = '<a href="#'. sanitize_title(strip_tags($item)).'">'. strip_tags($item) . '</a>';
  });

  return $matches[0];   
}

$nav_args = array(
  'prev_text' => '&larr; Prev<span class="assistive-text">ious</span> Post',
  'next_text' => 'Next Post &rarr;',
);

$post_nav = get_the_post_navigation($nav_args);
$post_nav = str_replace('"screen-reader-text"', '"assistive-text"', $post_nav);
$post_nav = str_replace('"navigation post-navigation"', '"navigation post-navigation sans-medium-italic"', $post_nav);
$post->post_nav = $post_nav;
$post->reading_time = estimated_reading_time($post->post_content);
$post->toc = createTOC($post->post_content);


if ( post_password_required( $post->ID ) ) {
  Timber::render( 'single-password.twig', $context );
} else {
  Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
