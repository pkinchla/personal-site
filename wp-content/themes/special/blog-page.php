<?php
/**
 * Template name: Blog Landing Page
 *
 */

get_header(); ?>

		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
			  <h1 class="entry-title">The Soap Box</h1>
			  <div class="group">
  			  <div class="col-half">  
              <?php query_posts( 'posts_per_page=10' ); ?>
              <?php while ( have_posts() ) : the_post(); ?>
              <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                <p><?php the_time('l, F jS, Y') ?></p>
              <?php endwhile; // end of the loop. ?>
          </div>
          <div class="col-half">
            <h4>Categories</h4>
           <ol>
            <?php wp_list_categories('title_li=&show_count=1&feed=RSS'); ?>
           </ol>
          </div>
        </div>
			</div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>