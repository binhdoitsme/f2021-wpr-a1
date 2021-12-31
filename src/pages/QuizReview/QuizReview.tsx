import React from "react";
import { Questions } from "../../components/Question";
import { QuestionsProps } from "../../components/Question/Types";
import { Result } from "../../components/Result";
import { Question } from "../../models/Questions";

export function QuizReview(props: QuestionsProps) {
  const { questions, answers, remark, handleRetry } = props;
  
  const correctlyAnswered = (q: Question) =>
    q.correctAnswer !== undefined && q.correctAnswer === q.selectedAnswer
  
  const score = questions.map(correctlyAnswered).filter(Boolean).length;
  return (
    <>
      <Questions questions={questions} answers={answers} />
      <br />
      <Result score={score} questionCount={questions.length}
        remark={remark} handleTryAgain={handleRetry} />
    </>
  )
}
