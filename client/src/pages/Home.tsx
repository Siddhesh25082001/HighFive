// Required Imports
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const Home = () => {

    // Using the Web socket client instance
    const { ws } = useContext(RoomContext);

    // Ceate room function emitting a create-room event to the WebSocket server
    const createRoom = () => {
        ws.emit("create-room");
    }

    return (
        <div className = "App flex items-center justify-center content-center w-screen h-screen">
            <button
                className = 'bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white'
                onClick = {createRoom}
            >
                Start New Meeting
            </button>
        </div>
    )
};