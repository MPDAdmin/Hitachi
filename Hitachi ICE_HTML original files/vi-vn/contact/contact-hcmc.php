<?php

$your_feedback = $_POST["your_feedback"];
$details = $_POST["details"];
$salutation = $_POST["salutation"];
$email = $_POST["email"];
$yourname = $_POST["yourname"];
$contact = $_POST["contact"];
$company = $_POST["company"];
$customer = $_POST["customer"];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$mail = new PHPMailer(true);

// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();

$mail->Host = "10.95.150.96";
$mail->Port = 25;

$errors = '';
$mail->addAddress("enquiry.icevn.yc@hitachi.com");

if(empty($_POST['your_feedback']) || 
  empty($_POST['details']) || 
  empty($_POST['salutation']) || 
  empty($_POST['yourname']) || 
  empty($_POST['contact']) || 
  empty($_POST['email'])  ||
  empty($_POST['customer'])
  )
{
    $errors .= "\n Error: all fields are required";
}

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email))
{
    $errors .= "\n Error: Invalid email address";
}
	
if( empty($errors))
{
	
$mail->setFrom($email, $yourname);
$mail->addAddress("enquiry.icevn.yc@hitachi.com");
	

        $headers  = "From: " . strip_tags($email) . "\r\n";
        $headers .= "Reply-To: ". strip_tags($email) . "\r\n";
	
$mail->Subject = "Enquiry form submission Hitachi ICE Vietnam - Air Compressor: Ho Chi Minh City Representative Office";
$mail->Body = "You have received a new Enquiry (Indonesia). ".
	"\n\n Here are the details:\n Name: $salutation $yourname \n Company: $company \n Contact Number:  $contact \n Email: $email \n Enquired For: $details \n\n Are you a customer of Hitachi Industrial Components & Equipment?: $customer  \n\n\n ------------- End ------------";

$mail->send();
	
//$mail->send();
//mail($email_subject,$email_body,$headers);
header("Location: thank.html");
	//mail($to,$email_subject,$email_body,$headers);
	//redirect to the 'thank you' page
	//header('Location: brochures.html');
} 

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Hitachi ICE Vietnam - Air Compressor - Enquiry (Ho Chi Minh City Representative Office)</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>

