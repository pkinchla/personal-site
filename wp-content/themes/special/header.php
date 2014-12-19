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
<meta name="google-site-verification" content="NgzPbjF9JgfD5TItR2dFVwE70g0CN2XOMSnfNgstCtM" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/respond.min.js" type="text/javascript"></script>
<![endif]-->
<?php wp_head(); ?>
<noscript><link href="<?php echo get_template_directory_uri(); ?>/js/icons.fallback.css" rel="stylesheet"></noscript>
</head>

<body <?php body_class(); ?>>
<progress value="0" class="page-progress"></progress>  
<div id="page" class="hfeed site">
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header animated" role="banner">
  	<div class="wrap-back">
    	<div class="head-wrap">	
    		<div class="logo-wrap">
    			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home" class="group"><span>Paul</span> <span>Kinchla</span></a></h1>
    		</div>
    		<nav role="navigation" class="site-navigation main-navigation">
    			<h1 class="assistive-text"><?php _e( 'Menu', 'special' ); ?></h1>
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
    <?php 
      if (has_post_thumbnail()) {
           $feat_image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'thumbnail_name');
           echo '<div class="hero" data-stretch="'.$feat_image[0].'">' . "\n";
           echo '</div>';
        }
        else {
          echo '';
        } 
      ?>
  <div id="main" class="site-main">   