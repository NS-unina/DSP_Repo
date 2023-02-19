<?php

 global $wpdb;
 $del_method = $_POST['d'];
 $access_key = $_POST['a'];
 $secret_key = $_POST['s'];
$send_type = 1;
	if(trim($del_method) == 'standard'){
		$send_type = 2;
	}
 $insert_data  = array('method'=>$del_method,'accesskey' => $access_key,'secretkey'=>$secret_key,'send_type'=>$send_type);
 $masta_settings = $wpdb->prefix."masta_settings";
 $app_details = $wpdb->get_results("SELECT * FROM $masta_settings");
//print_r($app_details);
$count = $wpdb->get_var("SELECT COUNT(*) FROM  $masta_settings" );
//echo  $count . 'Rows Found';die;
 if($count > 0)
 {
  foreach($app_details as $settings_data)
  {
   
   $id = $settings_data->id;
   if($send_type == '1') {
		$update_data  = array('method'=>$del_method,'accesskey' => $access_key,'secretkey'=>$secret_key,'send_type'=>$send_type);
		
   } else {
	   	$update_data  = array('method'=>$del_method,'send_type'=>$send_type);
		
   }	
   $lastid = array('id'=>$id);
	//echo $_SESSION['camp_id']; exit;
	$rows_affected_one = $wpdb->update( $masta_settings, $update_data, $lastid);
	   if($rows_affected_one)
	{
	 
	   echo "1";exit; 
	} else {
	   echo '1';exit;	
	}
	
  }
 }
 else
 {
 $rows_affected_one = $wpdb->insert($masta_settings, $insert_data);
 if($rows_affected_one)
 {
  
    echo "1";exit; 
 }

 }
 
?>
