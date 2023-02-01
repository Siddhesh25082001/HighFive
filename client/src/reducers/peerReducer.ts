// File Imports
import { ADD_PEER, REMOVE_PEER } from "../actions/peerActions";

// Exporting the Peer State
export type PeerState = Record<string, { stream: MediaStream }>

// Possible Types of Actions changing the state of the application
type PeerAction = 

        {   type: typeof ADD_PEER,  payload: { peerId: string, stream: MediaStream }    } | 
        {   type: typeof REMOVE_PEER, payload: { peerId: string }   }

        export const peersReducer = (state: PeerState, action: PeerAction) => {
            
            switch (action.type) {
                
                case ADD_PEER:
                    return {
                        ...state,
                        [ action.payload.peerId ]: {
                            stream: action.payload.stream
                        }
                    };

                case REMOVE_PEER:
                    const { [ action.payload.peerId ]: deleted, ...rest } = state;
                    return rest;

                default:
                    return {
                        ...state
                    } 
            }
        };
