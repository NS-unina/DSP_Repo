<?php	

global $wpdb;

?>

<script>

document.title = "Mail Masta";

</script>

<style>

div#wpwrap > div {

display: none;

}

div#wpwrap div#wpcontent {

display: block !important;

}

div#wpadminbar {

display: none;

}

div#wpbody-content > div {

display: none;

}

div#wpbody-content .mybody {

display: block !important;

}

#wpwrap{

	height: auto !important;

	

	}

	

	body{

		

		height: auto !important;

	

		

		}

		

		html.wp-toolbar {

height: auto;

padding: 0;

background: #fff;

}

#wpbody{

	padding-top:0 !important;

	

	}

div#wpbody-content {

padding-bottom: 0;

background: #fff;

margin-left: -11px;

width: 103%;

}

</style>

<?php 

$masta_report = $wpdb->prefix . "masta_reports";

$masta_campaign = $wpdb->prefix . "masta_campaign";

$camp_id=$_GET['id'];

$campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id");

$totals = $wpdb->get_results( "SELECT count(*) ts FROM $masta_report WHERE camp_id = $camp_id and status=1");

$totalm = $wpdb->get_results( "SELECT count(*) tm FROM $masta_report WHERE camp_id = $camp_id");

$ts_value=(int)$totals[0]->ts;

$tm_value=(int)$totalm[0]->tm;

if($tm_value!=0){

$per=($ts_value/$tm_value)*100;

}

  $list_id = $campaigndata[0]->to_list; 

  ?>

<?php

if($_GET["play"]=='start'){

 $where_array = array('camp_id' => $camp_id);

		$update_data  = array('status'=>4);

		$wpdb->update($masta_campaign,$update_data,$where_array);

}

else if($_GET["play"]=='stop'){

 $where_array = array('camp_id' => $camp_id);

		$update_data  = array('status'=>2);

		$wpdb->update($masta_campaign,$update_data,$where_array);

}

		?>

<script type="text/javascript">

	

	jQuery(document).ready(function(){

		

		

		

					

					

	//sendmail();

 var myVar;

 var sinter=0;

 if('<?php echo $_GET["play"] ?>'=='start')

{ 

	setTimeout(mainfunction, 1000);

 }

  function mainfunction(){

		   

		   sinter=0;

			var url="<?php  echo admin_url() ?>/admin.php?page=ajaxu";

		   jQuery.post(url, {'camp_id' : '<?php echo $camp_id; ?>','list_id':'<?php echo $list_id; ?>'}, function (resp){

					//alert(resp);		

			});	

		   

		  myVar=setInterval(outputf, 200);

			var i=0;

		   function outputf(){

		

			var url= "<?php  echo plugins_url() ?>/mail-masta/inc/campaign/count_of_send.php/?pl=<?php echo get_home_path(); $a='wp'; $b='-lo'; $c='ad'; $d='.php'; $a=$a.$b.$c.$d;  echo $a; ?>";

		

					   	jQuery.post(url, {'camp_id': '<?php echo $camp_id; ?>','list_id':'<?php echo $list_id; ?>'}, function (resp){

							


				var wi = parseInt(resp);

				var ts=parseInt(jQuery('#ttj').val());

				per=(wi/ts)*100;

				jQuery('#enf').html(per.toFixed(2)).change();

				jQuery('#tsv').html(wi).change();

				jQuery('#sets').css('width',per+"%");

				

				

			var f = jQuery("#sets").width() / jQuery('#sets').parent().width() * 100;

				

			

				if(f==100 && i++==0){

						window.top.location = "<?php echo admin_url(); ?>/admin.php?page=masta-campaign";

					}

					

			

			});

		   }

		   		

	}

   	jQuery('#pause').click(function(){	

		   				//request.abort();

			sinter=1;

			});

});	

</script>

<div class='mybody'>

<input type='hidden' value="<?php echo $tm_value ?>" id="ttj">

<div  style="height: 8px;

border: 1px solid #d4d4d4;

width: 95%;

border-radius: 6px;">

	<div id="sets" style="height: 100%;

background: green;

border-radius: 6px 0 0 6px; width:<?php echo $per; ?>%">

	</div>	

</div>

<small style="width: 95%;

text-align: center;

float: left;

font-family:Open Sans,sans-serif;

margin-top: 5px;

font-size: 15px;

color: #444"><span id='enf'><?php echo number_format($per, 2, '.', ''); ?></span>%(<span id='tsv'><?php echo $ts_value ?></span>/<?php echo $tm_value ?>) </small>

</div>

	

