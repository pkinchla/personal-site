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
    'prev_text' => '&larr; Prev Post',
    'next_text' => 'Next Post &rarr;',
    'screen_reader_text' => 'Post Navigation',
  );
$context['post_nav'] = get_the_post_navigation($nav_args);

if (comments_open() || get_comments_number()) {
  $context['comments'] = TimberHelper::function_wrapper('comments_template');
}

if ( post_password_required( $post->ID ) ) {
  Timber::render( 'single-password.twig', $context );
} else {
  Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
