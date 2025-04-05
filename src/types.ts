export type StepType = {
  id: string,
  order: number,
  stepTitle: string,
  questions: QuestionType[]
}

export type QuestionType = {
  id: string,
  text: string,
  correctAnswer?: string,
  allAnswers?: string[],
  type: "open-answer" | "multiple-answers"
}

export type UserAnswers = {
  [key: string]: string
}