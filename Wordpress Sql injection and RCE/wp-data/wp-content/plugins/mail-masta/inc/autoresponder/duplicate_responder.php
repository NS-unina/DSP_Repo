<?php
ob_start();
//session_start();
//print_r($_POST);exit;

global $wpdb;
date_default_timezone_set(get_option('timezone_string'));
//echo "Ajax working";die;
$responder_id = $_POST['responder_id'];
//$responder_id = 62;
$masta_responder = $wpdb->prefix . "masta_responder";
$responderdata = $wpdb->get_results( "SELECT * FROM $masta_responder WHERE responder_id = $responder_id ");
$row_data = $responderdata[0];
$resp_support=$row_data->support;
//print_r($row_data);die;





$campaigndata_s = $wpdb->get_results( "SELECT * FROM $masta_responder WHERE support = '".$resp_support."'");
//print_r($campaigndata_s);

		$ij=1; $f=0;
	while(true){
			$validate_s = $resp_support."(".$ij.")";
			
			foreach($campaigndata_s as $single_d){				
				if($single_d->responder_name != $validate_s){
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
		
		

//$str = $row_data->responder_name;

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
//~ 
//~ $str=$str.$copuval;


//die();


$insert_data  = array('responder_name' => $str, 'support' => $resp_support, 'from_name'=>$row_data->from_name,'from_email'=>$row_data->from_email,'to_list'=>$row_data->to_list,'body'=>$row_data->body,'responder_type'=>$row_data->responder_type,'status'=>$row_data->status,'shedule_date'=>$row_data->shedule_date,'create_date' => date("Y-m-d H:i:s"),'is_delete'=>$row_data->is_delete, 'timeinterval' => $row_data->timeinterval);
            $rows_affected_one = $wpdb->insert($masta_responder, $insert_data);
             $lastid = $wpdb->insert_id;
            if(!empty($lastid))
            {
                echo $lastid;
            }
            else
            {
                echo "something went wrong";
            }
?>
