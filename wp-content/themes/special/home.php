<?php
/**
 * Displays the front, 'home' page
 */

get_header(); ?>
      
		<div id="primary" class="content-area">
			<!-- <h1 class="hero">I make things! Sometimes they live on the web.</h1>   -->
			<div id="content" class="site-content group" role="main">
        <h1>Hello</h1>
			  <div class="full"><img src="<?php echo get_template_directory_uri(); ?>/images/palette-2.png" alt="palette"></div>
        <h3>Grid</h3>
			  <div class="grid-wrap">
  			  <div class="col-quarter">4 columns</div>
  			  <div class="col-quarter">4 columns</div>
  			  <div class="col-quarter">4 columns</div>
  			  <div class="col-quarter">4 columns</div>
			  </div>
        <div class="grid-wrap">
          <div class="col-third">3 columns</div>
          <div class="col-third">3 columns</div>
          <div class="col-third">3 columns</div>
        </div>
			  <div class="grid-wrap">
  			  <div class="col-half">2 columns</div>
  			  <div class="col-half">2 columns</div>
			  </div>
        <div class="grid-wrap">
          <div class="col-quarter">1 quarter column</div>
          <div class="col-third">3 quarter column</div>
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