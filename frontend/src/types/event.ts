export interface Community {
    id: string
    name: string
    people: Person[]
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  title: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface EventSummaryData {
  attendeeCount: number;
  companyBreakdown: CompanyBreakdown;
  peopleNotChecked: number;
}

export interface CompanyBreakdown {
  [company: string]: number;
}