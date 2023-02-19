<?php if(isset($_POST['submit12'])) { 
$allowedExts = array("csv");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);

if (in_array($extension, $allowedExts)) {
  if ($_FILES["file"]["error"] > 0) {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
  } else {
   // echo "Upload: " . $_FILES["file"]["name"] . "<br>";
   // echo "Type: " . $_FILES["file"]["type"] . "<br>";
   // echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
   // echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
   
		if (file_exists("upload/" . $_FILES["file"]["name"])) {
		 echo $_FILES["file"]["name"] . " already exists. ";
		} else {
		  move_uploaded_file($_FILES["file"]["tmp_name"],
		  "upload/" . 'contacts.csv');
		  	
		
			$file = fopen("upload/contacts.csv","r");
			$textcon='';
			while(! feof($file))
			  {
			  $textcon= $textcon.fgets($file). "<br />";
			  }
			fclose($file);
			unlink("upload/contacts.csv"); 
		}
  
  
  }
} else {
  echo "Invalid file";
}
}
?>