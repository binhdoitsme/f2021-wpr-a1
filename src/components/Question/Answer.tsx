import React from "react";
import { describe } from "./AnswerState";
import "./questions.css";
import { AnswerProps } from "./Types";

export const Answer = (props: AnswerProps) => {
  const { index, name, text, displayState, onAnswerChanged } = props;

  const { isSelected, isCorrect, isReview } = describe(displayState);
  const incorrectlySelected = isReview && isSelected && !isCorrect;
  const correctlySelected = isCorrect && isSelected;
  const className = [
    "answer", 
    isSelected || (isReview && isCorrect && !isSelected) ? "selected" : "",
    correctlySelected ? "correct" : "",
    incorrectlySelected ? "incorrect" : "",
  ].filter(String).join(" ").trim();
  const handleChoiceChanged = () => onAnswerChanged?.(index);
  return (
    <div className={className} onClick={handleChoiceChanged}>
      <div>
        <input type="radio" name={name}
          onChange={handleChoiceChanged}
          checked={isSelected}
          disabled={isReview}
        />
        <label>{text}</label>
      </div>
      {isReview && (isCorrect || isSelected) &&
        <span className="correctness">
          {isCorrect && "Correct answer"}
          {isSelected && !isCorrect && "Your answer"}
        </span>
      }
    </div>
  )
};