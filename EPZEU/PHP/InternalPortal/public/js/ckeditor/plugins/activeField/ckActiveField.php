<?php
session_start();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta content="noindex, nofollow" name="robots" />
	</head>
	<body style="background-color: transparent;">
		<table height="100%" cellSpacing="0" cellPadding="0" width="100%" border="0">
			<tr>
				<td>
				<table cellSpacing="0" cellPadding="0" align="center" border="0">
				<tr>
					<td>
						<span fckLang="ActivefieldDlgName" id="fieldName">Active Field Name</span><br>
						<select name="txtName" id="txtName" style="width: 350px;">
						<option value="" id="selectFieldName">Select active field</option>
						<? 
						if (isset($_SESSION['activeFields']) && is_array($_SESSION['activeFields'])) {
							foreach ($_SESSION['activeFields'] as $field) {
								echo '<option value="'.$field.'">'.$field.'</option>';
							}
						}?>
						</select>
					</td>
				</tr>
				</table>
				</td>
			</tr>
		</table>
	</body>
</html>