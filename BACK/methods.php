<?php

// header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');

define( "GET", "GET" );
define( "POST", "POST" );
define( "PUT", "PUT" );
define( "DELETE", "DELETE" );
define( "OPTIONS", "OPTIONS" );

function connect() {
  $host_name = 'db5001024440.hosting-data.io';
  $database = 'dbs885427';
  $user_name = 'dbu363010';
  $password = '%jT,Cs9,Lyek$ZVwUbKNmF-$<e<7Ku2*';
  return new PDO( "mysql:host=$host_name; dbname=$database;", $user_name, $password );
}

function answer( $code, $resp ) {
  http_response_code( $code );
  $json = json_encode( $resp );
  header('Content-length: '.strlen($json));
  exit( $json );
}
class Requete {
  var $url;
  var $verb;
  var $headers;
  var $body;

  function __construct() {
    $this->verb = $_SERVER[ "REQUEST_METHOD" ];
    $this->url = preg_replace( '/\A\/?v1/', '', parse_url( $_SERVER[ 'REQUEST_URI' ] )[ "path" ] );
    $headers = getallheaders();
    switch ( $this->verb ) {
      case GET:
        $this->body = $_GET;
        break;
      case POST:
      case PUT:
        $this->body = json_decode( file_get_contents( "php://input" ) );
        break;
      case DELETE:
        $this->body = null;
        break;
      default:
        answer( 405, 'Method not allowed : Only POST, GET, PUT, DELETE and OPTIONS methods are authorized within this API.' );
        break;
    }
  }
}
class Router {

  private $POST_ROUTES = array();
  private $GET_ROUTES = array();
  private $PUT_ROUTES = array();
  private $DELETE_ROUTES = array();

  function __construct() {}

  function execute( Requete $requete ) {
    $this->verb(
      $requete->verb,
      function ( & $a, $req ) {
        $this->route(
          $a,
          $req
        );
      },
      $requete
    );
  }

  function verb( $verb, $callback, $req = null, $route = null, $action = null ) {
    switch ( $verb ) {
      case GET:
        $callback( $this->GET_ROUTES, $req, $route, $action );
        break;
      case POST:
        $callback( $this->POST_ROUTES, $req, $route, $action );
        break;
      case PUT:
        $callback( $this->PUT_ROUTES, $req, $route, $action );
        break;
      case DELETE:
          $callback( $this->DELETE_ROUTES, $req, $route, $action );
          break;
      default:
        answer( 500, 'Internal server error verb:100' );
        break;
    }
  }

  function addRoute( $verb, $route, $action ) {
    $this->verb(
      $verb,
      function ( & $a, $b, $route, $action ) {
        $a[ $route ] = $action;
      },
      null,
      $route,
      $action
    );
  }

  function route( array $listOf, Requete $requete ) {
    $iterateur = 0;
    $keys = array_keys( $listOf );
    $size = count( $keys );
    while ( $iterateur < $size ):
      if ( preg_match( '/\A\/?' . $keys[ $iterateur ] . '\/?\z/', $requete->url ) ) {
        break;
      } else {
        $iterateur += 1;
      }
    endwhile;
    if ( $iterateur == $size ) {
      answer( 400, 'Bad request : Either the route has not been found or the method was not allowed on the route.' );
    }
    $listOf[ $keys[ $iterateur ] ]( $requete );
  }
}

?>
