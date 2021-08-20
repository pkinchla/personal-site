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
$collection = new Timber\PostQuery();
$context['posts'] = $collection;
$context['pagination'] = $collection->pagination();

Timber::render( array( 'archive-portfolio.twig' ), $context );