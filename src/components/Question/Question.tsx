import React from "react";
import { Answer } from "./Answer";
import { wrapAsAnswerState } from "./AnswerState";
import { QuestionProps } from "./Types";


export const Question = (props: QuestionProps) => {
  const { id, text, index } = props;
  const { answers, correctAnswer, selectedAnswer } = props

  const shouldNotDisable = correctAnswer === undefined;
  const onAnswerChanged = (_index: number) => shouldNotDisable && props.onAnswerChanged?.(_index);

  const getDisplayState = (_index: number) =>
    wrapAsAnswerState({
      isReview: !shouldNotDisable,
      isCorrect: shouldNotDisable ? false : _index === correctAnswer,
      isSelected: selectedAnswer === _index,
    });
  const renderedAnswers = answers.map((answerText, _index) =>
    <Answer index={_index}
      onAnswerChanged={onAnswerChanged}
      displayState={getDisplayState(_index)}
      name={id} text={answerText}
      key={`${id}_${_index}`} />);
  return (
    <div>
      <br />
      <div className="text-large semibold">Question {index + 1}: {text}</div>
      <br />
      <div className="answer-group">
        {renderedAnswers}
      </div>
    </div>
  );
};