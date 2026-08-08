export type UserRole = 'customer' | 'team_leader' | 'operations' | 'admin';

export type DepartmentName =
  | 'Civil & Masonry'
  | 'Plumbing & Drainage'
  | 'Electrical & Power'
  | 'Painting & Coating'
  | 'Carpentry & Woodwork'
  | 'Interior Design'
  | 'Architecture & Structural'
  | 'HVAC & AC Systems'
  | 'Landscaping & Outdoor'
  | 'Smart Home & Security';

export type TeamTier = 'Basic' | 'Standard' | 'Premium' | 'Elite';

export interface UniformChecklist {
  safetyHelmet: boolean;
  companyJacket: boolean;
  brandedTshirt: boolean;
  safetyShoes: boolean;
  idCard: boolean;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: 'Team Leader' | 'Master Craftsman' | 'Skilled Specialist' | 'Senior Architect';
  department: DepartmentName;
  tier: TeamTier;
  phone: string;
  verifiedBadge: boolean;
  experienceYears: number;
  rating: number;
  completedProjects: number;
  currentProjectId?: string;
  currentProjectTitle?: string;
  uniformChecklist: UniformChecklist;
  attendanceRate: number;
}

export interface IndividualService {
  id: string;
  title: string;
  category: DepartmentName;
  iconName: string;
  description: string;
  startingPrice: number;
  estimatedHours: string;
  includedFeatures: string[];
  popular?: boolean;
}

export interface PackageOptions {
  architectureTier: TeamTier;
  civilStructureTier: TeamTier;
  flooringTier: TeamTier;
  kitchenInteriorTier: TeamTier;
  electricalTier: TeamTier;
  plumbingTier: TeamTier;
  paintingTier: TeamTier;
}

export interface PackageCalculationResult {
  totalEstimatedCost: number;
  materialCost: number;
  labourCost: number;
  managementFee: number;
  estimatedMonths: number;
  warrantyYears: number;
  overallTier: TeamTier;
  assignedTeamLeader: Employee;
  materialBrands: {
    cement: string;
    steel: string;
    tiles: string;
    paint: string;
    wiring: string;
    plumbing: string;
    fixtures: string;
  };
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercentage: number;
  targetDate: string;
  completedDate?: string;
  paymentAmount: number;
  paymentStatus: 'paid' | 'due' | 'upcoming';
}

export interface DailySiteLog {
  id: string;
  projectId: string;
  date: string;
  time: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  notes: string;
  photoUrl: string;
  videoUrl?: string;
  progressPercentage: number;
  safetyAudited: boolean;
  uniformsVerified: boolean;
  weatherCondition: string;
  workersOnSite: number;
}

export interface CustomerProject {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  projectTitle: string;
  propertyType: 'Luxury Villa' | 'Residential Apartment' | 'Commercial Office' | 'Retail Space' | 'Custom Duplex';
  location: string;
  plotSizeSqFt: number;
  builtUpAreaSqFt: number;
  floors: number;
  totalBudget: number;
  paidAmount: number;
  startDate: string;
  estimatedCompletionDate: string;
  overallProgress: number;
  status: 'Planning' | 'In Progress' | 'Inspection' | 'Handover' | 'Completed';
  assignedTeamLeaderId: string;
  assignedTeamLeader: Employee;
  milestones: ProjectMilestone[];
  dailyLogs: DailySiteLog[];
  packageDetails: PackageOptions;
}

export interface DepartmentSummary {
  name: DepartmentName;
  teamLeaderCount: number;
  skilledWorkerCount: number;
  activeProjects: number;
  leadName: string;
  leadAvatar: string;
  satisfactionRating: number;
}

export interface ServiceBookingRequest {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: DepartmentName;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  preferredDate: string;
  preferredSlot: string;
  notes: string;
  estimatedPrice: number;
  status: 'Requested' | 'Assigned' | 'In Progress' | 'Completed';
  assignedLeaderName?: string;
  createdAt: string;
}
