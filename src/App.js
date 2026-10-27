import { Provider } from "react-redux";
import Body from "./Components/Body";
import Head from "./Components/Head";
import "./index.css";
import appStore from "./utils/appStore";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import WatchPage from "./Components/WatchPage";
import MainContainer from "./Components/MainContainer";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-white text-[#0f0f0f]">
            <Head />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
                children: [
                    {
                        path: "/",
                        element: <MainContainer />
                    },
                    {
                        path: "watch",
                        element: <WatchPage />
                    }
                ]
            }
        ]
    }
]);

function App() {
    return (
        <Provider store={appStore}>
            <RouterProvider router={appRouter} />
        </Provider>
    );
}

export default App;