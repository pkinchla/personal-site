<?php
/**
 * Template name: Blog Landing Page
 *
 */

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="content" class="site-content" role="main">
      <div class="wrapper">
      <h1 class="entry-title">The Soap Box</h1>
      <?php query_posts( 'posts_per_page=10' ); ?>
        <?php while ( have_posts() ) : the_post(); ?>
          <h3><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <div class="entry-meta">
              <time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time>
            </div>
        <?php endwhile; // end of the loop. ?>
        <h2>Categories</h2>
      <ol>
        <?php wp_list_categories('title_li=&show_count=1&feed=RSS'); ?>
      </ol>
      </div>
    </main><!-- #content .site-content -->
  </div><!-- #primary .content-area -->


<?php get_footer(); ?>