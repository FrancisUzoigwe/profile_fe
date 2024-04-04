import { useState } from "react"
import LoadingPage from "../../common/reuse/LoadingPage"
import student from "../../assets/man.jpg"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, useNavigate } from "react-router-dom"
import { registerApi } from "../../apis/authenticationApi"


const Register = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const AuthSchema = yup.object({
        email: yup.string().required(),
        userName: yup.string().required(),
        password: yup.string().required()
    })

    const { handleSubmit, register } = useForm({
        resolver: yupResolver(AuthSchema)
    })

    const onHandleSubmit = handleSubmit(async (data) => {
        setLoading(false)
        const { email, userName, password } = data
        registerApi({ email, userName, password }).then((res) => {
            navigate("/")
            return res.data.data
        })
        setLoading(true)
    })

    const [show, setShow] = useState<boolean>(false)
    const onShow = () => {
        setShow(!show)
    }

    const [inputsFilled, setInputsFilled] = useState<boolean>(false)



    const handleInputChange = () => {
        const emailInput = document.getElementById('UserEmail') as HTMLInputElement;
        const nameInput = document.getElementById('UserName') as HTMLInputElement;
        const passwordInput = document.getElementById('UserPassword') as HTMLInputElement;

        if (emailInput.value.trim() !== '' && nameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
            setInputsFilled(true);
        } else {
            setInputsFilled(false);
        }
    }

    return (
        <>
            {loading && <LoadingPage />}
            <div className='w-full min-h-[100vh] flex justify-center items-center bg-[#40196D]'>
                <div className='w-[90%] items-center flex justify-center h-[500px] rounded-xl bg-white text-black'>
                    <div className='w-[90%] flex items-center justify-between h-full'>
                        <form onSubmit={onHandleSubmit} className='w-[45%]  max-md:w-full h-full flex flex-col items-center rounded-md' >
                            <div className='flex justify-between items-center w-full my-2'>
                                <div className="font-bold">ProfilePractice</div>
                                <div className='flex items-center text-[13px] font-bold '>Have an account?  <Link to="/"><button className="ml-2 border border-[#40196D] outline-none py-2 px-4 rounded-3xl hover:text-white hover:bg-[#40196D] transition duration-300 ">Sign In</button></Link></div>
                            </div>
                            <div className="mt-16 text-[40px] font-black text-center">Create An Account</div>
                            <div className=" text-gray-400 text-[13px]">Create your AJMoney account.</div>
                            <div className="w-[80%] mt-4">
                                <div className="w-full h-[45px] ">
                                    <label
                                        htmlFor="UserEmail"
                                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <input
                                            onInput={handleInputChange}
                                            autoComplete="off"
                                            type="email"
                                            id="UserEmail"
                                            placeholder="Email"
                                            {...register("email")}
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />

                                        <span
                                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                        >
                                            Email
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[80%] mt-4">
                                <div className="w-full h-[45px] ">
                                    <label
                                        htmlFor="UserName"
                                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <input
                                            onInput={handleInputChange}
                                            autoComplete="off"
                                            type="text"
                                            id="UserName"
                                            placeholder="Name"
                                            {...register("userName")}
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />

                                        <span
                                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                        >
                                            Name
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[80%] mt-4">
                                <div className="w-full h-[45px] ">
                                    <label
                                        htmlFor="UserPassword"
                                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <div className="absolute right-2 hover:cursor-pointer text-[13px]" onClick={() => onShow()}>{!show ? "Show" : "Hide"}</div>
                                        <input
                                            onInput={handleInputChange}
                                            autoComplete="off"
                                            type={`${!show ? "password" : "text"}`}
                                            id="UserPassword"
                                            {...register("password")}
                                            placeholder="Password"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />

                                        <span
                                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                        >
                                            Password
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <button className={`w-[80%] my-4 rounded-3xl h-[45px] transition duration-300  ${inputsFilled ? "bg-[#40196D] text-white" : "text-gray-500 bg-gray-300"}`} type="submit" disabled={!inputsFilled}>Sign In</button>
                            <div className="w-full flex items-center justify-center h-[20px] text-[14px] my-2 hover:cursor-pointer">
                                Forgot Passcode? <div className="ml-2 ">Reset</div>
                            </div>
                        </form>
                        <div className="max-md:hidden w-[50%] border h-[85%] rounded-2xl overflow-hidden">
                            <img src={student} alt="" loading="lazy" className="object-cover w-full h-full " />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register
