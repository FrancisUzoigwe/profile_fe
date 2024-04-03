import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../global/globalState"
import axios from "axios"
import useSWR from "swr"
import vite from "../../../public/vite.svg"
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.user)
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url)
      return response.data.data
    } catch (error) {
      throw error
    }
  }
  const { data }: any = useSWR(`http://localhost:2345/api/v1/${auth._id}/get-details`, fetcher)


  const [image, setImage] = useState<string>(vite)
  const [avatar, setAvatar] = useState<string>("")
  console.log(avatar)

  const onHandleImage = (e: any) => {
    const file = e.target.files[0]
    const save = URL.createObjectURL(file)
    setAvatar(file)
    setImage(save)
  }

  const [drop, setDrop] = useState<boolean>(false)
  const onDrop = () => {
    setDrop(!drop)
  }

  const location = useLocation()
  const active = location.pathname
  const navigate = useNavigate()
  return (
    <>

      <div className="w-full h-[60px] flex items-center justify-center">
        <div className="w-full h-[60px] z-[300] flex items-center justify-center fixed bg-white shadow-md">
          <div className="w-[95%] flex justify-between items-center h-full">
            <div className="flex items-center">
              <div className="font-bold" onClick={() => {
                dispatch(logOut())
              }}>ProfilePractice</div>
              <div className="ml-4 flex items-center ">
                <div className={`mr-2 hover:cursor-pointer${active === "/auth" ? " px-3 py-2 rounded-md  transition duration-300  bg-[#40196D] text-white" : ""}`} onClick={() => {
                  navigate("/auth")
                }}>Dashboard</div>
                <div onClick={() => {
                  navigate("/auth/settings")
                }} className={`hover:cursor-pointer ${active === "/auth/settings" ? " px-3 py-2 rounded-md  transition duration-300  bg-[#40196D] text-white" : ""}`}>Settings</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex  items-center relative hover:cursor-pointer" onMouseEnter={onDrop} onMouseLeave={onDrop}>
                <img src={data?.image ? data.image : image} onChange={onHandleImage} className="w-[45px] h-[45px] rounded-full border  object-cover" />
                <div className="ml-2 max-md:hidden">{data?.email}</div>
                <div className="ml-2 hover:cursor-pointer "><FaCaretDown /></div>
                {drop ? <motion.div initial={{ y: "100px", opacity: 0 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 bg-gray-300 flex flex-col items-center w-full top-10 shadow-md rounded-md ">
                  <div className="py-2 md:flex  text-white ">Account Details</div>
                  <img src={data?.image ? data.image : image} alt="Image" className="w-[50px] h-[50px] rounded-full border" />
                  <div className="pb-3 pt-1 text-[red] " onClick={() => {
                    dispatch(logOut())
                  }}>Logout</div>
                </motion.div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
