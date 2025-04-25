import React from "react";
import {AlertBox} from "@/components/AlertBox";

type CardProps = {
    style?: React.CSSProperties;
    alpha: string;
    hex: string;
};

export const ColorCard = ({ style,alpha, hex }: CardProps) => {
    const [showAlert, setShowAlert] = React.useState(false);



    const handleCardClick = () => {
        setShowAlert(true);
        navigator.clipboard.writeText(hex).then(() => {
            console.log('Copied:', alpha);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <div onClick={handleCardClick} className="flex h-full p-5 flex-col justify-center items-center rounded-lg" style={style}>
            {showAlert && (
                <AlertBox
                    message={"Copied #" + hex}
                    type="info"
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className="font-bold text-sm md:text-base w-auto text-center">{alpha}</div>
            <div className="font-bold text-sm md:text-base w-auto"> <span className="font-normal"></span>#{hex}</div>
        </div>
    );
};
