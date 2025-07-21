<?php

$name = $_POST["name"];
$company = $_POST["company"];
$product = $_POST["product"];
$designation = $_POST["designation"];
$email = $_POST["email"];
$ContactNumber = $_POST["ContactNumber"];
$SubjectEnquiry = $_POST["SubjectEnquiry"];
$Address = $_POST["address"];
$enquiry = $_POST["enquiry"];

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
$mail->addAddress("enquiry.iceidn.dz@hitachi.com");
//$myemail = 'munyee.poon.mj@hitachi.com'<-----Put Your email address here.
if(empty($_POST['name'])  || 
  empty($_POST['company']) || 
  empty($_POST['product']) || 
  empty($_POST['designation']) || 
   empty($_POST['email']) || 
   empty($_POST['ContactNumber']) || 
  empty($_POST['SubjectEnquiry']) || 
  empty($_POST['address'])  ||
   empty($_POST['enquiry'])
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


	//$to = $mail; 
	//$email_subject = "Contact form submission: $name";
	//$email_body = "You have received a new message. ".
	//" Here are the details:\n Name: $name \n Email: $email \n Product Interested \n $product \n Product Model \n $model"; 
	
	//$headers = "From: $email\n"; 
	//$headers = "Reply-To: $email";
	
$mail->setFrom($email, $name);
$mail->addAddress("enquiry.iceidn.dz@hitachi.com", "Hitachi-ICE");

        $headers  = "From: " . strip_tags($email) . "\r\n";
        $headers .= "Reply-To: ". strip_tags($email) . "\r\n";
	
$mail->Subject = "Enquiry form submission: ";
$mail->Body = "You have received a new Enquiry. ".
	"\n\n Here are the details:\n\n Name: $name \n Company: $company \n Product: $product \n Designation: $designation \n Email: $email \n Contact No: $ContactNumber \n Subject Enquiry: $SubjectEnquiry \n Address: $address \n\n Enquiry: $enquiry \n\n ";

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
	<title>Hitachi ICE Website - Enquiry (Indonesia)</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>

