// isReview--isSelected--isCorrect
export enum AnswerState {
  SELECTED_CORRECT = 0b111,
  SELECTED_INCORRECT = 0b110,
  NOT_SELECTED_CORRECT = 0b101,
  NOT_SELECTED_NOT_CORRECT = 0b100,
  SELECTED = 0b010,
  NOT_SELECTED = 0b000,
}

export function describe(state: AnswerState) {
  return {
    isReview: state - 0b100 >= 0,
    isSelected: state - 0b100 >= 0 ? state - 0b110 >= 0 : state - 0b10 >= 0,
    isCorrect: state % 0b10 > 0,
  };
}

type AnswerStateOptions = {
  isReview: boolean;
  isSelected: boolean;
  isCorrect: boolean;
};

export function wrapAsAnswerState(options: AnswerStateOptions) {
  const { isReview, isSelected, isCorrect } = options;
  const bitShiftByIndex = (val: number, index: number) => val << index;
  const bySum = (x: number, y: number) => x + y;
  return [isCorrect, isSelected, isReview]
    .map(Number)
    .map(bitShiftByIndex)
    .reduce(bySum);
}