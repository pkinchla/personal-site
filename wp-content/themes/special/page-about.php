<?php
/**
 * About Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
require get_template_directory() . '/credentials.php';

$context = Timber::get_context();
$post = new TimberPost();
$media = instagram_feed($endpoint);

$context['post'] = $post;
$context['pictures'] = $media;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );