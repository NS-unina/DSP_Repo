<?php



	if( isset($_POST['sub'])){

				global $wpdb;

				

				deactivate_plugins('mail-masta/plugin-interface.php');

				

				if($_POST['delete-database']=='yes'){

					

					 $masta_campaign=$wpdb->prefix.'masta_campaign';

					 $masta_cronapi=$wpdb->prefix.'masta_cronapi';

					 $masta_list=$wpdb->prefix.'masta_list';

					 $masta_reports=$wpdb->prefix.'masta_reports';

					 $masta_responder=$wpdb->prefix.'masta_responder';

					 $masta_responder_reports=$wpdb->prefix.'masta_responder_reports';

					 $masta_settings=$wpdb->prefix.'masta_settings';

					 $masta_subscribers=$wpdb->prefix.'masta_subscribers';

					 $masta_support=$wpdb->prefix.'masta_support';

					

					$sql="DROP TABLE  $masta_campaign, $masta_cronapi, $masta_list, $masta_reports, $masta_responder, $masta_responder_reports, $masta_settings, $masta_subscribers, $masta_support";

					$wpdb->query($sql);

				}



				header('location: '.admin_url().'/plugins.php');

				

			

		} 

 

 

 ?>



<div class="container">

	<h1>Uninstall Mail Masta Plugin</h1>

    <br><br>

    <form action='<?php echo admin_url() ?>/admin.php?page=masta-delete' method='post' >

        <input type='radio' name='delete-database' value='yes' id='delete-database'> &nbsp;  remove plugin and plugin database<br>   

        <input type='radio' name='delete-database' value='no' id='delete-database2'> &nbsp;  remove plugin but keep plugin database

        <br><br>

        <input type='submit' id='sub' name="sub" value='Uninstall' class='btn btn-success'>

    </form>

</div>

