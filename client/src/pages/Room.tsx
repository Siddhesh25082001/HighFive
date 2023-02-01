// Required Imports
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
// import Slider from 'react-slick'

// File Imports
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { Chat } from "../components/chat/Chat";
import { PeerState } from "../reducers/peerReducer";
// import { ShareScreenButton } from "../components/ShareScreenButton";

export const Room = () => {

    const { roomId } = useParams();

    const {
        ws,
        me,
        stream,
        peers,
        screenSharingId,
        setRoomId,
        toggleAudio,
        toggleVideo,
        shareScreen,
    } = useContext(RoomContext);

    useEffect(() => {

        // Emitting Join room event to the WebSocket server
        if (me) {
            ws.emit('join-room', { 
                roomId: roomId, 
                peerId: me._id 
            });
        } 
    }, [roomId, me, ws]);

    useEffect(() => {
        setRoomId(roomId);
    }, [roomId, setRoomId])

    // Setting the Screen sharing stream 
    const screenSharingVideo = 
        screenSharingId === me?._id
        ? stream
        : peers[screenSharingId]?.stream

    useEffect(() => {
        if (screenSharingId) console.log(`User ${screenSharingId} is sharing the sceen`);
        if (peers)  console.log('The Peers in the room are: ', peers);
    })  

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };

    return (

        <div className = 'w-full h-full flex flex-col gap-2'>

            {/* Screens */}
            <div className="screens w-full flex flex-row gap-2 p-4" style = {{ height: '88vh' }}>

                {/* Normal Gallery View (When No one is sharing the screen content) */}
                {
                    !screenSharingVideo && (
                        <div className = "w-full grid grid-cols-4 gap-2 wrap content-place-center justify-center content-center">
                            <VideoPlayer stream = {stream} />

                            {Object.values(peers as PeerState).map((peer) => (
                                    <VideoPlayer stream = {peer.stream} />
                                )
                            )}
                        </div>
                    )
                }

                {/* When Someone is screen sharing their contents */}
                {
                    screenSharingVideo && (
                        <>
                            {/* Screen Sharing Stream */}
                            <div className = "video flex basis-3/4 p-2 border-2 rounded-md">
                                <div style = {{ height: '80vh' }} ><VideoPlayer stream = {screenSharingVideo} /></div>
                            </div>

                            {/*  Video Strems */}
                            <div className = "w-1/4 grid grid-cols-2 gap-2 wrap content-place-center">

                                {/* User Stream */}
                                <VideoPlayer stream = {stream} />

                                {/* Peer Stream */}
                                {Object.values(peers as PeerState).map((peer) => (
                                        <VideoPlayer stream = {peer.stream} />
                                    )
                                )}
                            </div>
                        </>
                    )
                }

                {/* Chat Window */}
                <div className = 'border-2' style = {{ width: '30%' }}>
                    <Chat />
                </div>
                
            </div>

            {/* Controls */}
            <div className="controls flex justify-space-around gap-2 p-3 border-t-2" style = {{ height: '10vh' }}>
                
                {/* Left Controls */}
                <div className="leftControls flex w-1/3 justify-start gap-2">
                    <p className="text-sm py-2 font-medium px-4 w-auto bg-gray-200 text-black rounded-lg flex justify-start items-center">
                        Room Id: {roomId}
                    </p>
                </div>

                {/* Middle Controls */}
                <div className="middleControls flex w-1/3 justify-center gap-2">
                    
                    {/* Audio Option */}
                    <button
                        id = 'audio-toggle'
                        className = 'w-auto bg-gray-600 p-3 rounded-full text-xl hover:bg-gray-800 text-white flex justify-center items-center'
                        onClick = {toggleAudio}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>

                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                        </svg> */}
                    </button>
                    
                    {/* Video Option */}
                    <button
                        className = 'w-auto bg-gray-600 p-3 rounded-full text-xl hover:bg-gray-800 text-white flex justify-center items-center'
                        onClick = {toggleVideo}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>

                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg> */}
                    </button>
                    
                    {/* Screen Share Option */}
                    <button
                        className = 'w-auto bg-gray-600 p-3 rounded-full text-xl hover:bg-gray-800 text-white flex justify-center items-center'
                        onClick = {shareScreen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                    </button>

                </div>

                {/* Right Controls */}
                <div className="rightControls flex w-1/3 justify-end gap-2">
                    
                    {/* Participants */}
                    <button
                        className = 'w-auto bg-gray-600 p-3 rounded-full text-xl hover:bg-gray-800 text-white flex justify-center items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                    </button>
                    
                    {/* Chats */}
                    <button
                        className = 'w-auto bg-gray-600 p-3 rounded-full text-xl hover:bg-gray-800 text-white flex justify-center items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>

                    </button>

                </div>
            </div>

        </div>
    )
}