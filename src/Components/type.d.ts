export interface WorkHistory {
	jobTitle: string;
	company: string;
	startDate: string;
	endDate: string;
}
export interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: string;
  department: string;
  city: string;
  workHistory: WorkHistory[];
}