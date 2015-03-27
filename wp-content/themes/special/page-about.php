<?php
/**
 * Template name: Blog Landing Page
 *
 */

$copy = get_field('copy');
$contact = get_field('contact');
$resume = get_field('resume');
$flickr_field = get_field('flickr_field');
$hero_image = get_field('hero_image');
$skill = get_field('skill');

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
    <main id="content" class="site-content__about" role="main">
      <figure class="wrapper">
        <img class="site-content__about__heroimg" src="<?php echo $small; ?>" srcset="<?php echo $hero_small; ?> 2000w, <?php echo $hero_medium; ?> 3000w, <?php echo $hero_large ?> 3500w, <?php echo $large; ?> 1100w, <?php echo $medium; ?> 800w, <?php echo $small; ?> 550w" sizes="90vw, (min-width:40em) 56vw, (max-width:64em)" alt="<?php echo $alt ?>">
      </figure>
      <div class="wrapper">
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <div class="site-content__about__copy">
          <?php echo $copy; ?>
        </div>
        <ul class="site-content__about__contact">
          <?php echo $contact; ?>
        </ul>
        <section class="site-content__about__resume">
          <h3>R&eacute;sum&eacute;</h3>
          <dl class="resume">
            <dt>Work</dt>
              <?php if( have_rows('work')): ?>
                <?php while( have_rows('work') ): the_row();  
                //vars
                $title = get_sub_field('title');
                $date_start = get_sub_field('date_start');
                $date_end = get_sub_field('date_end');
                $company_name = get_sub_field('company_name');
                $description = get_sub_field('description');
                $company_link = get_sub_field('company_link');
              ?>  
              <dd>
                <h4><?php echo $title; ?> <span><time><?php echo $date_start ?></time><time><?php if ($date_end) {echo '-' . $date_end;} ?></time></span></h4>
                <h5><?php echo $company_name; ?></h5>
                <p><?php echo $description; ?> <em><a href="http://<?php echo $company_link ?>/" target="_blank"><?php echo $company_link; ?></a></em></p>
              </dd>
               <?php endwhile; ?>
              <?php endif; ?>
            <dt>Internship</dt>
              <?php if( have_rows('internship')): ?>
                <?php while( have_rows('internship') ): the_row();  
                //vars
                $title = get_sub_field('title');
                $date = get_sub_field('date');
                $location = get_sub_field('location');
              ?>  
              <dd>
                <h4><?php echo $title; ?><span><time><?php echo $date; ?></time></span></h4>
                <h5><?php echo $location; ?></h5>
              </dd>
                <?php endwhile; ?>
              <?php endif; ?>
            <dt>Skill</dt>
              <dd><p><?php echo $skill; ?></p></dd>
            <dt>Education</dt>
              <dd>
             <?php if( have_rows('education')): ?>
                <?php while( have_rows('education') ): the_row();  
                //vars
                $school = get_sub_field('school');
                $degree = get_sub_field('degree');
              ?>  
                <h4><?php echo $school; ?> <span><?php echo $degree ?></span></h4>
              <?php endwhile; ?>
              <?php endif; ?>
              </dd>
            <dt>Interest</dt>
              <dd>
                <ul>
                  <?php if( have_rows('interest')): ?>
                    <?php while( have_rows('interest') ): the_row();  
                    //vars
                    $item_of_interest = get_sub_field('item_of_interest');
                  ?> 
                  <li><?php echo $item_of_interest; ?></li>  
                    <?php endwhile; ?>
                  <?php endif; ?>
                </ul>
              </dd>
          </dl>
        </section>
        <section class="site-content__about__picture">
          <?php echo $flickr_field; ?>
        </section>
      </div>
    </main><!-- #content .site-content -->
  </div><!-- #primary .content-area -->


<?php get_footer(); ?>