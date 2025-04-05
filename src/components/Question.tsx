import '../css/Question.css'
import { QuestionType } from '../types'

type QuestionProps = {
  text: string,
  multipleChoice?: React.ReactNode,
  openAnswer?: React.ReactNode,
  type: QuestionType['type']
}

export default function Question({ text, multipleChoice, openAnswer, type }: QuestionProps) {
  return (
    <div className='question-wrapper'>
      {type === 'multiple-answers' ? <p className='question-text'>{text}</p> : null}
      {type === 'multiple-answers' ? <div className='multiple-container'>{multipleChoice}</div> : openAnswer}
    </div>
  )
}