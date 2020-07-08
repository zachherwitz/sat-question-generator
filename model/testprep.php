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
$dbconn = pg_connect("host=localhost dbname=phpapi");
}

class Question {
  public $id;
  public $question;
  public $answer1;
  public $answer2;
  public $answer3;
  public $answer4;
  public $tags;
  public $correctanswer;

  public function __construct($id, $question, $answer1, $answer2, $answer3, $answer4, $tags, $correctanswer){
    $this->id = $id;
    $this->question = $question;
    $this->answer1 = $answer1;
    $this->answer2 = $answer2;
    $this->answer3 = $answer3;
    $this->answer4 = $answer4;
    $this->tags = $tags;
    $this->correctanswer = $correctanswer;
  }
}

class Questions {
  // READ //
  static function all() {
    //empty array to hold all questions
    $questions = [];

    $results = pg_query("SELECT * FROM questions");

    $row_object = pg_fetch_object($results);
    while($row_object){
      $new_question = new Question(
        intval($row_object->id),
        $row_object->question,
        $row_object->answer1,
        $row_object->answer2,
        $row_object->answer3,
        $row_object->answer4,
        $row_object->tags,
        $row_object->correctanswer,
      );
      $questions[] = $new_question;
      $row_object = pg_fetch_object($results);
    }
    return $questions;
  }

  // CREATE //
  static function create($question) {
    $query = "INSERT INTO questions (question, answer1, answer2, answer3, answer4, tags, correctanswer) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    $query_params = array($question->question, $question->answer1, $question->answer2, $question->answer3, $question->answer4, $question->tags, $question->correctanswer);
    pg_query_params($query, $query_params);
    return self::all();
  }

  // UPDATE //
  static function update($updated_question) {
    $query = "UPDATE questions SET question = $1, answer1 = $2, answer2 = $3, answer3 = $4, answer4 = $5, tags = $6, correctanswer = $7 WHERE id = $8";
    $query_params = array($updated_question->question, $updated_question->answer1, $updated_question->answer2, $updated_question->answer3, $updated_question->answer4, $updated_question->tags, $updated_question->correctanswer, $updated_question->id);
    $result = pg_query_params($query, $query_params);
    return self::all();
  }

  // DELETE //
  static function delete($id) {
    $query = "DELETE FROM questions WHERE id = $1";
    $query_params = array($id);
    $result = pg_query_params($query, $query_params);
    return self::all();
  }
}

?>
