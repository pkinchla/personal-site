<?php
/**
 * About Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$media = instagram_feed();

// TODO: figure this out to put in transient instagram_feed();
$context['pictures'] = $media;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );