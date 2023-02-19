<?php
    $result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_campaign WHERE camp_id = $camp_id limit 1"));
    header("Location:admin.php?page=masta-campaign");                       
?>
  
