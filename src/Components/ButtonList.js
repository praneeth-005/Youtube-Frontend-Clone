import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { setSelectedCategory, setSearchQuery } from "../utils/appSlice";

const ButtonList = () => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((store) => store.app.selectedCategory);
    const buttonNames = ["All", "Music", "Education", "Gaming", "News", "Cricket", "Cooking", "Comedy", "Sports"];

    const handleCategoryClick = (category) => {
        dispatch(setSelectedCategory(category));
        dispatch(setSearchQuery(""));
    };

    return (
        <div className="w-full bg-white px-6 py-4 border-b border-gray-100 flex items-center gap-3 overflow-x-auto no-scrollbar mb-2">
            {buttonNames.map((name) => (
                <Button
                    key={name}
                    name={name}
                    isActive={selectedCategory === name}
                    onClick={() => handleCategoryClick(name)}
                />
            ))}
        </div>
    );
};

export default ButtonList;