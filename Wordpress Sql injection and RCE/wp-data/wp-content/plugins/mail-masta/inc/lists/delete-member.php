<?php
/*delete data*/
global $wpdb;
$masta_subscribers = $wpdb->prefix . "masta_subscribers";
$masta_support = $wpdb->prefix . "masta_support";
  $list_id = $_GET["filter_list"];
  $member_id = $_GET["member_id"];
//echo $list_id;exit;
$result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_subscribers WHERE id = $member_id limit 1",$query));
$result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_support WHERE subscriber_id = $member_id limit 1",$query));

header("Location:admin.php?page=masta-lists&action=view_list&filter_list= $list_id");                        
?>
  
