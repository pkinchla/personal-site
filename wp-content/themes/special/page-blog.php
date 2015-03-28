<?php
/**
 * Template name: Blog Landing Page
 *
 */

$hero_image = get_field('hero_image');

 if( !empty($hero_image)): 

  // vars
  $url = $hero_image['url'];
  $title = $hero_image['title'];
  $alt = $hero_image['alt'];
  $caption = $hero_image['caption'];

  // image sizes
  $thumbnail = 'portfolio_small';
  $small = $hero_image['sizes'][ $thumbnail ];

  $size_medium = 'portfolio_medium';
  $medium = $hero_image['sizes'][ $size_medium ];

  $size_large = 'portfolio_large';
  $large = $hero_image['sizes'][ $size_large ];
  
  $hero_large = 'hero_large';
  $hero_small = $hero_image['sizes'][ $hero_large ];

  $hero_cinema = 'hero_cinema';
  $hero_medium = $hero_image['sizes'][ $hero_cinema ];

  $hero_cinema_large = 'hero_cinema_large';
  $hero_large = $hero_image['sizes'][ $hero_cinema_large ];

endif;

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="content" class="site-content__blog" role="main">
      <figure class="wrapper">
        <img class="site-content__blog__heroimg" src="<?php echo $small; ?>" srcset="<?php echo $hero_small; ?> 2000w, <?php echo $hero_medium; ?> 3000w, <?php echo $hero_large ?> 3500w, <?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="90vw, (min-width:40em) 56vw, (max-width:64em)" alt="<?php echo $alt ?>">
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