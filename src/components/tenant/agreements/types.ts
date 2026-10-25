export type AgreementStatus =
  | "Pending Signature"
  | "Signed"
  | "Under Review"
  | "Signed End";

export interface AgreementItem {
  id: string;
  title: string;
  address: string;
  date: string;
  status: AgreementStatus;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: "landlord" | "tenant";
  text: string;
  time: string;
}
