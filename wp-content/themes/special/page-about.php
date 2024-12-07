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

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
