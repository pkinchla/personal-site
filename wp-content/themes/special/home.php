<?php
/**
 * Blog Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;
$context['page_number'] = pageNumber($paged);
$context['categories'] = Timber::get_terms('category');

$args = array(
  'post_type' => 'post',
  'posts_per_page' => 7
);

$context['posts'] = Timber::get_posts();


// $context['posts'] = new Timber\PostQuery($args);
// $context['pagination'] = Timber::get_pagination();

Timber::render('home.twig', $context );

