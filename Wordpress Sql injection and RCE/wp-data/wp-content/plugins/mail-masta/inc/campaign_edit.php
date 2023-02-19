<?php 

ob_start();

session_start();


global $wpdb;

date_default_timezone_set(get_option('timezone_string'));

/*First step start*/



    if($_POST['step']=="first_step")

    {

        $camp_name    =  $_POST['camp'];

        $sender_name  =  $_POST['sname'];

       $sender_email =  $_POST['semail'];

       $list_name    =  $_POST['slistid'] ;
	   
	   $subject    =  $_POST['subject'] ;

        

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

           // echo $_SESSION['camp_id'];exit;

               $masta_campaign = $wpdb->prefix . "masta_campaign";

            $update_data  = array('campaign_name' => $camp_name, 'to_list' => $list_name, 'subject' => $subject,   'from_name'=>$sender_name,'from_email'=>$sender_email,'create_date' => date("Y-m-d H:i:s"));

           // echo $update_data;exit;

           

             $name_check=$wpdb->get_results("select campaign_name from $masta_campaign where camp_id=".$_GET['id']);

           

           if($name_check[0]->campaign_name != $camp_name)

			{

				$update_data['support']=$camp_name;

            }

            

         

            $lastid = array('camp_id'=>$_GET['id']);

            //echo $_SESSION['camp_id']; exit;

            

            

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $lastid);

            $error = $wpdb->print_error();

            if(trim($error) <>  "")

            {

               echo $error;exit;

            } else {

			   echo 1; exit;	

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

            $masta_campaign = $wpdb->prefix . "masta_campaign";

            $campaign_id = array('camp_id'=>$_GET['id']);

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $campaign_id);

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

        $cammil = $_POST['cammail'];

        //echo $_SESSION['camp_id'];exit;

        if(isset($_GET['id']) && $_GET['id'] <> "" )

        {

           

            //$update_data  = array('body' => stripslashes($camp_data),'create_date' => date("Y-m-d H:i:s"));

            $update_data  = array('body' => stripslashes($camp_data),'cammail' =>  stripslashes($cammil),'create_date' => date("Y-m-d H:i:s")); 



            //print_r($update_data);exit;

           // echo $_GET['id'];exit;

            $masta_campaign = $wpdb->prefix . "masta_campaign";

            $campbody_id = array('camp_id'=>$_GET['id']);

            //echo $lastid; exit;

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $campbody_id);

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

              

        if(isset($_GET['id']))

        {

            $update_data  = array('shedule_date' => $time_zone,

                                 'campaign_type'=>$_POST['radio'],

                                 'create_date' => date("Y-m-d H:i:s"),

                                 'status'=>5 

                                 );



            $masta_campaign = $wpdb->prefix . "masta_campaign";

            $timestamp_id = array('camp_id'=>$_GET['id']);

            $rows_affected_one = $wpdb->update( $masta_campaign, $update_data, $timestamp_id);

            $error = $wpdb->print_error();



            if(trim($error) <>  "")

            {

               echo $error;

            } else {

                  if($_POST['type'] =='1')

                {

                    

                    $update_data  = array('status'=>4);

                    $rows_affected = $wpdb->update( $masta_campaign, $update_data, $timestamp_id);

                     echo "campid_".$_GET['id']; 

                }

                

                else

                {

                    echo "2";

                }

    

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

            $camp_id = array('camp_id'=> $_GET['id']);

            $update_data  = array('status'=>5);

            //print_r($camp_id);exit;

            $masta_campaign = $wpdb->prefix . "masta_campaign";

            $rows_affected = $wpdb->update( $masta_campaign, $update_data, $camp_id);

            //echo  $_SESSION['add']['camp_id'];die;

            //$error = $wpdb->print_error();

            

           if($_POST['status'] !='1' && $_POST['type'] =='1')

                {

					$update_data  = array('status'=>4);

					$rows_affected = $wpdb->update( $masta_campaign, $update_data, $camp_id);

                

                }

                

                else

                {

                    echo "2";exit;

                }

        }

        

        

    }





?>

