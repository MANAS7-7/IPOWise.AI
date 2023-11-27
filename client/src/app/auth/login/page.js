'use client'

import Link from "next/link"
import { useState } from "react"
import { supabase } from "/src/utils/supabase"
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '/src/utils/userSlice'
import { useRouter } from "next/navigation"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const dispatch = useDispatch()
    const router = useRouter()

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

    const loginHandler = async (e) => {
        e.preventDefault()
        
        if (emailRegex.test(email) == true && password.length > 0) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })
                console.log(data, error)
                if (!error){
                    dispatch(setUserData(data))
                    router.push('/dashboard')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            if (emailRegex.test(email) == false && password.length > 0) {
                setIsValidEmail(false)
            }
        }
    }

    const googleLoginHandler = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:3000'
                }
            })
            console.log(data, error)
            if (!error){
                dispatch(setUserData(data))
                router.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="relative py-16">
            <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div classNameName="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative">
                    <div className="max-w-[500px] mx-auto bg-white rounded-sm shadow-pricing p-12 sm:p-[60px]">
                        <div className="flex gap-3 justify-center items-center">
                            <h3 className="font-bold text-black text-2xl sm:text-3xl text-center">Sign in to{" "}</h3>
                            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-gray-400 inline text-[30px] font-bold">
                                IPOwiseAI
                            </h1>
                        </div>
                        <p className="font-medium text-base text-body-color mb-11 text-center">Login to your account to start with your finance</p>
                        <button onClick={() => googleLoginHandler()} className="w-full flex items-center justify-center p-3 bg-white text-body-color text-base font-medium hover:text-primary rounded-sm border border-[#DEE3F7] mb-6" fdprocessedid="b6iyuk">
                            <span className="mr-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_95:967)">
                                        <path d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216" fill="#4285F4"></path>
                                        <path d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001" fill="#34A853"></path>
                                        <path d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z" fill="#FBBC05"></path>
                                        <path d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z" fill="#EB4335"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_95:967">
                                            <rect width="20" height="20" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                        <div className="flex items-center justify-center mb-8">
                            <span className="hidden sm:block max-w-[70px] w-full h-[1px] bg-body-color bg-opacity-20"></span>
                            <p className="w-full px-5 text-body-color text-center text-base font-medium">Or, sign in with your email</p>
                            <span className="hidden sm:block max-w-[70px] w-full h-[1px] bg-body-color bg-opacity-20"></span>
                        </div>
                        <form onSubmit={(e) => loginHandler(e)}>
                            <div className="mb-8">
                                <label for="email" className="block text-sm font-medium text-black mb-3"> Your Email </label>
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className={`w-full border border-[#DEE3F7] ${isValidEmail ? `` : `border-red-500`} rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition`} fdprocessedid="a9h1p" />
                            </div>
                            <div className="mb-8">
                                <label for="password" className="block text-sm font-medium text-black mb-3"> Your Password </label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition" fdprocessedid="2p2scg" />
                            </div>
                            <div className="mb-6">
                                <button className="w-full flex items-center justify-center text-base font-medium text-white bg-primary py-4 px-9 hover:shadow-signUp rounded-sm transition duration-300 ease-in-out" fdprocessedid="57w375u">
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <p className="font-medium text-base text-body-color text-center">
                            Don&apos;t you have an account?
                            <Link href="/auth/register" className="text-primary hover:underline"> Sign up </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}