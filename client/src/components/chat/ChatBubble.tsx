
// Required Imports
import { useContext } from "react";
import classNames from "classnames";

// File Imports
import { RoomContext } from "../../context/RoomContext";
import { IMessage } from "../../types/interfaces";

export const ChatBubble: React.FC<{ message: IMessage }> = ({ message }) => {

    // Using the Web socket client instance
    const { me } = useContext(RoomContext);

    // Checking the source of the message
    const isSelf = message.author === me?.id 
    // const isSelf = true

    return (

        <div
            className = {classNames('flex', {
                'pl-10 justify-end': isSelf,
                'pr-10 justify-start': !isSelf
            })}
        >
            <div
                className = {classNames('inline-block m-1 rounded-md text-white py-2 pl-2 pr-4', {
                    'bg-user': isSelf,
                    'bg-peer': !isSelf
                })}
            >
                {/* Author */}
                {/* <div style = {{ fontSize: '12px' }} className = 'flex justify-start text-orange-200 font-bold gap-1'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" 
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    { message.author } 
                </div> */}

                {/* Message and Timestamp */}
                <div className = 'flex justify-between content-center mt-1'>
                    <p className = '' style = {{ fontSize: '14px' }}>{ message.content } </p>    
                    {/* <p className = 'text-gray-300' style = {{ fontSize: '10px', position: 'relative', bottom: '-5px', right: '-5px' }} >{ message.timestamp } </p> */}
                </div>
                
            </div>
        </div>
    )
}