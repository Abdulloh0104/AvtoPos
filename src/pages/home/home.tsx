// import { useStatistic } from "@hooks";
// import type { Statistic } from "@types";

// const Home = () => {
//   const { data } = useStatistic();

//   const statistics: Statistic = data?.data;
//   console.log("statistic:", statistics);

//   return (
//     <div className="">
//       <div>Home</div>
//     </div>
//   );
// };

// export default Home;
// ===============================================================================

// import { useStatistic } from "@hooks";
// import type { Statistic } from "@types";

// const Home = () => {
//   const { data } = useStatistic();

//   const statistics: Statistic = data?.data;

//   return (
//     <div className="space-y-6">
//       {/* ---- Header ---- */}
//       <h1 className="text-2xl font-semibold">Bosh sahifa</h1>

//       {/* ---- Asosiy ko‘rsatkichlar ---- */}
//       <section>
//         <h2 className="text-lg font-medium mb-4">Asosiy ko‘rsatkichlar</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//           <StatCard
//             title="Umumiy kompaniyalar soni"
//             value={statistics?.companies?.total || 0}
//           />
//           <StatCard
//             title="Aktiv foydalanuvchilar"
//             value={statistics?.users?.active || 0}
//           />
//           <StatCard
//             title="Kunlik tranzaksiyalar"
//             value={statistics?.transactions?.daily_transactions || 0}
//           />
//           <StatCard
//             title="Eng ko‘p sotilgan mahsulotlar"
//             value={statistics?.transactions?.monthly_top_products || 0}
//           />
//           <StatCard
//             title="Obunasi tugash arafasidagi kompaniyalar"
//             value={statistics?.companies?.expiring_soon || 0}
//           />
//         </div>
//       </section>
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         <div className="bg-white rounded-2xl p-4 shadow-sm border">
//           <h3 className="text-sm font-medium mb-2">
//             Kunlik/Oylik tranzaksiyalar
//           </h3>
//           {/* Chart goes here */}
//         </div>

//         <div className="bg-white rounded-2xl p-4 shadow-sm border">
//           <h3 className="text-sm font-medium mb-2">
//             Brendlar bo‘yicha taqsimot
//           </h3>
//           {/* Another chart */}
//         </div>
//         <div className="bg-white rounded-2xl p-4 shadow-sm border">
//           <h3 className="text-sm font-medium mb-2">
//             Top Mahsulotlar
//           </h3>
//           {/* Chart goes here */}
//         </div>

//         <div className="bg-white rounded-2xl p-4 shadow-sm border">
//           <h3 className="text-sm font-medium mb-2">
//             Hududlar bo‘yicha sotuvlar
//           </h3>
//           {/* Another chart */}
//         </div>
//       </section>
//     </div>
//   );
// };

// // --- Small reusable component ---
// const StatCard = ({ title, value }: { title: string; value: number }) => (
//   <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
//     <span className="text-1xl text-gray-500">{title}</span>
//     <span className="text-2xl font-semibold mt-2">
//       {value.toLocaleString()}
//     </span>
//   </div>
// );

// export default Home;
// =======================================CHO'TKI========================================
// =======================================CHO'TKI========================================
import { Card, Row, Col, Typography } from "antd";
import { useStatistic } from "@hooks";
import type { Statistic } from "@types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;

const Home = () => {
  const { data } = useStatistic(); //isLoading

  // if (isLoading) return <div>Loading...</div>;

  const statistics: Statistic = data?.data;

  // Mock chart data — replace later with API data
  const dailyData = [
    { month: "Yan", transactions: 120 },
    { month: "Fev", transactions: 160 },
    { month: "Mar", transactions: 130 },
    { month: "Apr", transactions: 200 },
    { month: "May", transactions: 180 },
    { month: "Iyun", transactions: 220 },
    { month: "Iyul", transactions: 210 },
  ];

  const brandData = [
    { name: "Mahsulot A", value: 40 },
    { name: "Mahsulot B", value: 60 },
    { name: "Mahsulot C", value: 90 },
    { name: "Mahsulot D", value: 50 },
    { name: "Mahsulot E", value: 70 },
  ];

  const regionData = [
    { name: "Toshkent", value: 200 },
    { name: "Samarqand", value: 150 },
    { name: "Andijon", value: 120 },
    { name: "Farg‘ona", value: 100 },
    { name: "Namangan", value: 90 },
  ];

  return (
    <div className="space-y-8">
      <Title level={2} className="!text-gray-900">
        Bosh sahifa
      </Title>

      {/* --- Asosiy ko‘rsatkichlar --- */}
      <section>
        <Title level={4} className="!text-gray-900 mb-4">
          Asosiy ko‘rsatkichlar
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={4}>
            <StatCard
              title="Umumiy kompaniyalar soni"
              value={statistics?.companies?.total || 0}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <StatCard
              title="Aktiv foydalanuvchilar"
              value={statistics?.users?.active || 0}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <StatCard 
              title="Kunlik tranzaksiyalar"
              value={statistics?.transactions?.daily_transactions || 0}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <StatCard
              title="Eng ko‘p sotilgan mahsulotlar"
              value={statistics?.transactions?.monthly_top_products || 0}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <StatCard
              title="Obunasi tugash arafasidagi kompaniyalar"
              value={statistics?.companies?.expiring_soon || 0}
            />
          </Col>
        </Row>
      </section>

      {/* --- Analitika bo‘limi --- */}
      <section>
        <Title level={4} className="!text-gray-900 mb-4">
          Analitika
        </Title>

        <Row gutter={[16, 16]}>
          {/* Line chart */}
          <Col xs={24} md={12}>
            <Card title="Kunlik/Oylik tranzaksiyalar" bordered={false}>
              <div className="flex justify-between items-center mb-2">
                <Text type="success" className="font-medium">
                  +15%
                </Text>
                <Text type="secondary">Oxirgi 30 kun</Text>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="transactions"
                      stroke="#1677ff"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          {/* Bar chart */}
          <Col xs={24} md={12}>
            <Card title="Brendlar bo‘yicha taqsimot" bordered={false}>
              <div className="flex justify-between items-center mb-2">
                <Text type="success" className="font-medium">
                  +8%
                </Text>
                <Text type="secondary">Oxirgi 30 kun</Text>
              </div>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={brandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1677ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          {/* Top Products */}
          <Col xs={24} md={12}>
            <Card title="TOP mahsulotlar" bordered={false}>
              <Text type="danger" className="font-medium">
                -5%
              </Text>{" "}
              <Text type="secondary">· Oxirgi 30 kun</Text>
              <div className="mt-4 space-y-3">
                {regionData.map((r) => (
                  <div key={r.name}>
                    <div className="flex justify-between text-sm">
                      <span>{r.name}</span>
                      <span>{r.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${r.value / 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Regional sales */}
          <Col xs={24} md={12}>
            <Card title="Hududlar bo‘yicha savdolar" bordered={false}>
              <Text type="success" className="font-medium">
                +12%
              </Text>{" "}
              <Text type="secondary">· Oxirgi 30 kun</Text>
              <div className="mt-4 space-y-3">
                {regionData.map((r) => (
                  <div key={r.name}>
                    <div className="flex justify-between text-sm">
                      <span>{r.name}</span>
                      <span>{r.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${r.value / 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;

// --- Reusable Stat Card ---
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <Card
    bordered={false}
    className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
  >
    <Text className="block text-gray-900 font-medium text-base mb-2">
      {title}
    </Text>
    <Title level={3} className="!mb-0 !text-gray-900">
      {value.toLocaleString()}
    </Title>
  </Card>
);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import { Card, Row, Col } from "antd";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { useStatistic } from "@hooks";
// import type { Statistic } from "@types";

// const Home = () => {
//   const { data } = useStatistic();
//   const statistics: Statistic = data?.data;

//   const dailyData = [
//     { name: "Yan", value: 120 },
//     { name: "Fev", value: 200 },
//     { name: "Mar", value: 150 },
//     { name: "Apr", value: 180 },
//     { name: "May", value: 220 },
//     { name: "Iyun", value: 170 },
//     { name: "Iyul", value: 250 },
//   ];

//   const brandData = [
//     { name: "Mahsulot A", value: 60 },
//     { name: "Mahsulot B", value: 80 },
//     { name: "Mahsulot C", value: 120 },
//     { name: "Mahsulot D", value: 100 },
//     { name: "Mahsulot E", value: 90 },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-900">Bosh sahifa</h1>

//       {/* Main Statistic Cards */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8} lg={4}>
//           <Card className="shadow-sm h-32 flex flex-col justify-center items-center">
//             <p className="text-gray-500 text-sm">Umumiy kompaniyalar soni</p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {statistics?.companies.total ?? 0}
//             </p>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} md={8} lg={4}>
//           <Card className="shadow-sm h-32 flex flex-col justify-center items-center">
//             <p className="text-gray-500 text-sm">Aktiv foydalanuvchilar</p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {statistics?.users.active ?? 0}
//             </p>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} md={8} lg={4}>
//           <Card className="shadow-sm h-32 flex flex-col justify-center items-center">
//             <p className="text-gray-500 text-sm">Kundalik tranzaksiyalar</p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {statistics?.transactions.daily_transactions ?? 0}
//             </p>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} md={8} lg={4}>
//           <Card className="shadow-sm h-32 flex flex-col justify-center items-center">
//             <p className="text-gray-500 text-sm">
//               Eng ko‘p sotilgan mahsulotlar
//             </p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {statistics?.transactions.monthly_top_products ?? 0}
//             </p>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} md={8} lg={4}>
//           <Card className="shadow-sm h-32 flex flex-col justify-center items-center">
//             <p className="text-gray-500 text-sm">
//               Obunasi tugash arafasidagi kompaniyalar
//             </p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {statistics?.companies.expiring_soon ?? 0}
//             </p>
//           </Card>
//         </Col>
//       </Row>

//       {/* Analytics Section */}
//       <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-900">
//         Analitika
//       </h2>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} lg={12}>
//           <Card className="h-80 shadow-sm">
//             <p className="text-gray-600 mb-2 font-medium">
//               Kunlik/Oylik tranzaksiyalar
//             </p>
//             <ResponsiveContainer width="100%" height="90%">
//               <LineChart data={dailyData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#1890ff"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card className="h-80 shadow-sm">
//             <p className="text-gray-600 mb-2 font-medium">
//               Brendlar bo‘yicha taqsimot
//             </p>
//             <ResponsiveContainer width="100%" height="90%">
//               <BarChart data={brandData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#52c41a" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Home;
