import React from "react";
import { Question } from "./Question";
import "./questions.css";
import { QuestionsProps } from "./Types";


export const Questions = ({ questions, answers, onAnswerChanged }: QuestionsProps) => {
  const makeAnswerChangedHandler =
    (questionId: string) => (index: number) => onAnswerChanged?.(questionId, index);
  return (
    <>
      {questions.map((question, index) =>
        <Question {...question} index={index}
          selectedAnswer={answers?.[question.id]}
          onAnswerChanged={makeAnswerChangedHandler(question.id)}
          key={`${question.id}`} />)}
    </>
  );
}