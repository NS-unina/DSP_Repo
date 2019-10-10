<?php
$servername = "193.20.1.3";
$username = "root";
$password = "test";
$dbname = "csrf";

session_start();
if(isset($_SESSION['user'])){
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
    		die("Connection failed: " . $conn->connect_error);
	}

	$username = $_SESSION['user'];
	$sql = "DELETE FROM login WHERE username = '$username' ";

	if ($conn->query($sql) === TRUE) {
    		echo "Record deleted successfully";
	} else {
   		 echo "Error deleting record: " . $conn->error;
	}

	$conn->close();
	if(session_destroy()) {
	      header("Location: login.php");
   	}
	
}
else{
	header("Location: login.php");
}
?>


