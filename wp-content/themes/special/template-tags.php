<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package special
 */

if ( ! function_exists( 'special_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function special_posted_on() {
  $time_string = '<time datetime="%1$s">%2$s</time>';
  if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
    $time_string = '<time datetime="%1$s">%2$s</time> | Last Updated on <time datetime="%3$s">%4$s</time></span>';
  }

  $time_string = sprintf( $time_string,
    esc_attr( get_the_date( 'c' ) ),
    esc_html( get_the_date() ),
    esc_attr( get_the_modified_date( 'c' ) ),
    esc_html( get_the_modified_date() )
  );

  $posted_on = sprintf(
    _x( 'Posted on %s', 'post date', 'special' ),
    $time_string
  );

  $byline = sprintf(
    _x( 'by %s', 'post author', 'special' ),
    '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
  );

  echo '<span>' . $posted_on . '</span><span> ' . $byline . '</span>';

}

endif;

if ( ! function_exists( 'special_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function special_entry_footer() {
  // Hide category and tag text for pages.
  if ( 'post' == get_post_type() ) {
    /* translators: used between list items, there is a space after the comma */
    $categories_list = get_the_category_list( __( ', ', 'special' ) );
    if ( $categories_list && special_categorized_blog() ) {
      printf( '<span>' . __( 'Posted in %1$s', 'special' ) . '</span>&nbsp;', $categories_list );
    }

    /* translators: used between list items, there is a space after the comma */
    $tags_list = get_the_tag_list( '', __( ', ', 'special' ) );
    if ( $tags_list ) {
      printf( '<span>' . __( 'Tagged %1$s', 'special' ) . '</span>', $tags_list );
    }
  }

  if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
    echo '<span class="comments-link">';
    comments_popup_link( __( 'Leave a comment', 'special' ), __( '1 Comment', 'special' ), __( '% Comments', 'special' ) );
    echo '</span>';
  }

  edit_post_link( __( 'Edit', 'special' ), ' <span class="action sans-bold-italic">', '</span>' );
}
endif;

if ( ! function_exists( 'the_archive_title' ) ) :
/**
 * Shim for `the_archive_title()`.
 *
 * Display the archive title based on the queried object.
 *
 * @todo Remove this function when WordPress 4.3 is released.
 *
 * @param string $before Optional. Content to prepend to the title. Default empty.
 * @param string $after  Optional. Content to append to the title. Default empty.
 */
function the_archive_title( $before = '', $after = '' ) {
  if ( is_category() ) {
    $title = sprintf( __( 'Category: %s', 'special' ), single_cat_title( '', false ) );
  } elseif ( is_tag() ) {
    $title = sprintf( __( 'Tag: %s', 'special' ), single_tag_title( '', false ) );
  } elseif ( is_author() ) {
    $title = sprintf( __( 'Author: %s', 'special' ), '<span class="vcard">' . get_the_author() . '</span>' );
  } elseif ( is_year() ) {
    $title = sprintf( __( 'Year: %s', 'special' ), get_the_date( _x( 'Y', 'yearly archives date format', 'special' ) ) );
  } elseif ( is_month() ) {
    $title = sprintf( __( 'Month: %s', 'special' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'special' ) ) );
  } elseif ( is_day() ) {
    $title = sprintf( __( 'Day: %s', 'special' ), get_the_date( _x( 'F j, Y', 'daily archives date format', 'special' ) ) );
  } elseif ( is_tax( 'post_format' ) ) {
    if ( is_tax( 'post_format', 'post-format-aside' ) ) {
      $title = _x( 'Asides', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) {
      $title = _x( 'Galleries', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-image' ) ) {
      $title = _x( 'Images', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-video' ) ) {
      $title = _x( 'Videos', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-quote' ) ) {
      $title = _x( 'Quotes', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-link' ) ) {
      $title = _x( 'Links', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-status' ) ) {
      $title = _x( 'Statuses', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-audio' ) ) {
      $title = _x( 'Audio', 'post format archive title', 'special' );
    } elseif ( is_tax( 'post_format', 'post-format-chat' ) ) {
      $title = _x( 'Chats', 'post format archive title', 'special' );
    }
  } elseif ( is_post_type_archive() ) {
    $title = sprintf( __( 'Archives: %s', 'special' ), post_type_archive_title( '', false ) );
  } elseif ( is_tax() ) {
    $tax = get_taxonomy( get_queried_object()->taxonomy );
    /* translators: 1: Taxonomy singular name, 2: Current taxonomy term */
    $title = sprintf( __( '%1$s: %2$s', 'special' ), $tax->labels->singular_name, single_term_title( '', false ) );
  } else {
    $title = __( 'Archives', 'special' );
  }

  /**
   * Filter the archive title.
   *
   * @param string $title Archive title to be displayed.
   */
  $title = apply_filters( 'get_the_archive_title', $title );

  if ( ! empty( $title ) ) {
    echo $before . $title . $after;
  }
}
endif;

if ( ! function_exists( 'the_archive_description' ) ) :
/**
 * Shim for `the_archive_description()`.
 *
 * Display category, tag, or term description.
 *
 * @todo Remove this function when WordPress 4.3 is released.
 *
 * @param string $before Optional. Content to prepend to the description. Default empty.
 * @param string $after  Optional. Content to append to the description. Default empty.
 */
function the_archive_description( $before = '', $after = '' ) {
  $description = apply_filters( 'get_the_archive_description', term_description() );

  if ( ! empty( $description ) ) {
    /**
     * Filter the archive description.
     *
     * @see term_description()
     *
     * @param string $description Archive description to be displayed.
     */
    echo $before . $description . $after;
  }
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function special_categorized_blog() {
  if ( false === ( $all_the_cool_cats = get_transient( 'special_categories' ) ) ) {
    // Create an array of all the categories that are attached to posts.
    $all_the_cool_cats = get_categories( array(
      'fields'     => 'ids',
      'hide_empty' => 1,

      // We only need to know if there is more than one category.
      'number'     => 2,
    ) );

    // Count the number of categories that are attached to the posts.
    $all_the_cool_cats = count( $all_the_cool_cats );

    set_transient( 'special_categories', $all_the_cool_cats );
  }

  if ( $all_the_cool_cats > 1 ) {
    // This blog has more than 1 category so special_categorized_blog should return true.
    return true;
  } else {
    // This blog has only 1 category so special_categorized_blog should return false.
    return false;
  }
}

/**
 * Flush out the transients used in special_categorized_blog.
 */
function special_category_transient_flusher() {
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
    return;
  }
  // Like, beat it. Dig?
  delete_transient( 'special_categories' );
}
add_action( 'edit_category', 'special_category_transient_flusher' );
add_action( 'save_post',     'special_category_transient_flusher' );
