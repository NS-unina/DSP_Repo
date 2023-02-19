<?php
	$masta_reoprt=$wpdb->prefix."masta_responder_reports";
    $result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_responder WHERE responder_id = $responder_id"));
    $delete_re = $wpdb->query($wpdb->prepare("DELETE FROM $masta_reoprt WHERE responder_id = $responder_id"));
    header("Location:admin.php?page=masta-autoresponder");                       
?>
  
