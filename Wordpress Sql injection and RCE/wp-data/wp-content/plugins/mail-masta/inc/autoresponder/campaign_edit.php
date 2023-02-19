<?php

ob_start();

session_start();

//print_r($_POST);exit;


global $wpdb;

date_default_timezone_set(get_option('timezone_string'));

/*First step start*/



    if($_POST['step']=="first_step")

    {

        $camp_name    =  $_POST['camp'];

        $sender_name  =  $_POST['sname'];

        $sender_email =  $_POST['semail'];

         $sender_list =  $_POST['slistid'];
		 
		  $subject =  $_POST['subject'];



        

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

           // echo $_SESSION['camp_id'];exit;

             $masta_campaign = $wpdb->prefix . "masta_responder";

            $update_data  = array('to_list' =>$sender_list, 'responder_name' => $camp_name, 'subject' => $subject , 'from_name'=>$sender_name,'from_email'=>$sender_email,'create_date' => date("Y-m-d H:i:s"));

           // echo $update_data;exit;

           

           $name_check=$wpdb->get_results("select responder_name from $masta_campaign where responder_id=".$_GET['id']);

           

           if($name_check[0]->responder_name != $camp_name)

			{

				$update_data['support']=$camp_name;

            }

            

           

            $lastid = array('responder_id'=>$_GET['id']);

            //echo $_SESSION['camp_id']; exit;

            

            

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $lastid);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

               echo $error;exit;

            } else {

			   echo 'ok thir runaq';exit;	

			}

                 

        }

        else

        {

			echo 'ok this run';exit;

            /* $insert_data  = array('campaign_name' => $camp_name,'from_name'=>$sender_name,'from_email'=>$sender_email,'create_date' => date("Y-m-d H:i:s"));

            $masta_campaign = $wpdb->prefix . "masta_campaign";

            $rows_affected_one = $wpdb->insert($masta_campaign, $insert_data);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

               echo $error;

            }

            else

            {

                $lastid = $wpdb->insert_id;

                $_SESSION['edit']['camp_id'] = $lastid;        

            } */

        }

    }

    

/*First step end*/



    

/*Second step start*/

    

    if($_POST['step']=="second_step")

    {

        $list_name    =  $_POST['slistid'] ;

       //echo $_SESSION['camp_id']; exit;

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

            $update_data  = array('to_list' => $list_name,'create_date' => date("Y-m-d H:i:s"));

            $masta_campaign = $wpdb->prefix . "masta_responder";

            $responder_id = array('responder_id'=>$_GET['id']);

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $responder_id);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

               echo $error;

            }else{

			   echo 'ok';exit;	

			}

             

        }

        

    }

    

/*Second step End*/



     

/*Third step start*/



    if($_POST['step']=="third_step")

    {

        $camp_data =  $_POST['campbody'];

         $resmail = $_POST['resmail'];

        //echo $_SESSION['camp_id'];exit;

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

           

            $update_data  = array('body' => stripslashes($camp_data), 'resp_mail' => stripslashes($resmail), 'create_date' => date("Y-m-d H:i:s"));

            //print_r($update_data);exit;

           // echo $_GET['id'];exit;

            $masta_campaign = $wpdb->prefix . "masta_responder";

            $responder_id = array('responder_id'=>$_GET['id']);

            //echo $lastid; exit;

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $responder_id);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

				

               echo $error;

            } else {

			   echo 'ok';exit;	

			}



                 

        }

        

    }

    

/*Third step end*/



/*Fourth step start*/



    if($_POST['step']=="fourth_step")

    {

        $time_zone =  $_POST['timestamp'] ;

        //echo $time_zone;exit;

        //echo $_SESSION['camp_id'];exit;

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

            $update_data  = array(

					'responder_type'=>$_POST['radio'],

					'timeinterval' => $time_zone,

					'create_date' => date("Y-m-d H:i:s"),

                    'status'=>5);

            $masta_campaign = $wpdb->prefix . "masta_responder";

            $timestamp_id = array('responder_id'=>$_GET['id'] );

            //echo $lastid; exit;

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $timestamp_id);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

               echo $error;

            }else {

			   echo 'ok';exit;	

			}

    

                 

        }

        

    }



    

        /*last step start*/



    if($_POST['step']=="last_step")

    {

       // $time_zone =  $_POST['timestamp'] ;

      // echo "1";die;

               

       if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

            $camp_id = array('responder_id'=> $_GET['id']);

            $update_data  = array('status'=>5);

            //print_r($camp_id);exit;

            $masta_campaign = $wpdb->prefix . "masta_responder";

            $rows_affected = $wpdb->update( $masta_campaign, $update_data, $camp_id);

            //echo  $_SESSION['add']['camp_id'];die;

            //$error = $wpdb->print_error();

           if($_POST['status'] !='1' && $_POST['type'] =='1')

                {

                   echo "campid_".$_GET['id'];

                }

                

                else

                {

                    echo "2";exit;

                }

        }

        

        

    }





?>

