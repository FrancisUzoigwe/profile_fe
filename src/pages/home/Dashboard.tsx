import { motion } from "framer-motion"
import { LuSettings2 } from "react-icons/lu"
import { IoMdNotifications } from "react-icons/io"
import { ScaleLoader } from "react-spinners"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { SlOptions } from "react-icons/sl"
import { RiMastercardFill } from "react-icons/ri"
import { PiDownloadSimple } from "react-icons/pi"
import { BiChevronDown } from "react-icons/bi"
import { useSelector } from "react-redux"
import useSWR from "swr"
import axios from "axios"
const DashBoard = () => {
    const motionVariant = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7
            }
        },
        close: {
            opacity: 0,
            y: "100px"
        }
    }

    const [eye, setEye] = useState<boolean>(false)
    const onEye = () => {
        setEye(!eye)
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
    const { data } = useSWR(`https://profile-practice.onrender.com/api/v1/${auth._id}/get-details`, fetcher)
    return (
        <>
            <motion.div variants={motionVariant} initial="close" animate="open" className="w-full min-h-[100vh] flex justify-center">
                <div className="w-[98%]  h-[90%] rounded-lg my-3 flex flex-col items-center">
                    <div className="w-[99%] h-[250px] my-3 flex justify-between">
                        <div className="w-[67%] h-full flex-col flex items-center max-md:w-full">
                            <div className="flex items-center justify-between w-[95%]">
                                <div className="text-[#40196D] font-bold">Welcome Back , <span className="text-[20px]">{data? data?.userName  : data?.email}</span></div>
                                <div className="flex items-center ">
                                    <div><LuSettings2 className=" hover:cursor-pointer text-base text-[#40196D]" /></div>
                                    <div className="ml-3"><IoMdNotifications className="text-base hover:cursor-pointer text-[#40196D]" /></div>
                                </div>
                            </div>
                            <div className="w-[95%] h-[150px]  flex justify-between items-center my-10">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-[35px] font-black">{eye ? "₦20,300.36" : "₦***.**"}</div>
                                        <div className="text-[12px] font-semibold text-gray-700">Your Money</div>
                                        <div className="text-[12px] font-semibold text-gray-700 my-1">Credit Limit</div>
                                        <div className="flex my-5">
                                            <button className="bg-[#40196D] text-white px-3 py-3 text-[14px] rounded-md font-thin">Make Payment</button>
                                            <button className="ml-4 border-[1px] border-[#40196D] text-[14px]  px-3 py-3 rounded-md hover:bg-gray-800 transition duration-300 hover:cursor-pointer hover:text-white text-[#40196D]">Requisites </button>
                                        </div>
                                    </div>
                                    <div className="-ml-6" onClick={() => {
                                        onEye()
                                    }}>{!eye ? <FaEye className="text-2xl hover:cursor-pointer" /> : <FaEyeSlash className="text-2xl hover:cursor-pointer" />}</div>
                                </div>
                                <button className=" max-lg:hidden px-3 py-3 rounded-md bg-[#40196D] text-white">Link to Bank Account </button>
                                <div className="my-3 max-sm:hidden">
                                    <div className="flex items-center my-4 border rounded-md py-3  px-4 max-lg:px-2">
                                        <div>
                                            <div className="font-bold text-[20px]">₦20,000</div>
                                            <div className="text-[12px] font-black">Total Revenue</div>
                                        </div>
                                        <div className="ml-2 px-2"><ScaleLoader color="#40196D" height={25} /></div>
                                    </div>
                                    <div className="flex items-center my-4 border rounded-md py-3  px-4 max-lg:px-2">
                                        <div>
                                            <div className="font-bold text-[20px]">₦1,200</div>
                                            <div className="text-[12px] font-black">Total Expense</div>
                                        </div>
                                        <div className="ml-2 px-2"><ScaleLoader color="#40196D" height={25} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[33%] h-full  max-md:hidden flex flex-col items-center">
                            <div className="w-[95%] flex items-center justify-between h-[40px]">
                                <div className="text-[13px] font-black text-[#40196D]">My Card</div>
                                <div><SlOptions className="hover:cursor-pointer text-[#40196D]" /></div>
                            </div>
                            <div className="min-w-[90%] border h-[200px] hover:cursor-pointer rounded-md bg-gradient-to-tr from-black via-gray-700 to-gray-300 flex flex-col items-center">
                                <div className="w-[90%] text-white h-auto my-3"><RiMastercardFill className="text-2xl" /></div>
                                <div className="my-5 text-white w-[95%] text-[20px]">**** **** **** 1234</div>
                                <div className="w-[95%] flex justify-between items-center">
                                    <div className="text-white">
                                        <div>Francis Uzoigwe</div>
                                        <div className="text-[12px] font-thin">09/2025</div>
                                    </div>
                                    <div><RiMastercardFill className="text-2xl text-white" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[95%] h-auto flex flex-col">
                        <div className="w-full flex justify-between">
                            <div className="w-[67%] max-md:w-full flex-col  ">
                                <div className="flex w-[95%] items-center justify-between">
                                    <div className="font-black">Money Flow</div>
                                    <div className="flex items-center ">
                                        <div className=" flex items-center text-[14px] px-4 py-[6px] rounded-md border border-black hover:cursor-pointer">Yearly <div><BiChevronDown /></div></div>
                                        <div className="ml-3 hover:cursor-pointer"><PiDownloadSimple size={35} className=" border px-2 py-2 border-black rounded-md" /></div>
                                    </div>
                                </div>
                                <div className="w-full my-2 ">
                                    <div className="grid grid-cols-3 w-full ">
                                        <div>
                                            <div className="text-[13px]">Total Balance</div>
                                            <div className="font-black text-[15px]">{eye ? <div>₦ 21,200.00</div> : <div>₦ **,***.**</div>}</div>
                                        </div>
                                        <div>
                                            <div className="text-[13px]">Total Income</div>
                                            <div className="font-black text-[15px]">{eye ? <div>₦ 20,200.00</div> : <div>₦ **,***.**</div>}</div>
                                        </div>
                                        <div>
                                            <div className="text-[13px]">Total Outcome</div>
                                            <div className="font-black text-[15px]">{eye ? <div>₦ 1,200.00</div> : <div>₦ **,***.**</div>}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[95%] flex items-center h-[300px] border my-3 rounded-md justify-center">Chart Data Here</div>
                            </div>
                            <div className="w-[37%] h-full max-md:hidden flex flex-col items-center">
                                <div className="w-full flex items-center justify-between">
                                    <div className="leading-tight">
                                        <div className="text-[12px] font-bold">Current Account</div>
                                        <div className="text-2xl font-bold">₦20,000</div>
                                    </div>
                                    <button className="px-5 py-2 bg-black text-white text-[14px] rounded-sm">Add Cash</button>
                                </div>
                                <div className="border w-full my-2 ml-2 " />
                                <div className="flex w-full items-center justify-between">
                                    <div className="font-black">Transactions</div>
                                    <div className="underline text-[14px]">View All</div>
                                </div>
                                <div className="w-full h-[250px]  overflow-y-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div >
        </>
    )
}

export default DashBoard