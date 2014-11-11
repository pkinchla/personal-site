<?php 

/* flickr stream */
//Function: Get flickr media and display based on user id

function getFlickrPhotos($id, $limit=1) {
    require_once("phpFlickr-3.1/phpFlickr.php");
    $f = new phpFlickr("d93fb719daf226cd7f73f47c6e5c3bf8");
    $id = ('120749958@N08');
    $f->enableCache("fs", "cache", 86400);
    $photos = $f->people_getPublicPhotos($id, NULL, NULL, 1);
      foreach ($photos['photos']['photo'] as $photo) {
        return '<figure class="flickr-stream"><a target="_blank" href="' . $f->buildPhotoURL($photo, 'small') . '" title="' . $photo['title'] . '"><img src="'. $f->buildPhotoURL($photo, 'small') .'" srcset="'.$f->buildPhotoURL($photo, 'large').' 930w, '.$f->buildPhotoURL($photo, 'medium').' 480w, '.$f->buildPhotoURL($photo, 'small').' 230w" sizes="(min-width: 45.25em) 75.75vw, 88.8vw" alt="' . $photo['title'] . '" title="' . $photo['title'] . '" /></a></figure>';
    }
} 

// short code for flickr stream
add_shortcode( 'flickr', 'getFlickrPhotos');

?>