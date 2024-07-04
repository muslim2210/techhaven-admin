"use client";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";

const SalesChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        className="w-full h-full"
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis dataKey="sales" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
