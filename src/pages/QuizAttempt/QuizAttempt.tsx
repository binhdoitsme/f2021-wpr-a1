import React from "react";
import { Questions } from "../../components/Question";
import { QuestionsProps } from "../../components/Question/Types";
import "./attempts.css";

export function QuizAttempt(props: QuestionsProps) {
  const { handleSubmit } = props;
  return (
    <>
      <Questions {...props} />
      <div className="submit">
        <button className="btn green" onClick={handleSubmit}>Submit your answers</button>
      </div>
    </>
  )
}
