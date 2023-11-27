import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "/src/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { setIpoData } from "/src/utils/userSlice";
import axios from "axios";
import Loading from "../loading";
import { CChart } from "@coreui/react-chartjs"
import { useState } from "react";
import ReactMarkdown from "react-markdown"
import { supabase } from '/src/utils/supabase'
import gfm from 'remark-gfm'


export default function IPOData() {
  const IPOData = useSelector((state) => state.ipo?.ipoData);
  const loading = useSelector((state) => state.ipo.loading)
  console.log(IPOData);
  const [ipoInfo, setIpoInfo] = useState({})
  const ipoName = useSelector((state) => state.ipo.name)

  const analysePdf = async () => {
    const response = await axios.get("http://localhost:8000/analyseIPO")
    console.log(response)
    setIpoInfo(response.data)

    if (response.status == 200) {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('IPO_data')
        .insert([
          { IPO_name: ipoName, user_id: user.id, ipo_data: response },
        ]).select()
      console.log(data)
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center m-12 ">
      {loading == "true"
        ? <Loading />
        : <>
          <Table className=" w-3/5 m-auto">
            <TableCaption> Details of choosen IPO </TableCaption>{" "}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"> IPO Close</TableHead>{" "}
                <TableHead> IPO Open</TableHead>
                <TableHead> IPO Size </TableHead>{" "}
                <TableHead> IPO Price Band </TableHead>{" "}
                <TableHead className="text-right">IPO Listing on</TableHead>
              </TableRow>{" "}
            </TableHeader>{" "}
            <TableBody>
              {" "}
              {IPOData?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data["IPO Open:"]} </TableCell>
                  <TableCell>{data["IPO Close:"]} </TableCell>
                  <TableCell>{data["IPO Size:"]} </TableCell>
                  <TableCell >
                    {data["IPO Price Band:"]}
                  </TableCell>
                  <TableCell className="text-right">
                    {data["IPO Listing on:"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-center">
            <button onClick={() => analysePdf()} class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gray-300 rounded hover:bg-white group w-48 mt-10">
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-gradient-to-r from-blue-300 to-gray-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white">Analyze IPO</span>
            </button>
          </div>
          <div>
            {Object.keys(ipoInfo).map((data, index) => {
              return (
                <div key={index} className="mt-8">
                  <strong>{data}:</strong>
                  <ReactMarkdown remarkPlugins={[gfm]}>`
  | heading | b  |  c |  d  |
  | - | :- | -: | :-: |
  | cell 1 | cell 2 | 3 | 4 | 
  `</ReactMarkdown>
                </div>
              )
            })}
          </div>
          <CChart
            className=" w-3/5"
            type="line"
            data={{
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                },
                {
                  label: "My Second dataset",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
                  data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "#ade1f5",
                  }
                }
              },
              scales: {
                x: {
                  grid: {
                    color: "#ff45ef",
                  },
                  ticks: {
                    color: "#abcd43",
                  },
                },
                y: {
                  grid: {
                    color: "#fff543",
                  },
                  ticks: {
                    color: "#45cfda",
                  },
                },
              },
            }}
          />
        </>
      }

    </div>
  );
}
