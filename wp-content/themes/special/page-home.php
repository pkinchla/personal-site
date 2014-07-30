<?php
/*
Template Name: Home Page
*/

get_header(); ?>
      
		<div id="primary" class="content-area">
			<div id="content" class="site-content group" role="main">
        
          <?php while ( have_posts() ) : the_post(); ?>

          <?php get_template_part( 'content', 'page' ); ?>

          <?php comments_template( '', true ); ?>

        <?php endwhile; // end of the loop. ?>

        <h3>Latest Writing</h3>
          <?php query_posts( 'posts_per_page=1' ); ?>
              <?php while ( have_posts() ) : the_post(); ?>
              <h4><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                <div class="entry-meta"><time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time></div>
          <?php endwhile; // end of the loop. ?>

			  
        </div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>