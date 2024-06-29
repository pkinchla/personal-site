<?php

require_once __DIR__ . '/vendor/autoload.php';

Timber\Timber::init();

Timber::$dirname = array('views');

// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'special' ),
	));

// credentials for apis and things
require get_template_directory() . '/credentials.php';

/**
 * Automatically add IDs to headings such as <h2></h2>
 */
function auto_id_headings( $content ) {

  if(get_post_type() !== 'post') {
    return $content;
  }

  $content = preg_replace_callback( '/(\<h[1-6](.*?))\>(.*)(<\/h[1-6]>)/i', function( $matches ) {
    if ( ! stripos( $matches[0], 'id=' ) ) :
      $heading_link = ' <a href="#' . sanitize_title( $matches[3] ) . '"><span aria-hidden="true">#</span> <span class="assistive-text">fragment anchor</span></a> ';
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
	echo '<pre style="color: white; background: black; padding: 1rem; max-width: 100vh; overflow-y: scroll;">';
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

// function for critical path css
function critical_css() {
	if (!WP_DEBUG) {
		// css
		$style_sheet = get_template_directory_uri() . '/dist/css/main.css';
		$style_path = wp_remote_get($style_sheet);
		$style_content = wp_remote_retrieve_body($style_path);

		echo '<style>'. $style_content .'</style>' . "\n";
	}
}
add_action( 'wp_head', 'critical_css');


/**
 * Enqueue scripts and styles.
 */
function special_scripts() {
  wp_dequeue_style( 'wp-block-library' );
  wp_dequeue_style( 'wp-block-library-theme');

  if (WP_DEBUG) {
    wp_enqueue_style( 'style', get_template_directory_uri() . '/dist/css/main.css', array(), null );
    wp_enqueue_script( 'scripts', get_template_directory_uri() .'/dist/js/main.js?v=' . $_SERVER['REQUEST_TIME'] . '', array(), null);
  }
  else {
    wp_enqueue_script( 'scripts', get_template_directory_uri() .'/dist/js/main.js', array(), null); 
  }

  if (get_post_type() === 'post') {
		wp_enqueue_script( 'prism', get_template_directory_uri() .'/dist/js/prism.js', array(), '', true);
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts',  'special_scripts'  );

/**
 * Filter multiple scripts to add type=“module”.
 */
add_filter('script_loader_tag', 'add_type_to_js_scripts', 10, 3);

function add_type_to_js_scripts($tag, $handle, $source){
  // Add main js file and all modules to the array.
  $theme_handles = array(
    'scripts',
    'prism',
      );
  // Loop through the array and filter the tag.
  foreach($theme_handles as $theme_handle) {
    if ($theme_handle === $handle) {
      return $tag = '<script src="'. esc_url($source).'" type="module"></script>';
    }
  }
  return $tag;
}

add_action(
  'after_setup_theme',
  function() {
    add_theme_support( 'html5', [ 'script', 'style' ] );
  }
);

function instagram_feed($endpoint, $refresh_endpoint) {
  $feed = get_transient( 'instagram_feed' );
  

  if ( false !== $feed ) {
    return $feed;
  }

  $response = wp_remote_get($endpoint);

  if(is_wp_error( $response ) ||$response['response']['code'] >= 400  ) {
    return array("error"=> "Instgram feed is currently unavailable. Check back later 😊.");
  }

  $body = json_decode($response['body']);
  $second_response = wp_safe_remote_get($body->paging->next);
  $second_body = json_decode($second_response['body']);

  $feed = array_merge($body->data, $second_body->data);

  set_transient( 'instagram_feed', $feed, 1 * HOUR_IN_SECONDS);
  wp_safe_remote_get($refresh_endpoint);

  return $feed;
}

function speed_stats($url) {
  $stats = get_transient( 'speed_stats' );

  if (false !== $stats) {
    return $stats;
  }

  $response = wp_safe_remote_get($url);

  if(is_wp_error( $response ) ||$response['response']['code'] >= 400  ) {
    return array("error"=> "Stats are currently unavailable. Check back later 😊.");
  }

  $stats = json_decode($response['body'], true);
  set_transient( 'speed_stats', $stats, 12 * HOUR_IN_SECONDS);

  return $stats;
}

/**
 * Disable the emoji's
 */
function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
  add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
 }
 add_action( 'init', 'disable_emojis' );

/**
 * Remove classic theme styles
 */
add_action( 'wp_enqueue_scripts', function() {
  wp_dequeue_style( 'classic-theme-styles' );
}, 20 );


 /**
  * Filter function used to remove the tinymce emoji plugin.
  *
  * @param array $plugins
  * @return array Difference betwen the two arrays
  */
 function disable_emojis_tinymce( $plugins ) {
  if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
  } else {
    return array();
  }
 }

 /**
  * Remove emoji CDN hostname from DNS prefetching hints.
  *
  * @param array $urls URLs to print for resource hints.
  * @param string $relation_type The relation type the URLs are printed for.
  * @return array Difference betwen the two arrays.
  */
 function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
  if ( 'dns-prefetch' == $relation_type ) {
    $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
    $urls = array_diff( $urls, array( $emoji_svg_url ) );
  }

  return $urls;
 }

 // Comment form: Add placeholder to comment field
function alter_commment_form( $defaults ) {

    $defaults['fields']['author'] = '<p class="comment-form-author"><label class="sans-bold-italic" for="author">Name <span class="required" aria-hidden="true">*</span></label> <input id="author" name="author" type="text" value="" size="30" maxlength="245" required="required"></p>';
    $defaults['fields']['email'] = '<p class="comment-form-email"><label class="sans-bold-italic" for="email">Email <span class="required" aria-hidden="true">*</span></label> <input id="email" name="email" type="text" value="" size="30" maxlength="100" aria-describedby="email-notes" required="required"></p>';
    $defaults['fields']['url'] = '<p class="comment-form-url"><label class="sans-bold-italic" for="url">Website</label> <input id="url" name="url" type="text" value="" size="30" maxlength="200"></p>';
    $defaults['comment_field'] = '<p class="comment-form-comment"><label class="sans-bold-italic" for="comment">Comment <span class="required" aria-hidden="true">*</span></label> <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required"></textarea></p>';

    return $defaults;
}

add_filter( 'comment_form_defaults', 'alter_commment_form' );

//  Calculate the estimated reading time for a given piece of $content.
//
//  @param string $content Content to calculate read time for.
//  @param int $wpm Estimated words per minute of reader.
//
//  @returns	int $time Estimated reading time.

function estimated_reading_time( $content = '', $wpm = 250 ) {
    $clean_content = strip_shortcodes( $content );
    $clean_content = strip_tags( $clean_content );
    $word_count = str_word_count( $clean_content );
    $time = ceil( $word_count / $wpm );
    return $time;
}

// Gutenberg custom stylesheet
add_theme_support('editor-styles');
add_editor_style( get_template_directory_uri() . '/dist/css/main.css' );
function prism_enqueue() {
    wp_enqueue_script(
        'prism-script',
        get_template_directory_uri() . '/dist/js/prism.js'
    );
}
add_action( 'enqueue_block_editor_assets', 'prism_enqueue' );

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


// add stylesheet for login page
function my_login_stylesheet() {
		wp_enqueue_style( 'style-login', get_template_directory_uri() . '/style-login.css' );
}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );

// Custom template tags for this theme
require get_template_directory() . '/template-tags.php';


class StarterSite extends Timber\Site  {

	function __construct() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		parent::__construct();
	}

	function add_to_context( $context ) {
		$context['menu'] = Timber::get_menu();
    $context['site'] = $this;
    $context['is_home'] = is_front_page();
    $context['current_page'] = home_url($_SERVER['REQUEST_URI']);
    $context['menu_type'] = explode('/', home_url( $_SERVER['REQUEST_URI'] ))[3];
    $context['perf_stats'] = speed_stats('http://stats.paulkinchla.me/api/urls.json');
    $context['bot_was_redirected'] = explode('/',  home_url( $_SERVER['QUERY_STRING']))[3] ?? null == 'sorry-bot';
    $context['theme_class'] = isset($_COOKIE['color_scheme'])? 'dark-mode' : '';

		return $context;
	}

	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		return $twig;
	}

}

new StarterSite();
