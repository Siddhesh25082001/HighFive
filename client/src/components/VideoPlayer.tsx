// Required Imports
import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC <{ stream: MediaStream }> = ({ stream }) => {
    
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video className = 'rounded-lg w-full h-full' ref = {videoRef} autoPlay muted />
    )
};