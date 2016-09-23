<?php
/**
 * Portfolio Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$portfolio_posts = array(
  'post_type' => 'portfolio',
  'posts_per_page' => 10
);
$context['portfolio_posts'] = Timber::get_posts($portfolio_posts);

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );