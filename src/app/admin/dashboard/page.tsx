import { UserOverviewView } from "@/components/admin/UserOverviewView";

export const metadata = {
  title: "Dashboard Overview | House Haven Admin",
  description: "Real-time platform analytics, user growth charts, and recent activity.",
};

export default function AdminDashboardPage() {
  return <UserOverviewView />;
}
