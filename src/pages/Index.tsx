import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/date-range-picker";
import { DashboardCard } from "@/components/dashboard-card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Ship, Clock, Bell, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Index = () => {
  const [dailyArrivals, setDailyArrivals] = useState([
    { date: "Jan 1", vessels: 50 },
    { date: "Jan 2", vessels: 30 },
    { date: "Jan 3", vessels: 45 },
    { date: "Jan 4", vessels: 35 },
    { date: "Jan 5", vessels: 60 },
  ]);

  const [hourlyRequests, setHourlyRequests] = useState([
    { hour: "8 AM", submissions: 120 },
    { hour: "9 AM", submissions: 150 },
    { hour: "10 AM", submissions: 80 },
    { hour: "11 AM", submissions: 100 },
    { hour: "12 PM", submissions: 90 },
  ]);

  const [nationalityData, setNationalityData] = useState([
    { name: "USA", value: 35, label: "USA (35%)" },
    { name: "UK", value: 25, label: "UK (25%)" },
    { name: "Canada", value: 15, label: "Canada (15%)" },
    { name: "Other", value: 25, label: "Other (25%)" },
  ]);

  const [vesselTypes, setVesselTypes] = useState([
    { name: "Yachts", value: 50 },
    { name: "Cargo Ships", value: 30 },
    { name: "Tankers", value: 20 },
  ]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1; // Increased radius for labels
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
        style={{
          filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))'
        }}
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center gap-4 mt-2">
                <nav className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-colors">Overview</a>
                  <a href="#" className="hover:text-foreground transition-colors">Analytics</a>
                  <a href="#" className="hover:text-foreground transition-colors">Reports</a>
                  <a href="#" className="hover:text-foreground transition-colors">Notifications</a>
                </nav>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full md:w-[200px]"
              />
              <DateRangePicker className="w-full md:w-auto" />
            </div>
          </div>

          {/* Counter Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Arrivals"
              className="animate-fade-up"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">2,350</p>
                  <p className="text-sm text-muted-foreground">+20.1% from last month</p>
                </div>
                <Ship className="h-8 w-8 text-muted-foreground" />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Pending Clearances"
              className="animate-fade-up [animation-delay:100ms]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">145</p>
                  <p className="text-sm text-muted-foreground">-5% from last hour</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Active Alerts"
              className="animate-fade-up [animation-delay:200ms]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">+3 new alerts</p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Total Passengers"
              className="animate-fade-up [animation-delay:300ms]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">12,234</p>
                  <p className="text-sm text-muted-foreground">+10.1% from last week</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </DashboardCard>
          </div>

          {/* Existing Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Daily Arrivals"
              subtitle="Vessel arrivals by day"
              className="lg:col-span-2"
            >
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyArrivals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="vessels"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Nationality Distribution"
              subtitle="Crew and passenger origins"
            >
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nationalityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={70} // Slightly reduced to make room for labels
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {nationalityData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Hourly Clearance Requests"
              subtitle="Submissions per hour"
            >
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyRequests}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Vessel Types"
              subtitle="Distribution by vessel category"
            >
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vesselTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {vesselTypes.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
