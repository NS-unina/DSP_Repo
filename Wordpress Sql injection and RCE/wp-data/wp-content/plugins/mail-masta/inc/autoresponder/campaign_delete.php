<?php
	
	echo "test";
	die();
    $result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_responder WHERE responder_id = $responder_id"));
    header("Location:admin.php?page=masta-campaign");                       
?>
  
