import { useState } from "react"
import { FaPen } from "react-icons/fa"
import vite from "../../../public/vite.svg"
import axios from "axios"
import { useSelector } from "react-redux"
import useSWR from "swr"

const Settings = () => {

    const [image, setImage] = useState(vite)
    const [avatar, setAvatar] = useState("")
    console.log(typeof avatar)
    const onHandleImage = (e: any) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)
        setAvatar(file)
    }


    const [canEdit, setCanEdit] = useState<boolean>(false)
    const onEdit = () => {
        setCanEdit(!canEdit)
    }

    const auth = useSelector((state: any) => state.user)
    const fetcher = async (url: string) => {
        try {
            const response = await axios.get(url)
            return response.data.data
        } catch (error) {
            throw error
        }
    }
    const { data } = useSWR(`http://localhost:2345/api/v1/${auth._id}/get-details`, fetcher)
    console.log(data?.email)
    return (
        <>
            <div className="w-full min-h-[90vh] flex items-center justify-center bg-white">
                <div className="w-[70%] max-md:w-[95%] border rounded-md min-h-[80vh] shadow-md flex flex-col items-center">
                    {/* Image Change part starts here*/}
                    <div className="relative w-[130px] max-md:w-[90px] max-md:h-[90px] h-[130px]">
                        <img src={image} alt="" className="relative w-full object-cover object-top overflow-hidden h-full rounded-full border my-4" onChange={onHandleImage} />
                        <label htmlFor="image"><div className="absolute hover:cursor-pointer bottom-0 px-2 py-2 rounded-full bg-gray-400 right-0"><FaPen className="" /></div></label>
                        <input type="file" hidden id="image" onChange={onHandleImage} />
                    </div>
                    {/* Image change part ends here */}
                    <div className="my-6 py-2 hover:cursor-pointer px-3 bg-[#40196D] text-white rounded-md">Update Image</div>
                    {/* Input part */}
                    <div className="w-[95%] gap-4 grid grid-cols-2 max-md:grid-cols-1">
                        <label
                            htmlFor="Username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="text"
                                id="Username"
                                disabled={!canEdit}
                                className="h-[45px]  w-full pl-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="FirstName"
                            />

                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                FirstName
                            </span>
                        </label>
                        <label
                            htmlFor="Username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="text"
                                id="Username"
                                disabled={!canEdit}
                                className="h-[45px]  w-full  pl-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="LastName"
                            />

                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                LastName
                            </span>
                        </label>
                        <label
                            htmlFor="Username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="text"
                                id="Username"
                                disabled={!canEdit}
                                className="h-[45px]  w-full pl-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="PhoneNumber"
                            />

                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                PhoneNumber
                            </span>
                        </label>
                        <label
                            htmlFor="Username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="text"
                                id="Username"
                                disabled={!canEdit}
                                className="h-[45px] w-full  pl-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Address"
                            />

                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Address
                            </span>
                        </label>
                    </div>
                    <button className={`w-[95%] my-6 h-[50px] ${!canEdit ? "bg-[#40196D]" : "bg-gray-300"} text-white rounded-md`} onClick={() => {
                        onEdit()
                    }}>Edit Profile</button>
                    {canEdit && <button className="w-[95%] h-[50px] bg-[#40196D] text-white rounded-md">Update Profile</button>}
                </div>
            </div>
        </>
    )
}

export default Settings