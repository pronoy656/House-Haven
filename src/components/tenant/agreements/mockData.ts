import { AgreementItem, ChatMessage } from "./types";

export const INITIAL_AGREEMENTS: AgreementItem[] = [
  {
    id: "1",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Pending Signature",
    image: "/great-georges-home.jpg",
  },
  {
    id: "2",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Signed",
    image: "/great-georges-home.jpg",
  },
  {
    id: "3",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Under Review",
    image: "/great-georges-home.jpg",
  },
  {
    id: "4",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 25",
    status: "Signed End",
    image: "/great-georges-home.jpg",
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    sender: "landlord",
    text: "Can you fix the problem in this time ? I need quick",
    time: "19:25",
  },
  {
    id: "m2",
    sender: "tenant",
    text: "Can you fix the problem in this time ? I need quick",
    time: "19:26",
  },
];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
