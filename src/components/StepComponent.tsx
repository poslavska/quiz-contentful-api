import { StepType, UserAnswers } from "../types"
import '../css/Step.css'
import Question from "./Question"
import { useState } from "react"
import ResultsComponent from "./ResultsComponent"

type StepsProps = {
  steps: StepType[],
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StepComponent({ steps, setQuizStarted}: StepsProps) {
  const [currentStepNumber, setCurrentStepNumber] = useState(steps[0].order - 1) // making the steps to be zero-indexed to match their ids
  const currentStep = steps[currentStepNumber]
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [correctCount, setCorrectCount] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showResults, setShowResults] = useState(false)

  function goToPreviousStep() {
    setCurrentStepNumber(prev => prev - 1)
  }

  function goToNextStep() {
    setCurrentStepNumber(prev => prev + 1)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {value, name} = event.target
    setUserAnswers(prevAnswers => {
      if (value.trim() === "") {
        const updatedAnswers = { ...prevAnswers }
        delete updatedAnswers[name]
        return updatedAnswers
      } else {
        return {...prevAnswers, [name]: value}
      }
    })
  }

  function checkAnswers(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let correct = 0
    let total = 0

    steps.forEach(step => {
      step.questions.forEach(question => {
        if (question.text !== 'What is your name?') {
          const userAnswer = userAnswers[question.text]?.trim().toLowerCase()
          const correctAnswer = question.correctAnswer?.trim().toLowerCase()
          
          if (userAnswer && correctAnswer && userAnswer === correctAnswer) {
            correct++
          }
          total++
        }
      })
    })

    setCorrectCount(correct)
    setTotalQuestions(total)
    setShowResults(true)
  }

  return (
    <>
      {showResults && <ResultsComponent userName={userAnswers['What is your name?']} setQuizStarted={setQuizStarted} correctCount={correctCount} totalQuestions={totalQuestions} />}
      {!showResults && <section className='step-container'>
        <p className='progress-title'>Progress: {currentStep.order}/{steps.length}</p>
        <span className='separator-span'></span>
        <p className='step-title'>{currentStep.stepTitle}</p>
        <form className='questions-form' onSubmit={checkAnswers}>
          <div className='questions-container'>
            {currentStep.questions.map(question => {
              return <Question 
                key={question.id}
                text={question.text}
                type={question.type}
                multipleChoice={question.type === 'multiple-answers' ? (
                  question.allAnswers?.map(option => (
                    <label className='answers-container' key={`${question.id}-${option}`}>
                      <input type='radio' required
                      value={option}
                      checked={userAnswers[question.text] === option}
                      onChange={handleChange}
                      name={question.text} />
                      <p>{option}</p>
                    </label>
                  )) 
                  ) : null
                }
                openAnswer={question.type === 'open-answer' && (
                  <label className='answer-textfield'>
                    <p className='answer-label'>{question.text}</p>
                    <input type='text' required
                    className='open-answer-input'
                    onChange={handleChange}
                    name={question.text}
                    placeholder={currentStepNumber === 0 ? "Ben" : "1933"}
                    value={userAnswers[question.text] || ""} />
                  </label>
                )}
                /> 
              })
            }
          </div>
          <div className='navigation-btns'>
            <button 
            type="button"
            className='previous-btn'
            disabled={currentStepNumber === 0}
            onClick={goToPreviousStep}>
              ← Previous
            </button>
            <button
            type="button"
            className='next-btn'
            disabled={currentStep.questions.some(q => !userAnswers[q.text]?.trim()) || currentStepNumber + 1 === steps.length}
            onClick={goToNextStep}
            >Next →</button>
          </div>
          <button 
          type="submit"
          className='submit-btn'
          disabled={currentStepNumber + 1 !== steps.length}
          >Submit</button>
        </form>
      </section>
    }
  </>
  )
}