import React from "react";
import { ResultProps } from "./Types";
import "./result.css";

export function Result(props: ResultProps) {
  const { score, questionCount, remark } = props;
  const { handleTryAgain } = props;
  return <div className="result">
    <h1 className="title">Result:</h1>
    <div className="score">{score}/{questionCount}</div>
    <strong className="percentage">{Math.round(score / questionCount * 100)}%</strong>
    <div className="remarks">{remark}</div>
    <div>
      <button className="btn blue" onClick={handleTryAgain}>Try again</button>
    </div>
  </div>;
}
