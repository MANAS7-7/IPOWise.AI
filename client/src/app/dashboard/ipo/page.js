"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "/src/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIpoData, setLoading, setName } from "/src/utils/ipoSlice";
import Loading from "../loading";

export default function IPO() {

    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.ipo.loading)
    const ipoName = useSelector((state) => state.ipo.name)

    const fetchData = async() => {
        try {
            dispatch(setLoading("true"))
            const response = await axios.get("http://localhost:8000/getIPO");
            // const result = await response.json()
            console.log(response);

            setData(response.data);
            dispatch(setLoading("false"))
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        fetchData();
    }, []);



    const valueChangeHandler = async(e) => {
        const list = Object.keys(data)
        if (list.length > 0) {
            dispatch(setName(list[e]))
        }

        try {
            dispatch(setLoading("true"))
            const response = await axios.post("http://localhost:8000/processIPO", {
                IPOIndex: e,
            });
            if (response.status == 200) {
                console.log(response);
                dispatch(setIpoData(response.data));
            }
            dispatch(setLoading("false"))
        } catch (err) {
            console.log(err)
        }
    };

    return ( <
        > {
            loading == "true" ?
            < Loading / >
            :
                < main className = " flex flex-col items-center gap-14" >

                <
                h1 className = "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-gray-400 inline text-[72px] font-bold" >
                Choose Your IPO <
                /h1>{" "} <
                Select onValueChange = {
                    (e) => valueChangeHandler(e) } >
                <
                SelectTrigger className = "w-fit text-2xl p-4" >
                <
                SelectValue placeholder = "IPO Name" / >
                <
                /SelectTrigger>{" "} <
                SelectContent > { " " } {
                    Object.keys(data).map((data, index) => {
                        return ( <
                            SelectItem value = { index }
                            key = { index } > { data } <
                            /SelectItem>
                        );
                    })
                } { " " } <
                /SelectContent>{" "} <
                /Select>{" "} <
                h2 className = "text-xl font-semibold" > { ipoName } < /h2> <
                /main>
        } <
        />
    );
}