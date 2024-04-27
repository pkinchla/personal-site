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

Timber::render('home.twig', $context );

