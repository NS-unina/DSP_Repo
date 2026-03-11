<?php 
require 'db.inc.php';

function print_developer($row)
{
	$stringa = '<h3>';

	$stringa.=$row['name'];
	$stringa .= ', ';
	$stringa.=$row['email'];
	$stringa .= ',';
	$stringa .='<br>';
	$stringa .='</h3>';
	return $stringa;
}
$developer= '';
$show_bar=TRUE;




$db = mysqli_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD) or
die ('Unable to connect. Check your connection parameters.');
 mysqli_select_db($db, MYSQL_DB) or die(mysqli_error($db));

 
 if(isset($_GET['developer']) && !empty($_GET['developer']))
 {
$developer = $_GET['developer']; 
$show_bar=FALSE; 
 // Fai la ricerca
 $sql = 'SELECT DISTINCT 
        id,name,email
    FROM
        usernames
   WHERE id='.$developer; 
      
 		
 		
 		/*
 		  MATCH (name,email,company) AGAINST ("' .
      //  mysqli_real_escape_string($db, $developer) .
 		$developer .
         
         '"IN BOOLEAN MODE
    	)';
 		*/
 
         $result = mysqli_query($db, $sql) or die(mysqli_error($db));
 		 if(mysqli_num_rows($result) != 0)
 		 {
 		 	$developer='';
 		 	while ($row = mysqli_fetch_array($result)) {
 		 	
 		 		$developer .=print_developer($row); 
 		 	}
 		 }
 			else 
 			{	
 				
 				$show_bar=TRUE; 
 				$developer="<b>Sorry ". $_GET['developer']. ' not found</b>'; 
 			}
 }
 
?>


<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bootstrap Starter Template</title>
<!-- Fogli di stile -->
<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">


<body>
<div class="container">


<nav class="navbar navbar-default" role="navigation">

<!--  Logo e pulsante per barra ridimensionata -->
<div class="navbar-header">
<button type="button" class="navbar-toggle" data-toggle="collapse"
		data-target=".navbar-ex1-collapse">
		<span class="sr-only">Espandi barra di navigazione</span> <span
		class="icon-bar"></span> <span class="icon-bar"></span> <span
		class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="index.php">Logo</a>
		</div>

		<!-- Elementi barra -->
		<div class="collapse navbar-collapse navbar-ex1-collapse">
		<ul class="nav navbar-nav">
		<li class="active"><a href="#">Main</a></li>
		<li><a href="#">News</a></li>
		<li><a href="#">Contatti</a></li>
		</ul>
		</div>

		</nav>


		<div>
		<h1>Topolinux WebMasters !</h1>
		</div>


		 
		
		 
	 
<?php if($show_bar)?>
		<!--  Se non hai cercato ancora -->
		<div class="row">
		<div class="col-lg-6">
		<div class="input-group">
		<form action="." method="get">
		<input type="text" name="developer" class="form-control"
				placeholder="Search for a developer..."/> <span
				class="input-group-btn">
				<input class="btn btn-default" type="submit" value="Go!" />
				</span>
				
				
		</form>
				</div>
				<!-- /input-group -->
				</div>
				<!-- /.col-lg-6 -->
				</div>
				<!-- /.row -->
	

				</div>

	<?php 
		 echo $developer; 
		?>
		

		 
  	
  	
  	
  	
  	
   
				<!-- jQuery e plugin JavaScript  -->
				<script src="http://code.jquery.com/jquery.js"></script>
				<script src="js/bootstrap.min.js"></script>
				</body>
				</html>
