import { createClient } from "contentful"
import { StepType } from "./types"

export default function useContentful() {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
  })

  const getSteps = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "step"
      })
      return entries.items.reverse().map(item => {
        const rawStep = item.fields

        return {
          order: rawStep.order,
          stepTitle: rawStep.stepTitle,
          questions: (rawStep.questions as any[]).map((q: any) => ({
            id: q.fields.id,
            text: q.fields.text,
            type: q.fields.type,
            correctAnswer: q.fields.correctAnswer,
            allAnswers: q.fields.allAnswers ?? []
          }))
        } as StepType 
      })
    } catch (error) {
      console.log(`some error happened in getSteps: ${error}`)
    }
  }

  return { getSteps }
}