<?php
/**
 * Home Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */


$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;

$home_post = array(
  'post_type' => 'post',
  'posts_per_page' => 1
);

$context['home_post'] = Timber::get_posts($home_post);
Timber::render('front-page.twig', $context );
