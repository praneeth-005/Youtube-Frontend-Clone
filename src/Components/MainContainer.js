import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            dispatch(openMenu());
        }
    }, [dispatch]);

    return (
        <main className="flex-1 overflow-x-hidden min-w-0 bg-white">
            <ButtonList />
            <div className="px-6 py-2">
                <VideoContainer />
            </div>
        </main>
    );
};

export default MainContainer;