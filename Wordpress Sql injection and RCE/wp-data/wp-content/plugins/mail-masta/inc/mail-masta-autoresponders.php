<meta charset="utf-8">







<script>



document.title = "Mail Masta";



</script>



<div class="mm_container">



  <ul class="nav nav-tabs">



    <li class="first"><a href="admin.php?page=masta-campaign">Campaigns</a></li>



    <li class="active"><a href="admin.php?page=masta-autoresponder">Autoresponders</a></li>



    <li><a href="admin.php?page=masta-lists">Lists</a></li>



    <li><a href="admin.php?page=masta-settings">Settings</a></li>



     <li><a class="" href="admin.php?page=masta-license">License</a></li>



    



  </ul>



    <?php do_action('autoresponder_fun'); ?>  



  <div class="tab-content">







    <?php  global $wpdb; 



    $masta_settings = $wpdb->prefix."masta_settings";



     $re=$wpdb->get_results("select * from $masta_settings"); 



     if($re[0]->send_type!=1){

     

		if($_COOKIE['alert']!='no') { ?>

		<div class="alert alert-warning">

		  <button type="button" class="close" id='clo' data-dismiss="alert" aria-hidden="true">&times;</button>

		  <div class="recom">We highly recommend setting up <a href="<?php echo admin_url(); ?>/admin.php?page=masta-settings">Amazon SES</a></div>

		</div>

    

    

     <?php } } ?>







    <div id="mm_campaigns" class="tab-pane ">



     <?php //include('mail-campaign-data.php') ?>



    </div>



    <div id="mm_autoresponders" class="tab-pane active">



      <?php include('mail-autoresponder-data.php') ?>



    </div>



    <div id="mm_lists" class="tab-pane">



      <?php include('mail-list-data.php') ?>



    </div>



    <div id="mm_settings" class="tab-pane">



      <?php include('mail-settings-data.php') ?>



    </div>



  </div>



</div>



