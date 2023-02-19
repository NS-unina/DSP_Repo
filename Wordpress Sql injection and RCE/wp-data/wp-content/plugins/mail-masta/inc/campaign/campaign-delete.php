<?php
     $masta_report = $wpdb->prefix . "masta_reports";
    $result = $wpdb->query($wpdb->prepare("DELETE FROM $masta_campaign WHERE camp_id = $camp_id limit 1"));
    $result1 = $wpdb->query($wpdb->prepare("DELETE FROM $masta_report WHERE camp_id = $camp_id "));
    header("Location:admin.php?page=masta-campaign");                       
?>
  
