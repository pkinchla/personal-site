<?php
/**
 * Template name: Author Template
 *
 */

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main site-content__blog" role="main">
      <div class="wrapper">
        <h1 class="entry-title">Author: <?php the_author_link(); ?></h1>
        <div class="site-content__blog__postlist">
        <?php query_posts( 'posts_per_page=10' ); ?>
          <?php while ( have_posts() ) : the_post(); ?>
            <h4><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
            <div class="entry-meta">
              <time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time>
            </div>
          <?php endwhile; // end of the loop. ?>
        </div>
      </div>
    </main><!-- #content .site-content -->
  </div><!-- #primary .content-area -->


<?php get_footer(); ?>