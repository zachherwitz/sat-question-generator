<?php 
$dbconn = null;
if(getenv('DATABASE_URL')){
$connectionConfig = parse_url(getenv('DATABASE_URL'));
$host = $connectionConfig['host'];
$user = $connectionConfig['user'];
$password = $connectionConfig['pass'];
$port = $connectionConfig['port'];
$dbname = trim($connectionConfig['path'],'/');
$dbconn = pg_connect(
"host=".$host." ".
"user=".$user." ".
"password=".$password." ".
"port=".$port." ".
"dbname=".$dbname
);
} else {
$dbconn = pg_connect("host=localhost dbname=sat");
}

class Question {
  public $id; 
  public $question;
  public $text;
  public $answer1;
  public $answer2;
  public $answer3;
  public $answer4;
  public $tags;
  public $correctanswer;

  public function __construct($id, $question, $text, $answer1, $answer2, $answer3, $answer4, $tags, $correctanswer){
    $this->id = $id;
    $this->question = $question;
    $this->text=$text;
    $this->answer1 = $answer1;
    $this->answer2 = $answer2;
    $this->answer3 = $answer3;
    $this->answer4 = $answer4;
    $this->tags = $tags;
    $this->correctanswer = $correctanswer;
  }
}

class Questions {
  static function all() {
    //empty array to hold all questions
    $questions = [];

    $results = pg_query("SELECT * FROM questions");

    $row_object = pg_fetch_object($results);
    while($row_object){
      $new_question = new Question(
        intval($row_object->id),
        $row_object->question,
        $row_object->text,
        $row_object->answer1, 
        $row_object->answer2,
        $row_object->answer3,
        $row_object->answer4,
        $row_object->tags
        $row_object->correctanswer,
      );
      $questions[] = $new_question;
      $row_object = pg_fetch_object($results);
    }
    return $questions;
  }


}

?>