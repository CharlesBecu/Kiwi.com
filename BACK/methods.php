<?php

// header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');

define('GET', 'GET');
define('POST', 'POST');
define('PUT', 'PUT');
define('DELETE', 'DELETE');
define('OPTIONS', 'OPTIONS');

function connect()
{
    $host_name = 'db5001024440.hosting-data.io';
    $database = 'dbs885427';
    $user_name = 'dbu363010';
    $password = '%jT,Cs9,Lyek$ZVwUbKNmF-$<e<7Ku2*';
    return new PDO(
        "mysql:host=$host_name; dbname=$database;",
        $user_name,
        $password
    );
}

function answer($code, $resp)
{
    http_response_code($code);
    $json = json_encode($resp);
    header('Content-length: ' . strlen($json));
    exit($json);
}
function answerHTML($code, $resp)
{
    http_response_code($code);
    header('Content-length: ' . strlen($resp));
    exit($resp);
}
class Requete
{
    var $url;
    var $verb;
    var $headers;
    var $body;

    function __construct()
    {
        $this->verb = $_SERVER['REQUEST_METHOD'];
        $this->url = preg_replace(
            '/\A\/?v1/',
            '',
            parse_url($_SERVER['REQUEST_URI'])['path']
        );
        $this->headers = $_SERVER;
        switch ($this->verb) {
            case GET:
                $this->body = $_GET;
                break;
            case POST:
            case PUT:
                $this->body = json_decode(file_get_contents('php://input'));
                break;
            case DELETE:
                $this->body = null;
                break;
            default:
                answer(
                    405,
                    'Method not allowed : Only POST, GET, PUT, DELETE and OPTIONS methods are authorized within this API.'
                );
                break;
        }
    }
}
class Router
{
    private $POST_ROUTES = [];
    private $GET_ROUTES = [];
    private $PUT_ROUTES = [];
    private $DELETE_ROUTES = [];

    function __construct()
    {
    }

    public function execute(Requete $requete)
    {
        $this->verb(
            $requete->verb,
            function (&$a, $req) {
                $this->route($a, $req);
            },
            $requete
        );
    }

    public function verb(
        $verb,
        $callback,
        $req = null,
        $route = null,
        $action = null
    ) {
        switch ($verb) {
            case GET:
                $callback($this->GET_ROUTES, $req, $route, $action);
                break;
            case POST:
                $callback($this->POST_ROUTES, $req, $route, $action);
                break;
            case PUT:
                $callback($this->PUT_ROUTES, $req, $route, $action);
                break;
            case DELETE:
                $callback($this->DELETE_ROUTES, $req, $route, $action);
                break;
            default:
                answer(500, 'Internal server error');
                break;
        }
    }

    public function addRoute($verb, $route, $action)
    {
        $this->verb(
            $verb,
            function (&$a, $b, $route, $action) {
                $a[$route] = $action;
            },
            null,
            $route,
            $action
        );
    }

    public function route(array $listOf, Requete $requete)
    {
        $iterateur = 0;
        $keys = array_keys($listOf);
        $size = count($keys);
        while ($iterateur < $size):
            if (
                preg_match(
                    '/\A\/?' . $keys[$iterateur] . '\/?\z/',
                    $requete->url
                )
            ) {
                break;
            } else {
                $iterateur += 1;
            }
        endwhile;
        if ($iterateur == $size) {
            answer(
                400,
                'Bad request : Either the route has not been found or the method was not allowed on the route.'
            );
        }
        $listOf[$keys[$iterateur]]($requete);
    }
}

function sendValidationMail($to, $name, $tok, $id)
{
    // Mdp mail noreply@job-kiwi.com : ezCT5RPtt3m558s-
    $from = 'noreply@job-kiwi.com';
    $object = $name . ', validate your account on Kiwi.com';
    $message = valmess($id, $tok);
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
    $headers .= 'From: Kiwi.com <noreply@job-kiwi.com>' . "\r\n";
    return mail($to, $object, $message, $headers);
}
function getCompanyName($id)
{
    $dbh = connect();
    $dbh_reponse = $dbh->query(
        'SELECT `ID`, `NAME` FROM `COMPANY` WHERE `ID`=' . $id
    );
    $resp;
    while ($data = $dbh_reponse->fetch()) {
        unset($data[0]);
        unset($data[1]);
        $resp = $data;
    }
    $dbh_reponse->closeCursor();
    return $resp;
}
function valmess($id, $tok)
{
    return preg_replace(
        '/\$tok/',
        $tok,
        preg_replace('/\$id/', $id, file_get_contents('valmail.html'))
    );
}

class JWToken
{
    private $header;
    private $payload;
    private string $secret;
    private $signature;
    private $full;
    private base222 $base;

    function setPayload($id, $mail, $lvl, $exp)
    {
        $this->payload = [
            'sub' => $id,
            'adr' => $mail,
            'lvl' => $lvl,
            'exp' => $exp,
        ];
        $this->encode();
    }
    function setHeader()
    {
        $this->header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $this->encode();
    }
    function __construct()
    {
        $this->base = new base222();
    }
    public function __get($name)
    {
        return $this->{$name};
    }
    public function __set($name, $value)
    {
        $this->{$name} = (string) $value;
        switch ($name) {
            case 'full':
                $this->decode();
                break;
            case 'secret':
            case 'header':
            case 'payload':
                $this->encode();
                break;
            default:
                break;
        }
    }
    function decode()
    {
        $parts = explode('.', $this->full);
        if (count($parts) == 3) {
            $this->header = json_decode(base64URL_decode($parts[0]));
            $this->payload = json_decode(base64URL_decode($parts[1]));
            $this->signature = $parts[2];
        }
    }
    function encode()
    {
        if (
            !empty($this->header) &&
            !empty($this->payload) &&
            !empty($this->secret)
        ) {
            $this->full = base64URL_encode(json_encode($this->header)) . '.';
            $this->full .= base64URL_encode(json_encode($this->payload));
            $this->signature = hash_hmac(
                'sha256',
                $this->full,
              bcpurge($this->base->decode($this->secret)),
                true
            );
            $this->full .= '.' . base64URL_encode($this->signature);
        }
    }

    public static function verify($token, $secret){
        $parts = explode('.', $token);
        if (count($parts) != 3) {
            return false;
        }
        $base =new base222();
        $sign = base64URL_encode(hash_hmac(
            'sha256',
            $parts[0] . '.' . $parts[1],
        bcpurge($base->decode($secret)),
            true
        ));
        return $parts[2] == $sign;
    }
}
function base64URL_encode($a)
{
    return rtrim(strtr(base64_encode($a), '+/', '-_'), '=');
}
function base64URL_decode($a)
{
    return base64_decode(strtr($a, '-_', '+/'));
}
function bcpurge($a)
{
    return rtrim(rtrim($a, '0'), '.');
}
class base222
{
    function encode($int)
    {
        $res = '';
        $this->a($int, $res);
        return preg_replace('/^!/', '', strrev($res));
    }
    function a($g, &$res)
    {
        $b = bcdiv($g, '222', 500);
        if (bcdiv($b, 222, 500)[0] != '0') {
            $res = $this->a(explode('.', $b)[0], $res) . $res;
        } else {
            $res = $this->decode_222((int) $b) . $res;
        }
        $res = $this->decode_222((int) bcmod($g, '222', 500)) . $res;
    }
    function decode($str)
        {
            $str = strrev($str);
            $res = '0';
            for ($i = 0; $i < strlen($str); $i++) {
                // echo 'decode : ',$str[$i], ' | ', $this->encode_222($str[$i]),'<br>';
                $res = bcadd(
                    $res,
                    bcmul(
                        $this->encode_222($str[$i]),
                        bcpow('222', $i, 500),
                        500
                    ),
                    500
                );
            }

            return $res;
        }
        function encode_222(string $str)
        {
            $ascii = ord($str);
            return $ascii <= 126 ? $ascii - 33 : $ascii - 34;
        }
        function decode_222(int $str)
        {
            return $str < 222 ? chr($str + 33) : chr($str + 34);
        }
}
function tokenize($req){
    $token = rtrim(preg_replace('/^\s*[Bb]earer\s*/', '', $req->headers['REDIRECT_HTTP_AUTHORIZATION']));
    if(empty($token)){
        answer(401,'No token');
    }
    $id = json_decode(base64URL_decode(explode('.',$token)[1]))->sub;
    $bdd = connect();
    $sql = 'SELECT `PASSWORD` FROM `USERS` WHERE `ID`=' . $id;
    $bdd_reponse = $bdd->query($sql);
    $data = $bdd_reponse->fetch(PDO::FETCH_OBJ);
    $bdd_reponse->closeCursor();

    if(empty($data->PASSWORD)){return null;}
    if( JWToken::verify($token,$data->PASSWORD)){
        $p = json_decode(base64URL_decode(explode('.',$token)[1]));
        return $p->exp > time() ? $p : null;
    }else{
        return null;
    }

}
?>
