import { Question as QuestionModel } from "../../models/Questions";
import { AnswerState } from "./AnswerState";

export type AnswerChangedHandler = (answer: number) => any;

export type AnswerProps = {
  name: string;
  text: string;
  displayState: AnswerState;
  onAnswerChanged?: AnswerChangedHandler;
} & WithIndex;

export type QuestionsProps = {
  questions: QuestionModel[];
  answers: { [question: string]: number | undefined };
  onAnswerChanged?: (question: string, answer: number) => void;
  remark?: string;
  handleSubmit?: () => void;
  handleRetry?: () => void;
};

type WithIndex = { index: number };

export type QuestionProps = QuestionModel &
  WithIndex & { onAnswerChanged?: AnswerChangedHandler };
