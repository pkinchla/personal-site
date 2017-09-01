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

$pictures = instagram_feed();

$context['pictures'] = $pictures;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );