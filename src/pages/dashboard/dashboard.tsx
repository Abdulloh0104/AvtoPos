import { StatCard } from "@/components/dashboard/StatCard";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { RegionalChart } from "@/components/dashboard/RegionalChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SystemAlerts } from "@/components/dashboard/SystemAlerts";
import { Store, TrendingUp, DollarSign, Package } from "lucide-react";
import { useStatistic } from "../../hooks/useStatistic";

export default function Dashboard() {
  const { statisticsCount, weeklySales } = useStatistic();

  console.log("statisticsCount", statisticsCount);
  console.log("weeklySales", weeklySales?.data);
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Bosh sahifa
        </h2>
        <p className="text-muted-foreground mt-1">
          POS SaaS platformangizning umumiy ko'rsatkichlari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Jami do'konlar"
          value={statisticsCount?.data?.data?.total_company_count}
          change={8.2}
          trend="up"
          icon={<Store className="w-5 h-5" />}
          description="O'zbekiston bo'ylab faol"
        />
        <StatCard
          title="Faol do'konlar"
          value={statisticsCount?.data?.data?.active_company_count}
          change={5.4}
          trend="up"
          icon={<TrendingUp className="w-5 h-5" />}
          description="Hozirda ishlamoqda"
        />
        <StatCard
          title="Bugungi sotuv"
          value={statisticsCount?.data?.data?.daily_sales_amount}
          change={12.5}
          trend="up"
          icon={<DollarSign className="w-5 h-5" />}
          description="Barcha do'konlar bo'yicha"
        />
        <StatCard
          title="Jami mahsulotlar"
          value={statisticsCount?.data?.data?.total_products_count}
          change={3.2}
          trend="up"
          icon={<Package className="w-5 h-5" />}
          description="Mahsulot kutubxonasida"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesTrendChart data={weeklySales?.data?.data} />
        <RegionalChart
          data={statisticsCount?.data?.data?.companies_by_region}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <SystemAlerts />
      </div>
    </div>
  );
}
