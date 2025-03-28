import {Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart } from 'recharts';

const DashBoardGraph = ({ data }: any) => {
    return <ResponsiveContainer width="100%" height={400}>
        <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="rating" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="stock" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
    </ResponsiveContainer>
}
export default DashBoardGraph;