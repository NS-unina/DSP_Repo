                                            
<?php
//require_once('../../../../../../wp-load.php');
//require_once('../../../amazon_api/SimpleEmailService.php');
global $wpdb;
$masta_support = $wpdb->prefix.'masta_support';
$masta_responder = $wpdb->prefix.'masta_responder';
$masta_settings = $wpdb->prefix.'masta_settings';
$masta_list = $wpdb->prefix.'masta_list';
$masta_responder_report = $wpdb->prefix.'masta_responder_reports';
$que_list=$wpdb->get_results("SELECT * from $masta_support");
$autoresponder=$wpdb->get_results("SELECT * from  $masta_responder where responder_type=2 and status=5");
foreach($autoresponder as $autoresponders){
		$auto[$autoresponders->responder_id]=$autoresponders;
}
$li=0;
foreach($que_list as $que_lists){ 
	//initialize all values
	$responder_id=$que_lists->cor_id;
	$list_id=$que_lists->list_id;
	
	$subscriber_id=$que_lists->subscriber_id;
	$sub_email=$que_lists->subscriber_email;
	$extra_fields=$que_lists->subscriber_data;
	
	
	$subscribtion_date=$que_lists->subscribtion_date;
	$subscribtion_interval=$que_lists->interval;
	$sub_interval_array=explode(':',$subscribtion_interval); 
		
	$sub_country=$que_lists->sub_country;
		
	
	$responder_data=$auto[$responder_id];
	
	
	$date = new DateTime($subscribtion_date);
	$date->modify("+$sub_interval_array[0] day + $sub_interval_array[1] hour + $sub_interval_array[2] minute");
	$currentdate = new DateTime();
	
	if($date > $currentdate ){
			continue;
		}
	else{
		$g_of_list[$li++]=$que_lists->id;
	}	
	//echo $date->format('Y-m-d H:i:s')."<br>";
	
	$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");
	$rows_data = $app_details[0];
	$api_send_type = $rows_data->send_type;
	
	//end 1
			
		$link_msg=$responder_data->resp_mail;
		$plainTextBody=$responder_data->resp_mail;
		
		$insertd=array('list_id' => $list_id,
		 'responder_id' => $responder_id,  
		 'subscriber_id' => $subscriber_id,
		 'subscriber_email' => $sub_email,
		 'country_code' => $sub_country,
		 'status' => $que_lists->status
		  );	
		$latest_insert_res=$wpdb->insert($masta_responder_report, $insertd);
		
		$open_url = home_url().'?openid2='.urlencode(mmasta_encrypt($wpdb->insert_id));
		$encrypt_url = home_url().'?uid='.urlencode(mmasta_encrypt($subscriber_id));
		$reportides=urlencode(mmasta_encrypt($wpdb->insert_id));
		
		
		$arrr = array("respid=mailmastadata" => "respid=".$reportides);
		$plainTextBody=strtr($plainTextBody,$arrr);
		
		$arrr = array("[unsubscribe]" => '<a href="'.$encrypt_url.'">', "[/unsubscribe]" => '</a>');
		$plainTextBody=strtr($plainTextBody,$arrr);
		
		
		
		
		$list_id_o=$wpdb->get_results( "SELECT * FROM $masta_list WHERE  list_id = $list_id");
			$da=(array)json_decode($list_id_o[0]->edit_form);
			$ed=(array)json_decode($extra_fields);
			
	
			$da_keys=array_keys($da);
			$ed_keys=array_values($ed);
				//remove placeholder  [email]
				$value_by_r=$que_lists->subscriber_email;
				$value_to_r='[email]';
				$arrv=array($value_to_r=>$value_by_r);
				$plainTextBody=strtr($plainTextBody,$arrv);
				//end placeholder [email]
			foreach($da_keys as $key=>$values)
			{
				$value_to_r='['.$values.']';
				$arrv=array($value_to_r=>$ed_keys[$key]);	
				$plainTextBody=strtr($plainTextBody,$arrv);
			}
		
		
		
		
		
		$checkstr='<a href="'.$encrypt_url.'">';
		
		//if (strpos($plainTextBody,$checkstr) !== false)
		//{
			$link_msg = $plainTextBody.'<br><img src="'.$open_url.'" height="1" width="1">';
			$plainTextBody = $plainTextBody.'<br><img src="'.$open_url.'" height="1" width="1">';
		//}
		//else{
		//	$link_msg = $link_msg.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';
		//	$plainTextBody = $plainTextBody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';
		//}
		
		
	
	//end of body of e mail
	
	if($api_send_type == 2 && $que_lists->status != 2){
			   $msg_body_header = '<html><body>';	
			   $msg_body_footer = '</body></html>';
			   $headers  = 'MIME-Version: 1.0' . "\r\n";
			   $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
			   $headers .= 'From: '.ucfirst($responder_data->from_name).' <'.$responder_data->from_email.'>' . "\r\n";
			   $send_subject = $responder_data->subject;
			   $send_message = $plainTextBody;
				mail($sub_email, $send_subject, $send_message, $headers);
				
			}		
				
	 else if($api_send_type == '1' && $que_lists->status != 2) {
				$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);
				$m = new SimpleEmailServiceMessage();
				$m->addTo($sub_email);
				$m->setFrom($responder_data->from_email);
				$m->setSubject($responder_data->subject);
				$m->setMessageFromString($plainTextBody,$link_msg);  
				$rt =  $ses->sendEmail($m);
				if(!empty($rt['MessageId'])){
				  $msg_id = $rt['MessageId']; 	
				}
				
				if(!empty($rt['RequestId'])){
				  $req_id = $rt['RequestId']; 	
				}
		 }  	
	
		
	
	//mail('akil.badshah@luutaa.com', $responder_id.' '.$list_id.' '.$subscriber_id.' '.$subscribtion_date,'' );			
	
}
if($g_of_list!=''){
	$g_of_list_t=implode(',',$g_of_list);
}
//$getrs=$wpdb->get_results("SELECT * from $masta_support where id in($g_of_list_t)");
$wpdb->query( 
	$wpdb->prepare( 
		"
                DELETE FROM $masta_support where id in($g_of_list_t)
		",12
        )
);
//echo "<pre>";
//print_r($getrs);
?>  