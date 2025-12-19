import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Store,
  Package,
  Download,
  Users,
  CreditCard,
  ShoppingCart,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Shield,
  FileText,
  Mail,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { useStatistic } from "@hooks";

// Mock Data
const salesTrendData = [
  { date: "01.11", sales: 42000, profit: 12600, orders: 156 },
  { date: "02.11", sales: 38000, profit: 11400, orders: 142 },
  { date: "03.11", sales: 51000, profit: 15300, orders: 189 },
  { date: "04.11", sales: 46000, profit: 13800, orders: 168 },
  { date: "05.11", sales: 62000, profit: 18600, orders: 225 },
  { date: "06.11", sales: 71000, profit: 21300, orders: 258 },
  { date: "07.11", sales: 58000, profit: 17400, orders: 201 },
  { date: "08.11", sales: 65000, profit: 19500, orders: 234 },
  { date: "09.11", sales: 72000, profit: 21600, orders: 267 },
  { date: "10.11", sales: 68000, profit: 20400, orders: 245 },
];

const topStoresData = [
  { name: "TechStore Toshkent", sales: 125000, growth: 15.2, orders: 456 },
  { name: "GadgetHub Samarqand", sales: 98000, growth: 12.8, orders: 378 },
  { name: "MobileWorld Buxoro", sales: 87000, growth: 8.5, orders: 312 },
  { name: "SmartShop Andijon", sales: 76000, growth: 6.2, orders: 289 },
  { name: "PhoneZone Farg'ona", sales: 68000, growth: 4.8, orders: 245 },
  { name: "ElectroMarket Namangan", sales: 54000, growth: 3.2, orders: 198 },
  { name: "TechPro Qo'qon", sales: 45000, growth: 2.1, orders: 167 },
  { name: "GadgetPlus Urganch", sales: 38000, growth: 1.8, orders: 142 },
  { name: "MobilePlus Jizzax", sales: 32000, growth: -2.4, orders: 125 },
  { name: "SmartTech Termiz", sales: 28000, growth: -3.6, orders: 108 },
];

const topProductsData = [
  { name: "iPhone 15 Pro Max", sales: 1250, revenue: 125000000, share: 22 },
  {
    name: "Samsung Galaxy S24 Ultra",
    sales: 980,
    revenue: 98000000,
    share: 18,
  },
  { name: "Xiaomi 14 Pro", sales: 1560, revenue: 78000000, share: 15 },
  { name: "MacBook Air M3", sales: 420, revenue: 67200000, share: 12 },
  { name: "iPad Pro 2024", sales: 680, revenue: 54400000, share: 10 },
  { name: "AirPods Pro 2", sales: 2340, revenue: 46800000, share: 8 },
  { name: "Samsung Tab S9", sales: 560, revenue: 33600000, share: 6 },
  { name: "Dyson V15", sales: 340, revenue: 27200000, share: 5 },
  { name: "Sony WH-1000XM5", sales: 890, revenue: 22250000, share: 4 },
];

const regionData = [
  { name: "Toshkent", sales: 285000 },
  { name: "Samarqand", stores: 32, sales: 198000, users: 98, color: "#3b82f6" },
  { name: "Buxoro", stores: 28, sales: 176000, users: 87, color: "#f59e0b" },
  { name: "Andijon", stores: 25, sales: 152000, users: 76, color: "#8b5cf6" },
  { name: "Farg'ona", stores: 20, sales: 136000, users: 68, color: "#ec4899" },
  { name: "Jizzax", stores: 32, sales: 128000, users: 68, color: "#3b82f6" },
];

const subscriptionData = [
  { name: "Basic", value: 45, color: "#94a3b8" },
  { name: "Standard", value: 78, color: "#3b82f6" },
  { name: "Premium", value: 27, color: "#10b981" },
];

const staffPerformanceData = [
  { name: "Aziz Karimov", sales: 2850000, orders: 145, avgCheck: 196551 },
  { name: "Nodira Sharipova", sales: 2640000, orders: 132, avgCheck: 200000 },
  { name: "Jamshid Tursunov", sales: 2380000, orders: 128, avgCheck: 185937 },
  { name: "Malika Abdullayeva", sales: 2210000, orders: 118, avgCheck: 187288 },
  { name: "Sardor Rahimov", sales: 2080000, orders: 112, avgCheck: 185714 },
  { name: "Dilnoza Yusupova", sales: 1950000, orders: 105, avgCheck: 185714 },
  { name: "Bobur Najmiddinov", sales: 1820000, orders: 98, avgCheck: 185714 },
  { name: "Zilola Ortiqova", sales: 1680000, orders: 89, avgCheck: 188764 },
];

const brandDistribution = [
  { name: "Apple", value: 35, color: "#000000" },
  { name: "Samsung", value: 28, color: "#1428a0" },
  { name: "Xiaomi", value: 22, color: "#ff6900" },
  { name: "Huawei", value: 8, color: "#ed1c24" },
  { name: "Boshqalar", value: 7, color: "#94a3b8" },
];

const monthlyRevenueData = [
  { month: "Yan", revenue: 1250000, mrr: 450000, churn: 2.1 },
  { month: "Fev", revenue: 1380000, mrr: 480000, churn: 1.8 },
  { month: "Mar", revenue: 1520000, mrr: 510000, churn: 1.5 },
  { month: "Apr", revenue: 1680000, mrr: 540000, churn: 1.2 },
  { month: "May", revenue: 1850000, mrr: 580000, churn: 1.0 },
  { month: "Iyun", revenue: 2040000, mrr: 620000, churn: 0.8 },
  { month: "Iyul", revenue: 2180000, mrr: 650000, churn: 0.9 },
  { month: "Avg", revenue: 2320000, mrr: 680000, churn: 0.7 },
  { month: "Sen", revenue: 2480000, mrr: 720000, churn: 0.6 },
  { month: "Okt", revenue: 2650000, mrr: 760000, churn: 0.5 },
];

const securityData = [
  { date: "10.11", logins: 342, failed: 12, blocked: 3 },
  { date: "09.11", logins: 328, failed: 8, blocked: 1 },
  { date: "08.11", logins: 356, failed: 15, blocked: 4 },
  { date: "07.11", logins: 298, failed: 6, blocked: 2 },
  { date: "06.11", logins: 412, failed: 18, blocked: 5 },
  { date: "05.11", logins: 389, failed: 11, blocked: 2 },
  { date: "04.11", logins: 345, failed: 9, blocked: 1 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const {
    analyticsStatistics,
    analyticsFinance,
    analyticsTotal,
    analyticsShops,
    analyticsTopProducts,
    analyticsTopEmployee,
  } = useStatistic();
  const analytics = analyticsStatistics?.data?.data;
  const finance = analyticsFinance?.data?.data;
  const shops = analyticsShops?.data?.data;
  const total = analyticsTotal?.data?.data;
  const topProducts = analyticsTopProducts?.data?.data ?? [];
  const topEmployee = analyticsTopEmployee?.data?.data ?? [];
  const handleExport = (format: string) => {
    toast.success(`${format.toUpperCase()} formatda yuklab olinmoqda...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analitika va Hisobotlar
          </h1>
          <p className="text-muted-foreground mt-1">
            To'liq tizim statistikasi, KPI ko'rsatkichlari va tahlillar
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Bugun</SelectItem>
              <SelectItem value="week">Bu hafta</SelectItem>
              <SelectItem value="month">Bu oy</SelectItem>
              <SelectItem value="quarter">Bu chorak</SelectItem>
              <SelectItem value="year">Bu yil</SelectItem>
              <SelectItem value="custom">Boshqa davr</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleExport("pdf")}
          >
            <Download className="w-4 h-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleExport("excel")}
          >
            <Download className="w-4 h-4" />
            Excel
          </Button>
          <Button className="gap-2" onClick={() => handleExport("csv")}>
            <Download className="w-4 h-4" />
            CSV
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative p-6 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border-green-500/30 cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 group-hover:shadow-xl group-hover:shadow-green-500/60 transition-all duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/30 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Jami Savdo</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">
              {analytics?.total_sale_summ || 0} UZS
            </h3>
            <p className="text-xs text-muted-foreground">vs o'tgan oy</p>
          </div>
        </Card>

        <Card className="group relative p-6 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-sky-500/10 border-blue-500/30 cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-all duration-300">
                <Store className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Faol Do'konlar</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">
              {analytics?.active_company_count || 0}
            </h3>
            <p className="text-xs text-muted-foreground">bu hafta</p>
          </div>
        </Card>

        <Card className="group relative p-6 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-pink-500/10 border-purple-500/30 cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/60 transition-all duration-300">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/30 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +156
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Jami Buyurtmalar
            </p>
            <h3 className="text-4xl font-bold text-foreground mb-1">
              {analytics?.total_sale_count || 0}
            </h3>
            <p className="text-xs text-muted-foreground">bugun</p>
          </div>
        </Card>

        <Card className="group relative p-6 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 border-orange-500/30 cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:shadow-xl group-hover:shadow-orange-500/60 transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">O'rtacha Chek</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">₸285K</h3>
            <p className="text-xs text-muted-foreground">vs o'tgan oy</p>
          </div>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="group p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-500/5 to-emerald-500/10 border-green-500/20 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Jami Xodimlar
              </p>
              <p className="text-2xl font-bold text-foreground">
                {analytics?.total_employee_count || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card className="group p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-cyan-500/10 border-blue-500/20 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Mahsulotlar
              </p>
              <p className="text-2xl font-bold text-foreground">
                {analytics?.total_product_count || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card className="group p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/10 border-purple-500/20 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">MRR</p>
              <p className="text-2xl font-bold text-foreground">760K</p>
            </div>
          </div>
        </Card>

        <Card className="group p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-orange-500/5 to-amber-500/10 border-orange-500/20 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Churn Rate</p>
              <p className="text-2xl font-bold text-foreground">0.5%</p>
            </div>
          </div>
        </Card>

        <Card className="group p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-pink-500/5 to-rose-500/10 border-pink-500/20 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Foyda Marjasi
              </p>
              <p className="text-2xl font-bold text-foreground">
                {analytics?.profit_marja || 0}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Umumiy
          </TabsTrigger>
          <TabsTrigger value="stores" className="gap-2">
            <Store className="w-4 h-4" />
            Do'konlar
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-2">
            <Package className="w-4 h-4" />
            Mahsulotlar
          </TabsTrigger>
          <TabsTrigger value="staff" className="gap-2">
            <Users className="w-4 h-4" />
            Xodimlar
          </TabsTrigger>
          <TabsTrigger value="finance" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Moliya
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  30 kunlik daromad {finance?.last_30_days_revenue} UZS
                  <br /> Savdo Trendi (10 kun)
                </h3>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +18.5%
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={finance?.year_to_current_month_revenue}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="total_sales"
                    stroke="#10b981"
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                    name="Savdo UZS"
                  />

                  <Area
                    type="monotone"
                    dataKey="total_sales"
                    stroke="#3b82f6"
                    fill="url(#profitGradient)"
                    strokeWidth={2}
                    name="Foyda UZS"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Regional Distribution */}
            <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Hududlar Bo'yicha Taqsimot
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={total?.sales_by_region_last_30_days}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis type="number" className="text-muted-foreground" />
                  <YAxis
                    dataKey="region"
                    type="category"
                    className="text-muted-foreground"
                    tickFormatter={(value: string) =>
                      value.charAt(0).toUpperCase() + value.slice(1)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="total_sales"
                    fill="#10b981"
                    name="Savdo"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Brand Distribution */}
            <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Brendlar Taqsimoti
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={brandDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {brandDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Subscription Distribution */}
            <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Obuna Turlari
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Security Stats */}
            <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-red-500/20 bg-gradient-to-br from-red-500/5 to-rose-500/5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Xavfsizlik (7 kun)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={securityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Kirishlar"
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Xato"
                  />
                  <Line
                    type="monotone"
                    dataKey="blocked"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Bloklangan"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Stores Tab */}
        <TabsContent value="stores" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                TOP-10 Eng Faol Do'konlar
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Do'kon Nomi</TableHead>
                  <TableHead>Savdo Hajmi</TableHead>
                  <TableHead>Buyurtmalar</TableHead>
                  <TableHead>O'sish</TableHead>
                  <TableHead>Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shops?.top_10_companies_last_30_days.map((store, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {store.company_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {store?.total_sales.toLocaleString()}
                    </TableCell>
                    <TableCell>{store?.total_sales_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {store?.total_sales_count > 0 ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500 font-medium">
                              +{store?.total_sales_count}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4 text-red-500" />
                            <span className="text-red-500 font-medium">
                              {store?.total_sales_count}%
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          index < 3
                            ? "bg-green-500/10 text-green-500"
                            : "bg-blue-500/10 text-blue-500"
                        }
                      >
                        {index < 3 ? "Top Performer" : "Faol"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Do'konlar Hududiy Taqsimoti
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="stores"
                    fill="#3b82f6"
                    name="Do'konlar soni"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Hududlar Bo'yicha Savdo
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={total?.sales_by_region_last_30_days}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ region, total_sales }) =>
                      `${region}: ${(total_sales / 1000).toFixed(0)} UZS`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="total_sales"
                  >
                    {regionData.map(
                      (
                        entry,
                        index //to'g'irlashim kere
                      ) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                TOP-10 Eng Ko'p Sotilgan Mahsulotlar
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Mahsulot</TableHead>
                  <TableHead>Sotilgan Soni</TableHead>
                  <TableHead>Jami Daromad</TableHead>
                  <TableHead>Bozor Ulushi</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {product?.product_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product?.total_quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {(product?.total_sales_sum / 1).toFixed(2)} UZS
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product?.total_quantity}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 text-sm">
                          Yuksalmoqda
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Mahsulotlar Daromad Solishtirmasi
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topProducts.slice(0, 6)} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis
                  dataKey="product_name"
                  type="category"
                  className="text-muted-foreground"
                  width={150}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total_sales_sum"
                  fill="#10b981"
                  name="Daromad UZS"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                TOP Xodimlar Samaradorligi
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Xodim</TableHead>
                  <TableHead>Savdo Hajmi</TableHead>
                  <TableHead>Buyurtmalar</TableHead>
                  <TableHead>O'rtacha Chek</TableHead>
                  <TableHead>Reyting</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topEmployee.map((staff, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {staff?.seller_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium">
                          {staff?.seller_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {(staff?.total_sales_amount / 1000).toLocaleString()} UZS
                    </TableCell>
                    <TableCell>{staff?.total_sales_count}</TableCell>
                    <TableCell>
                      {(
                        staff?.total_sales_amount / staff?.total_sales_count
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          index < 3
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-blue-500/10 text-blue-500"
                        }
                      >
                        {index < 3 ? "⭐ Top Performer" : "Faol"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Xodimlar Savdo Ko'rsatkichlari
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topEmployee}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis
                  dataKey="seller_name"
                  className="text-muted-foreground"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total_sales_amount"
                  fill="#10b981"
                  name="Savdo UZS"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Umumiy Daromad
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {finance?.last_30_days_revenue} UZS
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">
                  +22.4%
                </span>
                <span className="text-xs text-muted-foreground">
                  vs o'tgan oy
                </span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MRR</p>
                  <h3 className="text-2xl font-bold text-foreground">760K</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-500 font-medium">
                  +15.8%
                </span>
                <span className="text-xs text-muted-foreground">
                  vs o'tgan oy
                </span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Foyda Marjasi</p>
                  <h3 className="text-2xl font-bold text-foreground">30%</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-500 font-medium">
                  +2.1%
                </span>
                <span className="text-xs text-muted-foreground">
                  vs o'tgan oy
                </span>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Oylik Daromad Trendi (MRR)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={finance?.year_to_current_month_revenue}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total_sales"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Umumiy Daromad (₸)"
                />
                <Line
                  type="monotone"
                  dataKey="total_sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="MRR (₸)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Obuna Turi Bo'yicha Daromad
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value} do'kon`}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Churn Rate Trendi
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="churn"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Churn Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
