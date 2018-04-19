<?php


try{
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $originalMsg = $_POST["message"];

    $msg = "From: ".$name."
    Email: ".$email."
    Phone: ".$phone."
    Message:".$originalMsg;

    $msg = wordwrap($msg, 70);

    mail("cyril.mathew@outlook.com", "Message from Personal Website", $msg);

    header('Location: http://www.cyrmath.com/');
    exit;
}

catch(Exception $e)
{
    echo "Message:" .$e->getMessage();
}
?>

