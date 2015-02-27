 <!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Angry pawn offers the best udemy coupon codes available on Internet. The Unofficial all time Sale for Udemy Courses">
    <meta name="keywords" content="udemy new year sales, Udemy discounts, best udemy deals, new year coupons, new year sale, new year deals,udemy coupon, udemy coupons, udemy coupon code, udemy, udemy new year coupon code">
    <meta name="author" content="AngryPawn">

    <title>AngryPawn - All the udemy coupon codes are here</title>
    </head>
    <body>
    <?php
        date_default_timezone_set('Asia/Calcutta');
        define( 'PARSE_SDK_DIR', '../src/Parse/' );
        require 'autoload.php';

        use Parse\ParseClient;
        use Parse\ParseObject;
        use Parse\ParseQuery;
        use Parse\ParseACL;
        use Parse\ParsePush;
        use Parse\ParseUser;
        use Parse\ParseInstallation;
        use Parse\ParseException;
        use Parse\ParseAnalytics;
        use Parse\ParseFile;
        use Parse\ParseCloud;

        ParseClient::initialize( "qc3ZW7dP2SN3eOzO6fmruWeu4t8IFMCeixHPT63I", "Ms4mFGAHONMfAIJL26Mgr4PrSoiLTp0v7MVwKFJq", "XCeyhkJp2o3bbuIaymldQBC9AfsNsPyZDTDk9FKg" );
       

        define("DEBUG", 0);
        // Set to 0 once you're ready to go live
        define("USE_SANDBOX", 0);
        define("LOG_FILE", "./ipn.log");
        // Read POST data
        // reading posted data directly from $_POST causes serialization
        // issues with array data in POST. Reading raw POST data from input stream instead.
        $raw_post_data = file_get_contents('php://input');
        $raw_post_array = explode('&', $raw_post_data);
        $myPost = array();
        foreach ($raw_post_array as $keyval) {
	           $keyval = explode ('=', $keyval);
	           if (count($keyval) == 2)
		      $myPost[$keyval[0]] = urldecode($keyval[1]);
        }
        // read the post from PayPal system and add 'cmd'
        $req = 'cmd=_notify-validate';
        if(function_exists('get_magic_quotes_gpc')) {
            $get_magic_quotes_exists = true;
        }
        foreach ($myPost as $key => $value) {
            if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
                $value = urlencode(stripslashes($value));
            } else {
                $value = urlencode($value);
            }
            $req .= "&$key=$value";
        }
        // Post IPN data back to PayPal to validate the IPN data is genuine
        // Without this step anyone can fake IPN data
        if(USE_SANDBOX == true) {
            $paypal_url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
        } else {
            $paypal_url = "https://www.paypal.com/cgi-bin/webscr";
        }
        $ch = curl_init($paypal_url);
        if ($ch == FALSE) {
            return FALSE;
        }
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
        if(DEBUG == true) {
            curl_setopt($ch, CURLOPT_HEADER, 1);
            curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
        }
        // CONFIG: Optional proxy configuration
        //curl_setopt($ch, CURLOPT_PROXY, $proxy);
        //curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
        // Set TCP timeout to 30 seconds
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));
        // CONFIG: Please download 'cacert.pem' from "http://curl.haxx.se/docs/caextract.html" and set the directory path
        // of the certificate as shown below. Ensure the file is readable by the webserver.
        // This is mandatory for some environments.
        $cert =  "cacert.pem";
        curl_setopt($ch, CURLOPT_CAINFO, $cert);
        $res = curl_exec($ch);
        if (curl_errno($ch) != 0) // cURL error
            {
            echo curl_error($ch);
            if(DEBUG == true) {	
                
                error_log(date('[Y-m-d H:i e] '). "Can't connect to PayPal to validate IPN message: " . curl_error($ch) . PHP_EOL, 3, LOG_FILE);
            }
            
            curl_close($ch);
            exit;
        } else {
                // Log the entire HTTP response if debug is switched on.
                if(DEBUG == true) {
                    error_log(date('[Y-m-d H:i e] '). "HTTP request of validation request:". curl_getinfo($ch, CURLINFO_HEADER_OUT) ." for IPN payload: $req" . PHP_EOL, 3, LOG_FILE);
                    error_log(date('[Y-m-d H:i e] '). "HTTP response of validation request: $res" . PHP_EOL, 3, LOG_FILE);
                }
                curl_close($ch);
        }
echo "hello";
        // Inspect IPN validation result and act accordingly
        // Split response headers and payload, a better way for strcmp
        $tokens = explode("\r\n\r\n", trim($res));
        $res = trim(end($tokens));
        if (strcmp ($res, "VERIFIED") == 0) {
            // check whether the payment_status is Completed
            // check that txn_id has not been previously processed
            // check that receiver_email is your PayPal email
            // check that payment_amount/payment_currency are correct
            // process payment and mark item as paid.
            // assign posted variables to local variables
            //$item_name = $_POST['item_name'];
            //$item_number = $_POST['item_number'];
            $payment_status = $_POST['payment_status'];
            $payment_amount = $_POST['mc_gross'];
            $first_name = $_POST['first_name'];
            $last_name =$_POST['last_name'];
            $email = "notrequired";
            //$payment_currency = $_POST['mc_currency'];
            $mc_fee= $_POST['mc_fee'];
            $txn_id = $_POST['txn_id'];
            $receiver_email = $_POST['receiver_email'];
            $payer_email = $_POST['payer_email'];
            $pending_reason = $_POST['pending_reason'];
            if($pending_reason == null)
                $pending_reason = "All is well";
            try{
            $result = ParseCloud::run('addPaidSubscriber', array("email" => $email,"paypalemail" => $payer_email,"transcationid" => $txn_id,"PaymentStatus" => $payment_status,"PaymentAmount" => $payment_amount,"FirstName" => $first_name,"LastName" => $last_name,"Fee" => $mc_fee,"PendingReason" => $pending_reason,"ReceiverEmail"=> $receiver_email));
        }
        catch(ParseException $e){
            echo $e->getMessage();
        }

        $servername = "50.62.209.78";
        $username = "nishantjain91";
        $password = "Exynos44121.618";
        $DBname = "nishantjain91_";

        // Create connection
        $dsn = 'mysql:host=50.62.209.78;dbname=nishantjain91_';
        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            ); 
        try{
            $dbh = new PDO($dsn, $username, $password, $options);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO PaidSubscribers (Email,PaypalEmail,TranscationID,FirstName,LastName,Fee,PaymentStatus,PaymentAmount,ReceiverEmail,PendingReason) VALUES    (:Email,:PaypalEmail,:TranscationID,:FirstName,:LastName,:Fee,:PaymentStatus,:PaymentAmount,:ReceiverEmail,:PendingReason) ";
            $q = $dbh->prepare($sql);
            $q->execute(array(':Email'=>$email,':PaypalEmail'=>$payer_email,':TranscationID'=>$txn_id,':FirstName'=>$first_name,':LastName'=>$last_name,':Fee'=>$mc_fee,':PaymentStatus'=>$payment_status,':PaymentAmount'=>$payment_amount,':ReceiverEmail'=>$receiver_email,':PendingReason'=>$pending_reason));
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        if(DEBUG == true) {
            error_log(date('[Y-m-d H:i e] '). "Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
        }
        } else if (strcmp ($res, "INVALID") == 0) {
            echo "Something went wrong";
            // log for manual investigation
            // Add business logic here which deals with invalid IPN messages
            if(DEBUG == true) {
                error_log(date('[Y-m-d H:i e] '). "Invalid IPN: $req" . PHP_EOL, 3, LOG_FILE);
            }
        }

        
    ?>
        


    </body>
</html>