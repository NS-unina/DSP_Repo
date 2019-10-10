<?php
$servername = "193.20.1.3";
$username = "root";
$password = "test";
$dbname = "csrf";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
session_start();
if(!isset($_SESSION['user'])){

   if($_SERVER["REQUEST_METHOD"] == "POST") { 
      // username and password sent from form 
      $myusername = $_POST['username'];
      $mypassword = $_POST['password'];
       $sql = "SELECT id  FROM login WHERE username = '$myusername' and password = '$mypassword'";
	$result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	$conn->close();
	if(isset($row)){
		
		$_SESSION['user'] = $myusername;
		$_SESSION['pass'] = $mypassword;
        	header("location: welcome.php");		
	}
	else {
         $error = "Your Login Name or Password is invalid";
      }

   }
 }
else{
	header("location: welcome.php");
}
?>
<html>
   
   <head>
      <title>Login Page</title>
      
      <style type = "text/css">
         body {
            font-family:Arial, Helvetica, sans-serif;
            font-size:14px;
         }
         label {
            font-weight:bold;
            width:100px;
            font-size:14px;
         }
         .box {
            border:#666666 solid 1px;
         }
      </style>
      
   </head>
   
   <body bgcolor = "#FFFFFF">
	
      <div align = "center">
         <div style = "width:300px; border: solid 1px #333333; " align = "left">
            <div style = "background-color:#333333; color:#FFFFFF; padding:3px;"><b>Login</b></div>
				
            <div style = "margin:30px">
               
               <form action = "" method = "post">
                  <label>UserName  :</label><input type = "text" name = "username" class = "box"/><br /><br />
                  <label>Password  :</label><input type = "password" name = "password" class = "box" /><br/><br />
                  <input type = "submit" value = " Submit "/><br />
               </form>
               
               <div style = "font-size:11px; color:#cc0000; margin-top:10px"><?php echo $error; ?></div>
					
            </div>
				
         </div>
			
      </div>

   </body>
</html>
