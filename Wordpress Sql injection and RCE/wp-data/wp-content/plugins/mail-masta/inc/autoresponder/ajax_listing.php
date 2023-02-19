<?php
$list_id=$_REQUEST['list_id'];
$email=$_REQUEST['email'];
$fname=$_REQUEST['fname'];
$lname=$_REQUEST['lname'];
$radio=$_REQUEST['radio'];

$table_name = $wpdb->prefix . "masta_subscribers";
$wpdb->query("INSERT INTO $table_name (list_id, fname,lname,email,date_added,status) VALUES('$list_id','$fname','$lname','$radio')"); 



 ?>
