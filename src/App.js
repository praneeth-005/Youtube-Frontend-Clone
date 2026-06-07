import "./index.css";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home/Home"
import Feed from "./Components/Feed";
import Video from "./Pages/Video/Video";
import SearchResults from "./Components/SearchResults";
import Error from "./Components/Error";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Feed />
            },
            {
                path: "/watch",
                element: <Video />
            },
            {
                path: "/search",
                element: <SearchResults />
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
