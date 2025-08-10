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
  'prev_text' => '<svg xmlns="http://www.w3.org/2000/svg" height="20" height="20" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg> Prev<span class="assistive-text">ious</span> Post',
  'next_text' => 'Next Post <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 640"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/></svg>',
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
