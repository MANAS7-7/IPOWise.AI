'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "/src/components/ui/tabs"
import IPO from "./ipo/page"
import IPOdata from "./ipo/ipoData"
import Loading from "./loading"
import { useSelector } from "react-redux"
import Chat from "./chat/page"

export default function Dashboard() {

    return (
        <div>
            <Tabs defaultValue="ipoAnalysis" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ipoAnalysis">IPO Analysis</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="chat">
                    <Chat />
                </TabsContent>
                <TabsContent value="ipoAnalysis">
                    <IPO />
                    <IPOdata></IPOdata>
                </TabsContent>
            </Tabs>
        </div >
    )
}