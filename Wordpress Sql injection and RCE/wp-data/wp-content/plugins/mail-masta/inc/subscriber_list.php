<?php
ob_start();
session_start();
//print_r($_POST);exit;
global $wpdb;
date_default_timezone_set(get_option('timezone_string'));
function encrypt2($data)
    {
		$key = 'mailmasta';
        $salt        = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';
        $key         = substr(hash('sha256', $salt.$key.$salt), 0, 32);
        $iv_size     = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv          = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        $encrypted   = base64_encode(mcrypt_mmasta_encrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_ECB, $iv));
        return $encrypted;
    }
    /*First step start*/
    
    $masta_list = $wpdb->prefix . "masta_list";
    $mail_subscribers = $wpdb->prefix . "masta_subscribers";
    $rq_ip = $_SERVER['REMOTE_ADDR'];
    $country = getLocationInfoByIp();
	$list_id = $_POST['list_id'];
    $email =  $_POST['subscriber_email'];
    $check_sql = "SELECT * FROM $mail_subscribers WHERE list_id = $list_id and email = '$email'";
  
    $check_available = $wpdb->get_results($check_sql);
	if($_POST['update']=='yes'){
		$up=$_POST['member_list_id'];
		$check_sql2 = "SELECT * FROM $mail_subscribers WHERE id=$up";
		 $check_available2 = $wpdb->get_results($check_sql2);
		if($check_available2[0]->email!=$email){
			if(count($check_available) > 0){
				echo '2';exit;
			}
		}
		
	}
	
   	else if(count($check_available) > 0){
		
		if($check_available[0]->status==2){
				
			 		$rows_affected_one = $wpdb->update($mail_subscribers, array('status' => 1 ) , array('list_id' => $list_id, 'email' => $email ));		
				
					echo '1';exit;
		}
		else {
			
			echo '2';exit;
	
		}
	}
     
   
      
    $list_form_data = $wpdb->get_results("SELECT * FROM $masta_list WHERE list_id = $list_id ");
    if(count($list_form_data) > 0) {
		 
		$row = $list_form_data[0];
		
		$list_form = $row->list_form;
		 $form_field = array();		    
				    if(!empty($list_form) && $list_form != '[]' ){
						
						$docode_data = json_decode($list_form,true);
						if(is_array($docode_data)) {
							$cnt = 1;
						    foreach($docode_data as $key=>$val)://main foreach start here
						      if(!is_array($val)) {
								  
								  $label_name = $key;
								  $label_value = (!empty($_POST[mmasta_add_underscore($key)])) ? $_POST[mmasta_add_underscore($key)] : ''; 
								
								} else {
									
									$field_array = $val;
									$filed_type = array_shift( ( array_keys( $field_array ) ) );
									if($filed_type == 'radio') { //if type is radio then generate radio buttons.
										
										 $label_name = $key;
								         $temp_val =   (!empty($_POST[mmasta_add_underscore($key)])) ? $_POST[mmasta_add_underscore($key)] : '';
								         $label_value = array($filed_type=>$temp_val);  
									
									} elseif($filed_type == 'checkbox') { //if type is checkbox then generate chekboxes.
									    $label_name = $key;
								         $temp_val =   (!empty($_POST[mmasta_add_underscore($key)])) ? $_POST[mmasta_add_underscore($key)] : '';
								         $label_value = array($filed_type=>$temp_val);
										
									}
									
								}
								
								$form_field[$label_name] = $label_value; 
						     $cnt++;
						    endforeach;//main foreach end here
						}
					}
		 
	}	             
    
   // print_r($form_field);exit;
     $formfileld = json_encode($form_field);
       
       $sta=$_POST['rfrom']=='byadmin'?1:2;
	
		if($sta==2){
			
			if($list_form_data[0]->confirmation==1){
				$sta=2;
			}
			else if($list_form_data[0]->confirmation==0){
				$sta=1;
			}
			
		}
        
        $insert_data  = array('list_id' => $list_id,'fname'=>'','lname'=>'','email'=>$email,'subscriber_data'=>$formfileld,'sub_ip'=>$rq_ip,'sub_country'=>$country,'date_added' => date("Y-m-d H:i:s"), 'status' => $sta);
      
        if($_POST['update']!='yes'){
        	$rows_affected_one = $wpdb->insert($mail_subscribers, $insert_data);
        	$subscriber_id = $wpdb->insert_id;
			 $mail_responder = $wpdb->prefix . "masta_responder";
			  $mail_support = $wpdb->prefix . "masta_support";
        	$get_all_auto_n_camp=$wpdb->get_results("SELECT responder_id, timeinterval from ".$mail_responder." where to_list=$list_id and responder_type=2");
			$get_all_auto_n_imm=$wpdb->get_results("SELECT responder_id from ".$mail_responder." where to_list=$list_id and responder_type=1");
			
			
			
			
			
			if(count($get_all_auto_n_imm)!=0){
					foreach($get_all_auto_n_imm as $get_all_auto_n_imms){
						$masta_responder_reports=$wpdb->prefix.'masta_responder_reports';
						$insert_data=array('responder_id' => $get_all_auto_n_imms->responder_id, 
								'list_id'=>$list_id,
								'subscriber_id'=>$subscriber_id,
								'subscriber_email'=>$email,
								'status' => 1,
								'country_code' =>$country,
								'sent_date' =>  date("Y-m-d H:i:s"),
								
							
						);
						$wpdb->insert($masta_responder_reports, $insert_data);	
						      //$ch = curl_init(); 
							  //curl_setopt($ch, CURLOPT_URL, plugins_url().'/mail-masta/inc/autoresponder/campaign/imm_after_subs.php?camp_id='.$get_all_auto_n_imms->responder_id.'&test_mail='.$email.'&subscriber_id='.$subscriber_id.'&report_id='.$wpdb->insert_id); 
							  //curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
							  //$output = curl_exec($ch); curl_close($ch);
						
								$st_r='camp_id='.$get_all_auto_n_imms->responder_id.'&test_mail='.$email.'&subscriber_id='.$subscriber_id.'&report_id='.$wpdb->insert_id;
							$_st_r=explode('&', $st_r);
							foreach($_st_r as $s){
								
								$as=explode('=', $s);
								$m_st[$as[0]]=$as[1];
									
								
								}		
							
							include(dirname(__FILE__).'/autoresponder/campaign/imm_after_subs.php');	
					
					}
				}
        
			if(count($get_all_auto_n_camp)!=0){
				foreach($get_all_auto_n_camp as $get_all_auto_n_camps){
					$insert_data  = array('cor_id' => $get_all_auto_n_camps->responder_id,
						'list_id'=>$list_id,
						'subscriber_id'=>$subscriber_id,
						'subscriber_email'=>$email,
						'subscribtion_date' =>  date("Y-m-d H:i:s"),
						'interval' => $get_all_auto_n_camps->timeinterval,
						'subscriber_data'=>$formfileld,
						'sub_country' =>$country,
						'status' => 1
						);	
					
					$rows_affected_one = $wpdb->insert($mail_support, $insert_data);
	  
				}
        	}
			
			
			
			
        		
			  $insert_id = $wpdb->insert_id;
				
				
		        if(!empty($insert_id)) {
				  echo '1';exit; 
		     	} else {
				  echo '3';exit;	
				}
		}
		else{
			
			$rows_affected_one = $wpdb->update($mail_subscribers, $insert_data, array('id' => $_POST['member_list_id']));
			echo '6';exit;
		}
		
      
/*First step end*/
?>
