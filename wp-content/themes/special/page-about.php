<?php
/**
 * About Page
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
require get_template_directory() . '/vendor/autoload.php';
require get_template_directory() . '/credentials.php';

use Phpfastcache\Helper\Psr16Adapter;

$instagram = \InstagramScraper\Instagram::withCredentials($user, $password, new Psr16Adapter('Files'));
$instagram->login();
$instagram->saveSession();
$media = $instagram->getMedias('pkinchla', 32);

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

// TODO: figure this out to put in transient instagram_feed();
$context['pictures'] = $media;

Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );