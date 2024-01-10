import React from "react";


type Props = {
    onClick: () => void;
}


const UserProfileTabBar:React.FC<Props> = (props: {onClick: () => void}) => {


    return(
        <div className="block fixed bottom-0 right-0 my-4 p-4 w-5/6 z-20">
            <div className="container mx-auto flex items-center justify-end">
                <button className="block relative bg-violet-400 text-white text-center p-2 md:p-4 rounded-5 border border-purple-700 ml-10" onClick={props.onClick}>편지 보내기</button>
            </div>
        </div>
    );
}

export default UserProfileTabBar;