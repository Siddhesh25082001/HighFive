import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomContext";

export const ChatInput: React.FC = () => {

    const [message, setMessage] = useState('');
    const { sendMessage } = useContext(RoomContext)

    return (
        <form 
            className = 'chat-input h-1/10 bg-peer p-3 text-white flex justify-between content-center relative'
            onSubmit = {
                (e) => {
                    e.preventDefault();
                    sendMessage(message)
                    setMessage('');
                }
            }
        >
            
            <button>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
            </button>

            <input 
                style = {{ border: '1px solid #fff', outline: 'none', color: 'white', overflowY: 'scroll' }}
                className = 'border rounded w-4/5 p-2 bg-peer'
                onChange = {(e) => setMessage(e.target.value)}
                value = {message}
                placeholder = 'Types a message here...'
            />

            <button
                type = "submit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>

        </form>
    )
}