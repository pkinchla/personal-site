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

$pictures = instagram_feed('https://www.instagram.com/pkinchla/?__a=1');
$context['pictures'] = $pictures->graphql->user->edge_owner_to_timeline_media->edges;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );