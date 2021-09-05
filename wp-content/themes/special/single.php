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

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$context['pagination'] = Timber::get_pagination();

$nav_args = array(
    'prev_text' => '&larr; Prev<span class="assistive-text">ious</span> Post',
    'next_text' => 'Next Post &rarr;',
  );

$post_nav = get_the_post_navigation($nav_args);
$post_nav = str_replace('"screen-reader-text"', '"assistive-text"', $post_nav);
$context['post_nav'] = $post_nav;

if ( post_password_required( $post->ID ) ) {
  Timber::render( 'single-password.twig', $context );
} else {
  Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
