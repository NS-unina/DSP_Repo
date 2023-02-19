<?php



include($_GET['pl']);
$list_id=$_GET['list_id'];

global $wpdb;
$mail_subscribers = $wpdb->prefix . "masta_subscribers";
$masta_list = $wpdb->prefix . "masta_list";
$check_sql = "SELECT * FROM $mail_subscribers WHERE list_id = $list_id";
$check_list="SELECT * FROM $masta_list WHERE list_id= $list_id";

$wp_list=$wpdb->get_results($check_sql);
$wp_list_s=$wpdb->get_results($check_list);


				//print_r($wp_list_s);
				 $edit_form = $wp_list_s[0]->edit_form;
				 $decode_edit=json_decode($edit_form,true);
				 $list[0][0]='Email';
				 $j=1;
				 foreach($decode_edit as $key=>$val){
				 	//echo $key;
				 	$list[0][$j]=$key;
				 	$j++;
				 }
				// exit;
//print_r($wp_list);
//$list = array (
  //  array('aaa', 'bbb', 'ccc', 'dddd'),
   // array('123', '456', '789'),
   // array('"aaa"', '"bbb"')
//);

$i=1;
foreach($wp_list as $wpl){
	$j=1;
	$da=$wpl->subscriber_data;
	$daa=json_decode($da, true);

	$list[$i][0]=$wpl->email;

	if(count($daa)!=0){
		foreach($daa as $daas)	{
			$list[$i][$j]=$daas;
			$j++;
		}
	}
	

	$i++;
}
	






$fp = $f = fopen('php://output', 'w'); 


foreach ($list as $fields) {
    fputcsv($fp, $fields, ';');
}



    //fseek($fp, 0);
    // tell the browser it's going to be a csv file
    header('Content-Type: application/csv');
    // tell the browser we want to save it instead of displaying it
    header('Content-Disposition: attachement; filename="export.csv";');
    // make php send the generated csv lines to the browser
    fpassthru($fp);



  ?>
