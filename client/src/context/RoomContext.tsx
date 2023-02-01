// Required Imports
import React, { createContext, useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOCLient from 'socket.io-client'
import Peer from 'peerjs'
import { v4 as uuidV4 } from 'uuid'

// File Imports
import { peersReducer } from '../reducers/peerReducer';
import { chatReducer } from '../reducers/chatReducer';
import { addPeerAction, removePeerAction } from '../actions/peerActions';
import { addMessageAction, addHistoryAction } from '../actions/chatActions';
import { BaseLayoutProps, IMessage } from '../types/interfaces';
// import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

// Application Server
const WS = 'http://localhost:8000';

// Web Socket Client Server
const ws = socketIOCLient(WS);

// Creating a Global RoomContext
export const RoomContext = createContext<null | any>(null);

// const config: Config = {
//     dictionaries: [names]
// }

// Room Provider for the Room Context
export const RoomProvider: React.FC <BaseLayoutProps> = ({ children }) => {

    const navigate = useNavigate()

    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const [roomId, setRoomId] = useState<string>('');
    
    const [peers, peerDispatch] = useReducer(peersReducer, {});
    // const [chat, chatDispatch] = useReducer(chatReducer, {
    //     messages: [],
    // });

    const [screenSharingId, setScreenSharingId] = useState<string>('');
    // const [videoSharingId, setVideoSharingId] = useState<MediaStream>();

    // Enter room function to let the new user know to which room they have to enter
    const enterRoom = ({ roomId }: { roomId: string }) => {
        console.log('Room Id', roomId);
        navigate(`/room/${roomId}`)
    };

    // Get users function to retrieve all the existing participants in the room
    const getUsers = ({ participants }: { participants: string[] })  => {
        console.log('The Participants in the room are: ', {
            participants: participants
        })
    };

    // Send messages function to let the users to send messages in the room
    const sendMessage = (message: string) => {
        const messageData: IMessage = {
            content: message,
            timestamp: new Date().getHours() + ':' + new Date().getMinutes(),
            author: me?.id,
        }
        // chatDispatch(addMessageAction(messageData));
        ws.emit('send-message', roomId, messageData)
    }

    // Add messages function to display all the messages on the client side
    const addMessage = (message: IMessage) => {
        console.log('New Message', { message });
        // chatDispatch(addMessageAction(message));
    }

    // Get messages function to retrieve all the existing messages in the room
    const addHistory = (messages: IMessage[])  => {
        console.log('Messages', { messages });
        // chatDispatch(addHistoryAction(messages));
    };

    // Toggle Audio function to turn off and on the audio
    const toggleAudio = () => {
        console.log('Toggling audio');
        const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === 'audio');

            if (videoTrack) {
                if (videoTrack.enabled) videoTrack.enabled = false;
                else videoTrack.enabled = true;
            }
    }

    // Toggle Video function to turn off and on the video
    const toggleVideo = () => {
        const videoTrack = stream
            ?.getTracks()
            .find((track) => track.kind === 'video');

            if (videoTrack) {
                if (videoTrack.enabled) videoTrack.enabled = false;
                else videoTrack.enabled = true;
            }
    }

    // Share sceen function to let the users screen share the content
    const shareScreen = () => {
        if (screenSharingId) {
            navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(switchStream)
        }
        else {
            navigator.mediaDevices
            .getDisplayMedia({})
            .then(switchStream)
        }
    }

    // Switch stream function to switch the stream between User Video and its screen share
    const switchStream = (stream: MediaStream) => {
        setStream(stream);
        setScreenSharingId(me?.id || '');
        if (me) {
            Object.values(me.connections).forEach((connection: any) => {
                const videoTrack = stream
                    ?.getTracks()
                    .find((track) => track.kind === 'video');
                connection[0].peerConnection
                    .getSenders()[1]
                    .replaceTrack(videoTrack)
                    .catch((err: any) => console.error(err));
            })
        }
    }

    // Remove Peer function to remove the peer from the room
    const removePeer = (peerId: string) => {
        peerDispatch(removePeerAction(peerId))
    };

    useEffect(() => {

        // Creating a new user
        const meId = uuidV4();  
        // const characterName: string = uniqueNamesGenerator(config);
        
        const peer = new Peer(meId);
        setMe(peer);

        // Activating the user media (video and audio streams)
        try {
            navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
            })
        } catch (err) {
            console.log('Error', err);
        }

        // Listening to the events coming from the web socket server
        ws.on('room-created', enterRoom);
        ws.on('get-users', getUsers);
        ws.on('user-started-sharing', (peerId) => setScreenSharingId(peerId));
        ws.on('user-stopped-sharing', () => setScreenSharingId(''));
        ws.on('user-disconnected', removePeer);
        ws.on('add-message', addMessage);
        ws.on('get-messages', addHistory);

        return () => {
            ws.off('room-created');
            ws.off('user-joined');
            ws.off('get-users');
            ws.off('add-message');
            ws.off('user-started-sharing');
            ws.off('user-stopped-sharing');
            ws.off('user-disconnected');
        }

    }, []);

    useEffect(() => {

        // If the User has started screen sharing, letting the web socket server know the same by passing the peerId and roomId
        if (screenSharingId) {

            // Emmitting a Start Sharing event to the WebSocket server
            ws.emit('start-sharing', { peerId: screenSharingId, roomId }) 
        }
        else {

            // Emitting a Stopsharing event to the WebSocket server
            ws.emit('stop-sharing');
        }
    }, [screenSharingId, roomId]);

    useEffect(() => {

        if (!me) return;
        if (!stream) return;

        // Giving our own stream to all the existing users in the room
        ws.on('user-joined', ({ peerId }) => {
            const call = me.call(peerId, stream);
            call.on('stream', (peerStream) => {
                peerDispatch(addPeerAction(peerId, peerStream));
            })
        })

        // Getting all the other user streams from the room
        me.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (peerStream) => {
                peerDispatch(addPeerAction(call.peer, peerStream));
            })
        })
        
    }, [me, stream]);

    return (
        <RoomContext.Provider
            value = {
                {
                    ws,
                    me,
                    stream,
                    peers,
                    // chat,
                    screenSharingId,
                    setRoomId,
                    toggleAudio,
                    toggleVideo,
                    sendMessage,
                    shareScreen,
                }
            }
        >
            { children }
        </RoomContext.Provider>
    );
};