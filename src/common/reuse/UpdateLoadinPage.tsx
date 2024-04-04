import { HashLoader } from "react-spinners"

const UpdateLoadinPage = () => {


    return (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm absolute z-30">
            <div className="flex flex-col items-center">
                <HashLoader color="#40196D" />
                <div className="my-2 font-black text-[#40196D]">Updating credentials...</div>
                <div className="text-[#40196D] font-extrabold">This might take up to a minute</div>
            </div>
        </div>
    )
}

export default UpdateLoadinPage