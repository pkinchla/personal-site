<?php
/**
 * Displays the front, 'home' page 
 */

get_header(); ?>
      
		<div id="primary" class="content-area">
			<div id="content" class="site-content group" role="main">
        <header class="entry-header">
          <h1 class="entry-title">Welcome!</h1>        
        </header>
        <p class="col-half">Hello there. I am a front-end designer living in Upstate NY. This site is home to my thoughts on web development, technology, and music.  The following are some key facts about me.</p>
        <ol class="col-half">
          <li>My methodology for building websites is deeply rooted in progressive enhancement and web standards.</li>
          <li>I grew up in the Boston area.</li>
          <li>I am a decent basketball player and terrible at baseball.</li>
          <li>I went to art school.</li>
        </ol>
        <h3>Latest Writing</h3>
          <?php query_posts( 'posts_per_page=1' ); ?>
              <?php while ( have_posts() ) : the_post(); ?>
              <h4><a class="linked-header" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                <div class="entry-meta"><time datetime="<?php the_time('c');?>"><?php the_time('l, F jS, Y') ?></time></div>
          <?php endwhile; // end of the loop. ?>

			  
        </div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>