<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package Special
 * @since Special 1.0
 */
?>
<!DOCTYPE html>
<!-- psst, if you want to take a closer look at the code that powers this site take a look at the repo here https://github.com/wbp-paulk/mothership -->
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico?=v2" type="image/x-icon" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/respond.min.js" type="text/javascript"></script>
<![endif]-->
<script type="text/javascript" src="//use.typekit.net/ltt0nnt.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<noscript><link href="<?php echo get_template_directory_uri(); ?>/js/icons.fallback.css" rel="stylesheet"></noscript>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site group">
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header group animated" role="banner">
  	<div class="wrap-back">
    	<div class="head-wrap group">	
    		<div class="logo-wrap">
    			<h1 class="site-title group"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home" class="group"><span>Paul</span> <span>Kinchla</span></a></h1>
    		</div>
    		<nav role="navigation" class="site-navigation main-navigation">
    			<h1 class="assistive-text"><?php _e( '&#9776; Menu', 'special' ); ?></h1>
    			<div class="assistive-text skip-link"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'special' ); ?>"><?php _e( 'Skip to content', 'special' ); ?></a></div>
    			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false ) ); ?>
    		</nav><!-- .site-navigation .main-navigation -->
    	</div>
  	  <ul class="social">
  		  <li><a class="ra icons" href="http://www.residentadvisor.net/profile/pkinchla" target="_blank"><span class="assistive-text">Resident Advisor</span></a></li>
  		  <li><a class="twitter icons" href="https://twitter.com/PK_info" target="_blank"><span class="assistive-text">Twitter</span></a></li>
  		  <li><a class="git-hub icons" href="https://github.com/pkinchla" target="_blank"><span class="assistive-text">Github</span></a></li>
  		  <li><a class="rss icons" href="<?php bloginfo('rss2_url'); ?>"><span class="assistive-text">RSS</span></a></li>
  		</ul>
  	</div>
	</header><!-- #masthead .site-header -->
    <?php if (has_post_thumbnail()) {
      $feat_image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'thumbnail_name');
       }
     ?>
    <div class="hero" data-stretch="<?php echo $feat_image[0]; ?>"> 
      <?php if (is_front_page()) { echo '<div class="content"><h2>Something <span>Clever</span></h2></div>';}?>
    </div>
  <div id="main" class="site-main">   