<?php
/**
 * About Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;
$args = array(
    'post_type'   => 'attachment',
    'post_status' => 'inherit',
    'posts_per_page' => -1,
    'order' => 'ASC',
    'meta_query'  => array(
        array(
            'key'     => 'image_type',
            'value'   => 'artwork',
        )
    )
);

$attachmentQuery = new WP_Query($args);

foreach ($attachmentQuery->posts as $attachment) {
  $context['artwork'][] = Timber::get_post($attachment->ID);
}

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
