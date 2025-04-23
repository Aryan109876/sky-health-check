export enum UserRole {
  ENGINEER = 'engineer',
  TEAM_LEADER = 'team_leader',
  DEPARTMENT_LEADER = 'department_leader',
  SENIOR_MANAGER = 'senior_manager',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string;
  departmentId?: string;
}