<?php 


include($_GET['pl']);




global $wpdb;



$camp_id=$_POST['camp_id'];

  $masta_reports = $wpdb->prefix . "masta_reports";



$count=$wpdb->get_results("SELECT count(*) co from  $masta_reports where camp_id=$camp_id and status=1");

echo $count[0]->co;



		?>