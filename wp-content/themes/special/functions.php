<?php
/**
 * special functions and definitions
 *
 * @package special
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'special_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function special_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on special, use a find and replace
	 * to change 'special' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'special', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'special' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'special_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // special_setup
add_action( 'after_setup_theme', 'special_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function special_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'special' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'special_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function special_scripts() {
		
		wp_enqueue_style( 'style', get_stylesheet_uri('style.css') );

	// prettify for posts	
	if ( is_single()) {
		wp_enqueue_script('prettify', '//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?&skin=desert', array(), '', false);
	} 
	
	if ( WP_DEBUG || SCRIPT_DEBUG ) {
		wp_enqueue_script( 'gridset', get_template_directory_uri() . '/build/src/dev-js/gridset-overlay.js', array(), '', true );
		wp_enqueue_script( 'skip-link', get_template_directory_uri() . '/build/src/js/skip-link-focus-fix.js', array(), '', true );
		wp_enqueue_script( 'picturefill', get_template_directory_uri() . '/build/src/js/picturefill.js', array(), '', true );
		wp_enqueue_script( 'responsive-nav', get_template_directory_uri() . '/build/src/js/responsive-nav.js', array(), '', true );
		wp_enqueue_script( 'scripts', get_template_directory_uri() . '/build/src/js/scripts.js', array(), '', true );
		wp_enqueue_script( 'livereload', 'http://localhost:35729/livereload.js', '', null, true);
	} 
	else {
		wp_enqueue_script( 'js-built', get_template_directory_uri() . '/js/built.min.js', array(), '1', true );
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'special_scripts' );

// flickr feed include for shortcode
require( get_template_directory() . '/flickr-feed.php' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

// enqueue typekit
add_action('wp_head', 'typekit_js');

function typekit_js() { ?>
<script>
	document.documentElement.className = 'js wf-loading';(function(d) {var config = {kitId: 'ltt0nnt',scriptTimeout: 3000},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);
</script>
<?php }

// remove added p tags
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

// image sizes for portfolio
add_image_size( 'portfolio_small', 550, 550, false );
add_image_size( 'portfolio_medium', 800, 800, false );
add_image_size( 'portfolio_large', 1300, 1300, false );
add_image_size( 'hero_large', 2000, 2000, false );
add_image_size( 'hero_cinema', 3000, 3000, false );
add_image_size( 'hero_cinema_large', 3500, 3500, false );

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