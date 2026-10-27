const Button = ({ name, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`yt-chip ${isActive ? "yt-chip-active" : "yt-chip-inactive"}`}
        >
            {name}
        </button>
    );
};

export default Button;