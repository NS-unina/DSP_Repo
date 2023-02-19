<?php

$output_dir = "";





if(isset($_FILES["myfile"]))

{

	//Filter the file types , if you want.

	if ($_FILES["myfile"]["error"] > 0)

	{

	  echo "Error: " . $_FILES["file"]["error"] . "<br>";

	}

	else

	{

		//move the uploaded file to uploads folder;

    	move_uploaded_file($_FILES["myfile"]["tmp_name"],'contacts.csv');

    

   	 $file = fopen("contacts.csv","r");

			$textcon='';

			$i=0;

			while(!feof($file))

			  {

				  if($i==0){

					  $i=1;

					  fgets($file);

					  continue;

					  

					  }

			  $textcon= $textcon.fgets($file);

			  }

			fclose($file);

			echo $textcon;

			unlink("contacts.csv"); 	

			}



}

?>