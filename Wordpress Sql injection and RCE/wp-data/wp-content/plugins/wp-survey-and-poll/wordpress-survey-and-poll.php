<?php
defined( 'ABSPATH' ) OR exit;
/**
 * Plugin Name: WordPress Survey and Poll
 * Plugin URI: http://modalsurvey.pantherius.com
 * Description: Add simple surveys to your website
 * Author: Pantherius
 * Version: 1.5.7.3
 * Author URI: http://pantherius.com
 */
 
if ( ! class_exists( 'wp_sap' ) ) {
	class wp_sap {
		protected static $instance = null;
		/**
		 * Construct the plugin object
		 */
		public function __construct() {
			global $wpdb;
			// installation and uninstallation hooks
			register_activation_hook( __FILE__, array( 'wp_sap', 'activate' ) );
			register_deactivation_hook( __FILE__, array( 'wp_sap', 'deactivate' ) );
			register_uninstall_hook( __FILE__, array( 'wp_sap', 'uninstall' ) );
			if ( is_admin() ) {
				require_once( sprintf( "%s/settings.php", dirname( __FILE__ ) ) );
				$wp_sap_settings = new wp_sap_settings();
				$plugin = plugin_basename( __FILE__ );
				add_filter( "plugin_action_links_$plugin", array( &$this, 'plugin_settings_link' ) );
			}
			else {
				$wp_sap_url = $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ];
				$wp_sap_load = true;
				if ( ( strpos( $wp_sap_url, 'wp-login' ) ) !== false ) {
					$wp_sap_load = false;
				}
				if ( ( strpos( $wp_sap_url, 'wp-admin' ) ) !== false ) {
					$wp_sap_load = false;
				}
				if ( $wp_sap_load || isset( $_REQUEST[ 'sspcmd' ] ) ) {
					//integrate the public functions
					add_action( 'init', array( &$this, 'enqueue_custom_scripts_and_styles' ) );
					add_shortcode( 'survey', array( &$this, 'survey_shortcodes' ) );
					add_shortcode( 'wpsurveypoll', array( &$this, 'survey_shortcodes' ) );
				}
			}
		}

		public static function getInstance() {
			if ( ! isset( $instance ) ) {
				$instance = new wp_sap;
			}
		return $instance;
		}
		/**
		* Activate the plugin
		**/
		public static function activate() {
			global $wpdb;
			$db_info = array();
			//define custom data tables
			$charset_collate = '';
			if ( ! empty( $wpdb->charset ) ) {
			  $charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset}";
			}

			if ( ! empty( $wpdb->collate ) ) {
			  $charset_collate .= " COLLATE {$wpdb->collate}";
			}
			$sql = "CREATE TABLE IF NOT EXISTS ".$wpdb->prefix.'wp_sap_surveys'." (
			  id varchar(255) NOT NULL,
			  name varchar(255) NOT NULL,
			  options text NOT NULL,
			  start_time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			  expiry_time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			  global tinyint(1) NOT NULL,
			  autoid mediumint(9) NOT NULL AUTO_INCREMENT,
			  UNIQUE KEY autoid (autoid)
			) $charset_collate";
			$wpdb->query($sql);
			$sql = "CREATE TABLE IF NOT EXISTS ".$wpdb->prefix.'wp_sap_questions'." (
			  id mediumint(9) NOT NULL,
			  survey_id varchar(255) NOT NULL,
			  question text NOT NULL
			) $charset_collate";
			$wpdb->query($sql);
			$sql = "CREATE TABLE IF NOT EXISTS ".$wpdb->prefix.'wp_sap_answers'." (
			  survey_id varchar(255) NOT NULL,
			  question_id mediumint(9) NOT NULL,
			  answer text NOT NULL,
			  count mediumint(9) DEFAULT '0' NOT NULL,
			  autoid mediumint(9) NOT NULL
			) $charset_collate";
			$wpdb->query($sql);
		}
		/**
		* Deactivate the plugin
		**/
		public static function deactivate() {
			wp_unregister_sidebar_widget( 'wp_sap' );
		}
		
		/**
		* Uninstall the plugin
		**/
		public static function uninstall() {
			global $wpdb;
			$db_info = array();
			//define custom data tables
			$wpdb->query( "DROP TABLE IF EXISTS " . $wpdb->prefix . 'wp_sap_surveys' );
			$wpdb->query( "DROP TABLE IF EXISTS " . $wpdb->prefix . 'wp_sap_questions' );
			$wpdb->query( "DROP TABLE IF EXISTS " . $wpdb->prefix . 'wp_sap_answers' );
		}

		function random_color() {
			return '#' . str_pad( dechex( mt_rand( 0, 0xFFFFFF ) ), 6, '0', STR_PAD_LEFT );
		}

		public function survey_shortcodes( $atts ) {
			global $wpdb;
			extract( shortcode_atts( array(
				'id' => '-1',
				'style' => 'modal',
				'width' => '',
				'align' => 'left',
				'message' => 'You already filled out this survey!'
				), $atts, 'survey' ) );
				if ( ! isset( $atts[ 'style' ] ) ) {
					$atts[ 'style' ] = 'modal';
				}
				if ( ! isset( $atts[ 'align' ] ) ) {
					$atts[ 'align' ] = '';
				}
				if ( ! isset( $atts[ 'width' ] ) ) {
					$atts[ 'width' ] = '98%';
				}
				if ( ! isset( $atts[ 'message' ] ) ) {
					$atts[ 'message' ] = 'You already filled out this survey!';
				}
				$args = array( 'id' => $atts[ 'id' ], 'style' => $atts[ 'style' ], 'align' => $atts[ 'align' ], 'width' => $atts[ 'width' ] );
				if ( ! is_single() && ! is_page() ) {
					return('');
				}
				wp_register_script( 'wp_sap_script', plugins_url( '/templates/assets/js/wp_sap.js', __FILE__ ), array( 'jquery' ), '1.0.0.1', true );
					$survey_viewed = array();
					$sv = '';
					$sv_condition = '';
					if ( $atts[ 'style' ] = 'click' ) {
						if ( isset( $_COOKIE[ 'wp_sap' ] ) ) {
							$survey_viewed = json_decode( stripslashes( $_COOKIE[ 'wp_sap' ] ) );
						}
						if ( ! empty( $survey_viewed ) ) {
							if ( in_array( $args[ 'id' ], $survey_viewed ) ) {
								$sv_condition = "expired";
								print( $atts[ 'message' ] );
							}
						}
					$sql = "SELECT *,msq.id as question_id FROM " . $wpdb->prefix . "wp_sap_surveys mss LEFT JOIN " . $wpdb->prefix . "wp_sap_questions msq on mss.id = msq.survey_id WHERE (`expiry_time`>'" . current_time( 'mysql' ) . "' OR `expiry_time`='0000-00-00 00:00:00') AND (`start_time`<'" . current_time( 'mysql' ) . "' OR `start_time`='0000-00-00 00:00:00') AND mss.id='" . $args[ 'id' ] . "' ORDER BY msq.id ASC";
					}
					else {
						if ( isset( $_COOKIE[ 'wp_sap' ] ) ) {
							$survey_viewed = json_decode( stripslashes( $_COOKIE[ 'wp_sap' ] ) );
						}
						if ( ! empty( $survey_viewed ) ) {
							$sv = implode( $survey_viewed );
							$sv_condition = "AND (mss.id NOT IN ('" . $sv . "'))";
						}
						$sql = "SELECT *,msq.id as question_id FROM " . $wpdb->prefix . "wp_sap_surveys mss LEFT JOIN " . $wpdb->prefix . "wp_sap_questions msq on mss.id = msq.survey_id WHERE (`expiry_time`>'" . current_time( 'mysql' ) . "' OR `expiry_time`='0000-00-00 00:00:00') AND (`start_time`<'" . current_time( 'mysql' ) . "' OR `start_time`='0000-00-00 00:00:00') AND mss.id='" . $args['id'] . "' '" . $sv_condition . "' ORDER BY msq.id ASC";
					}
				$questions_sql = $wpdb->get_results( $sql );
				if ( ! empty( $questions_sql ) ) {
					$survey = array();
					foreach( $questions_sql as $key=>$qs ) {
						if ( $key == 0 ) {
							$survey[ 'options' ] = stripslashes( str_replace( '\\\'', '|', $qs->options ) );
							$survey[ 'plugin_url' ] = plugins_url( '', __FILE__ );
							$survey[ 'admin_url' ] = admin_url( 'admin-ajax.php' );
							$survey[ 'survey_id' ] = $qs->survey_id;
							$survey[ 'align' ] = $args[ 'align' ];
							$survey[ 'width' ] = $args[ 'width' ];
							$survey[ 'style' ] = $args[ 'style' ];
							if ( $sv_condition != "expired" ) {
								$survey[ 'expired' ] = 'false';
							}
							else {
								$survey[ 'expired' ] = 'true';
							}
							if ( $args[ 'style' ] == 'click' ) {
								$survey[ 'message' ] = $atts[ 'message' ];
							}
						}
						$survey[ 'questions' ][ $key ][] = $qs->question;
						$sql = "SELECT * FROM " . $wpdb->prefix . "wp_sap_answers WHERE survey_id = '" . $qs->survey_id . "' AND question_id = '" . $qs->question_id . "' ORDER BY autoid ASC";
						$answers_sql = $wpdb->get_results( $sql );
						foreach( $answers_sql as $key2=>$as ) {
							$survey[ 'questions' ][ $key ][] = $as->answer;
						}
					}
					wp_localize_script( 'wp_sap_script', 'sss_params', array( 'survey_options'=>json_encode( $survey ) ) );
					wp_enqueue_script( 'wp_sap_script' );
					if ( $args[ 'style' ] == 'flat' ) {
						return( '<div id="survey" style="width:100%;"></div>' );
					}
				}
		}
			
		function enqueue_custom_scripts_and_styles() {
			global $wpdb;
			wp_enqueue_style( 'wp_sap_style', plugins_url( '/templates/assets/css/wp_sap.css', __FILE__ ) );
			wp_enqueue_style( 'jquery_ui_style', plugins_url( '/templates/assets/css/jquery-ui.css', __FILE__ ) );
			wp_enqueue_script( 'jquery' );
			wp_enqueue_script( 'jquery-ui-core', array( 'jquery' ) );
			wp_enqueue_script( 'jquery-effects-core', array( 'jquery' ) );
			wp_enqueue_script( 'jquery-effects-slide', array( 'jquery-effects-core' ) );
			wp_enqueue_script( 'jquery-visible',plugins_url( '/templates/assets/js/jquery.visible.min.js', __FILE__ ), array( 'jquery' ), '1.10.2' );
			wp_register_script('wp_sap_script', plugins_url( '/templates/assets/js/wp_sap.js' , __FILE__ ), array( 'jquery' ), '1.0.0.2', true );
				$survey_viewed = array();
				$sv = '';
				$sv_condition = '';
					if ( isset( $_COOKIE[ 'wp_sap' ] ) ) {
						$survey_viewed = json_decode( stripslashes( $_COOKIE[ 'wp_sap' ] ) );
					}
					if ( ! empty( $survey_viewed ) ) {
						$sv = implode( $survey_viewed );
						$sv_condition = "AND (mss.id NOT IN ('" . $sv . "'))";
					}

			$sql = "SELECT *,msq.id as question_id FROM " . $wpdb->prefix . "wp_sap_surveys mss LEFT JOIN " . $wpdb->prefix . "wp_sap_questions msq on mss.id = msq.survey_id WHERE global = 1 AND (`expiry_time`>'" . current_time( 'mysql' ) . "' OR `expiry_time`='0000-00-00 00:00:00') AND (`start_time`<'" . current_time( 'mysql' ) . "' OR `start_time`='0000-00-00 00:00:00') " . $sv_condition . " ORDER BY msq.id ASC";
			$questions_sql = $wpdb->get_results( $sql );
			if ( ! empty( $questions_sql ) ) {
			$survey = array();
			foreach( $questions_sql as $key=>$qs ) {
				if ( $key == 0 ) {
					$survey[ 'options' ] = stripslashes( str_replace( '\\\'', '|', $qs->options ) );
					$survey[ 'plugin_url' ] = plugins_url( '', __FILE__ );
					$survey[ 'admin_url' ] = admin_url( 'admin-ajax.php' );
					$survey[ 'survey_id' ] = $qs->survey_id;
					$survey[ 'style' ] = 'modal';
					$survey[ 'expired' ] = 'false';
					$survey[ 'debug' ] = 'true';
				}
				$survey[ 'questions' ][ $key ][] = $qs->question;
							$sql = "SELECT * FROM " . $wpdb->prefix . "wp_sap_answers WHERE survey_id = '" . $qs->survey_id . "' AND question_id = '" . $qs->question_id . "' ORDER BY autoid ASC";
							$answers_sql = $wpdb->get_results($sql);
							foreach( $answers_sql as $key2=>$as ) {
								$survey[ 'questions' ][ $key ][] = $as->answer;
							}
			}
			wp_localize_script( 'wp_sap_script', 'sss_params', array( 'survey_options' => json_encode( $survey ) ) );
			wp_enqueue_script( 'wp_sap_script' );
			}
		}
		/**
		* Add the settings link to the plugins page
		**/
		function plugin_settings_link( $links ) { 
			$settings_link = '<a href="options-general.php?page=wp_sap">Settings</a>';
			array_unshift( $links, $settings_link ); 
			return $links; 
		}
	}
}
if( class_exists( 'wp_sap' ) ) {
	// call the main class
	$wp_sap = wp_sap::getInstance();
}
?>