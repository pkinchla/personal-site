<?php
/**
 * Template name: Portfolio Listings
 *
 */

// vars
 $copy = get_field('copy');

get_header(); ?>

		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
			  <h1 class="entry-title"><?php the_title(); ?></h1>
			   <section>
  			 <ul class="portfolio-list">
         <?php $loop = new WP_Query( array( 'post_type' => 'Portfolio', 'posts_per_page' => 20 ) ); ?>

              <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
                
                  <?php $list_image = get_field('list_image'); 

                  if( !empty($list_image) ): 

                    // vars
                    $url = $list_image['url'];
                    $title = $list_image['title'];
                    $alt = $list_image['alt'];
                    $caption = $list_image['caption'];

                    // image sizes
                    $thumbnail = 'portfolio_small';
                    $small = $list_image['sizes'][ $thumbnail ];

                    $size_medium = 'portfolio_medium';
                    $medium = $list_image['sizes'][ $size_medium ];

                    $size_large = 'portfolio_large';
                    $large = $list_image['sizes'][ $size_large ];

                  endif; ?>
                  
                  <li class="col-third">
                    <a class="portfolio-link" href="<?php the_permalink(); ?>">
                      <span class="title"><?php the_title(); ?><b><?php the_excerpt(); ?></b></span>  
                      <img src="<?php echo $small; ?>"
                        srcset="<?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w"
                        sizes="(min-width: 52em) 33vw, 100vw "alt="<?php echo $alt ?>" 
                      />
                    </a>
                  </li>           
              <?php endwhile; ?>
            </ul>
        </section>
        <section>
          <?php echo $copy; ?>
        </section>
			</div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>