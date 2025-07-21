<?php

$name = $_POST["name"];
$product = $_POST["product"];
$productmodel = $_POST["productmodel"];
$company = $_POST["company"];
$designation = $_POST["designation"];
$email = $_POST["email"];
$ContactNumber = $_POST["ContactNumber"];

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
$mail->addAddress("christina.wah.cq@hitachi.com");
//$myemail = 'munyee.poon.mj@hitachi.com' christina.wah.cq@hitachi.com;<-----Put Your email address here.
if(empty($_POST['name'])  || 
  empty($_POST['product']) || 
  empty($_POST['productmodel']) || 
   empty($_POST['company']) || 
   empty($_POST['designation']) || 
  empty($_POST['email']) || 
   empty($_POST['ContactNumber'])
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
$mail->addAddress("christina.wah.cq@hitachi.com", "Hitachi-ICE");

        $headers  = "From: " . strip_tags($email) . "\r\n";
        $headers .= "Reply-To: ". strip_tags($email) . "\r\n";
	
$mail->Subject = "Hitachi-ICE Brochure Download Details: ";
$mail->Body = "You have received a new Brochure download. ".
	"\n\n Here are the details:\n\n Name: $name \n Product: $product \n Product Model: $productmodel \n Company: $company \n Designation: $designation \n Email: $email \n Contact Number: $ContactNumber \n\n ";

$mail->send();
	
//$mail->send();
//mail($email_subject,$email_body,$headers);
header("Location: brochures.html");
	//mail($to,$email_subject,$email_body,$headers);
	//redirect to the 'thank you' page
	//header('Location: brochures.html');
	

} 


?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Hitachi ICE Website - Brochure Downloads</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>