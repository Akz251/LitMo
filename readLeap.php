<?php
/**
 * Created by PhpStorm.
 * User: schoo
 * Date: 1/30/2016
 * Time: 1:19 AM
 */

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
    $sql = "SELECT * FROM gesture WHERE id = 4";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $response = array('gesture' => $row["gesture"], 'readOK' => $row['readOK']); // ."<br>"; //"id: " . $row["id"]. " - Gesture: " .
        echo json_encode($response);
    }
    $sql = "UPDATE gesture SET readOK = '1' WHERE id = '4'";
    if (mysqli_query($conn, $sql)) {
//        echo "New record created successfully";

    } else {
//        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    } else {
    echo "0 results";
}

mysqli_close($conn);
