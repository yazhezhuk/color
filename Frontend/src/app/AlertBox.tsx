// AlertBox.tsx
import React, {useEffect, useState} from "react";

type AlertProps = {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    onClose?: () => void;
    style?: React.CSSProperties
};

const alertColors = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export const AlertBox = ({ message,duration = 3000, type = 'info', onClose, style }: AlertProps) => {
    const [visible, setVisible] = useState(false);
    const [durationExpired, setDurationExpired] = useState(false);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setDurationExpired(true);
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    useEffect(() => {
        if (!visible && onClose && durationExpired) {
            const timeout = setTimeout(() => {
                onClose();
            }, 500); // match the CSS transition duration
            return () => clearTimeout(timeout);
        }
    }, [visible, onClose]);

    useEffect(() => {
        if (!visible) {
            setVisible(true);
        }
    }, []);

    return (
        <div
            className={`transition-opacity  duration-500 ease-in-out ${
                visible ? 'opacity-100' : 'opacity-0'
            } border-l-4 p-4 rounded-md shadow-md ${alertColors[type]} fixed left-1/2 translate-x-[-50%] translate-y-[-50%] top-[48px] flex justify-between items-center`}>
            <span>{message}</span>
            {onClose && (
                <button onClick={onClose} className="ml-4 text-lg font-bold">
                    &times;
                </button>
            )}
        </div>
    );
};