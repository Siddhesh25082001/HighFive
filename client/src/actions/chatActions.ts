// Files Import
import { IMessage } from "../types/interfaces";

// Exporting the action types
export const ADD_MESSAGE = 'ADD_MESSAGE' as const;
export const ADD_HISTORY = 'ADD_HISTORY' as const;

// Add Peer Action type
export const addMessageAction = (message: IMessage) => ({
    type: ADD_MESSAGE,
    payload: { message }
});

// Remove Peer Action type
export const addHistoryAction = (history: IMessage[]) => ({
    type: ADD_HISTORY,
    payload: { history }
});