interface ProfilePictureProps {
    size: number;
    onClick?: () => void;
}

export default function ProfilePicture({ size, onClick }: ProfilePictureProps) {
    return (
        <div
            className={`rounded-full overflow-hidden flex justify-center items-center cursor-pointer`}
            style={{ width: size + "rem", height: size + "rem" }}
            onClick={onClick}
        >
            <img
                src="/Profile/rich_dog.png"
                alt="Profile"
                className="w-full h-full object-cover"
            />
        </div>
    );
}
