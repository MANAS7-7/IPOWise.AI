'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAgeGroup, setMarketExp, setIndustry, setGainType, setRiskAppetite } from '/src/utils/userSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '/src/utils/supabase'

const industryName = ["Agriculture and Allied Industries", "Education and Training", "Media and Entertainment", "Retail", "Auto Components", "Electronics System Design & Manufacturing", "Medical Devices", "Roads", "Automobiles", "Engineering and Capital Goods", "Metals and Mining", "Science and Technology", "Aviation", "Financial Services", "MSME", "Services", "Banking", "FMCG", "Oil and Gas", "Steel", "Biotechnology", "Gems and Jewellery", "Pharmaceuticals", "Telecommunications", "Cement", "Healthcare", "Infrastructure", "Ports", "Textiles", "Chemicals", "Power", "Tourism and Hospitality", "Consumer Durables", "Railways", "Insurance", "Defence Manufacturing", "Real Estate", "IT & BPM", "E - Commerce", "Renewable Energy", "Manufacturing"]
const ageCategory = ["10-18", "18-30", "30+"]
const marketExperience = ["Novice", "Intermediate", "Experienced"]
const riskAppetiteType = ["Low", "Medium", "High"]
const typeofGain = ["Listing Gains", "Long Term Gains", "Short Term Gains"]

export default function Register() {
    const industry = useSelector((state) => state.user.industry)
    const ageGroup = useSelector((state) => state.user.ageGroup)
    const gainType = useSelector((state) => state.user.gainType)
    const marketExp = useSelector((state) => state.user.marketExp)
    const riskAppetite = useSelector((state) => state.user.riskAppetite)
    const dispatch = useDispatch()
    const [ageSelected, setAgeSelected] = useState(false)
    const [other, setOther] = useState(false)
    const [userProfession, setUserProfession] = useState("")
    const router = useRouter()
   

    const ageHandler = (value) => {
        dispatch(setAgeGroup(value))
    }

    useEffect(() => {
        if (ageGroup.length > 0 && marketExp.length > 0 && riskAppetite.length > 0) {
            setAgeSelected(true)
        }
    }, [ageGroup, marketExp, riskAppetite])

    const professionHandler = (value) => {
        dispatch(setIndustry(value))
    }

    console.log( industry)

    const submitHandler = async () => {
        dispatch(setIndustry(userProfession))

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('user-info')
            .insert([
                { user_id: user.id, industry: industry, age_group: ageGroup, gain_type: gainType, market_exp: marketExp.toString(), risk_appetite: riskAppetite },
            ])
            .select()

        console.log(data)

        router.push('/dashboard')
    }

    return (
        <main className='min-h-screen flex flex-col justify-center items-center my-5'>
            <div className='flex gap-2 mb-24 items-center justify-center'>
                <span className={` h-[2px] w-5 bg-black`}></span>
                <span onClick={() => setAgeSelected(false)} className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>1</span>
                <span className={` h-[2px] w-72 ${ageSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
                <span className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>2</span>
                <span className={`h-[2px] w-5 ${ageSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
            </div>
            <div>
                {!ageSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div>
                            <div className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Age Group</div>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                {ageCategory.map((data, index) => {
                                    return (
                                        <button key={index} onClick={() => ageHandler(data)} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${ageGroup === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Market Experience</div>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                {marketExperience.map((data, index) => {
                                    return (
                                        <button key={index} onClick={() => dispatch(setMarketExp(data))} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${marketExp == data  ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Risk Appetite</div>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                {riskAppetiteType.map((data, index) => {
                                    return (
                                        <button key={index} onClick={() => dispatch(setRiskAppetite(data))} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${riskAppetite === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )}
                {ageSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div>
                            <div className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Industry Knowledge Exposure</div>
                            <div className='flex gap-5 flex-col sm:flex-row flex-wrap mx-5'>
                                {industryName.map((data, index) => {
                                    return (
                                        <button key={index} onClick={() => professionHandler(data)} className={`block max-w-sm p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${industry.includes(data) == true ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                            <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Purpose of Investment</div>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                {typeofGain.map((data, index) => {
                                    return (
                                        <button key={index} onClick={() => dispatch(setGainType(data))} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${gainType === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <button onClick={() => submitHandler()} className='px-5 py-3 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-900' >
                            Submit!
                        </button>
                    </section>
                )
                }
            </div>
        </main>
    )
}
