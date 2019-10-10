 <?php
$servername = "193.20.1.3";
$username = "root";
$password = "test";
$dbname = "xss";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT message FROM msg";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "message: " . $row["message"]."<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?> 
