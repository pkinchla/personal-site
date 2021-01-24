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
$context['page_number'] = pageNumber($paged);
$context['categories'] = Timber::get_terms('category');
$context['posts'] = new Timber\PostQuery();
$context['pagination'] = Timber::get_pagination();

Timber::render('home.twig', $context );

