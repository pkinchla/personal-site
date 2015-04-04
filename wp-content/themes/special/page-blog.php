<?php
/**
 * Template name: Blog Landing Page
 *
 */

require_once('resp-hero.php');

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main site-content__blog" role="main">
      <figure class="wrapper">
        <img class="site-content__blog__heroimg" src="<?php echo $medium; ?>" srcset="<?php echo $hero_cinema_large .' '. $hero_cinema_large_width; ?>w, <?php echo $hero_cinema .' '. $hero_cinema_width; ?>w, <?php echo $hero_x_large .' '. $hero_x_large_width; ?>w, <?php echo $hero_large .' '. $hero_large_width; ?>w, <?php echo $hero_medium .' '. $hero_medium_width; ?>w, <?php echo $portfolio_x_large .' '. $portfolio_x_large_width; ?>w, <?php echo $portfolio_large .' '. $portfolio_large_width; ?>w, <?php echo $large .' '. $large_width; ?>w, <?php echo $portfolio_medium .' '. $portfolio_medium_width; ?>w, <?php echo $portfolio_small .' '. $portfolio_small_width; ?>w, <?php echo $medium .' '. $medium_width; ?>w, <?php echo $thumbnail .' '. $thumbnail_width; ?>w" sizes="(min-width:120em) 62vw, (min-width:64) 72vw, (min-width:40em) 57vw, 90vw" alt="<?php echo $alt ?>">
      </figure>
      <div class="wrapper">
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <div class="site-content__blog__postlist">
        <?php query_posts( 'posts_per_page=10' ); ?>
          <?php while ( have_posts() ) : the_post(); ?>
            <h4><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
            <div class="entry-meta">
              <time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time>
            </div>
          <?php endwhile; // end of the loop. ?>
        </div>
        <div class="site-content__blog__categories">
          <h2>Categories</h2>
          <ol>
            <?php wp_list_categories('title_li=&show_count=1&feed=RSS'); ?>
          </ol>
        </div>
      </div>
    </main><!-- #content .site-content -->
  </div><!-- #primary .content-area -->


<?php get_footer(); ?>