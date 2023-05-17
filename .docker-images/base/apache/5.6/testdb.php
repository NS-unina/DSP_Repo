<?php
// Check connection
$link = mysql_connect('db', 'root', 'dsp');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';
mysql_close($link);
?>
