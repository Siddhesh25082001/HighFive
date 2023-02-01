// Required Imports
import { ReactNode } from "react";  

// Room Context Interface
export interface BaseLayoutProps {
    children?: ReactNode;
}

// Chat Message Interface
export interface IMessage {
    content: string;
    author?: string;
    timestamp: string;
}