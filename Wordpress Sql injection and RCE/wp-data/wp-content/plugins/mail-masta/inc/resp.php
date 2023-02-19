<?php  

/*$ch = curl_init("http://getmailmasta.com/");
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);       
        curl_close($ch);
        echo $output;*/
		
		
		
		 ?>
		 <?php
		 
		 
  // create curl resource 
        $ch = curl_init(); 
			
        // set url 
        curl_setopt($ch, CURLOPT_URL,"http://getmailmasta.com/resp.php");
		
		curl_setopt($ch,CURLOPT_POST, 1);
		
		curl_setopt($ch,CURLOPT_POSTFIELDS, 'sec='.urlencode($_POST['sec'])); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        echo $output;

        // close curl resource to free up system resources 
        curl_close($ch);    
?>