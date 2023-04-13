<?php
$cookie_name = "loggedin";
if (isset($_COOKIE[$cookie_name]))
{
	$cookie_value = $_COOKIE[$cookie_name];
	echo "Welcome to your personal area $cookie_value";
	echo '<br>';
	echo '<br>';
	echo '<a href="logout.php">Logout</a>';	
	echo '<br>';
	echo '<br>';
}

else
{
	echo"You are not logged in!";
}

?>
