<?php
$cookie_name= "loggedin";
$servername = "mysql";
$username ="root";
$password="root";
$database="demo";

//$conn = mysqli_connect($servername, $username, $password, $database);
$conn = new PDO('mysql:host=mysql;dbname=demo;charset=utf8', 'root', 'root');

if(!$conn) 
	{
		die("Database connection failed".mysqli_connect_error());
	}
if (isset($_POST['login']))
	{
		$user = $_POST['username'];
		$pass = $_POST['password'];
		
		$phash = sha1(sha1($pass."salt")."salt");

		$query= $conn->query("SELECT * FROM Users WHERE username='$user' AND password='$pass';");
		$count = $query->rowCount();
		
		if($count== 1)
		{
			$cookie_value = $user;
			setcookie($cookie_name, $cookie_value, time() + (180), "/");
			header("Location:personal.php");
		}
		else
		{
			echo"Username or password is incorrect";
			return 0;
		}
	}
?>
