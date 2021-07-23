<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

Timber::$dirname = array('views');

// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'special' ),
	));

// credentials for apis and things
require get_template_directory() . '/credentials.php';

// adding async for scripts usage -
// wp_enqueue_script('script', '/path/to/my/script.js#asyncload');

function add_async_forscript($url)
{
		if (strpos($url, '#asyncload')===false)
				return $url;
		else if (is_admin())
				return str_replace('#asyncload', '', $url);
		else
				return str_replace('#asyncload', '', $url)."' async='async";
}
add_filter('clean_url', 'add_async_forscript', 11, 1);

/**
 * Automatically add IDs to headings such as <h2></h2>
 */
function auto_id_headings( $content ) {

	$content = preg_replace_callback( '/(\<h[1-6](.*?))\>(.*)(<\/h[1-6]>)/i', function( $matches ) {
		if ( ! stripos( $matches[0], 'id=' ) ) :
			$heading_link = ' <a class="heading-anchor js-heading-anchor heading-link" href="#' . sanitize_title( $matches[3] ) . '"><span aria-hidden="true">#</span> <span class="assistive-text">Jump link for '. $matches[3] .'</span></a> ';
			$matches[0] = $matches[1] . $matches[2] . ' id="' . sanitize_title( $matches[3] ) . '">' . $matches[3] . $heading_link . $matches[4];
		endif;

		return $matches[0];
	}, $content );

    return $content;
}

add_filter( 'the_content', 'auto_id_headings' );

/**
 * show variable on frontend
 */
function dump($var){
	echo '<pre style="color: white">';
		var_dump($var);
	echo '</pre>';
}

/**
 * get page number if not on page 1
 */
function pageNumber($number){
  if($number > 0) {
    return $number;
  }
}

/**
 * Enqueue scripts and styles.
 */
function special_scripts() {
  wp_dequeue_style( 'wp-block-library' );
  wp_dequeue_style( 'wp-block-library-theme');


  if (get_post_type() === 'post') {
		wp_enqueue_script( 'prism', get_template_directory_uri() .'/js/prism.min.js#asyncload', array(), '', true);
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'special_scripts' );

add_action(
  'after_setup_theme',
  function() {
    add_theme_support( 'html5', [ 'script', 'style' ] );
  }
);

function instagram_feed($url) {
  if ( false === ( $feed = get_transient( 'instagram_feed' ) ) ) {
    $response = wp_remote_get($url);
    $body = json_decode($response['body']);
    $second_response = wp_remote_get($body->paging->next);
    $second_body = json_decode($second_response['body']);

    $feed = array_merge($body->data, $second_body->data);

    set_transient( 'instagram_feed', $feed, 1 * HOUR_IN_SECONDS);
  }

  return $feed;
}

function register_portfolio_post_type() {
	/**
	 * Post Type: Portfolio.
	 */

	$labels = [
		"name" => __( "Portfolio", "custom-post-type-ui" ),
		"singular_name" => __( "Portfolio Item", "custom-post-type-ui" ),
		"add_new_item" => __( "Add New Portfolio Item", "custom-post-type-ui" ),
	];

	$args = [
		"label" => __( "Portfolio", "custom-post-type-ui" ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => [ "slug" => "portfolio", "with_front" => false ],
		"query_var" => true,
		"menu_position" => 5,
		"menu_icon" => "dashicons-hammer",
		"supports" => [ "title", "editor", "excerpt", "trackbacks", "custom-fields", "comments", "revisions", "thumbnail", "author", "page-attributes", "post-formats" ],
	];

	register_post_type( "portfolio", $args );
}

add_action( 'init', 'register_portfolio_post_type' );

// remove wp-embed
function deregister_wp_embed(){
	if (!is_admin()) {
		wp_deregister_script('wp-embed');
	}
}
add_action( 'wp_footer', 'deregister_wp_embed' );

// custom login page
// change logo link and title
function my_login_logo_url() {
		return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
		return 'The Mother Ship';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

// add stylesheet for login page
function my_login_stylesheet() {
		wp_enqueue_style( 'style-login', get_template_directory_uri() . '/style-login.css' );
}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );

// add resource hints
add_filter('http2_render_resource_hints', '__return_true');

// Custom template tags for this theme
require get_template_directory() . '/template-tags.php';


/**
 * Add a Formatted Date to the WordPress REST API JSON Post Object
 *
 */
add_action('rest_api_init', function() {
  register_rest_field(
      array('post'),
      'formatted_date',
      array(
          'get_callback'    => function() {
              return get_the_date('l, F jS, Y');
          },
          'update_callback' => null,
          'schema'          => null,
      )
  );
});

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		parent::__construct();
	}

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
    $context['site'] = $this;
    $context['is_home'] = is_front_page();
    $context['is_dev'] = WP_DEBUG || SCRIPT_DEBUG;
    $context['posts_per_page'] = get_option( 'posts_per_page' );
    $context['current_page'] = get_permalink(get_queried_object_id());

		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new StarterSite();
