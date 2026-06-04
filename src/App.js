import "./index.css";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home/Home"
import Feed from "./Components/Feed";
import Video from "./Pages/Video/Video";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Feed />
            },
            {
                path: "/watch",
                element: <Video />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={appRouter} />
    </Provider>
);
