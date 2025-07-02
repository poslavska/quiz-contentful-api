import Confetti from "react-confetti"
import '../css/Results.css'

type ResultsProps = {
  correctCount: number,
  userName: string,
  totalQuestions: number,
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResultsComponent({ userName, setQuizStarted, correctCount, totalQuestions }: ResultsProps) {
  return (
    <section className='results-container'>
      {correctCount === totalQuestions && <Confetti />}
      <p className='results-text'>
        {correctCount === totalQuestions ? 'Congrats,' : null} {userName}, you got <span className='results-bold'>{correctCount}</span> correct answer{correctCount > 1 ? 's' : ''} out of <span className='results-bold'>{totalQuestions}</span> questions!
      </p>
      <button className='reset-btn'
        onClick={() => setQuizStarted(prev => !prev)}>New game</button>
    </section>
  )
}