<?php
	include "./Macaw.php";
	use \NoahBuscher\Macaw\Macaw;
	
	Macaw::get('/', function() {
		echo file_get_contents('./out/index.html');
	});
	
	Macaw::get('/products', function() {
		echo file_get_contents('./out/products/index.html');
	});
	
	Macaw::get('/contact-us', function() {
		echo file_get_contents('./out/contact/index.html');
  });

	Macaw::get('/blog', function() {
		echo file_get_contents('./out/blog/index.html');
	});

	Macaw::dispatch();