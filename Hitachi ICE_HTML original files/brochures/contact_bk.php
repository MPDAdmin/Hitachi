<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

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

$mail->setFrom($email, $name);
$mail->addAddress("munyee.poon.mj@hitachi.com", "Dave");

$mail->Subject = $subject;
$mail->Body = $message;

$mail->send();

header("Location: brochures.html");

?>