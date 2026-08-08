import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserRole,
  CustomerProject,
  Employee,
  ServiceBookingRequest,
  PackageOptions,
  PackageCalculationResult,
  TeamTier,
  DailySiteLog,
} from '../types/buildora';
import {
  INITIAL_EMPLOYEES,
  INITIAL_PROJECTS,
  INITIAL_SERVICE_BOOKINGS,
} from '../data/mockData';

export type TabType =
  | 'home'
  | 'package_builder'
  | 'ai_estimator'
  | 'services'
  | 'customer_dashboard'
  | 'team_leader_portal'
  | 'operations_portal'
  | 'admin_dashboard';

interface BuildoraContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  projects: CustomerProject[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  activeProject: CustomerProject | undefined;
  employees: Employee[];
  serviceBookings: ServiceBookingRequest[];
  
  // Package calculation
  calculatePackage: (
    plotSqFt: number,
    builtUpSqFt: number,
    floors: number,
    options: PackageOptions,
    propertyType?: string
  ) => PackageCalculationResult;
  
  // Actions
  addNewProject: (newProj: Omit<CustomerProject, 'id' | 'startDate' | 'overallProgress' | 'status' | 'milestones' | 'dailyLogs'>) => string;
  addDailySiteLog: (projectId: string, log: Omit<DailySiteLog, 'id' | 'projectId'>) => void;
  toggleUniformCheck: (employeeId: string, checkKey: keyof Employee['uniformChecklist']) => void;
  assignTeamLeader: (projectId: string, employeeId: string) => void;
  bookIndividualService: (request: Omit<ServiceBookingRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateBookingStatus: (bookingId: string, status: ServiceBookingRequest['status'], leaderName?: string) => void;
}

const BuildoraContext = createContext<BuildoraContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROJECTS = 'buildora_projects_v1';
const LOCAL_STORAGE_KEY_EMPLOYEES = 'buildora_employees_v1';
const LOCAL_STORAGE_KEY_BOOKINGS = 'buildora_bookings_v1';

export const BuildoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  
  const [projects, setProjects] = useState<CustomerProject[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => projects[0]?.id || 'PROJ-901');

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EMPLOYEES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_EMPLOYEES;
  });

  const [serviceBookings, setServiceBookings] = useState<ServiceBookingRequest[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SERVICE_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_BOOKINGS, JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const calculatePackage = (
    plotSqFt: number,
    builtUpSqFt: number,
    floors: number,
    options: PackageOptions,
    propertyType: string = 'Luxury Villa'
  ): PackageCalculationResult => {
    const baseCostPerSqFt: Record<TeamTier, number> = {
      Basic: 1850,
      Standard: 2450,
      Premium: 3200,
      Elite: 4500,
    };

    const propMultiplierMap: Record<string, number> = {
      'Luxury Villa': 1.25,
      'Custom Duplex': 1.15,
      'Commercial Office': 1.10,
      'Retail Space': 1.05,
      'Residential Apartment': 1.00,
    };
    const propMultiplier = propMultiplierMap[propertyType] || 1.15;

    const tiersArray: TeamTier[] = [
      options.architectureTier,
      options.civilStructureTier,
      options.flooringTier,
      options.kitchenInteriorTier,
      options.electricalTier,
      options.plumbingTier,
      options.paintingTier,
    ];

    const weightMap: Record<TeamTier, number> = { Basic: 1, Standard: 2, Premium: 3, Elite: 4 };
    const avgScore = tiersArray.reduce((acc, t) => acc + weightMap[t], 0) / tiersArray.length;

    let overallTier: TeamTier = 'Standard';
    if (avgScore <= 1.4) overallTier = 'Basic';
    else if (avgScore <= 2.4) overallTier = 'Standard';
    else if (avgScore <= 3.4) overallTier = 'Premium';
    else overallTier = 'Elite';

    const sumCost = tiersArray.reduce((acc, tier) => acc + baseCostPerSqFt[tier], 0);
    const calculatedRate = Math.round(sumCost / 7);
    const floorMultiplier = 1 + (floors - 1) * 0.08;

    // Structural Built-up cost + Plot area development cost (landscaping, compound wall, site excavation)
    const builtUpCost = builtUpSqFt * calculatedRate;
    const plotDevelopmentCost = plotSqFt * 160;

    const totalEstimatedCost = Math.round((builtUpCost + plotDevelopmentCost) * floorMultiplier * propMultiplier);

    const materialCost = Math.round(totalEstimatedCost * 0.58);
    const labourCost = Math.round(totalEstimatedCost * 0.32);
    const managementFee = Math.round(totalEstimatedCost * 0.10);

    const baseMonths = Math.max(5, Math.ceil((builtUpSqFt + plotSqFt * 0.2) / 750));
    const estimatedMonths = Math.round(baseMonths * (1 + (floors - 1) * 0.15));

    const warrantyYearsMap: Record<TeamTier, number> = {
      Basic: 5,
      Standard: 10,
      Premium: 15,
      Elite: 25,
    };
    const warrantyYears = warrantyYearsMap[overallTier];

    const assignedTeamLeader = employees.find((e) => e.tier === overallTier) || employees[0];

    const materialBrandsMap = {
      Basic: {
        cement: 'Ultratech / ACC Super',
        steel: 'Jindal Panther Fe550',
        tiles: 'Kajaria Vitrified Tiles',
        paint: 'Asian Paints Tractor Emulsion',
        wiring: 'Havells Fire-Retardant',
        plumbing: 'Supreme CPVC',
        fixtures: 'Hindware Standard Fittings',
      },
      Standard: {
        cement: 'Ultratech Super Premium',
        steel: 'Tata Tiscon Fe550D',
        tiles: 'Somany Premium GVT 4x2',
        paint: 'Asian Paints Premium Apcolite',
        wiring: 'Finolex FRLS High-Flex',
        plumbing: 'Astral Silencio Noise-Free',
        fixtures: 'Jaquar Ceramic & CP Fittings',
      },
      Premium: {
        cement: 'Ultratech Weather Plus',
        steel: 'JSW Neosteel Fe550D',
        tiles: 'Nexion Italian Marble Design',
        paint: 'Asian Paints Royale Luxury',
        wiring: 'Polycab Green Wires',
        plumbing: 'Ashirvad High-Temp CPVC',
        fixtures: 'Kohler Wave Concealed Thermostats',
      },
      Elite: {
        cement: 'Ultratech Ultra-High Strength White',
        steel: 'Tata Tiscon Super-Grade Fe550D',
        tiles: 'Imported Botticino Italian Marble',
        paint: 'Asian Paints Royale Aspira Teflon',
        wiring: 'Schneider Electric Low-Smoke Zero-Halogen',
        plumbing: 'Geberit Swiss Concealed Cisterns',
        fixtures: 'Grohe & Hansgrohe SmartControl Luxury',
      },
    };

    return {
      totalEstimatedCost,
      materialCost,
      labourCost,
      managementFee,
      estimatedMonths,
      warrantyYears,
      overallTier,
      assignedTeamLeader,
      materialBrands: materialBrandsMap[overallTier],
    };
  };

  const addNewProject = (
    newProj: Omit<CustomerProject, 'id' | 'startDate' | 'overallProgress' | 'status' | 'milestones' | 'dailyLogs'>
  ): string => {
    const newId = `PROJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const sampleMilestones = [
      {
        id: 'M1',
        title: 'Architectural Blueprint & Municipal Sanction',
        description: '3D structural calculation, soil testing & municipal permits.',
        status: 'in_progress' as const,
        progressPercentage: 40,
        targetDate: '2026-08-25',
        paymentAmount: Math.round(newProj.totalBudget * 0.15),
        paymentStatus: 'due' as const,
      },
      {
        id: 'M2',
        title: 'Excavation & Structural Foundation',
        description: 'RCC column footing with Buildora Civil Master Craftsmen.',
        status: 'upcoming' as const,
        progressPercentage: 0,
        targetDate: '2026-09-30',
        paymentAmount: Math.round(newProj.totalBudget * 0.25),
        paymentStatus: 'upcoming' as const,
      },
      {
        id: 'M3',
        title: 'Brickwork & Concrete Slab Casting',
        description: 'AAC block masonry & lintel beam curing.',
        status: 'upcoming' as const,
        progressPercentage: 0,
        targetDate: '2026-11-15',
        paymentAmount: Math.round(newProj.totalBudget * 0.30),
        paymentStatus: 'upcoming' as const,
      },
      {
        id: 'M4',
        title: 'Electrical, Plumbing & Handover',
        description: 'Finolex wiring, sanitary fixtures & white-glove clean.',
        status: 'upcoming' as const,
        progressPercentage: 0,
        targetDate: '2027-02-28',
        paymentAmount: Math.round(newProj.totalBudget * 0.30),
        paymentStatus: 'upcoming' as const,
      },
    ];

    const initialLog: DailySiteLog = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      projectId: newId,
      date: today,
      time: '10:00 IST',
      authorName: newProj.assignedTeamLeader.name,
      authorRole: `${newProj.assignedTeamLeader.department} Team Leader`,
      authorAvatar: newProj.assignedTeamLeader.avatar,
      title: 'Project Initiated & Site Survey Conducted',
      notes: 'Initial soil boundary markers laid. Buildora official safety booth installed. Team Leader assigned.',
      photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
      progressPercentage: 5,
      safetyAudited: true,
      uniformsVerified: true,
      weatherCondition: 'Sunny 30°C',
      workersOnSite: 8,
    };

    const fullProject: CustomerProject = {
      ...newProj,
      id: newId,
      startDate: today,
      overallProgress: 5,
      status: 'Planning',
      milestones: sampleMilestones,
      dailyLogs: [initialLog],
    };

    setProjects((prev) => [fullProject, ...prev]);
    setActiveProjectId(newId);
    return newId;
  };

  const addDailySiteLog = (projectId: string, log: Omit<DailySiteLog, 'id' | 'projectId'>) => {
    const newLog: DailySiteLog = {
      ...log,
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      projectId,
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedLogs = [newLog, ...p.dailyLogs];
          const newProgress = Math.min(100, Math.max(p.overallProgress, log.progressPercentage));
          return {
            ...p,
            overallProgress: newProgress,
            dailyLogs: updatedLogs,
          };
        }
        return p;
      })
    );
  };

  const toggleUniformCheck = (employeeId: string, checkKey: keyof Employee['uniformChecklist']) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.id === employeeId) {
          return {
            ...e,
            uniformChecklist: {
              ...e.uniformChecklist,
              [checkKey]: !e.uniformChecklist[checkKey],
            },
          };
        }
        return e;
      })
    );
  };

  const assignTeamLeader = (projectId: string, employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            assignedTeamLeaderId: emp.id,
            assignedTeamLeader: emp,
          };
        }
        return p;
      })
    );

    setEmployees((prev) =>
      prev.map((e) => (e.id === employeeId ? { ...e, currentProjectId: projectId } : e))
    );
  };

  const bookIndividualService = (request: Omit<ServiceBookingRequest, 'id' | 'status' | 'createdAt'>): string => {
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newBooking: ServiceBookingRequest = {
      ...request,
      id: newId,
      status: 'Requested',
      createdAt: nowStr,
    };

    setServiceBookings((prev) => [newBooking, ...prev]);
    return newId;
  };

  const updateBookingStatus = (bookingId: string, status: ServiceBookingRequest['status'], leaderName?: string) => {
    setServiceBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status,
            assignedLeaderName: leaderName || b.assignedLeaderName,
          };
        }
        return b;
      })
    );
  };

  return (
    <BuildoraContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        projects,
        activeProjectId,
        setActiveProjectId,
        activeProject,
        employees,
        serviceBookings,
        calculatePackage,
        addNewProject,
        addDailySiteLog,
        toggleUniformCheck,
        assignTeamLeader,
        bookIndividualService,
        updateBookingStatus,
      }}
    >
      {children}
    </BuildoraContext.Provider>
  );
};

export const useBuildora = () => {
  const context = useContext(BuildoraContext);
  if (!context) {
    throw new Error('useBuildora must be used within a BuildoraProvider');
  }
  return context;
};
