<?php
include 'lib/globals.php';
include 'lib/funcs.php';

header("Content-type: application/json");

if(!isset($_COOKIE['access'])) {
	http_response_code(400);
	die('{"error": "User has not authenticated"}');
}

if(!ctype_alnum($_COOKIE['access'])) {
	http_response_code(400);
	setcookie('access', "", 1, '/', $domain, false);
	die('{"error": "User used an invalid access token"}');
}

$userRaw = callTwitch($_COOKIE['access'], "users");
if(array_key_exists('data', $userRaw)) {
	$user = $userRaw['data'][0];
} else {
	http_response_code(500);
	die('{"error": "User data not returned"}');
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli();
$mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
$mysqli->real_connect('localhost', 'http', null, 'user_settings');

prepareUser($mysqli, $user);

$validSettings = getSettingKeys($mysqli);

$sanitizedSettings = [];
$sanityCheck = [];
foreach($_POST as $setting => $value) {
	$charCheck = str_replace("_", "", $setting);
	if(!ctype_alnum($charCheck)) {
		http_response_code(400);
		die('{"error": "Invalid characters present in setting keys"}');
	}

	if(!array_key_exists($setting, $validSettings)) {
		http_response_code(400);
		die('{"error": "Invalid setting key present", "data": "' . $setting . '"}');
	}

	$setting = $mysqli->real_escape_string($setting);
	$value = $mysqli->real_escape_string($value);

	$sanityCheck[$setting] = saveSetting($mysqli, $user, $validSettings, $setting, $value);
}

$mysqli->close();

echo(json_encode($sanityCheck));

?>