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
	wp_enqueue_style( 'style', get_stylesheet_uri('style.css') );

	wp_enqueue_script( 'js-built', get_template_directory_uri() . '/js/built.min.js', array( 'jquery' ), '1', true );
	

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}
}
add_action( 'wp_enqueue_scripts', 'special_scripts' );

/**
* Use latest jQuery release
*/
function jquery_scripts() {
       wp_deregister_script('jquery');
       wp_register_script('jquery', ("https://code.jquery.com/jquery-1.11.0.min.js"),'','1.11.0', true );
       wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'jquery_scripts');

function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', 'remove_recent_comments_style');


/* flickr stream */
//Function: Get flickr media and display based on user id
function getFlickrPhotos($id, $limit=1) {
    require_once("phpFlickr-3.1/phpFlickr.php");
    $f = new phpFlickr("d93fb719daf226cd7f73f47c6e5c3bf8");
    $id = ('120749958@N08');
    $photos = $f->people_getPublicPhotos($id, NULL, NULL, 1);
      foreach ($photos['photos']['photo'] as $photo) {
        return '<figure class="flickr-stream"><a target="_blank" href="' . $f->buildPhotoURL($photo, 'large') . '" title="' . $photo['title'] . '"><img src="' . $f->buildPhotoURL($photo, 'large') . '" alt="' . $photo['title'] . '" title="' . $photo['title'] . '" /></a></figure>';
    }
} 

// short code for flickr stream
add_shortcode( 'flickr', 'getFlickrPhotos');

/* google analytics in footer */
add_action('wp_footer', 'add_googleanalytics');

function add_googleanalytics() { ?>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-22750130-1', 'paulkinchla.com');
  ga('send', 'pageview');

</script>


<?php } 

/**
* admin login stuff
*/

 /* change logo link and title */
function my_login_logo_url() {
    return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'The Mother Ship';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

/* add stylesheet for login page */
function my_login_stylesheet() { ?>
    <link rel="stylesheet" id="custom_wp_admin_css"  href="<?php echo get_bloginfo( 'stylesheet_directory' ) . '/style-login.css'; ?>" type="text/css" media="all" />
<?php }
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );

?>