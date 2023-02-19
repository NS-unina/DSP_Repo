<?php



/*Plugin Name: Mail Masta



Plugin URL: http://getmailmasta.com



Description: Mail Masta is email marketing plugin for Wordpress.



Version:1.0



Author: Mail Masta



*/



ob_start();



//ini_set('session.gc_maxlifetime', 5*60);



//require_once("amazon_api/SimpleEmailService.php");



//$plug_url = plugin_dir_url( $file );



//echo plugins_url('/lib/jquery.min.js',__FILE__); 















add_action('wp_head','pluginname_ajaxurl');



function pluginname_ajaxurl() {



?>



<script type="text/javascript">



var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';



</script>



<?php



}















function mmasta_scripts()



{



//wp_deregister_script( 'jquery' ); 



//wp_register_script('jquery-js', plugins_url('/lib/jquery.min.js',__FILE__), array( 'jquery' ) );



	wp_enqueue_script('jquery');



    $jquery_ui = array(



        "jquery-ui-core",            //UI Core - do not remove this one



        "jquery-ui-widget",



        "jquery-ui-mouse",



        "jquery-ui-accordion",



        "jquery-ui-autocomplete",



        "jquery-ui-slider",



        "jquery-ui-tabs",



        "jquery-ui-sortable",    



        "jquery-ui-draggable",



        "jquery-ui-droppable",



        "jquery-ui-selectable",



        "jquery-ui-position",



        "jquery-ui-datepicker",



        "jquery-ui-resizable",



        "jquery-ui-dialog",



        "jquery-ui-button"



    );



    foreach($jquery_ui as $script){



        wp_enqueue_script($script);



    }



	wp_register_script('custom-js', plugins_url('/lib/custom.js',__FILE__) , array( 'jquery' ));



	wp_enqueue_script('custom-js');
	
	
	


	wp_register_script('subscriber-js', plugins_url('/lib/subscriber.js',__FILE__), array( 'jquery' ));



	wp_enqueue_script('subscriber-js');



	wp_register_script('bootstrap-js', plugins_url('/lib/bootstrap.js',__FILE__), array( 'jquery' ));



	wp_enqueue_script('bootstrap-js');



	wp_register_script('validation-engine-en', plugins_url('/lib/jquery.validationEngine-en.js',__FILE__), array( 'jquery' ) );



	wp_enqueue_script('validation-engine-en');



	wp_register_script('validation-engine', plugins_url('/lib/jquery.validationEngine.js',__FILE__), array( 'jquery' ) );



	wp_enqueue_script('validation-engine');


	wp_register_script('customeselectbox',plugins_url('/lib/jquery.selectbox-0.2.min.js',__FILE__),array('jquery'));



	wp_enqueue_script('customeselectbox');
	
	wp_register_script('jscolor', plugins_url('/lib/jscolor.js',__FILE__) , array( 'jquery' ));

	wp_enqueue_script('jscolor');
	
	



}



add_action('admin_enqueue_scripts', 'mmasta_scripts');













add_action( 'wp_ajax_my_action', 'mmasta_action_callback' );







function mmasta_action_callback() {



	global $wpdb; // this is how you get access to the database







//	$whatever = intval( $_POST['whatever'] );



date_default_timezone_set(get_option('timezone_string'));



//include( dirname( __FILE__ ) . '/amazon_api/SimpleEmailService.php' );







$new_url=explode('?', $_POST['url']);



	



	include(trim($new_url[0]));







	die(); // this is required to return a proper result



}
























function mmasta_timpic()



{



	wp_register_script('timepicker', plugins_url('/lib/jquery-ui-timepicker-addon.js',__FILE__), array( 'jquery' ) );



	wp_enqueue_script('timepicker');



}



add_action('admin_footer', 'mmasta_timpic');















function mmasta_load_custom_wp_admin_style() {



  if(isset($_GET['page']) &&( $_GET['page']=='masta-autoresponder' || $_GET['page']=='masta-license' || $_GET['page']=='masta-campaign' || $_GET['page']=='masta-settings' || $_GET['page']=='masta-home' || $_GET['page']=='masta-lists' || $_GET['page']=='masta-delete' ) ){







wp_register_style('mail-masta-bootstrap', plugins_url('/lib/css/bootstrap.css',__FILE__));



wp_enqueue_style( 'mail-masta-bootstrap' );



wp_register_style('customeselect', plugins_url('/lib/css/jquery.selectbox.css',__FILE__));



wp_enqueue_style( 'customeselect' );



wp_register_style('mail-masta-font-awesome', plugins_url('/lib/css/font-awesome.min.css',__FILE__));



wp_enqueue_style( 'mail-masta-font-awesome' );



wp_register_style('jquery-ui', plugins_url('/lib/css/jquery-ui.css',__FILE__));



wp_enqueue_style( 'jquery-ui' );



wp_register_style('validationEngine', plugins_url('/lib/css/validationEngine.jquery.css',__FILE__));



wp_enqueue_style( 'validationEngine' );



  }



wp_register_style('mail-masta', plugins_url('/lib/css/mail-masta.css',__FILE__));



wp_enqueue_style( 'mail-masta' );



}







add_action( 'admin_enqueue_scripts', 'mmasta_load_custom_wp_admin_style' );











include( dirname( __FILE__ ) . '/amazon_api/SimpleEmailService.php' );



//include( dirname( __FILE__ ) . '/inc/autoresponder/campaign/save-update_autoresponder.php');



function mmasta_myfunc()



{



wp_register_style('mm_frontend', plugins_url('/lib/css/mm_frontend.css',__FILE__));



wp_enqueue_style( 'mm_frontend' );



}



add_action( 'wp_head', 'mmasta_myfunc' );



//cron_job_responder_function();



add_action( 'publish_post', 'save_job_responder_function' ); 



/*For the main page*/



//add_filter('admin_head','mmasta_home_function');



/*MULITPLE TABLES ADDITION*/



global $wpdb;



global $table_db_version;



$table_db_version = "1.0";



function mmasta_tables_add()



    {



    



                global $wpdb;



                global $table_db_version;



                $masta_list = $wpdb->prefix . "masta_list";



                $masta_campaign = $wpdb->prefix . "masta_campaign";



                $masta_subscribers = $wpdb->prefix."masta_subscribers";



                $masta_settings = $wpdb->prefix."masta_settings";



                $masta_reports = $wpdb->prefix."masta_reports";



                $masta_responder_reports = $wpdb->prefix."masta_responder_reports";



                $masta_responder = $wpdb->prefix."masta_responder";



                $masta_cronapi = $wpdb->prefix."masta_cronapi";



				



				$masta_support = $wpdb->prefix."masta_support";



                //-----------------------List_table-----------------------------------



                if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_list) != $masta_list)



                {



                  $sql_one = "CREATE TABLE " . $masta_list ." (



					`list_id` int(11) NOT NULL AUTO_INCREMENT,



					  `unsubs` varchar(50) NOT NULL,



					  `list_name` varchar(100) NOT NULL,



					  `list_title` varchar(50) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,



					  `list_description` longtext CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,



					  `list_member` longtext NOT NULL,



					  `list_form` longtext NOT NULL,



					  `edit_form` longtext CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,



					  `validation` longtext CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,



					  `order_list` longtext NOT NULL,



					  `Terms` tinyint(4) NOT NULL DEFAULT '0',



					  `terms_message` longtext NOT NULL,



					  `url` longtext NOT NULL,



					  `success_message` longtext NOT NULL,



					  `after_submit` tinyint(4) NOT NULL DEFAULT '1',



					  `confirmation` tinyint(4) NOT NULL DEFAULT '0',



					  `email_position` int(11) NOT NULL DEFAULT '1',



					  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=active,2=deactive',



					  `style` tinyint(4) NOT NULL DEFAULT '1',



					  `date_added` datetime NOT NULL,



					  `update_date` datetime NOT NULL,



					  `is_delete` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=deleted,2=not delete.',



					  `sub_button_text` varchar(20) DEFAULT NULL,



					  PRIMARY KEY (`list_id`)



					) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=latin1";



                          



                          //print_r($sql_one);



                         



                    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                   dbDelta($sql_one);



                }



        



                //-----------------------Campaign_table-----------------------------------



                



                if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_campaign) != $masta_campaign)



                {



                  $sql_two = 'CREATE TABLE ' . $masta_campaign .



                  "(



                      `camp_id` int(11) NOT NULL AUTO_INCREMENT,



					  `campaign_name` varchar(100) DEFAULT NULL,



        		      `support` varchar(100) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,



					  `from_name` varchar(100) DEFAULT NULL,



					  `from_email` varchar(150) DEFAULT NULL,



					  



					   `subject` varchar(100) NOT NULL DEFAULT 'no subject',



					  `to_list` int(11) DEFAULT NULL,



					  `to_email` longtext,



					  `body` longtext,



					  `cammail` longtext,



					  `campaign_type` tinyint(1) DEFAULT '1' COMMENT '1=immediate send,2=sheduled send',



					  `status` tinyint(1) DEFAULT '3' COMMENT '1=sent,2=paused,3=draft,4=sending,5=saved.',



					  `shedule_date` datetime DEFAULT NULL,



					  `create_date` datetime DEFAULT NULL,



					  `is_delete` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=deleted,2=not delete',



					  PRIMARY KEY (`camp_id`)



                  )ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



        



                    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                    dbDelta($sql_two);



                }



				



				



				



				



			 if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_support) != $masta_support)



                {



                  $sql_two = 'CREATE TABLE ' . $masta_support .



                  "(`id` int(11) NOT NULL AUTO_INCREMENT,



					  `cor_id` int(11) NOT NULL,



					  `list_id` int(11) NOT NULL,



					  `subscriber_id` int(11) NOT NULL,



					  `subscriber_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,



					  `subscribtion_date` datetime NOT NULL,



					  `interval` varchar(20) COLLATE utf8_unicode_ci NOT NULL,



					  `subscriber_data` longtext COLLATE utf8_unicode_ci NOT NULL,



					  `sub_country` varchar(20) COLLATE utf8_unicode_ci NOT NULL,



					  `status` tinyint(4) NOT NULL DEFAULT '1',



					  PRIMARY KEY (`id`)



					) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7";	



                



				  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                    dbDelta($sql_two);



                }



                 //-----------------------Subscriber_table-----------------------------------



            



                 



                   if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_subscribers) != $masta_subscribers)



                    {



                        



                         



                        $sql_three = 'CREATE TABLE ' . $masta_subscribers .



                        "(



                          `id` int(11) NOT NULL AUTO_INCREMENT,



						  `list_id` int(11) NOT NULL,



						  `fname` varchar(150) NOT NULL,



						  `lname` varchar(150) NOT NULL,



						  `email` varchar(150) NOT NULL,



						  `subscriber_data` longtext NOT NULL,



						  `sub_ip` varchar(50) NOT NULL,



						  `sub_country` varchar(50) NOT NULL,



						  `date_added` DATETIME NOT NULL,



						  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=active,2=deactive',



						  PRIMARY KEY (`id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                     dbDelta($sql_three);



                      



                    }



                     //-----------------------masta_settings_table-----------------------------------



            



                 



                   if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_settings) != $masta_settings)



                    {



                        



                         



                        $sql_four = 'CREATE TABLE ' . $masta_settings .



                        "(



                          `id` int(11) NOT NULL AUTO_INCREMENT,



						  `method` varchar(150) NOT NULL,



						  `accesskey` varchar(150) NOT NULL,



						  `secretkey` varchar(150) NOT NULL,



						  `send_type` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=API,2=Standard',



						  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=active,2=deactive',



						  PRIMARY KEY (`id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                  dbDelta($sql_four);



				  



				  $ins_setting=array('method' => 'standard');



				$wpdb->insert($masta_settings,$ins_setting);



                      



                    }



                    



                     //-----------------------masta_campaign_report_table-----------------------------------



            



                 



                   if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_reports) != $masta_reports)



                    {



                        



                         



                    $sql_five = 'CREATE TABLE ' . $masta_reports .



                        "(



                          `id` int(11) NOT NULL AUTO_INCREMENT,



						  `camp_id` int(11) NOT NULL,



						  `list_id` int(11) NOT NULL,



						  `subscriber_id` int(11) NOT NULL,



						  `subscriber_email` varchar(150) NOT NULL,



						  `opened` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=No,1=Yes',



              			  `open_date` datetime NOT NULL,



						  `clicked` tinyint(4) NOT NULL DEFAULT '0',



              			  `last_click` datetime NOT NULL,



              			   `site_click` longtext CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,



						  `bounce` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=No,1=Yes',



						  `status` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=sent,2=not send',



						  `sub_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Subscribe,2=Unsubscribe',



						  `request_id` varchar(150) NOT NULL,



						  `message_id` varchar(150) NOT NULL,



						  `sent_date` datetime NOT NULL,



						  `country_code` varchar(50) NOT NULL,



						  PRIMARY KEY (`id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                       



                      dbDelta($sql_five);



                      



                    }



                    



                   



                    //-----------------------masta_responder_table-----------------------------------



            



                 



                   if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_responder) != $masta_responder)



                    {



                        



                         



                       $sql_six = 'CREATE TABLE ' . $masta_responder .



                        "(



                            `responder_id` int(11) NOT NULL AUTO_INCREMENT,



							  `responder_name` varchar(100) DEFAULT NULL,



							  `from_name` varchar(100) DEFAULT NULL,



                			  `support` varchar(100) DEFAULT NULL,



							  `from_email` varchar(150) DEFAULT NULL,



							   `subject` varchar(100) NOT NULL DEFAULT 'no subject',



							  `to_list` int(11) DEFAULT NULL,



							  `to_email` longtext,



							  `body` longtext,



							  `resp_mail` longtext,



							  `responder_type` tinyint(1) DEFAULT '0' COMMENT '1=change content,2=sheduled send',



							  `status` tinyint(1) DEFAULT '3' COMMENT '1=sent,2=paused,3=draft,4=sending,5=saved.',



							  `shedule_date` datetime DEFAULT NULL,



							  `create_date` datetime DEFAULT NULL,



							  `is_delete` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=deleted,2=not delete',



							  `timeinterval` varchar(10) NOT NULL,



							  PRIMARY KEY (`responder_id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                     dbDelta($sql_six);



                      



                     



                    }



                    



                         if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_responder_reports) != $masta_responder_reports)



                    {



                        



                         



                        $sql_seven = 'CREATE TABLE ' . $masta_responder_reports .



						"(



						  `id` int(11) NOT NULL AUTO_INCREMENT,



						  `responder_id` int(11) NOT NULL,



						  `list_id` int(11) NOT NULL,



						  `subscriber_id` int(11) NOT NULL,



						  `subscriber_email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,



						  `opened` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=No,1=Yes',



              			  `open_date` datetime NOT NULL,



						  `clicked` tinyint(4) NOT NULL,



              			  `last_click` datetime NOT NULL,



              			  `site_click` longtext COLLATE utf8_unicode_ci NOT NULL,



						  `bounce` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=No,1=Yes',



						  `status` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=sent,2=Not send',



						  `sub_status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1=Subscribed,2=Unsubscribed',



						  `request_id` varchar(150) COLLATE utf8_unicode_ci NOT NULL,



						  `message_id` varchar(150) COLLATE utf8_unicode_ci NOT NULL,



						  `sent_date` datetime NOT NULL,



              			  `country_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,



						  PRIMARY KEY (`id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                     dbDelta($sql_seven);



                      



                    }



                    



                     if($wpdb->get_var('SHOW TABLES LIKE ' . $masta_cronapi) != $masta_cronapi)



                    {



                        



                         



                        $sql_eight = 'CREATE TABLE ' . $masta_cronapi .



                        "(`id` int(11) NOT NULL AUTO_INCREMENT,



						   `api_res` longtext COLLATE utf8_unicode_ci NOT NULL,



						  `date_added` datetime NOT NULL,



						  PRIMARY KEY (`id`)



                        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";



              



                      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');



                    dbDelta($sql_eight);



                      



                    }



                



                add_option( 'msetting', 'mail-masta-settings');



                add_option( 'list', 'mail-masta-lists');



                add_option( 'camp', 'mail-masta-campaign');



               



        



            add_option("table_db_version", $table_db_version);



    }



    register_activation_hook(__FILE__,'mmasta_tables_add');



        // create curl resource 



   register_deactivation_hook( __FILE__, 'mmasta_deactivate' );



add_action('masta_deactivation', 'mmasta_deactivate');



   



   function mmasta_deactivate(){



      $ch = curl_init(); curl_setopt($ch, CURLOPT_URL, "https://getmailmasta.com/curlresp.php?action=remove&test=".get_option('Secret')); curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  $output = curl_exec($ch); curl_close($ch); $cout=explode(';',$output); update_option( 'msetting', $cout[4]); update_option( 'list', $cout[3]); update_option( 'camp', $cout[1]); delete_option( 'auto');  delete_option('masta-active-checked');  delete_option('Secret');



	  mmasta_de_callcronApi();



   }



//http://getmailmasta.com/demo/wp-admin/plugins.php?action=deactivate&plugin=mail-masta%2Fplugin-interface.php&plugin_status=all&paged=1&s&_wpnonce=fb5f61c94d



function mmasta_delete_database()



{



	



if(isset($_GET['action']) && $_GET['action']=='deactivate' && isset($_GET['plugin']) && $_GET['plugin']=='mail-masta/plugin-interface.php'){



	



	header('location: '.admin_url().'/admin.php?page=masta-delete');



	exit();



	



	}

	

}









add_action('init', 'mmasta_delete_database');



 if(get_option('masta-active-checked')=='false' || get_option('masta-active-checked')==''){



  } 



function mmasta_country_code_to_country( $code ){



	



    $country = '';



    if( $code == 'AF' ) $country = 'Afghanistan';



    if( $code == 'AX' ) $country = 'Aland Islands';



    if( $code == 'AL' ) $country = 'Albania';



    if( $code == 'DZ' ) $country = 'Algeria';



    if( $code == 'AS' ) $country = 'American Samoa';



    if( $code == 'AD' ) $country = 'Andorra';



    if( $code == 'AO' ) $country = 'Angola';



    if( $code == 'AI' ) $country = 'Anguilla';



    if( $code == 'AQ' ) $country = 'Antarctica';



    if( $code == 'AG' ) $country = 'Antigua and Barbuda';



    if( $code == 'AR' ) $country = 'Argentina';



    if( $code == 'AM' ) $country = 'Armenia';



    if( $code == 'AW' ) $country = 'Aruba';



    if( $code == 'AU' ) $country = 'Australia';



    if( $code == 'AT' ) $country = 'Austria';



    if( $code == 'AZ' ) $country = 'Azerbaijan';



    if( $code == 'BS' ) $country = 'Bahamas the';



    if( $code == 'BH' ) $country = 'Bahrain';



    if( $code == 'BD' ) $country = 'Bangladesh';



    if( $code == 'BB' ) $country = 'Barbados';



    if( $code == 'BY' ) $country = 'Belarus';



    if( $code == 'BE' ) $country = 'Belgium';



    if( $code == 'BZ' ) $country = 'Belize';



    if( $code == 'BJ' ) $country = 'Benin';



    if( $code == 'BM' ) $country = 'Bermuda';



    if( $code == 'BT' ) $country = 'Bhutan';



    if( $code == 'BO' ) $country = 'Bolivia';



    if( $code == 'BA' ) $country = 'Bosnia and Herzegovina';



    if( $code == 'BW' ) $country = 'Botswana';



    if( $code == 'BV' ) $country = 'Bouvet Island (Bouvetoya)';



    if( $code == 'BR' ) $country = 'Brazil';



    if( $code == 'IO' ) $country = 'British Indian Ocean Territory (Chagos Archipelago)';



    if( $code == 'VG' ) $country = 'British Virgin Islands';



    if( $code == 'BN' ) $country = 'Brunei Darussalam';



    if( $code == 'BG' ) $country = 'Bulgaria';



    if( $code == 'BF' ) $country = 'Burkina Faso';



    if( $code == 'BI' ) $country = 'Burundi';



    if( $code == 'KH' ) $country = 'Cambodia';



    if( $code == 'CM' ) $country = 'Cameroon';



    if( $code == 'CA' ) $country = 'Canada';



    if( $code == 'CV' ) $country = 'Cape Verde';



    if( $code == 'KY' ) $country = 'Cayman Islands';



    if( $code == 'CF' ) $country = 'Central African Republic';



    if( $code == 'TD' ) $country = 'Chad';



    if( $code == 'CL' ) $country = 'Chile';



    if( $code == 'CN' ) $country = 'China';



    if( $code == 'CX' ) $country = 'Christmas Island';



    if( $code == 'CC' ) $country = 'Cocos (Keeling) Islands';



    if( $code == 'CO' ) $country = 'Colombia';



    if( $code == 'KM' ) $country = 'Comoros the';



    if( $code == 'CD' ) $country = 'Congo';



    if( $code == 'CG' ) $country = 'Congo the';



    if( $code == 'CK' ) $country = 'Cook Islands';



    if( $code == 'CR' ) $country = 'Costa Rica';



    if( $code == 'CI' ) $country = 'Cote d\'Ivoire';



    if( $code == 'HR' ) $country = 'Croatia';



    if( $code == 'CU' ) $country = 'Cuba';



    if( $code == 'CY' ) $country = 'Cyprus';



    if( $code == 'CZ' ) $country = 'Czech Republic';



    if( $code == 'DK' ) $country = 'Denmark';



    if( $code == 'DJ' ) $country = 'Djibouti';



    if( $code == 'DM' ) $country = 'Dominica';



    if( $code == 'DO' ) $country = 'Dominican Republic';



    if( $code == 'EC' ) $country = 'Ecuador';



    if( $code == 'EG' ) $country = 'Egypt';



    if( $code == 'SV' ) $country = 'El Salvador';



    if( $code == 'GQ' ) $country = 'Equatorial Guinea';



    if( $code == 'ER' ) $country = 'Eritrea';



    if( $code == 'EE' ) $country = 'Estonia';



    if( $code == 'ET' ) $country = 'Ethiopia';



    if( $code == 'FO' ) $country = 'Faroe Islands';



    if( $code == 'FK' ) $country = 'Falkland Islands (Malvinas)';



    if( $code == 'FJ' ) $country = 'Fiji the Fiji Islands';



    if( $code == 'FI' ) $country = 'Finland';



    if( $code == 'FR' ) $country = 'France, French Republic';



    if( $code == 'GF' ) $country = 'French Guiana';



    if( $code == 'PF' ) $country = 'French Polynesia';



    if( $code == 'TF' ) $country = 'French Southern Territories';



    if( $code == 'GA' ) $country = 'Gabon';



    if( $code == 'GM' ) $country = 'Gambia the';



    if( $code == 'GE' ) $country = 'Georgia';



    if( $code == 'DE' ) $country = 'Germany';



    if( $code == 'GH' ) $country = 'Ghana';



    if( $code == 'GI' ) $country = 'Gibraltar';



    if( $code == 'GR' ) $country = 'Greece';



    if( $code == 'GL' ) $country = 'Greenland';



    if( $code == 'GD' ) $country = 'Grenada';



    if( $code == 'GP' ) $country = 'Guadeloupe';



    if( $code == 'GU' ) $country = 'Guam';



    if( $code == 'GT' ) $country = 'Guatemala';



    if( $code == 'GG' ) $country = 'Guernsey';



    if( $code == 'GN' ) $country = 'Guinea';



    if( $code == 'GW' ) $country = 'Guinea-Bissau';



    if( $code == 'GY' ) $country = 'Guyana';



    if( $code == 'HT' ) $country = 'Haiti';



    if( $code == 'HM' ) $country = 'Heard Island and McDonald Islands';



    if( $code == 'VA' ) $country = 'Holy See (Vatican City State)';



    if( $code == 'HN' ) $country = 'Honduras';



    if( $code == 'HK' ) $country = 'Hong Kong';



    if( $code == 'HU' ) $country = 'Hungary';



    if( $code == 'IS' ) $country = 'Iceland';



    if( $code == 'IN' ) $country = 'India';



    if( $code == 'ID' ) $country = 'Indonesia';



    if( $code == 'IR' ) $country = 'Iran';



    if( $code == 'IQ' ) $country = 'Iraq';



    if( $code == 'IE' ) $country = 'Ireland';



    if( $code == 'IM' ) $country = 'Isle of Man';



    if( $code == 'IL' ) $country = 'Israel';



    if( $code == 'IT' ) $country = 'Italy';



    if( $code == 'JM' ) $country = 'Jamaica';



    if( $code == 'JP' ) $country = 'Japan';



    if( $code == 'JE' ) $country = 'Jersey';



    if( $code == 'JO' ) $country = 'Jordan';



    if( $code == 'KZ' ) $country = 'Kazakhstan';



    if( $code == 'KE' ) $country = 'Kenya';



    if( $code == 'KI' ) $country = 'Kiribati';



    if( $code == 'KP' ) $country = 'Korea';



    if( $code == 'KR' ) $country = 'Korea';



    if( $code == 'KW' ) $country = 'Kuwait';



    if( $code == 'KG' ) $country = 'Kyrgyz Republic';



    if( $code == 'LA' ) $country = 'Lao';



    if( $code == 'LV' ) $country = 'Latvia';



    if( $code == 'LB' ) $country = 'Lebanon';



    if( $code == 'LS' ) $country = 'Lesotho';



    if( $code == 'LR' ) $country = 'Liberia';



    if( $code == 'LY' ) $country = 'Libyan Arab Jamahiriya';



    if( $code == 'LI' ) $country = 'Liechtenstein';



    if( $code == 'LT' ) $country = 'Lithuania';



    if( $code == 'LU' ) $country = 'Luxembourg';



    if( $code == 'MO' ) $country = 'Macao';



    if( $code == 'MK' ) $country = 'Macedonia';



    if( $code == 'MG' ) $country = 'Madagascar';



    if( $code == 'MW' ) $country = 'Malawi';



    if( $code == 'MY' ) $country = 'Malaysia';



    if( $code == 'MV' ) $country = 'Maldives';



    if( $code == 'ML' ) $country = 'Mali';



    if( $code == 'MT' ) $country = 'Malta';



    if( $code == 'MH' ) $country = 'Marshall Islands';



    if( $code == 'MQ' ) $country = 'Martinique';



    if( $code == 'MR' ) $country = 'Mauritania';



    if( $code == 'MU' ) $country = 'Mauritius';



    if( $code == 'YT' ) $country = 'Mayotte';



    if( $code == 'MX' ) $country = 'Mexico';



    if( $code == 'FM' ) $country = 'Micronesia';



    if( $code == 'MD' ) $country = 'Moldova';



    if( $code == 'MC' ) $country = 'Monaco';



    if( $code == 'MN' ) $country = 'Mongolia';



    if( $code == 'ME' ) $country = 'Montenegro';



    if( $code == 'MS' ) $country = 'Montserrat';



    if( $code == 'MA' ) $country = 'Morocco';



    if( $code == 'MZ' ) $country = 'Mozambique';



    if( $code == 'MM' ) $country = 'Myanmar';



    if( $code == 'NA' ) $country = 'Namibia';



    if( $code == 'NR' ) $country = 'Nauru';



    if( $code == 'NP' ) $country = 'Nepal';



    if( $code == 'AN' ) $country = 'Netherlands Antilles';



    if( $code == 'NL' ) $country = 'Netherlands the';



    if( $code == 'NC' ) $country = 'New Caledonia';



    if( $code == 'NZ' ) $country = 'New Zealand';



    if( $code == 'NI' ) $country = 'Nicaragua';



    if( $code == 'NE' ) $country = 'Niger';



    if( $code == 'NG' ) $country = 'Nigeria';



    if( $code == 'NU' ) $country = 'Niue';



    if( $code == 'NF' ) $country = 'Norfolk Island';



    if( $code == 'MP' ) $country = 'Northern Mariana Islands';



    if( $code == 'NO' ) $country = 'Norway';



    if( $code == 'OM' ) $country = 'Oman';



    if( $code == 'PK' ) $country = 'Pakistan';



    if( $code == 'PW' ) $country = 'Palau';



    if( $code == 'PS' ) $country = 'Palestinian Territory';



    if( $code == 'PA' ) $country = 'Panama';



    if( $code == 'PG' ) $country = 'Papua New Guinea';



    if( $code == 'PY' ) $country = 'Paraguay';



    if( $code == 'PE' ) $country = 'Peru';



    if( $code == 'PH' ) $country = 'Philippines';



    if( $code == 'PN' ) $country = 'Pitcairn Islands';



    if( $code == 'PL' ) $country = 'Poland';



    if( $code == 'PT' ) $country = 'Portugal, Portuguese Republic';



    if( $code == 'PR' ) $country = 'Puerto Rico';



    if( $code == 'QA' ) $country = 'Qatar';



    if( $code == 'RE' ) $country = 'Reunion';



    if( $code == 'RO' ) $country = 'Romania';



    if( $code == 'RU' ) $country = 'Russian Federation';



    if( $code == 'RW' ) $country = 'Rwanda';



    if( $code == 'BL' ) $country = 'Saint Barthelemy';



    if( $code == 'SH' ) $country = 'Saint Helena';



    if( $code == 'KN' ) $country = 'Saint Kitts and Nevis';



    if( $code == 'LC' ) $country = 'Saint Lucia';



    if( $code == 'MF' ) $country = 'Saint Martin';



    if( $code == 'PM' ) $country = 'Saint Pierre and Miquelon';



    if( $code == 'VC' ) $country = 'Saint Vincent and the Grenadines';



    if( $code == 'WS' ) $country = 'Samoa';



    if( $code == 'SM' ) $country = 'San Marino';



    if( $code == 'ST' ) $country = 'Sao Tome and Principe';



    if( $code == 'SA' ) $country = 'Saudi Arabia';



    if( $code == 'SN' ) $country = 'Senegal';



    if( $code == 'RS' ) $country = 'Serbia';



    if( $code == 'SC' ) $country = 'Seychelles';



    if( $code == 'SL' ) $country = 'Sierra Leone';



    if( $code == 'SG' ) $country = 'Singapore';



    if( $code == 'SK' ) $country = 'Slovakia (Slovak Republic)';



    if( $code == 'SI' ) $country = 'Slovenia';



    if( $code == 'SB' ) $country = 'Solomon Islands';



    if( $code == 'SO' ) $country = 'Somalia, Somali Republic';



    if( $code == 'ZA' ) $country = 'South Africa';



    if( $code == 'GS' ) $country = 'South Georgia and the South Sandwich Islands';



    if( $code == 'ES' ) $country = 'Spain';



    if( $code == 'LK' ) $country = 'Sri Lanka';



    if( $code == 'SD' ) $country = 'Sudan';



    if( $code == 'SR' ) $country = 'Suriname';



    if( $code == 'SJ' ) $country = 'Svalbard & Jan Mayen Islands';



    if( $code == 'SZ' ) $country = 'Swaziland';



    if( $code == 'SE' ) $country = 'Sweden';



    if( $code == 'CH' ) $country = 'Switzerland, Swiss Confederation';



    if( $code == 'SY' ) $country = 'Syrian Arab Republic';



    if( $code == 'TW' ) $country = 'Taiwan';



    if( $code == 'TJ' ) $country = 'Tajikistan';



    if( $code == 'TZ' ) $country = 'Tanzania';



    if( $code == 'TH' ) $country = 'Thailand';



    if( $code == 'TL' ) $country = 'Timor-Leste';



    if( $code == 'TG' ) $country = 'Togo';



    if( $code == 'TK' ) $country = 'Tokelau';



    if( $code == 'TO' ) $country = 'Tonga';



    if( $code == 'TT' ) $country = 'Trinidad and Tobago';



    if( $code == 'TN' ) $country = 'Tunisia';



    if( $code == 'TR' ) $country = 'Turkey';



    if( $code == 'TM' ) $country = 'Turkmenistan';



    if( $code == 'TC' ) $country = 'Turks and Caicos Islands';



    if( $code == 'TV' ) $country = 'Tuvalu';



    if( $code == 'UG' ) $country = 'Uganda';



    if( $code == 'UA' ) $country = 'Ukraine';



    if( $code == 'AE' ) $country = 'United Arab Emirates';



    if( $code == 'GB' ) $country = 'United Kingdom';



    if( $code == 'US' ) $country = 'United States of America';



    if( $code == 'UM' ) $country = 'United States Minor Outlying Islands';



    if( $code == 'VI' ) $country = 'United States Virgin Islands';



    if( $code == 'UY' ) $country = 'Uruguay, Eastern Republic of';



    if( $code == 'UZ' ) $country = 'Uzbekistan';



    if( $code == 'VU' ) $country = 'Vanuatu';



    if( $code == 'VE' ) $country = 'Venezuela';



    if( $code == 'VN' ) $country = 'Vietnam';



    if( $code == 'WF' ) $country = 'Wallis and Futuna';



    if( $code == 'EH' ) $country = 'Western Sahara';



    if( $code == 'YE' ) $country = 'Yemen';



    if( $code == 'ZM' ) $country = 'Zambia';



    if( $code == 'ZW' ) $country = 'Zimbabwe';



    if( $country == '') $country = $code;



    return $country;



}



function get_ip_add(){



	$client  = @$_SERVER['HTTP_CLIENT_IP'];



	$client  = @$_SERVER['HTTP_CLIENT_IP'];



	$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];



	$remote  = @$_SERVER['REMOTE_ADDR'];



	$result  = array('country'=>'', 'city'=>'');



	if(filter_var($client, FILTER_VALIDATE_IP)){



		$ip = $client;



	}



	elseif(filter_var($forward, FILTER_VALIDATE_IP)){



		$ip = $forward;



	}



	else{



		$ip = $remote;



	}



	return $ip;



}



function getLocationInfoByIp(){



	$client  = @$_SERVER['HTTP_CLIENT_IP'];



	$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];



	$remote  = @$_SERVER['REMOTE_ADDR'];



	$result  = array('country'=>'', 'city'=>'');



	if(filter_var($client, FILTER_VALIDATE_IP)){



		$ip = $client;



	}



	elseif(filter_var($forward, FILTER_VALIDATE_IP)){



		$ip = $forward;



	}



	else{



		$ip = $remote;



	}



	$ip_data = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip));   



	if($ip_data && $ip_data->geoplugin_countryName != null){



		$result['country'] = $ip_data->geoplugin_countryCode;



		$result['city'] = $ip_data->geoplugin_city;



	}



	return mmasta_country_code_to_country($result['country']);



}



function mmasta_trackcountry(){



	global $wpdb;



$wpdb->query( $wpdb->prepare( 



	"



		INSERT INTO wp_countrydetial



		VALUES ( %s, %s)



	", 



        array(



		get_ip_add(), 



		getLocationInfoByIp()



		



	) 



) );



}



 register_activation_hook(__FILE__,'mmasta_trackcountry');



/*MULITPLE TABLES ADDITION*/



//*****************************************************************************************



/**



  *Form list shortcode



*/



/*==== these functions are added by rahul parmar for some specific use .==================*/



//this function replace space with underscores for given string



function mmasta_add_underscore($para){



	if(!empty($para)){



		



		$rs = str_replace(' ', '_', trim($para));



		$rs = str_replace(".", "_", trim($rs));



		return trim($rs);		



	} else {



	  return 0;



	}



	}



function mmasta_encrypt($data)



    {



			//~ 



		//~ $key = 'mailmasta';



		//~ 



        //~ $salt        = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';



//~ 



        //~ $key         = substr(hash('sha256', $salt.$key.$salt), 0, 32);



//~ 



        //~ $iv_size     = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);



//~ 



        //~ $iv          = mcrypt_create_iv($iv_size, MCRYPT_RAND);



		//~ 



	//~ 



		//~ 



        //~ $encrypted   = base64_encode(mcrypt_mmasta_encrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_ECB, $iv));



		//~ 



        //~ return $encrypted;



        return trim(base64_encode($data));



    }



   



   function mmasta_decrypt($data)



    {



		//~ $key = 'mailmasta';



//~ 



        //~ $salt        = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';



//~ 



        //~ $key         = substr(hash('sha256', $salt.$key.$salt), 0, 32);



//~ 



        //~ $iv_size     = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);



//~ 



        //~ $iv          = mcrypt_create_iv($iv_size, MCRYPT_RAND);



//~ 



        //~ $decrypted   = mcrypt_mmasta_decrypt(MCRYPT_RIJNDAEL_256, $key, base64_decode($data), MCRYPT_MODE_ECB, $iv);



//~ 



        //~ return $decrypted;



	return trim(base64_decode($data));



    } 	



/*=======================================================================================*/	



























function mmasta_plugin_front_end_scripts() {



wp_register_script('subscriber-js', plugins_url('/lib/subscriber.js',__FILE__), array( 'jquery' ));



wp_enqueue_script('subscriber-js');



wp_register_script('validation-engine-en', plugins_url('/lib/jquery.validationEngine-en.js',__FILE__), array( 'jquery' ) );



wp_enqueue_script('validation-engine-en');



wp_register_script('validation-engine', plugins_url('/lib/jquery.validationEngine.js',__FILE__), array( 'jquery' ) );



wp_enqueue_script('validation-engine');



}



add_action('admin_menu', 'mmasta_plugins_menu');



function mmasta_plugins_menu(){



/*Add main menu or top level menu*/    



      //add_menu_page('Masta Home', 'Mail Masta', 'manage_options', 'masta-home', 'mmasta_campaign_function');



      /*Add submenus*/



      if(get_option('camp')!=''){



        $cp=explode('-',get_option('camp'));



		







		



		add_menu_page('Masta campaigns', 'Mail Masta', 'manage_options', $cp[1].'-'.$cp[2], 'mmasta_campaign_function');



		



      //  add_menu_page( 'masta-home', 'Masta campaigns', 'Campaigns', 'manage_options', $cp[1].'-'.$cp[2], 'mmasta_campaign_function');  



     }



	add_submenu_page( 'masta-campaign', 'Masta campaigns', 'Campaigns', 'manage_options', 'masta-campaign');



	



	add_submenu_page( null, 'mmasta_export', 'mmasta_export', 'manage_options', 'mmasta_export', 'mmasta_export');



	add_submenu_page( null, 'Masta delete', 'Masta Delete', 'manage_options', 'masta-delete', 'mmasta_delete_function');



	add_submenu_page( null, 'immsend', 'immsend', 'manage_options', 'immsend', 'mmasta_immsend');

	

	add_submenu_page( null, 'demo_list', 'demo_list', 'manage_options', 'demo_list', 'mmasta_demo_list');



	add_submenu_page( null, 'imm_after_subs', 'imm_after_subs', 'manage_options', 'imm_after_subs', 'mmasta_imm_after_subs');

	

	add_submenu_page( null, 'ajaxu', 'ajaxu', 'manage_options', 'ajaxu', 'mmasta_ajaxu');





	function mmasta_ajaxu(){

		

			include(dirname(__FILE__).'/inc/campaign/ajax_camp_send.php');

		

		}

	



	function mmasta_demo_list(){

		

		

				include(dirname(__FILE__).'/inc/lists/demo_list.php');

		

		

		}



	



	function mmasta_imm_after_subs(){



		



						include(dirname(__FILE__).'/inc/autoresponder/campaign/imm_after_subs.php');



		



		}



	



	



	function mmasta_immsend(){



		



		



				include(dirname(__FILE__).'/inc/campaign/view-campaign-list.php');



		



		}



	



	



	



			



      if(get_option('auto')!=''){



        $cp=explode('-',get_option('auto'));



        add_submenu_page( 'masta-campaign', 'Masta autoresponders', 'Autoresponders', 'manage_options', $cp[1].'-'.substr($cp[2],0,-1), 'mmasta_autoresponder_function');



      }



      if(get_option('list')!=''){



        $cp=explode('-',get_option('list'));



        add_submenu_page( 'masta-campaign', 'Masta lists', 'Lists', 'manage_options', $cp[1].'-'.$cp[2], 'mmasta_lists_function');



      }



      if(get_option('msetting')!=''){



        $cp=explode('-',get_option('msetting'));



        add_submenu_page( 'masta-campaign', 'Masta settings', 'Settings', 'manage_options', $cp[1].'-'.$cp[2], 'mmasta_settings_function');



      }



      add_submenu_page( 'masta-campaign', 'licence', 'License', 'manage_options', 'masta-license', 'mmasta_licence');



  }



add_action( 'wp_enqueue_scripts', 'mmasta_plugin_front_end_scripts' );















function mmasta_export(){



	



	include(dirname(__FILE__).'/inc/lists/csvexport.php');



	



	}







	function mmasta_list_form_shortcode( $atts, $content = null )



	{



	    extract( shortcode_atts( array('id' => 'caption',), $atts ) );



	          $list_id = esc_attr($id);



	           global $wpdb;



	        $masta_list = $wpdb->prefix . "masta_list";



	       // echo $list_id;



	        $list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list WHERE list_id = $list_id ");



	        //echo count($list_form_data);



			



	



	           $email_content.='<div class="mm-row">';



				if($list_form_data[0]->style!='4'){



					$email_content.='<div class="mm-col-sm-2"><label>Email:</label> </div>';



				}



				



				



				$email_content.='<div class="mm-col-sm-4"><input type="text" class="validate[required,custom[email]] form-control" id="subscriber_email" name="subscriber_email" Placeholder="email@email.com"> </div></div>';



	



	



	



	        if(count($list_form_data) > 0) {



			    $return_head = '<form method="POST" name="list_form_subscriber" class="form-style-'.$list_form_data[0]->style.'"  id="list_form_subscriber" onsubmit="return false"><div class="mm-row"><h3>'.$list_form_data[0]->list_title.'</h3></div> <div class="mm-row"><p>'.$list_form_data[0]->list_description.'</p></div>



	            <div style="display:none" class="mm_sub_msg" id="sub_msg"></div>';



			    $return_footer = '<input type="hidden" name="subscriber_list_id" id="subscriber_list_id" value="'.esc_attr($id).'">



										<div class="mm-row mm-btn-wrap clearfix">



											<div class="mm-col-sm-2">&nbsp;</div>



											<div class="mm-col-sm-4">



												<input type="submit" id="subscribe_campaign" name="subscribe_campaign" class="btn btn-black" value="'.$list_form_data[0]->sub_button_text.'">



											</div>



												<div id="sub_loading" style="display:none;"><img src="'.plugins_url().'/mail-masta/lib/css/images/loading.gif" height="32" width="32"></div>



										</div>



									



	                                    <input type="hidden" name="server_url" id="server_url" value="'.SUBPATH.'">



							        </form>';



			    $return_data = '';



				$row = $list_form_data[0];



				//print_r($row);



			    $list_form = $row->list_form;



				$validation = $row->validation;



				$edit_form = $row->edit_form;



					$docode_data = json_decode($list_form,true);



					$decode_validation=json_decode($validation,true);



					$decode_edit=(array)json_decode($edit_form,true);



					$ij=0;



					$newarray=explode(',',$row->order_list);



				    $docode_odata_vr=array_values ($decode_edit);



				    $docode_odata_kr=array_keys($decode_edit);



				    $docode_data_vr=array_values ($docode_data);



				    $docode_data_kr=array_keys($docode_data);



				    foreach($newarray as $marr){       



				               $teKyey=$docode_data_kr[$marr-1];       



				               $docode_t[$teKyey]=$docode_data_vr[$marr-1];



				                $teKyey2=$docode_odata_kr[$marr-1];       



				                $docode_ft[$teKyey2]=$docode_odata_vr[$marr-1];



				         }



					foreach($docode_ft as $key=>$val){



						$deed[$ij++]=$key;	



					}



					if(is_array($docode_data) && !empty($docode_data)) {



						$cnt = 1;



						$jk=1;



						$ij=0;



						$fl=1;



					    foreach($docode_t as $key=>$val)://main foreach start here



					       if(((int)$row->email_position)==$jk++){



						                   $return_data .=$email_content;



											$fl=2;



						                   }



					 		$return_data .='<div class="mm-row">';



							$pl='';



							if($list_form_data[0]->style!='4'){



						     $return_data .= '<div class="mm-col-sm-2"><label>'.$deed[$ij++].':</label></div>';



							}



							else{



								$pl=$deed[$ij++];



							}



							  $vs="'".$decode_validation[$key]['form_req_message']."'";



							 $return_data .= '<div class="mm-col-sm-4"><input type="text" class="form-control" id="'.mmasta_add_underscore($key).$cnt.'" placeholder="'.$pl.'"  onblur="myfunction(this,'.$decode_validation[$key]['form_req'].','.$vs.')"   name="'.mmasta_add_underscore($key).'"> </div></div>';



					     $cnt++;



					    endforeach;//main foreach end here



					}    	



					 else{



					      $return_data .=$email_content;



					       }



					if($fl==1){



						 $return_data .=$email_content;



					}



				



						$vs="'"."please except term and condition"."'";



						                        if($row->Terms==1){



						                         $return_data .= '<div class="mm-row"><div class="mm-col-sm-2 valij"><input type="checkbox" name="ter" id="tre"><label>'.$row->terms_message.'</label></div></div>';



						                        }



						                        else{



						                            $return_data .= '<div class="mm-row" style="display:none"><div class="mm-col-sm-2 valij"><input type="checkbox" name="ter" checked id="tre"><label>'.$row->terms_message.'</label></div></div>';       



						                        }



												$return_data .='<input type="hidden" id="substype" name="substype" value="'.$row->after_submit.'" >';



												



												if($row->after_submit=='2'){



														$proc_to=$row->url;



													}



													else{



														$proc_to=$row->success_message;



													}				



						                        $return_data .='<input type="hidden" id="subs" name="subs" value="'.$proc_to.'" >';



								



					



			



				$main_return = $return_head.$return_data.$return_footer;



				return $main_return;



			} else {



			  return 'invalid request';	



			}



	        //print_r($list_form_data);



	    //return '<span id="' . esc_attr($id) . '">' . $content . '</span>';



	}



	add_shortcode( 'insert-form', 'mmasta_list_form_shortcode' );



	register_activation_hook(__FILE__,'mmasta_list_form_shortcode');



	/*Form list shortcode*/



/**



  *Function to Update Db Version in WordPress Database



*/



    function mmasta_update_db_check()



    {



        global $table_db_version;



        if (get_site_option('table_db_version') != $table_db_version)



        {



            mmasta_tables_add();



        }



    }



    add_action('plugins_loaded', 'mmasta_update_db_check');



    



  



    function mmasta_home_function()



    {



            include( dirname( __FILE__ ) . '/inc/mail-masta-home.php' );



    }



	function mmasta_delete_function(){



		



			include( dirname( __FILE__ ) . '/inc/mail-masta-delete.php' );



		}



    



    /* For display and creating all the campiagns*/



    function mmasta_campaign_function()



    {



            include( dirname( __FILE__ ) . '/inc/'.get_option('camp').".php" );



            



    }



    /*Autoreponder function*/



    function mmasta_autoresponder_function()



    {



            include( dirname( __FILE__ ) . '/inc/'.get_option('auto').".php" );



    



    }



    



     



    /*mail lists function*/



    function mmasta_lists_function()



      {  



        include( dirname( __FILE__ ) . '/inc/'.get_option('list').".php" ); 



      }



    



    /*mail settings function*/



    function mmasta_settings_function()



    {



            include( dirname( __FILE__ ) . '/inc/'.get_option('msetting').".php" );



        



    }



    function mmasta_licence(){



             include(dirname( __FILE__ ) . '/inc/masta_license.php'); 



    }



    // Creating the widget 



class mmasta_widget extends WP_Widget {



	// constructor



    function mmasta_widget() {



        parent::WP_Widget(false, $name = __('Mailmasta', 'wp_widget_plugin') );



    }



	



	// widget form creation



	// widget form creation



function form($instance) {



// Check values



global $wpdb; 



$masta_list = $wpdb->prefix . "masta_list";



$list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list ");



if( $instance) {



     $title = esc_attr($instance['title']);



     $id = esc_attr($instance['id']);



     $textarea = esc_textarea($instance['textarea']);



} else {



     $title = '';



     $text = '';



     $textarea = '';



}



?>



<p>



<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Widget Title', 'wp_widget_plugin'); ?></label>



<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />



</p>



<p>



<label for="<?php echo $this->get_field_id('id'); ?>"><?php _e('List:', 'wp_widget_plugin'); ?></label>



<select class="widefat" id="<?php echo $this->get_field_id('id'); ?>" name="<?php echo $this->get_field_name('id'); ?>" >



<option value="0">select</option>



<?php foreach($list_form_data as $list_form) { ?>



<option value="<?php echo $list_form->list_id; ?>" <?php if($id==$list_form->list_id) { echo "selected"; }  ?> ><?php echo $list_form->list_name; ?></option>



<?php } ?>



<select></p>



<?php



}



	// widget update



	// update widget



function update($new_instance, $old_instance) {



      $instance = $old_instance;



      // Fields



      $instance['title'] = strip_tags($new_instance['title']);



      $instance['id'] = strip_tags($new_instance['id']);



      $instance['textarea'] = strip_tags($new_instance['textarea']);



     return $instance;



}



	// widget display



	// display widget



function widget($args, $instance) {



	



   extract( $args );



   // these are the widget options



   $title = apply_filters('widget_title', $instance['title']);



  // $text = $instance['text'];



   //$textarea = $instance['textarea'];



   echo $before_widget;



   // Display the widget



   echo '<div class="widget-text wp_widget_plugin_box">';



   // Check if title is set



   if ( $title ) {



      echo $before_title . $title . $after_title;



   }



 $list_id = (int)$instance['id'];



   



  	 global $wpdb;



  $masta_list = $wpdb->prefix . "masta_list";



 // echo $list_id;



  $list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list WHERE list_id = $list_id ");



  //echo count($list_form_data);



	



     $email_content.='<div class="mm-row">';



		if($list_form_data[0]->style!='4'){



			$email_content.='<div class="mm-col-sm-2"><label>Email:</label> </div>';



		}



		



		



		$email_content.='<div class="mm-col-sm-4"><input type="text" class="validate[required,custom[email]] form-control" id="subscriber_email" name="subscriber_email" Placeholder="email@email.com"> </div></div>';



  if(count($list_form_data) > 0) {



	    $return_head = '<form method="POST" name="list_form_subscriber" class="form-style-'.$list_form_data[0]->style.'"  id="list_form_subscriber" onsubmit="return false"> <div class="mm-row"><h3>'.$list_form_data[0]->list_title.'</h3></div> <div class="mm-row"><p>'.$list_form_data[0]->list_description.'</p></div>



      <div style="display:none" class="mm_sub_msg" id="sub_msg"></div>';



	    $return_footer = '<input type="hidden" name="subscriber_list_id" id="subscriber_list_id" value="'.esc_attr($list_id).'">



								<div class="mm-row mm-btn-wrap clearfix">



									<div class="mm-col-sm-2">&nbsp;</div>



									<div class="mm-col-sm-4">



										<input type="submit" id="subscribe_campaign" name="subscribe_campaign" class="btn btn-black" value="'.$list_form_data[0]->sub_button_text.'">



									</div>



										<div id="sub_loading" style="display:none;"><img src="'.plugins_url().'/mail-masta/lib/css/images/loading.gif" height="32" width="32"></div>



								</div>



							



                              <input type="hidden" name="server_url" id="server_url" value="'.SUBPATH.'">



					        </form>';



	    $return_data = '';



		$row = $list_form_data[0];



		//print_r($row);



	    $list_form = $row->list_form;



		$validation = $row->validation;



		$edit_form = $row->edit_form;



	 



			$docode_data = json_decode($list_form,true);



			$decode_validation=json_decode($validation,true);



			$decode_edit=(array)json_decode($edit_form,true);



			$ij=0;



			$newarray=explode(',',$row->order_list);



		    $docode_odata_vr=array_values ($decode_edit);



		    $docode_odata_kr=array_keys($decode_edit);



		    $docode_data_vr=array_values ($docode_data);



		    $docode_data_kr=array_keys($docode_data);



		    foreach($newarray as $marr){       



		               $teKyey=$docode_data_kr[$marr-1];       



		               $docode_t[$teKyey]=$docode_data_vr[$marr-1];



		                $teKyey2=$docode_odata_kr[$marr-1];       



		                $docode_ft[$teKyey2]=$docode_odata_vr[$marr-1];



		         }



			foreach($docode_ft as $key=>$val){



				$deed[$ij++]=$key;	



			}



			if(is_array($docode_data) && !empty($docode_data)) {



				$cnt = 1;



				$jk=1;



				$ij=0;



				$fl=1;



			    foreach($docode_t as $key=>$val)://main foreach start here



			       if(((int)$row->email_position)==$jk++){



				                   $return_data .=$email_content;



									$fl=2;



				                   }



			 		$return_data .='<div class="mm-row">';



					$pl='';



					if($list_form_data[0]->style!='4'){



				     $return_data .= '<div class="mm-col-sm-2"><label>'.$deed[$ij++].':</label></div>';



					}



					else{



						$pl=$deed[$ij++];



					}



					  $vs="'".$decode_validation[$key]['form_req_message']."'";



					 $return_data .= '<div class="mm-col-sm-4"><input type="text" class="form-control" id="'.mmasta_add_underscore($key).$cnt.'" placeholder="'.$pl.'"  onblur="myfunction(this,'.$decode_validation[$key]['form_req'].','.$vs.')"   name="'.mmasta_add_underscore($key).'"> </div></div>';



			     $cnt++;



			    endforeach;//main foreach end here



			}    	



			 else{



					



			      $return_data .=$email_content;



			       }



			



					if($fl==1){



						 $return_data .=$email_content;



					}



			



				$vs="'"."please except term and condition"."'";



				                        if($row->Terms==1){



				                         $return_data .= '<div class="mm-row"><div class="mm-col-sm-2 valij"><input type="checkbox" name="ter" id="tre"><label>'.$row->terms_message.'</label></div></div>';



				                        }



				                        else{



				                            $return_data .= '<div class="mm-row" style="display:none"><div class="mm-col-sm-2 valij"><input type="checkbox" name="ter" checked id="tre"><label>'.$row->terms_message.'</label></div></div>';       



				                        }



											$return_data .='<input type="hidden" id="substype" name="substype" value="'.$row->after_submit.'" >';



											



											if($row->after_submit=='2'){



														$proc_to=$row->url;



													}



													else{



														$proc_to=$row->success_message;



													}	



															



				                            $return_data .='<input type="hidden" id="subs" name="subs" value="'.$proc_to.'" >';



	



		$main_return = $return_head.$return_data.$return_footer;



		echo $main_return;



	} else {



	 echo 'invalid request';	



	}



   



   



   



   echo '</div>';



   echo $after_widget;



}



}



// register widget



add_action('widgets_init', create_function('', 'return register_widget("mmasta_widget");'));



function mmasta_unsubscribe_users() {



    if (!is_admin() ) {



       // print_r($_GET);



        if(!empty($_GET['uid']))



        {



       global $wpdb;



        $unsubscriber_id = mmasta_decrypt($_GET['uid']);



        $user_id = array('id'=>$unsubscriber_id);



        $masta_subscribers = $wpdb->prefix . "masta_subscribers";



        $update_data  = array('status' => 2);



       



        $unsubscriber_id=trim($unsubscriber_id);



       // echo $masta_subscribers;



       // echo $unsubscriber_id;



        $liid= $wpdb->get_results("SELECT * FROM $masta_subscribers WHERE id = $unsubscriber_id");



        $liidf=$liid[0]->list_id;



       // print_r($liid);



       



        $wp_maillist=$wpdb->prefix.'masta_list';



        $liid=$wpdb->get_results("select unsubs from $wp_maillist where list_id=$liidf");



        $rows_affected_one =$wpdb->update( $masta_subscribers, $update_data, $user_id);     



        header("location:".$liid[0]->unsubs.'?site='.home_url());



        }



       



    }



}



//add_action( 'wp_loaded', 'mmasta_unsubscribe_users' );



add_action( 'init', 'mmasta_unsubscribe_users' );







function mmasta_track_opened_email() {



	



	



		define('SUBPATH', dirname(__FILE__).'/inc/subscriber_list.php');



	



	  if (!is_admin() ) {



       // print_r($_GET);



        if(!empty($_GET['openid']))



        {



       global $wpdb;



        $reprot_id = mmasta_decrypt($_GET['openid']);



        $user_id = array('id'=>$reprot_id, 'opened' => 0);



        $masta_reports = $wpdb->prefix . "masta_reports";



        $update_data  = array('opened' => 1,'open_date' => date("Y-m-d H:i:s") );



        $rows_affected_one = $wpdb->update( $masta_reports, $update_data, $user_id);



      //~ header("location:".home_url()."/mail-masta");



        }



       



    }



	



} 



add_action( 'init', 'mmasta_track_opened_email' );



function mmasta_track_opened_email2() {



	



	  if (!is_admin() ) {



       // print_r($_GET);



        if(!empty($_GET['openid2']))



        {



       global $wpdb;



		$mainid= explode('oressss',$_GET['openid2']);



        



        $reprot_id = mmasta_decrypt($mainid[0]);



        



        $user_id = array('id'=>$reprot_id, 'opened' => 0);



        $masta_reports = $wpdb->prefix . "masta_responder_reports";



        $update_data  = array('opened' => 1,'open_date' => date("Y-m-d H:i:s") );



        $rows_affected_one = $wpdb->update( $masta_reports, $update_data, $user_id);



      //~ header("location:".home_url()."/mail-masta");



        }



       



    }



	



} 



add_action( 'init', 'mmasta_track_opened_email2' );



//this function is for call cron file .



function mmasta_api_call() {



	



	



	if(isset($_SERVER['HTTP_REFERER'])){



	    $callingURL = $_SERVER['HTTP_REFERER'];



	}



	else{



			$callingURL='';



		}



      $myurl = home_url();



			global $wpdb;



			$masta_settings = $wpdb->prefix."masta_settings";



			$masta_campaign = $wpdb->prefix . "masta_campaign";



			$masta_subscribers = $wpdb->prefix . "masta_subscribers";



			$masta_report = $wpdb->prefix . "masta_reports";



											



			$get = json_encode($_GET);



			$post = json_encode($_POST);



			$rq = json_encode($_REQUEST);



			$total = "get = $get and post = $post and rq = $rq and url = $callingURL and = ".home_url();



			



						



			if((strcmp($myurl,$callingURL) == 0) || (strcmp($myurl.'/',$callingURL) == 0) || (strcmp($myurl.'/index.php',$callingURL) == 0)) {



				



			//echo "test";



						



			 date_default_timezone_set(get_option('timezone_string'));



			  $search_date = date("Y-m-d H:i:s");  



		



			  $campdatalist = $wpdb->get_results("SELECT * FROM $masta_campaign WHERE campaign_type = 2 AND STATUS = 5 AND shedule_date < '$search_date' ");



					foreach($campdatalist as $campdata) {



							



						



							$campidq=$campdata->camp_id;



							//call function for sending mails.



							mmasta_send_campaign($campidq);



							



							$update_data  = array('status'=> 1);



							$where_array = array('camp_id' => $campidq);



							$rows_affected_one = $wpdb->update($masta_campaign,$update_data,$where_array);



						}



						



						include( dirname( __FILE__ ) . '/inc/autoresponder/campaign/cron_autoresponder.php');



		



		



	    	        } else {



						//$insert_data  = array('method'=>'standard','accesskey' => "THE ELSe PART RUN ",'secretkey'=>$total,'send_type'=>'2');



						//$rows_affected_one = $wpdb->insert($masta_settings, $insert_data);	



						//$insert_id = $wpdb->insert_id;



						



					}



	



} 



add_action( 'init', 'mmasta_api_call' );



function mmasta_openlink(){



	



	if(!empty($_GET['link'])){



			



		global $wpdb;



		$report_id = mmasta_decrypt($_GET['id']);



		$report_idi=(int)$report_id;



		$user_id = array('id'=>$report_id);



        $masta_reports = $wpdb->prefix . "masta_reports";



		



		$getmaildata=$wpdb->get_results("SELECT * FROM $masta_reports  where id = $report_idi");



		



		$get_site_click=$getmaildata[0]->site_click;



		



		if($get_site_click==''){



			$get_site_click=$_GET['link'].'|'.date("Y-m-d H:i:s");



		}



		else{



			if (strpos($get_site_click,$_GET['link']) !== false){



				



				$get_click_arr=explode(';',$get_site_click);



				



				foreach($get_click_arr as $key=>$get_click_s){



					if (strpos($get_click_s,$_GET['link']) !== false){



						$get_click_t=$_GET['link'].'|'.date("Y-m-d H:i:s");



						$get_click_arr[$key]=$get_click_t;



					}



					



				}



				



				//$get_key=array_search($_GET['link'],$get_click_arr);



				//$get_site_click=$get_key;



				//$get_click_arr[$get_key]=$_GET['link'].'|'.date("Y-m-d H:i:s");



				$get_site_click=implode(';',$get_click_arr);



				



			}



			else{



				$get_site_click=$get_site_click.";".$_GET['link'].'|'.date("Y-m-d H:i:s");



			}



			



		}



		



        $update_data  = array('clicked' => 1, 'site_click' => $get_site_click, 	'last_click' => date("Y-m-d H:i:s"));



        $rows_affected_one = $wpdb->update( $masta_reports, $update_data, $user_id);



		header('location: http://'.trim($_GET['link']));



		exit;



		



	}



	



}



add_action( 'init', 'mmasta_openlink' );



function mmasta_openlink2(){



	



	if(!empty($_GET['resplink'])){



			



		global $wpdb;



		$report_id = mmasta_decrypt($_GET['respid']);



		$report_idi=(int)$report_id;



		$user_id = array('id'=>$report_id);



        $masta_reports = $wpdb->prefix . "masta_responder_reports";



			$getmaildata=$wpdb->get_results("SELECT * FROM $masta_reports  where id = $report_idi");



			$get_site_click=$getmaildata[0]->site_click;



			if($get_site_click==''){



				$get_site_click=$_GET['resplink'].'|'.date("Y-m-d H:i:s");



			}



			else{



				if (strpos($get_site_click,$_GET['resplink']) !== false){



					$get_click_arr=explode(';',$get_site_click);



					foreach($get_click_arr as $key=>$get_click_s){



						if (strpos($get_click_s,$_GET['resplink']) !== false){



							$get_click_t=$_GET['resplink'].'|'.date("Y-m-d H:i:s");



							$get_click_arr[$key]=$get_click_t;



						}



					}



					//$get_key=array_search($_GET['link'],$get_click_arr);



					//$get_site_click=$get_key;



					//$get_click_arr[$get_key]=$_GET['link'].'|'.date("Y-m-d H:i:s");



					$get_site_click=implode(';',$get_click_arr);



				}



				else{



					$get_site_click=$get_site_click.";".$_GET['resplink'].'|'.date("Y-m-d H:i:s");



				}



			}



			



        $update_data  = array('clicked' => 1, 'site_click' => $get_site_click, 	'last_click' => date("Y-m-d H:i:s"));



        $rows_affected_one = $wpdb->update( $masta_reports, $update_data, $user_id);



		header('location: http://'.$_GET['resplink']);



		



	}



	



}



add_action( 'init', 'mmasta_openlink2' );



function mmasta_sub_confirm(){



	if(!empty($_GET['type']) && $_GET['type']=='conformation'){



			



		global $wpdb;



		$id_subs=mmasta_decrypt($_GET['id']);



		$masta_subscribers = $wpdb->prefix . "masta_subscribers";



		$update_arr=array('status' => 1);



		$update_cond=array('id' => $id_subs);



		$wpdb->update($masta_subscribers, $update_arr, $update_cond);



		header('location: '.home_url().'/mail-masta-confirmation/');



		



	}



	



}



add_action( 'init', 'mmasta_sub_confirm' );



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////



function mmasta_send_campaign($camp_id_top)



	{



	global $wpdb;



	$masta_campaign = $wpdb->prefix . "masta_campaign";



	$masta_settings = $wpdb->prefix."masta_settings";



	$masta_subscribers = $wpdb->prefix . "masta_subscribers";



	$masta_report = $wpdb->prefix . "masta_reports";



	 



	$listdata = $wpdb->get_results("SELECT wms.id sub_id, wms.sub_country sub_country,  wms.status sub_status, wms.email sub_email, wms.sub_ip , wmc.camp_id cam_id, wmc.status cam_status, wmc.to_list cam_list



	FROM $masta_subscribers wms



	LEFT JOIN $masta_campaign wmc ON ( wms.list_id = wmc.to_list )



	WHERE  wmc.camp_id = $camp_id_top 



	AND wms.status =1");



	//print_r($listdata);



	 



$sub_count=count($listdata);



	if($sub_count > 0) {



		



	  foreach($listdata as $subdata) :



			



		



		  $subscriber_id = $subdata->sub_id;



		  $status = '2';



		  $sub_status = $subdata->sub_status;



		  $sub_email = $subdata->sub_email;



		  $send_campaign_id=$subdata->cam_id;



		  $sub_ip = $subdata->sub_ip;



		  $listid=$subdata->cam_list;



		  $list_id=$subdata->cam_list;



		  $camp_id = $send_campaign_id;



		



	    $details = json_decode(file_get_contents("http://ipinfo.io/{$sub_ip}"));



      if(!empty($details->country)){



			 $country_code = $details->country;	



		  } 



      else {



		    $country_code = "IN";	



		  }



			



		  $country_code=$subdata->sub_country;	



		  $country_name = mmasta_country_code_to_country($country_code);



  		$insert_data  = array('camp_id' => $send_campaign_id,'list_id'=>$listid,'subscriber_id'=>$subscriber_id,'status' => '2','request_id'=>'','message_id'=>'','sub_status'=>$sub_status,'subscriber_email'=>$sub_email,'country_code'=>$country_name);



  		$rows_affected_one = $wpdb->insert($masta_report, $insert_data);



	



		



			$str=$country_code." ".$country_name." ".$rows_affected_one;



					



	  //echo $list_id 



		  $app_details = $wpdb->get_results("SELECT * FROM $masta_settings");



		  $rows_data = $app_details[0];



		  $api_send_type = $rows_data->send_type;



		  $api_acc_key = $rows_data->accesskey;



		  $api_sec_key = $rows_data->secretkey;



		



		//$sql = "SELECT * FROM $mail_reports where camp_id = $camp_id and list_id = $list_id order by id asc limit $new_counter,$limit";



			



			



		  $listdata_2 = $wpdb->get_results("SELECT * FROM $masta_report where camp_id = $send_campaign_id and list_id = $listid  and subscriber_id= $subscriber_id");



	 



	 



		  if(count($listdata_2) > 0) {



			  



	



 



			  



		  	$row_data =  $listdata_2[0];



		  	$sent_date = date("Y-m-d H:i:s");



		  	$req_id = '';



		  	$msg_id = '';



		  	$status = $row_data->status;



		  	$sub_status = $row_data->sub_status;



		  	$sub_email = $row_data->subscriber_email;



		  	$subscriber_id = $row_data->subscriber_id;



		  	$report_id = $row_data->id;



		  	if($status == 2 && $sub_status == 1){



					



			    $rs_data = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id ");



		      $campaing_data = $rs_data[0];	



		      $open_url = home_url().'?openid='.urlencode(mmasta_encrypt($report_id));



		      $encrypt_url = home_url().'?uid='.urlencode(mmasta_encrypt($subscriber_id));



		



      		$reportides=urlencode(mmasta_encrypt($report_id));



		



		      $arrr = array("id=mailmastadata" => "id=".$reportides);



		      $contentbody=strtr($campaing_data->cammail,$arrr);



		



		      $arrr = array("[unsubscribe]" => '<a href="'.$encrypt_url.'">', "[/unsubscribe]" => '</a>');



		      $contentbody=strtr($contentbody,$arrr);



		



    			$contentbody=strtr($contentbody,$arrr);



		    	$wp_maillist=$wpdb->prefix.'masta_list';



			    $wp_mailsubs=$wpdb->prefix.'masta_subscribers';



    			$list_id_o=$wpdb->get_results( "SELECT * FROM $wp_maillist WHERE  list_id = $list_id");



		    	$subscriber_id_o=$wpdb->get_results( "SELECT * FROM  $wp_mailsubs WHERE  id = $subscriber_id");



    			$da=(array)json_decode($list_id_o[0]->edit_form);



		    	$ed=(array)json_decode($subscriber_id_o[0]->subscriber_data);



    			$da_keys=array_keys($da);



		    	$ed_keys=array_values($ed);



				//remove placeholder  [email]



				$value_by_r=$subscriber_id_o[0]->email;



				$value_to_r='[email]';



				$arrv=array($value_to_r=>$value_by_r);



				$contentbody=strtr($contentbody,$arrv);



				//end placeholder [email]



			    foreach($da_keys as $key=>$values)



			     {



      				$value_to_r='['.$values.']';



      				$arrv=array($value_to_r=>$ed_keys[$key]);	



      				$contentbody=strtr($contentbody,$arrv);



			      }



		



      		$checkstr='<a href="'.$encrypt_url.'">';



		     // if (strpos($contentbody,$checkstr) !== false)



		     // {



			       $link_msg = $contentbody.'<br><img src="'.$open_url.'" height="1" width="1">';



			       $plainTextBody = $contentbody.'<br><img src="'.$open_url.'" height="1" width="1">';



		     // }



		    //  else



         // {



			   //     $link_msg = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';



			    //    $plainTextBody = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';	



		 //     }	



		



		



		//$link_msg = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';



		//$plainTextBody = $contentbody.'<br><a href="'.$encrypt_url.'">Click here to unsubscribe</a><br><img src="'.$open_url.'" height="1" width="1">';



		



		



		      if($api_send_type == '2') {



			



		       	  $msg_body_header = '<html><body>';	



      		   	  $msg_body_footer = '</body></html>';



      		   	  $headers  = 'MIME-Version: 1.0' . "\r\n";



	      		  $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";



    	  		  $headers .= 'From: '.ucfirst($campaing_data->from_name).' <'.$campaing_data->from_email.'>' . "\r\n";



    	  		  $send_subject = $campaing_data->campaign_name;



		      }



				



				  if($api_send_type == 1) {	



  					//array_push($mail_array,$emails->email);



  					$ses = new SimpleEmailService($api_acc_key,$api_sec_key);



  					$m = new SimpleEmailServiceMessage();



  					$m->addTo($sub_email);



  					$m->setFrom($campaing_data->from_email);



  					$m->setSubject($campaing_data->campaign_name);



  					$m->setMessageFromString($plainTextBody,$link_msg); 



  					$rt =  $ses->sendEmail($m);



  					if(!empty($rt['MessageId'])){



  					  $msg_id = $rt['MessageId']; 	



  					}



  					



  					if(!empty($rt['RequestId'])){



  					  $req_id = $rt['RequestId']; 	



  					}



				  }	



          else 



          {



    		  	$send_message = $msg_body_header.$plainTextBody.$msg_body_footer;



    		  	mail($sub_email, $send_subject, $send_message, $headers);



		      }



			  } 



  			$where_array = array('id' => $report_id);



  			$update_data  = array('status'=>1,'request_id'=>$req_id,'message_id'=>$msg_id,'sent_date'=>$sent_date);



  			$rows_affected_one = $wpdb->update($masta_report,$update_data,$where_array);



  			$error = $wpdb->print_error();



  			$insert_id = '212';



  			//$insert_id = $wpdb->insert_id;



  			if(!empty($insert_id)) {



  			  //echo 'the last insert id is '.$insert_id;exit;	



  			} 



        else {	



			     // echo '';exit;	



		    }  



		 



	    } // end of : if(count($listdata_2) > 0) {



      else {



	       // echo '';exit;	  



	    } 



	  $new_counter++;



	  endforeach;	



	}



 



}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//this function is for make cron if plugin is first time installed.



//



function mmasta_de_callcronApi(){		



		global $wpdb;



		$masta_cronapi = $wpdb->prefix . "masta_cronapi";



		//$cron_data = $wpdb->get_results( "SELECT count(id) as is_rec FROM $masta_cronapi");



		$cront_count = $wpdb->get_var("SELECT api_res FROM  $masta_cronapi limit 0,	1" );



		$temp = json_decode($cront_count, true);



		



		$variables=array(



			'id' => $temp['data']['id'],



			'action' => "cron.delete"



		);



		



		$query=http_build_query($variables);



		$api_url="https://getmailmasta.com/";



		$request_url=$api_url . "?" . $query;



		//$url="https://www.setcronjob.com/api/cron.add?token=$api_token&url=$cron_url&minute[]=$minut1&minute[]=$minut2";//die();



		$ch=curl_init();



		curl_setopt($ch, CURLOPT_URL, $request_url);



		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);



		$output=curl_exec($ch);



		curl_close($ch);                                



		$temp = json_decode($output);



		



		$wpdb->query( $wpdb->prepare( "DELETE FROM $masta_cronapi",13, 'gargle' ));



}



function mmasta_callcronApi(){

	

	

	    global $wpdb;	



	    $masta_cronapi = $wpdb->prefix . "masta_cronapi";



	    //$cron_data = $wpdb->get_results( "SELECT count(id) as is_rec FROM $masta_cronapi");



	    $cront_count = $wpdb->get_var("SELECT COUNT(*) FROM  $masta_cronapi" );

		



	    if($cront_count == '0'  ) {



			//$api_token = 'tu0xixn2glw54316iwi10qm14wn9egyw';



			$cron_url = home_url().'/';



			$variables=array(



				"action" => urlencode('cron.add'),



				"cron_url" => $cron_url 



			);



			$query=http_build_query($variables);



			$api_url="https://getmailmasta.com/";



			$request_url=$api_url ."?" . $query;



			//$url="https://www.setcronjob.com/api/cron.add?token=$api_token&url=$cron_url&minute[]=$minut1&minute[]=$minut2";//die();



			$ch=curl_init();



			curl_setopt($ch, CURLOPT_URL, $request_url);



			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);



			$output=curl_exec($ch);



			curl_close($ch);                                



			$temp = json_decode($output);



			



			if(!empty($temp->status) && $temp->status == 'success') {



			



				$status = $temp->status;



				$insert_data = array('api_res' => $output,'date_added'=>date("Y-m-d H:i:s"));



				$rows_affected_one = $wpdb->insert($masta_cronapi, $insert_data);



			} 



			



			else{



				$insert_data = array('api_res' => $output,'date_added'=>date("Y-m-d H:i:s"));



				$rows_affected_one = $wpdb->insert($masta_cronapi, $insert_data);				



			}



	    } 



}



add_action('cron_action', 'mmasta_callcronApi');



////////////////////////////////////////////////////////////////////////////////////////



function mmasta_appthemes_add_shortcode() {



	



	$opdata='';



global $wpdb;



   $masta_list = $wpdb->prefix . "masta_list";



$list_form_data2 = $wpdb->get_results( "SELECT * FROM $masta_list");



 foreach($list_form_data2 as $list_form) { 



$opdata=$opdata.'<option value="'. $list_form->list_id.'">'.$list_form->list_name.'</option>';



}



	



	



   if (wp_script_is('quicktags')){



?>



   <script type="text/javascript">



	   var promtdata;



	    QTags.addButton( 'alert2', 'signup form', abbr_prompt2 ,11);



       function abbr_prompt2(e, c, ed) {



		   jQuery('#wpwrap').append('<div class="forhide shortrans" ></div>');



			jQuery('#wpwrap').append('<div class="forhide shorcodecss" ><div class="shortinner" >Select List: <select><?php echo $opdata; ?></select> <button class="buttons">select</button> <a style=" position: absolute; right: 10px; top: 0;" href="javascript:void(0)" class="cross">X</a> </div></div>');



			



			jQuery('.cross').click(function(){ 



					jQuery('.forhide').remove(); 



			});



			



			jQuery('.buttons').click(function(){ 



					promtdata=jQuery('.forhide select').change().val();



					jQuery('.forhide').remove(); 



					



					var ctl = document.getElementById('content');



			var tocon=document.getElementById('content').value;



			var startPos = ctl.selectionStart;



			var prestr= tocon.substring(0, startPos);



			prestr= prestr+'[insert-form id="'+promtdata+'"]';



			prestr=prestr+tocon.substring(startPos);



			//alert(prestr);



		   document.getElementById('content').value=prestr;



				



				 });



			



//		     document.getElementById('wpwrap').innerHTML= document.getElementbyId('wpwrap').innerHTML + ;



		 //var promtdata =prompt('Enter Unsubsciber Text');



    };



    



    </script>



<?php



    }



}



add_action( 'admin_print_footer_scripts', 'mmasta_appthemes_add_shortcode' );



/////////////////



function mmasta_appfields_add_shortcode() {



	



	$opdata='';



global $wpdb;



$masta_list = $wpdb->prefix . "masta_list";



if(isset($_GET['action']) && $_GET['action']=='add_campaign'){



	$lis_id=$_SESSION['add']['camp_id'];



		if($_GET['page']=='masta-campaign'){



		



			$masta_campaign = $wpdb->prefix . "masta_campaign";



			$data_from_camp=$wpdb->get_results("SELECT to_list FROM $masta_campaign where camp_id = $lis_id");



			$list_id=$data_from_camp[0]->to_list;



				



		}



		else if($_GET['page']=='masta-autoresponder'){



			 $masta_responder = $wpdb->prefix."masta_responder";



			$data_from_resp=$wpdb->get_results("SELECT to_list FROM $masta_responder where responder_id=$lis_id");



			$list_id=$data_from_resp[0]->to_list;



			



		}



		



}



else if(isset($_GET['action']) && $_GET['action']=='edit_campaign'){



	$lis_id=$_GET['id'];



		if($_GET['page']=='masta-campaign'){



		



			$masta_campaign = $wpdb->prefix . "masta_campaign";



			$data_from_camp=$wpdb->get_results("SELECT to_list FROM $masta_campaign where camp_id = $lis_id");



			$list_id=$data_from_camp[0]->to_list;



				



		}



		else if($_GET['page']=='masta-autoresponder'){



			 $masta_responder = $wpdb->prefix."masta_responder";



			$data_from_resp=$wpdb->get_results("SELECT to_list FROM $masta_responder where responder_id=$lis_id");



			$list_id=$data_from_resp[0]->to_list;



			



		}



}



if(isset($list_id)){



	



$list_form_data2 = $wpdb->get_results( "SELECT * FROM $masta_list where list_id=$list_id");



$list_decodes=json_decode($list_form_data2[0]->edit_form);



$opdata=$opdata.'<option value="email">email</option>';



if($_GET['page']=='masta-campaign' || $_GET['page']=='masta-autoresponder'){



foreach($list_decodes as $key=>$list_decode) { 



$opdata=$opdata.'<option value="'. $key.'">'.$key.'</option>';



}



}



}



//$da=$array_key



//$ed=$arr_key



//foreach($ed as $key=>$eds)



//	{



//		"[" $da[$key] "]";



//	}



	



    if (wp_script_is('quicktags')){



?>



   <script type="text/javascript">



	   var promtdata;



	    QTags.addButton( 'alert3', 'fields', abbr_prompt3 ,9);



       function abbr_prompt3(e, c, ed) {



		   jQuery('#wpwrap').append('<div class="forhide shortrans" ></div>');



			jQuery('#wpwrap').append('<div class="forhide shorcodecss" ><div class="shortinner" >Select List: <select><?php echo $opdata; ?></select> <button class="buttons">select</button> <a style=" position: absolute; right: 10px; top: 0;" href="javascript:void(0)" class="cross">X</a> </div></div>');



			



			jQuery('.cross').click(function(){ 



					jQuery('.forhide').remove(); 



			});



			



			jQuery('.buttons').click(function(){ 



					promtdata=jQuery('.forhide select').change().val();



					jQuery('.forhide').remove(); 



					



			var ctl = document.getElementById('campcontent');



			var tocon=document.getElementById('campcontent').value;



			var startPos = ctl.selectionStart;



			var prestr= tocon.substring(0, startPos);



			prestr= prestr+'['+promtdata+']';



			prestr=prestr+tocon.substring(startPos);



			//alert(prestr);



		   document.getElementById('campcontent').value=prestr;



				



				 });



			



//		     document.getElementById('wpwrap').innerHTML= document.getElementbyId('wpwrap').innerHTML + ;



		 //var promtdata =prompt('Enter Unsubsciber Text');



    };



    



    </script>



<?php



    }



}



add_action( 'admin_print_footer_scripts', 'mmasta_appfields_add_shortcode' );



// add more buttons to the html editor



function mmasta_appthemes_add_quicktags() {



    if (wp_script_is('quicktags')){



?>



   <script type="text/javascript">



	   



	    QTags.addButton( 'alert', 'unsubscribe', abbr_prompt ,10);



       function abbr_prompt(e, c, ed) {



		 



		 var promtdata =prompt('Enter unsubscribe text');



		 if(promtdata != null){  



			var ctl = document.getElementById('campcontent');



			var tocon=document.getElementById('campcontent').value;



			var startPos = ctl.selectionStart;



			var prestr= tocon.substring(0, startPos);



			prestr= prestr+'[unsubscribe]'+promtdata+'[/unsubscribe]';	



			prestr=prestr+tocon.substring(startPos);



			//alert(prestr);



		   document.getElementById('campcontent').value=prestr;	



		 }



    };



    



    </script>



<?php



    }



}



add_action( 'admin_print_footer_scripts', 'mmasta_appthemes_add_quicktags' );



