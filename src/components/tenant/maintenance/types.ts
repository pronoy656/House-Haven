import React from "react";

export interface MaintenanceIssue {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "Pending" | "Complete";
  image: string;
  actionNeeded?: string;
  hasRequestUpdateButton?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}
