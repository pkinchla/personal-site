<?php
/**
 * About Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

// $instagram_creds import
require get_template_directory() . '/credentials.php';

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$pictures = instagram_feed($instagram_creds);

$context['pictures'] = $pictures;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );