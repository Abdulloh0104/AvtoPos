
// const Analytics = () => {
//   return (
//     <div>Analytics</div>
//   )
// }

// export default Analytics

import { Card, Row, Col, Typography } from "antd";
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