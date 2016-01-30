<?php
/**
 * Created by PhpStorm.
 * User: schoo
 * Date: 1/30/2016
 * Time: 12:27 AM TPzYExVXafT8zHnK
 */

if(isset($_GET['gesture'])){
//    if($_GET['gesture']== 'circle'){
        echo $_GET['gesture'];


    $servername = "localhost";
    $username = "schoolpo_root";
    $password = "leapMotion2016";
    $dbname = "schoolpo_leap";
        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "UPDATE `gesture` SET gesture='".$_GET['gesture']."', readOK = '0' WHERE id='4'";
//        $sql = "INSERT INTO `gesture`( `gesture`, `read`) VALUES ('1','0')";
            if (mysqli_query($conn, $sql)) {
                echo "New record created successfully";

            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        mysqli_close($conn);
//    }
}