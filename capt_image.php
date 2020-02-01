<?php
$cmd = "python e:/eclipse-workspace/testpy/matchImage/card_det.py";
$file_content = $_POST['img_content'];
$file_content = str_replace("data:image/png;base64,", "", $file_content);
$image_name = time() . ".png";
file_put_contents("tmp_image/" . $image_name, base64_decode($file_content));

$image_path = __DIR__ . "/tmp_image/" . $image_name;

$r = exec($cmd . " $image_path", $output);
//echo $r;
for($i=0;$i<count($output);$i++) {
    $content .= $output[$i] . "\n";
}

if(!$content) {
    $content = "error";
}

echo $content;
