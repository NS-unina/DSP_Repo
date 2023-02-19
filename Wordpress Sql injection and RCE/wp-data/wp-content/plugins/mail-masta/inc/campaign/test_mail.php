<?php 
//echo "<p>(Mouse over the links and see the url pointed)</p>";
//$string = "<p>Please <a href='http://example.co.in'>click here</a> to go to <a href='http://example.com'>the site</a></p>";
//$newurl = "#";
//$pattern = "/(?<=href=(\"|'))[^\"']+(?=(\"|'))/";
//$newstring = preg_replace($pattern,$newurl,$string);
//echo $string;
//echo $newstring;
global $wpdb;
$camp_id  = trim($_POST['camp_id']);
 $masta_subscribers = $wpdb->prefix . "masta_subscribers";
 $masta_reports = $wpdb->prefix . "masta_reports";
 $masta_campaign = $wpdb->prefix . "masta_campaign";
 $masta_settings = $wpdb->prefix."masta_settings";
 $app_details = $wpdb->get_results("SELECT * FROM $masta_settings");
 $rows_data = $app_details[0];
 $api_send_type = $rows_data->send_type;
 
$rs_data = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id");
				
				
			
			$campaing_data = $rs_data[0];	
			
			$list_id  = trim($campaing_data->to_list);
			$open_url = home_url().'?openid='.urlencode(mmasta_encrypt($report_id));
			$encrypt_url = home_url().'?uid='.urlencode(mmasta_encrypt($subscriber_id));
			$reportides=urlencode(mmasta_encrypt($report_id));
			$arrr = array("id=mailmastadata" => "id=".$reportides);
			$contentbody=strtr($campaing_data->cammail,$arrr);
			$arrr = array("[unsubscribe]" => '<a href="'.$encrypt_url.'">', "[/unsubscribe]" => '</a>');
			$contentbody=strtr($contentbody,$arrr);
			$contentbody=strtr($contentbody,$arrr);
		
			$wp_maillist=$wpdb->prefix.'masta_list';
			$wp_mailsubs=$wpdb->prefix.'masta_subscribers';
			$list_id_o=$wpdb->get_results( "SELECT * FROM $wp_maillist WHERE  list_id = $list_id");
			//$subscriber_id_o=$wpdb->get_results( "SELECT * FROM  $wp_mailsubs WHERE  id = $subscriber_id");
			//$da=(array)json_decode($list_id_o[0]->edit_form);
			//$ed=(array)json_decode($subscriber_id_o[0]->subscriber_data);
			//$da_keys=array_keys($da);
			//$ed_keys=array_values($ed);
			//remove placeholder  [email]
			//value_by_r=$subscriber_id_o[0]->email;
			//$value_to_r='[email]';
			//arrv=array($value_to_r=>$value_by_r);
			//$contentbody=strtr($contentbody,$arrv);
			//end placeholder [email]
			//foreach($da_keys as $key=>$values)
			//{
			//	$value_to_r='['.$values.']';
			//	$arrv=array($value_to_r=>$ed_keys[$key]);	
			//	$contentbody=strtr($contentbody,$arrv);
			//}
					
			$checkstr='<a href="'.$encrypt_url.'">';
	//		if (strpos($contentbody,$checkstr) !== false)
		//	{
				$link_msg = $contentbody.'<br><img src="'.$open_url.'" height="1" width="1">';
				$plainTextBody = $contentbody.'<br><img src="'.$open_url.'" height="1" width="1">';
		//	}
		//	else{
			//	$link_msg = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';
			//	$plainTextBody = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';	
		//	}	 
			
			$newurl = "#";
			$pattern = "/(?<=href=(\"|'))[^\"']+(?=(\"|'))/";
			$plainTextBody = preg_replace($pattern,$newurl,$plainTextBody);
		//	echo $plainTextBody;
			
			
			
			if(get_option('Secret')==''){
			$plainTextBody=$plainTextBody."<div style='text-align: center; margin-top: 25px;'><a href='http://getmailmasta.com'><img src='".plugins_url()."/mail-masta/lib/css/images/mailmasta-finalmail.png'></a></div>";
			}
					
			if($api_send_type == '2') {
			   $msg_body_header = '<html><body>';	
			   $msg_body_footer = '</body></html>';
			   $headers  = 'MIME-Version: 1.0' . "\r\n";
			   $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
			   $headers .= 'From: '. $campaing_data->from_email . "\r\n";
			   $send_subject = $campaing_data->subject;
			}
			if($api_send_type == 1) {
				//array_push($mail_array,$emails->email);
				 $ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);
				$m = new SimpleEmailServiceMessage();
				$m->addTo($_POST['test_mail']);
				$m->setFrom($campaing_data->from_email);
				$m->setSubject($campaing_data->subject);
				$m->setMessageFromString($plainTextBody,$link_msg); 
				$rt =  $ses->sendEmail($m);
				if(!empty($rt['MessageId'])){
				  $msg_id = $rt['MessageId']; 	
				}
				
				if(!empty($rt['RequestId'])){
				  $req_id = $rt['RequestId']; 	
				}
				exit();
			} else {
			
				$send_message = $msg_body_header.$plainTextBody.$msg_body_footer;
				mail($_POST['test_mail'], $send_subject, $send_message, $headers);
				exit();
			}
            ?>