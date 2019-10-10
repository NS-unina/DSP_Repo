<?php
$servername = "193.20.1.3";
$username = "root";
$password = "test";
$dbname = "xss";
$message = $_POST['message'];

setcookie("username", "admin", time()+3600);
setcookie("password", "pippoXSS", time()+3600);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "INSERT INTO msg (message) VALUES ('$message')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
