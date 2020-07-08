<?php

include_once __DIR__ . '/../models/testpost.php';
header('Content-Type: application/json');
if ($_REQUEST['action'] === 'index') {
  echo json_encode(Questions::all());
} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_question = new Question(null, $body_object->question, $body_object->answer1, $body_object->answer2, $body_object->answer3, $body_object->answer4, $body_object->tags);
  $all_questions = Questions::create($new_question);
  echo json_encode($all_posts);
} else if ($_REQUEST['action'] === 'update') {
  $request_body = file_get_contents('php://input');
  $body_object= json_decode($request_body);
  $update_question = new Question($_REQUEST['id'], $body_object->question, $body_object->answer1, $body_object->answer2, $body_object->answer3, $body_object->answer4, $body_object->tags);
  $all_questions = Questions::update($update_question);
  echo json_encode($all_questions);
} else if ($_REQUEST['action'] === 'delete') {
  $all_questions = Questions::delete($_REQUEST['id']);
  echo json_encode($all_questions);
}

?>
