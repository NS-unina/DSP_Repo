<?php
			$where_array = array('responder_id' => $responder_id);
			$update_data  = array('status'=>5);
			$rows_affected_one = $wpdb->update($masta_responder	,$update_data,$where_array);
			header("Location:admin.php?page=masta-autoresponder");                       
?>
  
