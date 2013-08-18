<?php
/**
 * Special functions and definitions
 *
 * @package Special
 * @since Special 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 * @since Special 1.0
 */
if ( ! isset( $content_width ) )
	$content_width = 640; /* pixels */

if ( ! function_exists( 'special_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * @since Special 1.0
 */
 
 
 /**
  * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
  *
  * @since Special 1.0
  */
 function special_page_menu_args( $args ) {
 	$args['show_home'] = false;
 	return $args;
 }
 add_filter( 'wp_page_menu_args', 'special_page_menu_args' );
 
 
function special_setup() {

	/**
	 * Custom template tags for this theme.
	 */
	require( get_template_directory() . '/inc/template-tags.php' );

	/**
	 * Custom functions that act independently of the theme templates
	 */
	require( get_template_directory() . '/inc/extras.php' );

	/**
	 * Custom Theme Options
	 */
	//require( get_template_directory() . '/inc/theme-options/theme-options.php' );

	/**
	 * Make theme available for translation
	 * Translations can be filed in the /languages/ directory
	 * If you're building a theme based on Special, use a find and replace
	 * to change 'special' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'special', get_template_directory() . '/languages' );

	/**
	 * Add default posts and comments RSS feed links to head
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Enable support for Post Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * This theme uses wp_nav_menu() in one location.
	 */
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'special' ),
	) );

	/**
	 * Add support for the Aside Post Formats
	 */
	add_theme_support( 'post-formats', array( 'aside', ) );
}
endif; // special_setup
add_action( 'after_setup_theme', 'special_setup' );

/**
 * Register widgetized area and update sidebar with default widgets
 *
 * @since Special 1.0
 */
function special_widgets_init() {
	register_sidebar( array(
		'name' => __( 'Sidebar', 'special' ),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h1 class="widget-title">',
		'after_title' => '</h1>',
	) );
}
add_action( 'widgets_init', 'special_widgets_init' );

/**
 * Enqueue scripts and styles
 */
function special_scripts() {
	wp_enqueue_style( 'style', get_stylesheet_uri('style.min.css') );

	wp_enqueue_script( 'small-menu', get_template_directory_uri() . '/js/small-menu.min.js', array( 'jquery' ), '20120206', true );
	
	wp_enqueue_script( 'jquery.anystretch.min', get_template_directory_uri() . '/js/jquery.anystretch.min.js', array( 'jquery' ), '', true );
	
	wp_enqueue_script( 'script', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}
}
add_action( 'wp_enqueue_scripts', 'special_scripts' );

/**
*	Use latest jQuery release
*/
if( !is_admin() ){
	wp_deregister_script('jquery');
	wp_register_script('jquery', ("http://code.jquery.com/jquery-latest.min.js"), false, '');
	wp_enqueue_script('jquery');
}


/**
 * Implement the Custom Header feature
 */
//require( get_template_directory() . '/inc/custom-header.php' );
