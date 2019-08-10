<?php
/**
 * Blog Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$blog_posts = array(
  'paged' => $paged,
  'post_type' => 'post',
  'posts_per_page' => 7
);
query_posts($blog_posts);

$context['page_number'] = pageNumber($paged);
$context['categories'] = Timber::get_terms('category');
$context['blog_posts'] = Timber::get_posts($blog_posts);
$context['pagination'] = Timber::get_pagination();
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );

