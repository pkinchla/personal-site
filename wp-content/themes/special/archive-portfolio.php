<?php
/**
 * Template name: Portfolio Listings
 *
 */

// vars
$copy = get_field('copy');

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$loop = new WP_Query( array(
'post_type' => 'Portfolio',
'posts_per_page' => 24,
'orderby' => 'menu_order',
'paged'=>$paged,
));

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
      <h1 class="entry-title"><?php the_title(); ?></h1>
         <section>
         <ul class="portfolio-list">
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
                      <h5 class="title"><?php the_title(); ?> | <em><?php the_excerpt(); ?></em></h5>  
                      <img src="<?php echo $small; ?>" srcset="<?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="(max-width:52em) 85vw, (min-width: 52em) 21.66vw" alt="<?php echo $alt ?>">
                    </a>
                  </li>           
              <?php endwhile; ?>
            </ul>
        </section>
        <?php echo $copy; ?>
    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
