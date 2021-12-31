type TryAgainHandler = () => void;

export type ResultProps = {
  score: number;
  questionCount: number;
  remark?: string;
  handleTryAgain?: TryAgainHandler;
};
