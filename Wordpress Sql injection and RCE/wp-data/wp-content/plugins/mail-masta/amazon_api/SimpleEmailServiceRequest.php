<?php
/**
* SimpleEmailServiceRequest PHP class
*
* @link https://github.com/daniel-zahariev/php-aws-ses
* @version 0.8.3
* @package AmazonSimpleEmailService
*/
final class SimpleEmailServiceRequest
{
	private $ses, $verb, $parameters = array();
	public $response;

	/**
	* Constructor
	*
	* @param string $ses The SimpleEmailService object making this request
	* @param string $action action
	* @param string $verb HTTP verb
	* @return mixed
	*/
	function __construct($ses, $verb) {
		$this->ses = $ses;
		$this->verb = $verb;
		$this->response = new STDClass;
		$this->response->error = false;
	}

	/**
	* Set request parameter
	*
	* @param string  $key Key
	* @param string  $value Value
	* @param boolean $replace Whether to replace the key if it already exists (default true)
	* @return void
	*/
	public function setParameter($key, $value, $replace = true) {
		if(!$replace && isset($this->parameters[$key]))
		{
			$temp = (array)($this->parameters[$key]);
			$temp[] = $value;
			$this->parameters[$key] = $temp;
		}
		else
		{
			$this->parameters[$key] = $value;
		}
	}

	/**
	* Get the response
	*
	* @return object | false
	*/
	public function getResponse() {

		$params = array();
		foreach ($this->parameters as $var => $value)
		{
			if(is_array($value))
			{
				foreach($value as $v)
				{
					$params[] = $var.'='.$this->__customUrlEncode($v);
				}
			}
			else
			{
				$params[] = $var.'='.$this->__customUrlEncode($value);
			}
		}

		sort($params, SORT_STRING);

		// must be in format 'Sun, 06 Nov 1994 08:49:37 GMT'
		$date = gmdate('D, d M Y H:i:s e');

		$query = implode('&', $params);

		$headers = array();
		$headers[] = 'Date: '.$date;
		$headers[] = 'Host: '.$this->ses->getHost();

		$auth = 'AWS3-HTTPS AWSAccessKeyId='.$this->ses->getAccessKey();
		$auth .= ',Algorithm=HmacSHA256,Signature='.$this->__getSignature($date);
		$headers[] = 'X-Amzn-Authorization: '.$auth;

		$url = 'https://'.$this->ses->getHost().'/';

		// Basic setup
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_USERAGENT, 'SimpleEmailService/php');

		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, ($this->ses->verifyHost() ? 1 : 0));
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, ($this->ses->verifyPeer() ? 1 : 0));

		// Request types
		switch ($this->verb) {
			case 'GET':
				$url .= '?'.$query;
				break;
			case 'POST':
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $this->verb);
				curl_setopt($curl, CURLOPT_POSTFIELDS, $query);
				$headers[] = 'Content-Type: application/x-www-form-urlencoded';
			break;
			case 'DELETE':
				$url .= '?'.$query;
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
			break;
			default: break;
		}
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_HEADER, false);

		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, false);
		curl_setopt($curl, CURLOPT_WRITEFUNCTION, array(&$this, '__responseWriteCallback'));
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

		// Execute, grab errors
		if (curl_exec($curl)) {
			$this->response->code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		} else {
			$this->response->error = array(
				'curl' => true,
				'code' => curl_errno($curl),
				'message' => curl_error($curl),
				'resource' => $this->resource
			);
		}

		@curl_close($curl);

		// Parse body into XML
		if ($this->response->error === false && isset($this->response->body)) {
			$this->response->body = simplexml_load_string($this->response->body);

			// Grab SES errors
			if (!in_array($this->response->code, array(200, 201, 202, 204))
				&& isset($this->response->body->Error)) {
				$error = $this->response->body->Error;
				$output = array();
				$output['curl'] = false;
				$output['Error'] = array();
				$output['Error']['Type'] = (string)$error->Type;
				$output['Error']['Code'] = (string)$error->Code;
				$output['Error']['Message'] = (string)$error->Message;
				$output['RequestId'] = (string)$this->response->body->RequestId;

				$this->response->error = $output;
				unset($this->response->body);
			}
		}

		return $this->response;
	}

	/**
	* CURL write callback
	*
	* @param resource &$curl CURL resource
	* @param string &$data Data
	* @return integer
	*/
	private function __responseWriteCallback(&$curl, &$data) {
		$this->response->body .= $data;
		return strlen($data);
	}

	/**
	* Contributed by afx114
	* URL encode the parameters as per http://docs.amazonwebservices.com/AWSECommerceService/latest/DG/index.html?Query_QueryAuth.html
	* PHP's rawurlencode() follows RFC 1738, not RFC 3986 as required by Amazon. The only difference is the tilde (~), so convert it back after rawurlencode
	* See: http://www.morganney.com/blog/API/AWS-Product-Advertising-API-Requires-a-Signed-Request.php
	*
	* @param string $var String to encode
	* @return string
	*/
	private function __customUrlEncode($var) {
		return str_replace('%7E', '~', rawurlencode($var));
	}

	/**
	* Generate the auth string using Hmac-SHA256
	*
	* @internal Used by SimpleDBRequest::getResponse()
	* @param string $string String to sign
	* @return string
	*/
	private function __getSignature($string) {
		return base64_encode(hash_hmac('sha256', $string, $this->ses->getSecretKey(), true));
	}
}