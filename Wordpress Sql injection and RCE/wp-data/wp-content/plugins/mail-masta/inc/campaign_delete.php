<?php
	$masta_reoprt=$wpdb->prefix."masta_reports";
    $result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_campaign WHERE camp_id = $camp_id"));
    $delete_campion=$wpdb->query($wpdb->prepare("DELETE FROM $masta_reoprt WHERE camp_id = $camp_id"));
    header("Location:admin.php?page=masta-campaign");                       
?>
  
