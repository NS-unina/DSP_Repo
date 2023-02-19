<?php
ob_start();
//session_start();
//print_r($_POST);exit;

global $wpdb;
date_default_timezone_set(get_option('timezone_string'));
//echo "Ajax working";die;
$campaign_id = $_POST['camp_id'];

$masta_campaign = $wpdb->prefix . "masta_campaign";
$campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $campaign_id ");
$row_data = $campaigndata[0];
$camp_type = $row_data->campaign_type;
$camp_support=$row_data->support;

if($camp_type == 1){
 	
	$schedule = date("Y-m-d H:i:s");
	
} else {
	$schedule = $row_data->shedule_date;
}
//print_r($row_data);die;



$campaigndata_s = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE support = '".$camp_support."'");
//print_r($campaigndata_s);

		$ij=1; $f=0;
	while(true){
			$validate_s = $camp_support."(".$ij.")";
			
			foreach($campaigndata_s as $single_d){				
				if($single_d->campaign_name != $validate_s){
						continue; 
				}	
				else{
						$f=1;
					}
			}
			
			if($f==0){
					$str=$validate_s;
					break;
			}
			else{
				$f=0;	
			}
			
			unset($single_d);
			$ij++;
		}
		
		//echo $str;

//~ $str = $row_data->campaign_name;
//~ preg_match_all('!\d+!', $str, $matches);
//~ //echo $matches[0][0];
//~ $lastvalue=end($matches[0]);
//~ 
//~ 
//~ if(is_numeric(substr($str, -1, 1))){
		//~ 
		//~ $copuval=(int)$lastvalue+1;
		//~ $lasc=strlen($lastvalue);
		//~ $lasc=-$lasc;
		//~ $str=substr($str,0,$lasc);
		//~ //echo $str;
	//~ }
//~ else{
		//~ $copuval=" copy "."1";
	//~ }

//$str=$str.$copuval;
//echo $str;

//die();








$insert_data  = array('campaign_name' => $str, 'support' => $camp_support, 'from_name'=>$row_data->from_name,'from_email'=>$row_data->from_email,'to_list'=>$row_data->to_list,'body'=>$row_data->body,'status'=>'3','create_date' => date("Y-m-d H:i:s"),'is_delete'=>$row_data->is_delete);
            $rows_affected_one = $wpdb->insert($masta_campaign, $insert_data);
             $lastid = $wpdb->insert_id;
            if(!empty($lastid))
            {
                echo $lastid;
            }
            else
            {
                echo "error";
            }
?>
