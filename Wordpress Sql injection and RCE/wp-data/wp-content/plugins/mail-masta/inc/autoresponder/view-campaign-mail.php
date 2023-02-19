<?php
ob_start();
session_start();

$to = $_POST['e'];
$data = $_POST['d'];
$sender = $_POST['s'];
$subject = "New work";
$mail_body = '<html>
<body bgcolor="#573A28" topmargin="25">
 ' . stripslashes($data) . ' 
</body>
</html>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers  .= "From:".$sender;
if(mail($to, $subject, $mail_body, $headers)){
 echo '1';    
} else {
 echo '0';
}
?>