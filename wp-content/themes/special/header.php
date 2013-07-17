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
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" type="image/x-icon" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<script type="text/javascript" src="//use.typekit.net/ltt0nnt.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<noscript><link href="icons.fallback.css" rel="stylesheet"></noscript>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site group">
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header group" role="banner">
  	<div class="wrap-back">
    	<div class="head-wrap group">	
    		<div class="logo-wrap">
    			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home" class="group"><span>Paul</span><span>Kinchla</span></a></h1>
    		</div>

    		<nav role="navigation" class="site-navigation main-navigation">
    			<h1 class="assistive-text"><?php _e( '&#9776; Menu', 'special' ); ?></h1>
    			<div class="assistive-text skip-link"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'special' ); ?>"><?php _e( 'Skip to content', 'special' ); ?></a></div>

    			<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
    		</nav><!-- .site-navigation .main-navigation -->
    	</div>
  	  <ul class="social social-desktop">
  		  <li><a href="http://www.residentadvisor.net/profile/pkinchla" target="_blank"><span class="ra icons"></span></a></li>
  		  <li><a href="https://twitter.com/PK_info" target="_blank"><span class="twitter icons"></span></a></li>
  		  <li><a href="https://github.com/wbp-paulk" target="_blank"><span class="git-hub icons"></span></a></li>
  		  <li><a href="<?php bloginfo('rss2_url'); ?>"><span class="rss icons"></span></a></li>
  		</ul>
  	</div>
	</header><!-- #masthead .site-header -->
    	<div class="social-small-wrap">
    	<ul class="social social-small">
    	  <li><a href="http://www.residentadvisor.net/profile/pkinchla" target="_blank"><span class="ra icons"></span></a></li>
    	  <li><a href="https://twitter.com/PK_info" target="_blank"><span class="twitter icons"></span></a></li>
    	  <li><a href="https://github.com/wbp-paulk" target="_blank"><span class="git-hub icons"></span></a></li>
    	  <li><a href="<?php bloginfo('rss2_url'); ?>"><span class="rss icons"></span></a></li>
    	</ul>
    	</div>
      <div class="hero"> 
  			<?php if (is_home()) { echo '<div class="content"><h2>I make Websites<span>and I am very permanent</span></h2></div>';}?>
      </div>
	<div id="main" class="site-main">
    