<?php
/**
 * The template part for displaying results in search pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package special
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('blog_listings'); ?>>
    <header class="entry-header">
      <?php the_title( sprintf( '<h4 class="entry-title"><a href="%s" class="linked-header" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h4>' ); ?>
      <div class="entry-meta">
        <?php special_posted_on(); ?>
      </div><!-- .entry-meta -->
    </header><!-- .entry-header -->

</article><!-- #post-## -->
