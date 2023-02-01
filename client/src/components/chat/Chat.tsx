// Required Imports
import { useContext } from "react"

// File Imports
import { RoomContext } from "../../context/RoomContext"
import { IMessage } from "../../types/interfaces"
import { ChatBubble } from "./ChatBubble"
import { ChatInput } from "./ChatInput"

export const Chat: React.FC = ({}) => {

    const { chat } = useContext(RoomContext);

    return (
        <div
            className = "chat-container flex flex-col h-full justify-between text-sm"
            data-testid = "chat"
        >

            {/* Chat Header */}
            <div className = 'chat-heading h-1/10 bg-peer p-3 flex justify-between content-center text-white'>
                <p>In Call Messages</p>
                <svg 
                    style = {{ cursor: 'pointer' }}
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} stroke="currentColor" 
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            {/* Chats Body */}
            <div className = 'chats mx-1 scrollbar-hide' style = {{ minHeight: '80%', maxHeight: '80%', overflowY: 'scroll'  }}>
                {/* {
                    chat.messages && chat.messages.length > 0 && chat.messages.map((message: IMessage) => (
                        <ChatBubble
                            message = { message }
                        />
                    ))
                } */}
                HELLO
            </div>

            {/* Chat Inputs */}
            <div>
                <ChatInput />
            </div>
        </div>
    )
}