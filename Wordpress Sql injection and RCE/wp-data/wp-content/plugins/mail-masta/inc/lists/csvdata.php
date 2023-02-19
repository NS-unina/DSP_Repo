    <?php





   date_default_timezone_set(get_option('timezone_string'));

   

    $pcsv=substr($_POST['csvdata'], 0, -2);

    $listdata = explode('||',$pcsv);

   

    //foreach($listdata as $listdatas){

    //    listfunc($listdatas);

                global $wpdb;

		//echo stripslashes($_POST['csvdata']);
		
			global $wpdb;
			
			
			$masta_subscribers=$wpdb->prefix.'masta_subscribers';

            $wpdb->query("insert into $masta_subscribers (list_id,sub_ip,sub_country,date_added,subscriber_data,email) values". stripslashes($_POST['csvdata']));

//     $comon="('".$list_id."','".$$value->emailarry."','".$_SERVER['REMOTE_ADDR']."','".getLocationInfoByIp()."','".date("Y-m-d H:i:s")."'";    

    //}

            echo $email."<span style='color:green'>Remaining data Successfully saved</span><br>";





    die;



function listfunc($listdatas){



global $wpdb;

$list_id=$_POST['list_id'];

$rq_ip = $_SERVER['REMOTE_ADDR'];

$country = getLocationInfoByIp();

$current_date=date("Y-m-d H:i:s");



$csvdata=$listdatas;





//split data get from post

$csvarr=explode(';',$csvdata);

$email=$csvarr[0];

$csvarrcount=count($csvarr);



//database query

$mail_subscribers = $wpdb->prefix . "masta_subscribers";

$masta_list=$wpdb->prefix.'masta_list';

$list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list WHERE list_id = $list_id");



//get form structure or json from database

$list_form=$list_form_data[0]->list_form;

$list_form_arr=json_decode($list_form, true);

$count_struct = count($list_form_arr);



//$edit_form=$list_form_data[0]->edit_form;

//$edit_form_arr=json_decode($edit_form, true);

//$edit_form_keys=array_keys($edit_form_arr);



//$list_vali=$list_form_data[0]->validation;

//$list_vali_arr=json_decode($list_vali, true);





/* if($count_struct!=$csvarrcount-1){



        echo $email.": <span style='color:red'>Failed</span><br>";

        exit();

}



else{

        $ij=1;

        $email=$csvarr[0];

   

        $check_sql = "SELECT * FROM $mail_subscribers WHERE list_id = $list_id and email = '$email'";

        $check_available = $wpdb->get_results($check_sql);

   

        if(trim($email)=='' || !filter_var($email, FILTER_VALIDATE_EMAIL))

        {

            echo $email.": <span style='color:red'>Invalid email_id</span><br>";

            exit();

        } */

       

        //$check_sql = "SELECT * FROM $mail_subscribers WHERE list_id = $list_id and email = '$email'";

        //$check_available = $wpdb->get_results($check_sql);

       

    //        $email=$csvarr[0];

     //         if(count($check_available)!=0){

        //    echo $email.": <span style='color:red'>email_id already exist</span><br>";

        //    return;

    //    }

       

        $ij=1;

        foreach($list_form_arr as $key=>$listfor){



            //if(trim($csvarr[$ij])=='' && $list_vali_arr[$key]['form_req']=='1' )

            //{

        //        echo $email.": <span style='color:red'>".$edit_form_keys[$ij-1]." is required field</span><br>";

        //        return;

        //    }

            $label_name = $key;

            $label_value = (!empty($csvarr[$ij]) ? $csvarr[$ij] : '');

            $form_fileld[$label_name]=str_replace('\"', '', trim($label_value));



            $ij++;

        }

        $formfileld = json_encode($form_fileld);

                  $insert_data=array('list_id'=>$list_id,'fname'=>'','lname'=>'','email'=>trim($email),'subscriber_data'=>$formfileld,'sub_ip'=>$rq_ip,'sub_country'=>$country,'date_added' => $current_date);

       

        $wpdb->insert($mail_subscribers,$insert_data);

        echo $email.": <span style='color:green'>Success</span><br>";

    //    exit();



//}



}







?>

