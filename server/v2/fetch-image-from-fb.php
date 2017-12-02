<?php
 $facebook = new Facebook(array(
  'appId'  => '1574036846247049',
  'secret' => 'cc8fd31c5b23a87f8825036c94be40ff',
));
  $token = $facebook->getAccessToken();
  $json = file_get_contents("https://graph.facebook.com/v2.5/820010554693599?fields=photos.limit(20){link,name,picture,images}&limit=30&access_token=".$token);
  $fb_images = json_decode($json);
  echo json_encode(array('fb'=>$fb_images));