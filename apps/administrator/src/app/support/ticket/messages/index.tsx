import { AvatarWithStatus } from "@/components"
import { ScrollArea } from "@/components/ui"
import { Message } from "@/lib/api/v0/support/support-types"
import { useAuthStore } from "@/store"
import Image from "next/image"

import { useEffect, useRef } from "react"

interface MessagesProps {
  messages: Message[]
  myUserId: string
}

export const Messages: React.FC<MessagesProps> = ({ messages, myUserId }) => {
  const { onlineUsers } = useAuthStore()

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-[calc(100%-120px)]">
      {messages.map((message) => {
        const isMe = message.sender.id === myUserId
        return (
          <div
            key={message.id}
            className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`flex items-end space-x-2 ${isMe ? "flex-row-reverse" : ""}`}
            >
              <AvatarWithStatus
                alt={message.sender.name}
                src={message.sender.profilePic}
                status={
                  onlineUsers.has(message.sender.id) ? "online" : "offline"
                }
              />
              <div
                className={`max-w-sm rounded-lg p-3 ${isMe ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
              >
                {message.message && <p>{message.message}</p>}

                {message.imageUrls?.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt="attachment"
                    className="mt-2 max-h-44 rounded object-contain"
                    width={200}
                    height={200}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}

      <div ref={bottomRef} />
    </ScrollArea>
  )
}
