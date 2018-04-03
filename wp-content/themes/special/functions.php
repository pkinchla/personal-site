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

function dump($var){
	echo '<pre>';
		var_dump($var);
	echo '</pre>';
}

/**
 * Enqueue scripts and styles.
 */
function special_scripts() {
			
	if ( WP_DEBUG || SCRIPT_DEBUG ) {
		wp_enqueue_style( 'style-built', get_template_directory_uri() . '/main.css' );
		wp_enqueue_script( 'js-built', get_template_directory_uri() . '/js/scripts.js#asyncload', array(), '', true );
		wp_enqueue_script( 'js-gridset', get_template_directory_uri() . '/js/gridset-overlay.js', array(), '', true );
	} 
	else {
		wp_enqueue_script( 'js-built', get_template_directory_uri() . '/js/scripts.js#asyncload', array(), '', true );
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	if (get_post_type() === 'post') {
		wp_enqueue_script( 'prism', get_template_directory_uri() .'/prism/prism.min.js', array(), '', true);
	}
}
add_action( 'wp_enqueue_scripts', 'special_scripts' );

// enqueue typekit
function enhance_js() {
	$enhance_file = get_template_directory_uri() . '/js/enhance.js';
	$enhance_path = wp_remote_get($enhance_file);
	$enhance_content = wp_remote_retrieve_body($enhance_path);
	
	echo '<script>'. $enhance_content .'</script>' . "\n";
}
add_action('wp_head', 'enhance_js'); // enqueue ehancements

function typekit_js() {
	$typekit_file = get_template_directory_uri() . '/js/typekit.js';
	$typekit_path = wp_remote_get($typekit_file);
	$typekit_content = wp_remote_retrieve_body($typekit_path);
	
	echo '<script>'. $typekit_content .'</script>' . "\n";
}
add_action('wp_head', 'typekit_js');

// function for critical path css
function critical_css() {
	if (!WP_DEBUG || SCRIPT_DEBUG) {
		// css
		$style_sheet = get_template_directory_uri() . '/main.css';
		$style_path = wp_remote_get($style_sheet);
		$style_content = wp_remote_retrieve_body($style_path);

		echo '<style>'. $style_content .'</style>' . "\n";
	}
}
add_action( 'wp_head', 'critical_css');

// google analytics in footer 
function add_googleanalytics()  {
	$ga_file = get_template_directory_uri() . '/js/ga.js';
	$ga_path = wp_remote_get($ga_file);
	$ga_content = wp_remote_retrieve_body($ga_path);
	
	echo '<script>'. $ga_content .'</script>' . "\n";
}
add_action('wp_footer', 'add_googleanalytics');

// get instagram feed
function instagram_feed($url) {
	if ( false === ( $feed = get_transient( 'instagram_feed' ) ) ) {
		$response = wp_remote_get($url);
		$body = json_decode($response['body']);
		$feed = $body;
		set_transient( 'instagram_feed', $feed, 1 * HOUR_IN_SECONDS);

	}
	return $feed;
}

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


class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		parent::__construct();
	}

	function add_to_context( $context ) {

		$context['menu'] = new TimberMenu();
		$context['site'] = $this;

		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new StarterSite();
