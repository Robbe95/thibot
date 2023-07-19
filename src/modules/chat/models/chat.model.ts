import { z } from 'zod'

// change date to 2 hours later funciton
export const addHours = (date: Date, hours: number): Date => {
  const copy = new Date(Number(date))
  copy.setHours(date.getHours() + hours)
  return copy
}
export const messageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['user', 'assistant']),
  message: z.string(),
  created_at: z.string().transform(value => addHours(new Date(value), 2)),
  updated_at: z.string().transform(value => addHours(new Date(value), 2)),
})

export const conversationSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().transform(value => addHours(new Date(value), 2)),
  updated_at: z.string().transform(value => addHours(new Date(value), 2)),
  messages: z.array(messageSchema),
})

export type Message = z.infer<typeof messageSchema>
export type Conversation = z.infer<typeof conversationSchema>
