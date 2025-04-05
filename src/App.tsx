import { useEffect, useState } from 'react'
import './css/App.css'
import './css/fonts.css'
import useContentful from './useContentful'
import { StepType } from './types'
import StepComponent from './components/StepComponent'

export default function App() {
  const [steps, setSteps] = useState<StepType[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const { getSteps } = useContentful()

  useEffect(() => {
    getSteps().then(data => {
      if (data) setSteps(data)
    })
  }, [])

  return (
    <main>
      {!quizStarted &&
        <div className='start-container'>
          <h1 className='quiz-title'>Quiz Time</h1>
          <h2 className='quiz-description'>Ready to Get Quizzical?</h2>
          <button className='start-btn'
          onClick={() => setQuizStarted(prev => !prev)}>Begin!</button>
        </div>
      }
      {quizStarted && steps.length > 0 && <StepComponent steps={steps} setQuizStarted={setQuizStarted} />}
    </main>
  )
}