// components/MessageList.tsx
import React, { useRef, useEffect } from 'react'
import { ScrollView } from 'react-native'
import MessageBubble from './MessegeBubble'

interface MessageListProps {
  messages: Array<{ content: string; role: string }>
  loading: boolean
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
      className="h-screen w-screen mb-2"
      showsVerticalScrollIndicator={true}
    >
      {messages?.map((msg, index) => (
        <MessageBubble
          key={index}
          content={msg.content}
          role={msg.role}
          loading={loading}
        />
      ))}
    </ScrollView>
  )
}

export default MessageList
