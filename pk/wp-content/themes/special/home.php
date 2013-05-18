<?php
/**
 * Displays the front, 'home' page
 */

get_header(); ?>
      
		<div id="primary" class="content-area">
			<!-- <h1 class="hero">I make things! Sometimes they live on the web.</h1>   -->
			<div id="content" class="site-content group" role="main">
        <h1>Hello</h1>
        <div class="grid-wrap">
          <div class="col-1 mobile-accom"><img src="<?php echo get_template_directory_uri(); ?>/images/juggle.png" class="text-center"/></div>
          <div class="col-3">
            <h5>Inspired</h5>
            <p>I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?</p>
            
          </div>
        </div>
        <p>My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?</p>
			  <div class="full"><img src="<?php echo get_template_directory_uri(); ?>/images/palette-2.png"></div>
        <h3>Grid</h3>
			  <div class="grid-wrap">
  			  <div class="col-1">4 columns</div>
  			  <div class="col-1">4 columns</div>
  			  <div class="col-1">4 columns</div>
  			  <div class="col-1">4 columns</div>
			  </div>
			  <div class="grid-wrap">
  			  <div class="col-2">2 columns</div>
  			  <div class="col-2">2 columns</div>
			  </div>
        <div class="grid-wrap">
          <div class="col-1">1 quarter column</div>
          <div class="col-3">3 quarter column</div>
        </div>
			  <h1>Heading 1</h1>
			  <h2>Heading 2</h2>
			  <h3>Heading 3</h3>
			  <h4>Heading 4</h4>
			  <h5>Heading 5</h5>
			  <p>testing headings against body type</p>
			    <h4>Lists</h4>
			    <ul>
			      <li>list item 1</li>
			      <li>list item 2</li>
			      <li>list item 3</li>
			      <li>list item 4</li>
			    </ul>
			    <ol>
			      <li>list item 1</li>  
			      <li>list item 2</li>  
			      <li>list item 3</li>  
			      <li>list item 4</li>
			    </ol>
			    <table>
          		<caption>Tables</caption>
          		<thead>
          			<tr>
          				<td></td>
          				<th>CSS</th>
          				<th>Javascript</th>
          				<th>PHP</th>
          				<th>Git</th>
          			</tr>
          		</thead>
          		<tfoot>
          			<tr>
          				<th colspan="5"><span>Key: 1 = novice | 4 = rockstar</span></th>
          			</tr>
          		</tfoot>
          		<tbody>
          			<tr>
          				<th>1</th>
          				<td></td>
          				<td></td>
          				<td></td>
          				<td></td>
                </tr>
          			<tr>
          				<th>2</th>
          				<td></td>
          				<td>&check;</td>
          				<td>&check;</td>
          				<td></td>
                </tr>
          			<tr>
          				<th>3</th>
          				<td></td>
          				<td></td>
          				<td></td>
          				<td>&check;</td>
                </tr>
          			<tr>
          				<th>4</th>
          				<td>&check;</td>
          				<td></td>
          				<td></td>
          				<td></td>
          			</tr>
          		</tbody>
          	</table>
        </div><!-- #content .site-content -->
		</div><!-- #primary .content-area -->


<?php get_footer(); ?>