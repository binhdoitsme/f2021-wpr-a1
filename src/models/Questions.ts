export class Question {
  constructor(
    readonly id: string,
    readonly text: string,
    readonly answers: string[],
    readonly selectedAnswer?: number,
    readonly correctAnswer?: number
  ) { }
}
