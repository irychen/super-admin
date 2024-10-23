// import BarChart from "@/components/Charts/BarChart"
import PieChart from "@/components/Charts/PieChart"
import { css } from "@emotion/react"
import LineChart from "@/components/Charts/LineChart"
import SolarUsersGroupRoundedBoldDuotone from "@/components/icons/SolarUsersGroupRoundedBoldDuotone"
import Fa6SolidSackDollar from "@/components/icons/Fa6SolidSackDollar"
import MingcuteBillFill from "@/components/icons/MingcuteBillFill"
import SolarSaleBold from "@/components/icons/SolarSaleBold"
import { useEffect } from "react"

function DigitCard(props: { title: string; value: string; color: string; icon: React.ReactNode }) {
    const { title, value, color, icon } = props
    return (
        <div
            className={`relative overflow-hidden ${color} text-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105`}
        >
            <div className="absolute inset-0 flex items-center justify-end pr-6">{icon}</div>
            <div className="relative">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-lg mt-2">{value}</div>
            </div>
        </div>
    )
}

function Dashboard() {
    console.log("Dashboard")

    useEffect(() => {
        console.log("Dashboard useEffect")
    }, [])

    return (
        <div className="w-full h-full p-6 transition-colors duration-300">
            <div className="font-bold text-2xl text-gray-800 dark:text-gray-200">Dashboard</div>
            <p className="text-gray-500 text-sm mt-2">This is the dashboard page. You can look at the data here.</p>
            <div className="container mt-6 grid pad:grid-cols-1 desktop:grid-cols-2 grid-cols-4 gap-6">
                {[
                    {
                        title: "Total Users",
                        value: "1000",
                        color: "bg-blue-500/90",
                        icon: <SolarUsersGroupRoundedBoldDuotone className="w-10 h-10" />,
                    },
                    {
                        title: "Total Balance",
                        value: "$10,000",
                        color: "bg-green-500/90",
                        icon: <Fa6SolidSackDollar className="w-10 h-10" />,
                    },
                    {
                        title: "Total Orders",
                        value: "500",
                        color: "bg-yellow-500/90",
                        icon: <MingcuteBillFill className="w-10 h-10" />,
                    },
                    {
                        title: "Total Sales",
                        value: "$15,000",
                        color: "bg-red-500/90",
                        icon: <SolarSaleBold className="w-10 h-10" />,
                    },
                ].map((item, index) => (
                    <DigitCard key={index} {...item} />
                ))}
            </div>
            {/* tech stack */}
            <div className="w-full mt-6">
                <div className="  rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                    <div className="text-xl font-bold">Tech Stack</div>
                    <div className="text-gray-500 text-sm mt-2">This is the tech stack of the project.</div>
                    {/* React Echarts Keepalive Antd Tailwindcss Emotion */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        <div className="p-2 bg-blue-500/90 text-white rounded-lg font-bold shadow-lg">React</div>
                        <div className="p-2 bg-green-500/90 text-white rounded-lg font-bold shadow-lg">Echarts</div>
                        <div className="p-2 bg-yellow-500/90 text-white rounded-lg font-bold shadow-lg">Keepalive</div>
                        <div className="p-2 bg-red-500/90 text-white rounded-lg font-bold shadow-lg">Antd</div>
                        <div className="p-2 bg-purple-500/90 text-white rounded-lg font-bold shadow-lg">
                            Tailwindcss
                        </div>
                        <div className="p-2 bg-orange-500/90 text-white rounded-lg font-bold shadow-lg">Emotion</div>
                    </div>
                </div>
            </div>
            <div className="grid desktop:grid-cols-1 grid-cols-2 gap-6 mt-6">
                <div className="min-h-[300px]  rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <PieChart
                        options={{
                            title: {
                                text: "Total Users by Source",
                            },
                            series: [
                                {
                                    radius: ["50%", "60%"],
                                    top: "10%",
                                    data: [
                                        { value: 1048, name: "Search Engine" },
                                        { value: 735, name: "Direct" },
                                        { value: 580, name: "Email Marketing" },
                                        { value: 484, name: "Union Ads" },
                                        { value: 300, name: "Video Ads" },
                                    ],
                                    type: "pie",
                                },
                            ],
                        }}
                    />
                </div>
                <div className="min-h-[300px] rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <LineChart
                        options={{
                            title: {
                                text: "Total Users Trend",
                            },
                            grid: {
                                top: "25%",
                                bottom: "14%",
                            },
                            xAxis: {
                                type: "category",
                                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                position: "bottom",
                            },
                            yAxis: {
                                type: "value",
                            },
                            series: [
                                {
                                    data: [120, 200, 150, 80, 70, 110, 130],
                                    type: "line",
                                    name: "Search Engine",
                                },
                                {
                                    data: [11, 22, 33, 44, 55, 66, 77],
                                    type: "line",
                                    name: "Direct",
                                },
                                {
                                    data: [11, 7, 10, 12, 15, 18, 20],
                                    type: "line",
                                    name: "Email Marketing",
                                },
                                {
                                    data: [1, 9, 10, 12, 15, 18, 20],
                                    type: "line",
                                    name: "Union Ads",
                                },
                                {
                                    data: [0, 12, 2, 1, 0, 1, 0],
                                    type: "line",
                                    name: "Video Ads",
                                },
                            ],
                        }}
                    />
                </div>
            </div>

            <div className="w-full mt-6 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="text-xl font-bold">Recent Orders</div>
                <div className="text-gray-500 text-sm mt-2">This is the recent orders of the project.</div>
                <div className="mt-6">
                    <table
                        css={css`
                            border-collapse: collapse;
                            border: 1px solid #e2e8f0;
                            width: 100%;
                            .dark & {
                                border: 1px solid #1a202c;
                            }
                            thead {
                                background-color: #bbdaf9;
                                .dark & {
                                    background-color: #1a202c;
                                }
                            }
                            th,
                            td {
                                text-align: left;
                                padding: 8px;
                            }
                            tr {
                                transition: background-color 0.2s ease-in-out;
                            }
                            tbody {
                                background-color: #f5faff;
                                .dark & {
                                    background-color: #0e1824;
                                }
                            }
                            tbody tr:hover {
                                background-color: #d6e8f9;
                                .dark & {
                                    background-color: #1a202c;
                                }
                            }
                        `}
                    >
                        <thead>
                            <tr>
                                <th className="text-left">Order ID</th>
                                <th className="text-left">Customer</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> #0001</td>
                                <td> John Doe</td>
                                <td> 2021-01-01</td>
                                <td> Pending</td>
                                <td> $100</td>
                            </tr>
                            <tr>
                                <td> #0002</td>
                                <td> Jane Doe</td>
                                <td> 2021-01-02</td>
                                <td> Pending</td>
                                <td> $200</td>
                            </tr>
                            <tr>
                                <td> #0003</td>
                                <td> John Doe</td>
                                <td> 2021-01-03</td>
                                <td> Pending</td>
                                <td> $300</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
