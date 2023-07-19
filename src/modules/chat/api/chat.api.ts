import { type Conversation, conversationSchema } from '../models/chat.model'
import { http } from '@/http/http'

export const getConversation = async (conversationId: string): Promise<Conversation> => {
  const response = await http.get({
    url: `/api/conversations/${conversationId}`,
    schema: conversationSchema,
  })
  return response
}

export const postConversation = async (): Promise<Conversation> => {
  const response = await http.post({
    url: '/api/conversations',
    schema: conversationSchema,
  })
  return response
}

export const postMessage = async (conversationId: string, message: string): Promise<Conversation> => {
  const response = await http.post({
    url: `/api/conversations/${conversationId}/messages`,
    schema: conversationSchema,
    data: {
      message,
    },
  })

  return response
}
