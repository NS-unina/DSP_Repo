<?php if($_GET['play']!='') {  

	global $wpdb;

?>

	jQuery(document).ready(function(){

		

		var play="<?php echo $_GET['play'] ?>";

		if(play=="true"){

				jQuery('.runstopauto').attr('id','<?php echo $_GET["cond"]; ?>');

				jQuery('.runstopauto').click();

		}

	

	});

	

</script>

<?php

}

 $masta_report = $wpdb->prefix . "masta_reports";

$masta_campaign = $wpdb->prefix . "masta_campaign";

$camp_id=$_GET['id'];

 $campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id");

 if(count($campaigndata) > 0) {

	$campdata = $campaigndata[0];

    $list_id = $campdata->to_list;

    $camp_status = $campdata->status;

?>

<div class="view_campaigns">

    <div class="panel panel-default">

		<?php if($_GET['play']==''){ ?>

			        <div class="panel-heading"><div class="mm_title_name"><?php echo $campdata->campaign_name; ?><small> report </small></div></div>

		<?php } ?>

        <div class="panel-body">

               <div class="container">

				<?php if($_GET['play']!='' && $camp_status == 1) { ?>

				<div id="msg_div" style="color:green;font-size:20px">

						All recepeints got the email..if you are one of them please check your email. 

				</div>

			</div>

		</div>

	</div>

</div>

				

				

    				<?php exit();	 } ?>

<?php    

if($camp_status == 2 || $camp_status == 4){

	//this code run if campaign status is 2 = paused.

    $sub_data = $wpdb->get_results("SELECT count(id) as ttl_sub,(select count(id) from $masta_report where status = 1 and camp_id= $camp_id) as ttl_sent FROM $masta_report WHERE camp_id = $camp_id  and list_id = $list_id ");

    if(count($sub_data)){

		

	   $sub_count = $sub_data[0]->ttl_sub;

	   $ttl_sent = $sub_data[0]->ttl_sent; 	

	   $avg_sent = ($ttl_sent / $sub_count ) * 100; 

	} else {

	   $sub_cout = '0';	

	   $ttl_sent = '0';

	   $avg_sent = '0';

	}

	

?>

 <div class="confirm_msg">

 <div class="row">

 <div class="col-sm-12">

<input type="hidden" name="campid" id="campid" value="<?php if(!empty($camp_id)){ echo $camp_id;}else{ echo '';}?>">

<input type="hidden" name="listid" id="listid" value="<?php if(!empty($list_id)){ echo $list_id;}else { echo '';}?>">

<input type="hidden" name="subcount" id="subcount" value="<?php if(!empty($sub_count)){ echo $sub_count;} else { echo '0';}?>">

<input type="hidden" name="ttl_sent" id="ttl_sent" value="<?php echo $ttl_sent;?>">

<input type="hidden" name="is_send" id="is_send" value="">

<div class="progress">

	  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $avg_sent?>%" id="send_progress">

		<span class="sr-only">40% Complete (success)</span>

	  </div>

 </div>

 <div class="clearfix">

		<div class="mm_float_left"><span id="ttlsent"><?php echo $ttl_sent;?></span> / <span id="ttlsub"><?php if(!empty($sub_count)){ echo $sub_count;}else{ echo '0';}?></span> sent</div>

		<div class="mm_float_right">

        <div id="show_progress_avg">

        	<?php 

				$avg = ($ttl_sent / $sub_count)* 100;

				if(!empty($avg)){

				  echo $avg.' % Complete';	

				} 

			?>

        </div>

		    <a title="Resume Campaign" class="runstopauto btn btn-default" href="#" id="start" onclick="camp_action(this.id)"><i class="fa fa-play"></i></a>

		</div>

 </div>

 

<div id="msg_div" style="color:green;font-size:20px;display:none">

	All recepeints got the email..if you are one of them please check your email. 

</div>

</div>

</div>

<?php

} else {

	

	

	$masta_subscribers = $wpdb->prefix .'masta_subscribers';

	//this is campaing detail and report view section

	$ttl_users = '0';

	$ttl_subscriber = '0';

	$ttl_unsubscriber = '0';

	$ttl_opened = '0';

	$ttl_bounce = '0';

	$ttl_mail_sent = '0';

	$ttl_not_opened = 0;

	

	//query variables for campaign report.

	$common_condition = "camp_id = $camp_id  and list_id = $list_id";

	$sub_sql = "(select count(id) from $masta_subscribers where status = '1' and id in (select subscriber_id from $masta_report where $common_condition )) as ttl_subscriber";

	$unsub_sql = "(select count(id) from $masta_subscribers where status = '2' and id in (select subscriber_id from $masta_report where $common_condition) ) as ttl_unsubscriber";

	$open_sql = "(select count(id) from $masta_report where opened = '1' and $common_condition) as ttl_opened";

	$clicked= "(select count(id) from $masta_report where clicked = '1' and $common_condition) as ttl_clicked";

	$bounce_sql = "(select count(id) from $masta_report where bounce = '1' and $common_condition) as ttl_bounce";

	$mail_sent_sql = "(select count(id) from $masta_report where status = '1' and sub_status = '1' and $common_condition) as ttl_mail_sent";

	$ttl_sql = "SELECT count(id) as ttl_sub,$sub_sql,$clicked,$unsub_sql,$open_sql,$bounce_sql,$mail_sent_sql FROM $masta_report WHERE $common_condition";

	//echo $ttl_sql;

    $report_data = $wpdb->get_results($ttl_sql);

    //print_r($report_data);

	if(count($report_data) > 0){

		$ttl_users = $report_data[0]->ttl_sub;

		$ttl_subscriber = $report_data[0]->ttl_subscriber;

		$ttl_unsubscriber = $report_data[0]->ttl_unsubscriber;     

		$ttl_opened = $report_data[0]->ttl_opened;					

		$ttl_bounce = $report_data[0]->ttl_bounce;

		$ttl_mail_sent = $report_data[0]->ttl_mail_sent;

		$ttl_not_opened = ($ttl_mail_sent)-($ttl_opened);

		

		$ttl_clicked_link=$report_data[0]->ttl_clicked;

		if($ttl_mail_sent!=0){

			

		$opened_rate=round(($ttl_opened/$ttl_mail_sent)*100,2);

		

		}

		else{

			$opened_rate=0;

			}

		

		if($ttl_mail_sent!=0){

		$clicked_rate=round(($ttl_clicked_link/$ttl_mail_sent)*100,2);

		}

				else{

			$clicked_rate=0;

			}

		

		if(($ttl_unsubscriber+$ttl_subscriber)!=0){

			

		$s_t_per=(($ttl_unsubscriber)/($ttl_unsubscriber+$ttl_subscriber))*100;	

		$subscribed_rate=round($s_t_per,2);

		}

		else{

			$subscribed_rate=0;

			}

		

	} 

	

	$country_sql = "SELECT `country_code`, COUNT(id) TotalCount FROM $masta_report where $common_condition and opened = '1' GROUP BY `country_code` ORDER BY COUNT(id) DESC";

	$country_data = $wpdb->get_results($country_sql);

 ?>	

 						<div class="totalopen"><?php echo $ttl_mail_sent ?> total emails</div>

 							<div class="confirm_msg text-center mm_show_user">

                                <div class="row" style="border:none;">

                                    <div class="col-sm-6">

                                        <!--Opened rate-->

                                        <?php if($opened_rate!=0){ ?>

                                            <canvas id="canvas1" height="200" width="200"></canvas>

                                        <?php } else { ?>

                                            <div class="nodata" style="color:#63B512 !important;  margin-top: 41px !important;">No Data</div>

                                        <?php } ?>

                                        <div class="data_user" style="color:#63B512 !important"><?php echo $opened_rate; ?>%<p>open rate ( <?php echo $ttl_opened ?><?php //echo $ttl_mail_sent ?> )</p></div>

  

                                    <!--end of opened rate-->

                                    </div>

                                    

                                    <div class="col-sm-6">

                                        <!-- click rate -->

                                        <?php if($clicked_rate!=0){ ?>

                                            <canvas id="canvas2" height="200" width="200"></canvas>

                                        <?php } else { ?>

                                            <div class="nodata" style="color:#00A2E8 !important;  margin-top: 41px !important;">No Data</div>

                                        <?php } ?>

                                            <div class="data_user" style="color:#00A2E8 !important"><?php echo $clicked_rate  ?>%<p>Click rate ( <?php echo $ttl_clicked_link ?><?php //echo $ttl_mail_sent ?> )</p></div>

                                        <!-- end of click rate -->

                                    </div>

                                </div>

                                <div class="row">

                                    <div class="col-sm-6 col-sm-offset-3">

                                        <!-- subscribe rate -->

                                        <?php if($subscribed_rate!=0){ ?>

                                            <canvas id="canvas3" height="200" width="200"></canvas>

                                        <?php } else { ?>

                                            <div class="nodata" style="color:#e5001c !important;  margin-top: 41px !important;">No Data</div>

                                        <?php } ?>

                                            <div class="data_user" style="color:#e5001c !important" ><?php echo $subscribed_rate ?>% <p>Unsubscriber  rate ( <?php echo $ttl_unsubscriber ?><?php // echo $ttl_users ?> )</p></div>

                                        <!-- end of subscribe rate -->

                                    </div>

                                </div>

								

                                 <!--map rate-->

								   <script type='text/javascript' src='https://www.google.com/jsapi'></script>

									<script type='text/javascript'>

									 google.load('visualization', '1', {'packages': ['geochart']});

									 google.setOnLoadCallback(drawRegionsMap);

									  function drawRegionsMap() {

										var data = google.visualization.arrayToDataTable([

										 ['Country', 'opened'],

									   	  //['Germany', 200],

										 // ['United States of America', 300],

										// ['Brazil', 400],

									   // ['Canada', 500],

									  // ['France', 600],

									 // ['IN', 700]

									<?php

									

									foreach($country_data as $country_sqls){

										echo "['".$country_sqls->country_code."', ".$country_sqls->TotalCount."],\n";

									 }

									?>

										 

										]);

										var options = {};

										var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

										chart.draw(data, options);

									};

									</script>

                                    

                                     <div class="row">

                                    	<div class="col-sm-12">

											<div id="chart_div" style="height: 500px;"></div>

                                        </div>

                                    </div>

									 

									 <!--end map rate -->

     

                                

                                <div class="row" style="border:none;">

                                

                                <div class="col-sm-6">

                                	<div class="list_masta">

                               			

									<table class="last_ten_open">

										<tr><th>Link Activity</th><th>Clicks</th></tr>									

										 	<?php 	$get_last_click=$wpdb->get_results("select site_click, subscriber_email  from $masta_report where camp_id=$camp_id");

											

											//print_r($get_last_click);

											foreach($get_last_click as $get_last){

												if($get_last->site_click!=''){

													

													//echo $get_last->site_click;

													$semi=explode(';',$get_last->site_click);

													foreach($semi as $semis){

														$semisa=explode('|',$semis);

														$slinks=$semisa[0];

														if(empty($linkcount[$slinks])){

															$linkcount[$slinks]=1;

														}

														else{

															$linkcount[$slinks]=$linkcount[$slinks]+1;

														}

													}

												}

											}

											

											if(!empty($linkcount)){

												foreach($linkcount as $lkey => $linkcounts){

													echo "<tr>";

													echo '<td>'.$lkey."</td><td>".$linkcounts.'</td>';

													echo "</tr>";

												}

											}

											

										//google.co.in/|2014-05-24 07:17:26

										?>

										

										

										</table> 

									</div>

								 </div>

                              

                             

								<div class="col-sm-4">

                                	<div class="list_masta">

                               			<p>Last 10 open</p>

									<ul class="last_ten_open lastttp">									

								 	<?php 	$get_last_mail=$wpdb->get_results("select subscriber_email from $masta_report where camp_id=$camp_id and opened=1 order by open_date desc  LIMIT 0 , 10");

								foreach($get_last_mail as $get_last){

									echo "<li>";

									echo $get_last->subscriber_email;

									echo "</li>";

								}

									?>

									</ul>

									

								<?php if(count($get_last_mail) > 10 ) { ?>

									<div class="pagination">

									<a href="javascript:void(0)" id="leftp" class="leftp pacl" page='-10'>&lt;</a>

										<span class="bigdiv">

									<?php

									$toopen=(int)((int)$ttl_opened/10); 

									if($ttl_opened/10>$toopen){

										$toopen++;

									}

									

									for($cil=1; $cil <= $toopen; $cil++)

									{ ?>

									<a style="display:none" href="javascript:void(0)" <?php if($cil>10) { ?>style="display:none"<?php } ?> class="pacl pacl-<?php echo $cil; ?>" page="<?php echo ($cil-1)*10;  ?>" ><?php echo $cil; ?></a>

									<?php

									}

									?>

									<?php 

									if($ttl_opened<10){

										$show=$ttl_opened;

									}

									else{

										$show=10;	

									}

									?>

									<a  id="pai" href="javascript:void(0)"> 0-<?php echo $show ?>(<?php echo $ttl_opened; ?>)</a>

									<input type='hidden' id="pagih" value="<?php echo ($cil-2)*10 ?>">

										</span>

									<a <?php if($ttl_opened<10) { ?> style="display:none" <?php } ?> href="javascript:void(0)" id="rightp" class="rightp pacl" page='10'>&gt;</a>

								</div>

								<?php } ?>

                                         

                                         

							

									</div>

		                                 

								 </div>

                                 

                                 </div>

                                 <script>

                                 

								 jQuery(document).ready(function(){

								 	jQuery('#leftp').hide();

								 	jQuery('.pacl').click(function(){

								 		//alert("test test");	

										var cmd= "<?php echo $camp_id ?>";

								 		var url="<?php echo dirname(__FILE__)  ?>/ajaxreport.php";

								 		var pa=jQuery(this).attr('page');

								 		jQuery.post(ajaxurl, {'action': 'my_action', 'url': url , 'last_ten_open': cmd, 'offset':pa  }, function(resp) {

											jQuery('.lastttp').html(resp);

										});

								 		

								 		

								 		if(jQuery(this).attr('id')=='rightp'){

								 			var getl=parseInt(jQuery('#rightp').attr('page'));

								 			getl=getl+10;

								 			jQuery('#rightp').attr('page', getl);

										

											var getl=parseInt(jQuery('#leftp').attr('page'));

								 			getl=getl+10;

								 			jQuery('#leftp').attr('page', getl);

								 			jQuery('#leftp').show();	

		

								 		}

								 		else if(jQuery(this).attr('id')=='leftp'){

								 			var getl=parseInt(jQuery('#rightp').attr('page'));

								 			getl=getl-10;

								 			jQuery('#rightp').attr('page', getl);

								 			var getl=parseInt(jQuery('#leftp').attr('page'));

								 			getl=getl-10;

								 			jQuery('#leftp').attr('page', getl);

								 			jQuery('#rightp').show();	

								 		}

								 		var te=parseInt(jQuery('#leftp').attr('page'));

								 		te=te+10;

								 		var li=jQuery('#rightp').attr('page');

										

										jQuery('#pai').html(te+"-"+ li + "("+<?php echo $ttl_opened; ?>+")");

								 		if(parseInt(jQuery('#pagih').val()) < parseInt(jQuery('#rightp').attr('page')) )

								 		{

								 			jQuery('#rightp').hide();	

								 		}

								 		if(parseInt(jQuery('#leftp').attr('page'))==-10)

								 		{

								 			jQuery('#leftp').hide();	

								 		}

								 	});

								});

							</script>

                                 

                                 <div class="row">

									<div class="col-sm-6">

                                    <div class="list_masta">

	                                	

										<table class="last_ten_open">									

									<tr><th>Last 10 clicked</th><th>Links</th></tr>

									 	

									<?php 	$get_last_click=$wpdb->get_results("select site_click, subscriber_email  from $masta_report where camp_id=$camp_id order by last_click Desc limit 0,10");

									

								foreach($get_last_click as $get_last){

									if($get_last->site_click!=''){

										$semi=explode(';',$get_last->site_click);

										foreach($semi as $semis){

											$semisa=explode('|',$semis);

										$click[$semisa[1]]="<td>".$get_last->subscriber_email."</td> <td>".$semisa[0]."</td>";

										}

									}

										

								}

									

									function sortFunction( $a, $b ) {

										echo $a;

									    return strtotime($a) - strtotime($b);

									}

								

								if(!empty($linkcount)){

									

									krsort($click);

									

									foreach($click as $cli){

										echo "<tr>".$cli."</tr>";

									}

										} ?>

										</table>

										</div>

									 </div>

									

                                    

                                        

									</div>

								

										

									

  

								 

									

									

				<?php  //$top10list=$wpdb->get_results("SELECT subscriber_email FROM $masta_report WHERE camp_id =$camp_id LIMIT 0 , 9"); ?>

									

									

								 

 

 

 <script src="<?php echo plugins_url( 'mail-masta/lib/Chart.js' )  ?>"></script>

 	

<!--Opened rate(js)-->

	<script type="text/javascript">

		var pieData = [

				{

					value: parseInt("<?php echo $ttl_opened; ?>"),

					color:"#63B512"

				},

				{

					value : parseInt("<?php echo $ttl_not_opened; ?>"),

					color : "#E0E4CC"

				}

			

			];

	var myPie = new Chart(document.getElementById("canvas1").getContext("2d")).Pie(pieData);

	</script>

 <!--end of opened rate(js)-->

 

 

<!-- click rate(js) -->

 	<script type="text/javascript">

		var pieData = [

				{

					value: parseInt("<?php echo $ttl_clicked_link; ?>"),

					color:"#00A2E8"

				},

				{

					value : parseInt("<?php echo $ttl_mail_sent-$ttl_clicked_link; ?>"),

					color : "#E0E4CC"

				}

			

			];

	var myPie = new Chart(document.getElementById("canvas2").getContext("2d")).Pie(pieData);

	</script>

   <!-- end of click rate(js) -->

 

  <!-- subscribe rate(js) -->

  	<script type="text/javascript">

		var pieData = [

				{

						value: parseInt("<?php echo $ttl_subscriber; ?>"),

						color:"#E0E4CC"

				},

				{

					value : parseInt("<?php echo $ttl_unsubscriber; ?>"),

					color : "#e5001c"	

					

				}

			

			];

	var myPie = new Chart(document.getElementById("canvas3").getContext("2d")).Pie(pieData);

	</script>

   <!-- end of subscribe rate(js) --> 	

   

								

   

<?php   

}

    

?>

				</div>

			</div>

		</div>

	</div>

</div><!--.view_campaigns-->

<script type="text/javascript">

 function camp_action(aid){

	 // alert(aid);	

	  var mainid = aid;

	   var campid   = jQuery("#campid").val();

	  if(aid == 'stop' ){

		   alert("Campaign Paused.");

		  //change status of campaign if paused

		  jQuery.post("<?php echo plugins_url(); ?>/mail-masta/inc/campaign_save.php", {camp_id : campid,change_status:'true',status:'2'},function(resp2){

			 if(resp2 != '' ){

				var newid = 'start';

				jQuery("#is_send").val("1");

				jQuery("#"+mainid).html("<i class='fa fa-play'></i>");

				jQuery("#"+mainid).attr("title","Start Campaign");

				jQuery("#"+mainid).attr("id",newid);

			  

			 }

		 });

		  

		  

			

	  } else {

		  alert("Campaign Start");

		  

		  jQuery.post("<?php echo plugins_url(); ?>/mail-masta/inc/campaign_save.php", {camp_id : campid,change_status:'true',status:'4'},function(resp2){

			 if(resp2 != '' ){

				 var newid = 'stop';

			jQuery("#is_send").val("");

		    jQuery("#"+mainid).html("<i class='fa fa-pause'></i>");

		    jQuery("#"+mainid).attr("title","Stop Campaign");

		    jQuery("#"+mainid).attr("id",newid);

		    sendmail();

			  

			 }

		 });

	  }

	}

  function sendmail(){

		   

		   var is_send   = jQuery("#is_send").val();

		   if(is_send == '') {

			   var campid   = jQuery("#campid").val();

			   var listid   = jQuery("#listid").val();

			   var counter  = jQuery("#ttl_sent").val();

			   

			   jQuery.post("<?php echo plugins_url(); ?>/mail-masta/inc/campaign/ajax_camp_send.php", {camp_id : campid,list_id:listid,offset:counter}, function (resp){

						//alert(resp);return false;

						if (resp.trim() != '') {

								 var new_counter = ++counter;

								 var ttl = jQuery("#subcount").val();

								 

								 var avg = (new_counter/ttl)*100;

								 var new_avg = parseFloat(Math.round(avg * 100) / 100).toFixed(2);

								 jQuery("#show_progress_avg").html(new_avg+"% complete");

								 jQuery("#send_progress").css("width",avg+"%");

								 jQuery("#ttl_sent").val(new_counter);

								 jQuery("#ttlsent").html(new_counter);

									

								 if( new_counter != ttl ) {

									

									setTimeout(sendmail,100);

								 } else {

									 

									 jQuery.post("<?php echo plugins_url(); ?>/mail-masta/inc/campaign_save.php", {camp_id : campid,change_status:'true',status:'1'},function(resp2){

										 if(resp2 != '' ){

										   window.parent.location.href = "<?php echo admin_url();?>/admin.php?page=masta-campaign";		 

									   

										 }

									 });

									 jQuery("#msg_div").show();

								 }

						} else {

							  

							  alert("Something went wrong in code");

						}

					

				  });

                               

		   } else {

			    //alert("Campaign Paused.");

		   }

	

	}

</script>

<?php } else {

			   header("location:".admin_url()."/admin.php?page=masta-campaign");	

} ?>

