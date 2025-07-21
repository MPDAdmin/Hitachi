<?php
ini_set('display_errors', 1);
$name = $_POST["name"];
$email = $_POST["email"];
$product = $_POST["product"];
$model = $_POST["model"];

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
$mail->addAddress("munyee.poon.mj@hitachi.com");
//$myemail = 'munyee.poon.mj@hitachi.com';<-----Put Your email address here.
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['product']) || 
   empty($_POST['model']))
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
	
	//$headers = "From: $mail\n"; 
	$headers = "Reply-To: $email";
	
$mail->setFrom($email, $name);
$mail->addAddress("munyee.poon.mj@hitachi.com", "Dave");

$mail->Subject = "Contact form submission: $name";
$mail->Body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Email: $email \n Product Interested: \n $product \n Product Model: \n $model";

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
	<title>Contact form handler</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>