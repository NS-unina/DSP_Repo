<?php
defined( 'ABSPATH' ) OR exit;
if ( ! class_exists( 'wp_sap_settings' ) ) {
	class wp_sap_settings extends wp_sap {
	/**
	* Construct the plugin object
	**/
		public function __construct() {
		global $wpdb;
		$this->wpdb =& $wpdb;
		/**
		* register actions, hook into WP's admin_init action hook
		**/
		add_action( 'admin_init', array( &$this, 'admin_init' ) );
		add_action( 'admin_menu', array( &$this, 'add_menu' ) );
		add_action( 'wp_ajax_ajax_wpspsurvey', array( &$this, 'ajax_wpspsurvey' ) );
		add_action( 'wp_ajax_nopriv_ajax_wpspsurvey', array( &$this, 'ajax_wpspsurvey' ) );
		add_action( 'wp_ajax_ajax_survey_answer', array( &$this, 'ajax_survey_answer' ) );
		add_action( 'wp_ajax_nopriv_ajax_survey_answer', array( &$this, 'ajax_survey_answer' ) );
		}
		/**
		* include custom scripts and style to the admin page
		**/
		function enqueue_admin_custom_scripts_and_styles() {
			wp_enqueue_style( 'wp_sap_style', plugins_url( '/templates/assets/css/wp_sap_settings.css', __FILE__ ) );
			wp_enqueue_style( 'jquery_ui_style', plugins_url( '/templates/assets/css/jquery-ui.css', __FILE__ ) );
			wp_enqueue_style( 'wp_sap_colorpicker_style', plugins_url( '/templates/assets/css/colorpicker.css', __FILE__ ) );
			wp_enqueue_style( 'wp_sap_gradx_style', plugins_url( '/templates/assets/css/gradX.css', __FILE__ ) );
			wp_enqueue_script( 'jquery' );
			wp_enqueue_script( 'jquery-ui-core-wsap', plugins_url( '/templates/assets/js/jquery-ui.js', __FILE__ ),array('jquery'),'1.10.3' );
			wp_enqueue_script( 'jquery-effects-core', array( 'jquery' ) );
			wp_enqueue_script( 'jquery-effects-fade', array( 'jquery-effects-core' ) );
			wp_enqueue_script( 'wp_sap_admin_chart', plugins_url( '/templates/assets/js/Chart.js', __FILE__ ), array('wp_sap_admin'),'100018', false );
			wp_enqueue_script( "wp_sap_timepicker_script", plugins_url('/templates/assets/js/jquery.timepicker.js', __FILE__ ), array( 'jquery','jquery-ui-core-wsap' ) );
			wp_enqueue_script( "wp_sap_colorpicker_script", plugins_url('/templates/assets/js/colorpicker.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_script( "wp_sap_domdrag_script", plugins_url('/templates/assets/js/dom-drag.js', __FILE__ ), array( 'jquery' ) );
			wp_enqueue_script( "wp_sap_gradx_script", plugins_url('/templates/assets/js/gradX.js', __FILE__ ), array( 'jquery' ) );
			wp_register_script('wp_sap_admin', plugins_url( '/templates/assets/js/wp_sap_admin.js', __FILE__ ) , array( 'jquery', 'jquery-ui-core', 'jquery-effects-core', 'jquery-ui-datepicker', 'wp_sap_timepicker_script' ), '100018', false );
			wp_localize_script( 'wp_sap_admin', 'sspa_params', array( 'plugin_url' => plugins_url( '', __FILE__ ), 'admin_url' => admin_url( 'admin-ajax.php' ) ) );
			wp_enqueue_script( 'wp_sap_admin' );
		}
		/**
		* initialize datas on wp admin
		**/
		public function admin_init() {
		$settings_page = '';
			if ( isset( $_REQUEST[ 'page' ] ) ) {
				$settings_page = $_REQUEST[ 'page' ];
			}
			if ( $settings_page == 'wp_sap' ) {
				add_action( 'admin_head', array( &$this, 'enqueue_admin_custom_scripts_and_styles' ) );
			}
			// Possibly do additional admin_init tasks
		}
		/**
		* add a menu
		**/		
		public function add_menu()
		{
			// Add a page to manage this plugin's settings
			add_options_page('WP Survey & Poll', 'WP Survey & Poll', 'manage_options', 'wp_sap', array( &$this, 'plugin_settings_page' ) );
		}
		/**
		* Menu Callback
		**/		
		public function plugin_settings_page()
		{
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
			}
			// Render the settings template
			include( sprintf( "%s/templates/settings.php", dirname( __FILE__ ) ) );
		}
		public function settings_section_wp_sap() {
		
		}

		public function ajax_survey_answer() {
		global $wpdb;
			if ( isset( $_REQUEST[ 'options' ] ) ) {
				$opt = json_decode( stripslashes( $_REQUEST[ 'options' ] ) );
				$options = ( array ) $opt[ 0 ];
			}
			else {
				$options = array();
			}
			$current_count = $wpdb->get_var( $wpdb->prepare("SELECT `count` FROM " . $wpdb->prefix . "wp_sap_answers WHERE `survey_id` = %d AND `question_id` = %d AND `autoid` = %d", $options[ 'sid' ], $options[ 'qid' ], $options[ 'aid' ] ) );
			$wpdb->update( $wpdb->prefix . "wp_sap_answers", array( "count" => $current_count + 1 ),array( 'survey_id' => $options[ 'sid' ],'question_id' => $options[ 'qid' ],'autoid' => $options[ 'aid' ] ) );
			if ( $options[ 'aid' ] == 1 ) {
					$survey_viewed = array();
					if ( isset( $_COOKIE[ 'wp_sap' ] ) ) {
						$survey_viewed = json_decode( stripslashes( $_COOKIE[ 'wp_sap' ] ) );
						if ( ! in_array( $options[ 'sid' ], $survey_viewed ) ) {
							$survey_viewed[] = $options[ 'sid' ];
							setcookie( "wp_sap", json_encode( $survey_viewed ), time()+60*60*24*365, "/", $_SERVER[ 'HTTP_HOST' ] );
						}
					}
					else {
						$survey_viewed[] = $options[ 'sid' ];
						setcookie( "wp_sap", json_encode( $survey_viewed ), time()+60*60*24*365, "/", $_SERVER[ 'HTTP_HOST' ] );					
					}
			}
			die("success");
		}
			//get_gmt_from_date
		function get_datetime_from_date( $string, $format = 'Y-m-d H:i:s' ) {
			$tz = get_option( 'timezone_string' );
			if ( $tz ) {
				$datetime = date_create( $string, new DateTimeZone( $tz ) );
				if ( ! $datetime )
					return gmdate( $format, 0 );
				$datetime->setTimezone( new DateTimeZone( 'UTC' ) );
				$string_gmt = $datetime->format( $format );
			} else {
				if ( ! preg_match( '#([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})#', $string, $matches ) )
					return gmdate( $format, 0 );
				$string_time = gmmktime( $matches[4], $matches[5], $matches[6], $matches[2], $matches[3], $matches[1] );
				$string_gmt = gmdate( $format, $string_time - get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
			}
			return $string_gmt;
		}
		
		function get_date_datetime( $string ) {
			$date_time = explode( " ", $string );
			$dates = explode( "-", $date_time[ 0 ] );
			$times = explode( ":", $date_time[ 1 ] );
			return date( "d-m-Y H:i", mktime( $times[ 0 ], $times[ 1 ], 0, $dates[ 1 ], $dates[ 2 ], $dates[ 0 ] ) );
		}

		function get_datetime_date( $string ) {
			$date_time = explode( " ", $string );
			$dates = explode( "-", $date_time[ 0 ] );
			$times = explode( ":", $date_time[ 1 ] );
			return date( "Y-m-d H:i:s", mktime( $times[ 0 ], $times[ 1 ], 0, $dates[ 1 ], $dates[ 0 ], $dates[ 2 ] ) );
		}
		
		public function ajax_wpspsurvey() {
			global $wpdb;
			if ( isset( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && ( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] == 'XMLHttpRequest' ) ) {
				if ( ! current_user_can( 'manage_options' ) ) {
					die();
				}
				$survey_id = "";
				$survey_name = "";
				$survey_start_time = "";
				$survey_expiry_time = "";
				$survey_global = "";
				if ( isset( $_REQUEST[ 'survey_id' ] ) ) {
					$survey_id = sanitize_text_field( $_REQUEST[ 'survey_id' ] );
				}
				else {
					$survey_id = "";
				}
				if ( isset( $_REQUEST[ 'survey_name' ] ) ) {
					sanitize_text_field( $survey_name = $_REQUEST[ 'survey_name' ] );
				}
				else {
					$survey_name = "";
				}
				if (isset($_REQUEST['start_time'])&&(!empty($_REQUEST['start_time']))) $survey_start_time = $this->get_datetime_date(sanitize_text_field($_REQUEST['start_time']));
				else $survey_start_time = "";
				if (isset($_REQUEST['expiry_time'])&&(!empty($_REQUEST['expiry_time']))) $survey_expiry_time = $this->get_datetime_date(sanitize_text_field($_REQUEST['expiry_time']));
				else $survey_expiry_time = "";
				if (isset($_REQUEST['global_use'])) $survey_global = sanitize_text_field($_REQUEST['global_use']);
				else $survey_global = "";
				if (isset($_REQUEST['options'])) $survey_options = sanitize_text_field($_REQUEST['options']);
				else $survey_options = "";
				if (isset($_REQUEST['qa'])) $survey_qa = sanitize_text_field($_REQUEST['qa']);
				else $survey_qa = "";
				$survey_check = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM ".$wpdb->prefix."wp_sap_surveys WHERE `id` = %d",$survey_id));
				if ($_REQUEST['sspcmd']=="save")
				{
				if ($survey_check>0) {
				//update survey
					$wpdb->update( $wpdb->prefix."wp_sap_surveys", array( "options" => $survey_options, "start_time" => $survey_start_time, 'expiry_time' => $survey_expiry_time, 'global' => $survey_global),array('id' => $survey_id));
					$wpdb->query($wpdb->prepare("DELETE FROM ".$wpdb->prefix."wp_sap_questions WHERE `survey_id` = %d",$survey_id));
					$wpdb->query($wpdb->prepare("DELETE FROM ".$wpdb->prefix."wp_sap_answers WHERE `survey_id` = %d",$survey_id));
						$qa_object = (array)json_decode(stripslashes($survey_qa));
						$qa_array = (array)$qa_object;
						foreach($qa_array as $keyq=>$qr)
						{
							foreach($qr as $key=>$oa)
							{
								if ($key==0)
								{
								$wpdb->insert( $wpdb->prefix."wp_sap_questions", array( 
									'id' => ($keyq+1), 
									'survey_id' => $survey_id, 
									'question' => $oa
									) );
									$qid = $wpdb->insert_id;
								}
								else
								{
								$oans = explode("->",$oa);
								$wpdb->insert( $wpdb->prefix."wp_sap_answers", array( 
									'survey_id' => $survey_id, 
									'question_id' => ($keyq+1),
									'answer' => $oans[0],
									'count' => $oans[1],
									'autoid' => $key
									) );					
								}
							
							}
						}
					die("updated");
				}
				else {
				//insert survey
					$wpdb->insert( $wpdb->prefix."wp_sap_surveys", array( 
						'id' => $survey_id, 
						'name' => $survey_name, 
						'options' => $survey_options, 
						'start_time' => $survey_start_time,
						'expiry_time'=> $survey_expiry_time,
						'global'=> $survey_global
						) );
						$qa_object = (array)json_decode(stripslashes($survey_qa));
						$qa_array = (array)$qa_object;
						foreach($qa_array as $keyq=>$qr)
						{
							foreach($qr as $key=>$oa)
							{
								if ($key==0)
								{
								$wpdb->insert( $wpdb->prefix."wp_sap_questions", array( 
									'id' => ($keyq+1), 
									'survey_id' => $survey_id, 
									'question' => $oa
									) );
									$qid = $wpdb->insert_id;
								}
								else
								{
								$oans = explode("->",$oa);
								$wpdb->insert( $wpdb->prefix."wp_sap_answers", array( 
									'survey_id' => $survey_id, 
									'question_id' => ($keyq+1),
									'answer' => $oans[0],
									'autoid' => $key
									) );					
								}
							
							}
						}
					die('success');
				}
				}
				elseif($_REQUEST['sspcmd']=="delete")
				{
				if ($survey_check>0) {
					$wpdb->query($wpdb->prepare("DELETE FROM ".$wpdb->prefix."wp_sap_surveys WHERE `id` = %d",$survey_id));
					$wpdb->query($wpdb->prepare("DELETE FROM ".$wpdb->prefix."wp_sap_questions WHERE `survey_id` = %d",$survey_id));
					$wpdb->query($wpdb->prepare("DELETE FROM ".$wpdb->prefix."wp_sap_answers WHERE `survey_id` = %d",$survey_id));
					die("deleted");
				}
				}
				elseif($_REQUEST['sspcmd']=="reset")
				{
				$wpdb->update( $wpdb->prefix."wp_sap_answers", array( "count" => "0"),array('survey_id' => $survey_id));
					die("reset");
				}
			}
			else die();
		}
	}
}
?>