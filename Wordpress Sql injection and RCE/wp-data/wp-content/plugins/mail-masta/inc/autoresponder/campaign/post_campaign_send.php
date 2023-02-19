

<?php

//require_once('../../../../wp-load.php');

//require_once('../../amazon_api/SimpleEmailService.php');



 //global $wpdb;

//$masta_campaign = $wpdb->prefix . "masta_campaign";

// $send_campaign_id = $_GET["send_id"];

//$masta_settings = $wpdb->prefix."masta_settings";

//$masta_subscribers = $wpdb->prefix . "masta_subscribers";

 ///$masta_report = $wpdb->prefix . "masta_reports";

 

$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");

$rows_data = $app_details[0];

$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);

//echo $send_campaign_id;exit;

$rows_data = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $send_campaign_id");



$extract_data = $rows_data[0];

$listid = $extract_data->to_list;





	function cron_job_function(){



		global $wpdb;

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



}







function mmasta_send_campaign($camp_id_top)

	{





	global $wpdb;

	$masta_campaign = $wpdb->prefix . "masta_campaign";

	$masta_settings = $wpdb->prefix."masta_settings";

	$masta_subscribers = $wpdb->prefix . "masta_subscribers";

	$masta_report = $wpdb->prefix . "masta_reports";

	 

	$listdata = $wpdb->get_results("SELECT wms.id sub_id, wms.status sub_status, wms.email sub_email, wmc.camp_id cam_id, wmc.status cam_status, wmc.to_list cam_list

	FROM wp_mail_subscribers wms

	LEFT JOIN wp_mail_campaign wmc ON ( wms.list_id = wmc.to_list )

	WHERE  wmc.camp_id = $camp_id_top 

	AND wms.status =1");







	//print_r($listdata);

	$sub_count = count($listdata);

	if($sub_count > 0) {

		

	  foreach($listdata as $subdata) :



		$subscriber_id = $subdata->sub_id;

		$status = '2';

		$sub_status = $subdata->sub_status;

		$sub_email = $subdata->sub_email;

		$send_campaign_id=$subdata->cam_id;

		$listid=$subdata->cam_list;

		

		$insert_data  = array('camp_id' => $send_campaign_id,'list_id'=>$listid,'subscriber_id'=>$subscriber_id,'status' => '2','request_id'=>'','message_id'=>'','sub_status'=>$sub_status,'subscriber_email'=>$sub_email);

	   

	 

	   

	   //print_r($insert_data);



	 

	 

		$rows_affected_one = $wpdb->insert($masta_report, $insert_data);

		

	  

		endforeach;	







	//send sheduled email



	   $new_counter=0;

	   $limit=1;



	  foreach($listdata as $subdata) :

		$subscriber_id = $subdata->sub_id;

		$status = '2';

		$sub_status = $subdata->sub_status;

		$sub_email = $subdata->sub_email;

		$camp_id=$subdata->cam_id;

		$list_id=$subdata->cam_list;

	  

	  //echo $list_id 





		$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");

		$rows_data = $app_details[0];

		$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);

		//$sql = "SELECT * FROM $mail_reports where camp_id = $camp_id and list_id = $list_id order by id asc limit $new_counter,$limit";

		$listdata_2 = $wpdb->get_results("SELECT * FROM $masta_report where camp_id = $camp_id and list_id = $list_id  and subscriber_id= $subscriber_id");

	 



	 

		if(count($listdata_2) > 0) {

			$row_data =  $listdata_2[0];

			$sent_date = date("Y-m-d H:i:s");

			$req_id = '';

			$msg_id = '';

			$status = $row_data->status;

			$sub_status = $row_data->sub_status;

			$sub_email = $row_data->subscriber_email;

			$subscriber_id = $row_data->subscriber_id;

			$report_id = $row_data->id;

			if($status == 2 && $sub_status == 1){

				

				

				

			$rs_data = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id ");

		$campaing_data = $rs_data[0];	

		$open_url = home_url().'?openid='.urlencode(mmasta_encrypt($report_id));

		$encrypt_url = home_url().'?uid='.urlencode(mmasta_encrypt($subscriber_id));

		$link_msg = $campaing_data->body.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';

		$plainTextBody = $campaing_data->body.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';

		

		

				

				//array_push($mail_array,$emails->email);

				$m = new SimpleEmailServiceMessage();

				$m->addTo($sub_email);

				$m->setFrom($campaing_data->from_email);

				$m->setSubject($campaing_data->campaign_name);

				$m->setMessageFromString($plainTextBody,$link_msg); 

				$rt =  $ses->sendEmail($m);

				if(!empty($rt['MessageId'])){

				  $msg_id = $rt['MessageId']; 	

				}

				

				if(!empty($rt['RequestId'])){

				  $req_id = $rt['RequestId']; 	

				}

				

				

			} 

			$where_array = array('id' => $report_id);

			$update_data  = array('status'=>1,'request_id'=>$req_id,'message_id'=>$msg_id,'sent_date'=>$sent_date);

			

			$rows_affected_one = $wpdb->update($masta_report,$update_data,$where_array);

			$error = $wpdb->print_error();

			$insert_id = '212';

			//$insert_id = $wpdb->insert_id;

			if(!empty($insert_id)) {

			  //echo 'the last insert id is '.$insert_id;exit;	

			} else {

				

			 // echo '';exit;	

		}  

		 

	  } else {

	   // echo '';exit;	  

	  } 





	  

	  

	  

	  

	  

	  

	  

	  



		$new_counter++;

		

	  endforeach;	

	}















}







?>





