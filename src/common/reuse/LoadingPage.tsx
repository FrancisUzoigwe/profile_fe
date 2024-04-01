import { PacmanLoader } from "react-spinners"

const LoadingPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm absolute z-30">
            <div className="flex flex-col items-center">
                <PacmanLoader color="#40196D" />
                <div className="my-2 font-black text-[#40196D]">Establishing connection...</div>
            </div>
        </div>
    )
}

export default LoadingPage