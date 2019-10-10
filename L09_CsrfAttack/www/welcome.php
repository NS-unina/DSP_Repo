<?php
  // include('session.php');
	session_start();
	if(!isset($_SESSION['user'])){
		header("location: login.php"); 
	}
?>
<html">
   
   <head>
      <title>Welcome </title>
   </head>
   
   <body>
      <h1>Welcome <?php echo $login_session; ?></h1> 
      <h2><a href = "logout.php">Sign Out</a></h2>
      <h2><a href = "deleteaccount.php">Delete Account</a></h2>
   </body>
   
</html>
