<?php

//require_once '../../../../wp-load.php'; ?>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">

</script>



<script type="text/javascript">

jQuery(document).ready(function () {

	  jQuery('#listing_form').submit(function(){

		  var list_id=17;

		  var email=jQuery("#email").val();

		  var fname=jQuery("#flabel").val();

          var lname=jQuery("#slabel").val();

		  var radio=jQuery("#tlabel").val(); 

    $.post("ajax_listing.php",{list_id:$list_id,email:$email,fname:$fname,lanme:$lname,radio:$radio},function(result){

    $("#display_msg").show();

  });

		   

		   return false;

	  });

});



</script>





<?php

function listing_form(){

	

   global $wpdb;

   $table_name = $wpdb->prefix . 'masta_list';

   $sql = 'SELECT * FROM '  .$table_name ." WHERE list_id = 17";

   $rows = $wpdb->get_results( $sql); 

    if ( $rows ) {

       foreach ( $rows as $row){

       $json=$row->list_form;

        $objjson=json_decode($json);

        //print_r($objjson);

	

        //echo $objjson->$objjson[0];

	   echo "<form action='' method='post' id='listing_form'>";

	   echo "Email";

	   echo "<input type='email' id='email'/>" ;

	   $counter=0;

	   foreach( $objjson as $key => $value )

	   {

	  // print_r($key);

	  $label = print_r($key, true);

	  $type =  print_r($value, true);

       //print_r($value);

       

	 

	   if($type=='text')

	   {

		echo $label;

	    echo "<input type='text' id='flabel'>";

	

	   }

	   if($type=='numeric')

	   {

		echo $label;

	    echo "<input type='numeric'  id='slabel'>";

	    

	   } 

	   if($type=='radio')

	   {

		echo $label;

	    echo "<input type='radio' id='tlabel'>";

	    

	   } 

	    }

	    echo "<input type='submit' name='submit' value='SUBMIT'/>";

	    echo "</form>";

	    echo "<div id='display_msg' style='display:none'>Inserted Successfully</div>";



       }

    }

   // print $output;

	

}  



?>

<?php listing_form(); ?>

