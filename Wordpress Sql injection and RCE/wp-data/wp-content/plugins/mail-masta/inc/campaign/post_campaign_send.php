

<?php





 //global $wpdb;

//$masta_campaign = $wpdb->prefix . "masta_campaign";

// $send_campaign_id = $_GET["send_id"];

//$masta_settings = $wpdb->prefix."masta_settings";

//$masta_subscribers = $wpdb->prefix . "masta_subscribers";

 ///$masta_report = $wpdb->prefix . "masta_reports";

 

global $wpdb;

$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");

$rows_data = $app_details[0];

$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);

//echo $send_campaign_id;exit;

//~ $rows_data = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $send_campaign_id");

//~ 

//~ $extract_data = $rows_data[0];

//~ $listid = $extract_data->to_list;



	

		$masta_campaign = $wpdb->prefix . "masta_campaign";

		// $send_campaign_id = $_GET["send_id"];

		$masta_settings = $wpdb->prefix."masta_settings";

		$masta_subscribers = $wpdb->prefix . "masta_subscribers";

		$masta_report = $wpdb->prefix . "masta_reports";

		

		

		$campdatalist = $wpdb->get_results("SELECT *

		FROM wp_mail_campaign

		WHERE campaign_type =2

		AND STATUS =5

		AND create_date < now( )

		");



	

		foreach($campdatalist as $campdata) {

		

		

 



			$campidq=$campdata->camp_id;

			

			mmasta_send_campaign($campidq);

			

			

			$update_data  = array('status'=> 1);

			$where_array = array('camp_id' => $campidq);

			$rows_affected_one = $wpdb->update($masta_campaign,$update_data,$where_array);



	}

























