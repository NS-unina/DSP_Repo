<?php

/*delete data*/



global $wpdb;

$masta_list = $wpdb->prefix . "masta_list";

$list_id = $_GET["id"];

//echo $list_id;exit;

$result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_list WHERE list_id = $list_id limit 1",$query));

$target_url = admin_url().'/admin.php?page=masta-lists';

//header("Location:".$target_url);                        

?>

  

