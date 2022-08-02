<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Прототипи публична част - ЕПЗЕУ, ТРРЮЛНЦ, ИР</title>


	<style>

		body {
			line-height: 1.3;
		}

		h2:first-of-type {
			margin-top: 1rem;			
		}

		h2 {
			margin-top: 1.875rem;
			margin-bottom: 0rem;
		}
	</style>
</head>
<body>	
	<h1>Прототипи публична част - ЕПЗЕУ, ТРРЮЛНЦ, ИР</h1>
	
	<?php
	$folders = scandir(__DIR__);

	$excludeFolders = ['.', '..', 'fonts', 'images', 'js', 'css'];

	foreach ($folders as $folder) {
		
		if (!is_dir($folder) || in_array($folder, $excludeFolders))
			continue;
		
		echo '<h2>'.$folder.'</h2>';
			
		$files = scandir(__DIR__.'/'.$folder);
			
		foreach ($files as $file) {
			
			$fileInfo = pathinfo($file);
				
			if (empty($fileInfo['extension']) || $fileInfo['extension'] != 'html')
				continue;

			echo '<a href="'.$_SERVER['REQUEST_URI'].$folder.'/'.$fileInfo['basename'].'">'.$fileInfo['basename'].'</a>'."<br />";
		}
	}
	?>


</body>
</html>
