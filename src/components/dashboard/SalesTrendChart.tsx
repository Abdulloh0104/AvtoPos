// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import { salesTrendData } from '@/lib/mockData';
// type WeekItem = {
//   total: number;
//   week: string;
// };
// type Props = {
//   data?: WeekItem[];
// };

// export function SalesTrendChart({ data = [] }: Props) {
//   return (
//     <Card className="col-span-2 shadow-card">
//       <CardHeader>
//         <CardTitle>Sotuv tendentsiyasi</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={salesTrendData}>
//             <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//             <XAxis
//               dataKey="date"
//               className="text-xs"
//               stroke="hsl(var(--muted-foreground))"
//             />
//             <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "hsl(var(--card))",
//                 border: "1px solid hsl(var(--border))",
//                 borderRadius: "8px",
//               }}
//             />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="hsl(var(--primary))"
//               strokeWidth={3}
//               dot={{ fill: "hsl(var(--primary))", r: 4 }}
//               activeDot={{ r: 6 }}
//               name="Sotuv ($)"
//             />
//             <Line
//               type="monotone"
//               dataKey="stores"
//               stroke="hsl(var(--accent))"
//               strokeWidth={3}
//               dot={{ fill: "hsl(var(--accent))", r: 4 }}
//               activeDot={{ r: 6 }}
//               name="Faol do'konlar"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type WeekItem = {
  week: string; // ISO date
  total: number; // UZS
};

type Props = {
  data?: WeekItem[]; // undefined bo'lsa, loading deb hisoblaymiz
};

/**
 * ISO date -> "Nov 24"
 */
const formatWeek = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

/**
 * Number -> UZS format
 */
const formatUZS = (value: number) =>
  new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    maximumFractionDigits: 0,
  }).format(value);

export function SalesTrendChart({ data }: Props) {
  // data undefined bo'lsa loading
  const isLoading = !data;

  // Backend datani chart formatiga moslash
  const chartData =
    data?.map((item) => ({
      date: formatWeek(item.week),
      sales: item.total,
    })) || [];

  return (
    <Card className="col-span-2 shadow-card">
      <CardHeader>
        <CardTitle>Sotuv tendensiyasi</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        {/* 🔹 Skeleton loading */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-[220px] w-full rounded-xl" />
          </div>
        )}

        {/* 🔹 Empty state */}
        {!isLoading && chartData.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sotuv maʼlumotlari mavjud emas
          </div>
        )}

        {/* 🔹 Chart */}
        {!isLoading && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

              <XAxis
                dataKey="date"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />

              <YAxis
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `${value / 1000}k`}
              />

              <Tooltip
                formatter={(value: number) => formatUZS(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{ r: 6 }}
                name="Sotuv (UZS)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
