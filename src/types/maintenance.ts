export type MaintenanceStatus = "Pending" | "Complete" | "In Progress";

export interface MaintenanceIssue {
  id: string;
  title: string;
  description: string;
  date: string;
  status: MaintenanceStatus;
  image: string;
  category?: string;
  propertyAddress?: string;
  reportedBy?: {
    name: string;
    avatar: string;
  };
  actionNeeded?: string;
  hasRequestUpdateButton?: boolean;
}

export interface MaintenanceTimeSlot {
  id: string;
  date: string;
  time: string;
}
