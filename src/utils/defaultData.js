export const initialStudentState = {
  name: "",
  fatherName: "",
  studentId: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  phone: "",
  email: "",
  photo: "",
  college: "",
  department: "",
  course: "",
  year: "",
  section: "",
  academicYear: "",
  address: "",
  emergencyContact: ""
};

export const sampleStudentData = {
  name: "Alexander J. Morgan",
  fatherName: "Robert H. Morgan",
  studentId: "STU-2024-8842",
  dob: "2003-08-14",
  gender: "Male",
  bloodGroup: "O+",
  phone: "+1 (555) 382-9471",
  email: "alex.morgan@apex.edu",
  photo: "",
  college: "Apex Institute of Science & Technology",
  department: "School of Computing & Artificial Intelligence",
  course: "B.Tech Computer Science & Engineering",
  year: "3rd Year",
  section: "Section A",
  academicYear: "2024 - 2028",
  address: "402 Silicon Valley Blvd, Technology Park, CA 94025",
  emergencyContact: "+1 (555) 998-1122 (Guardian)"
};

export const cardThemes = [
  {
    id: "navy",
    name: "Royal Navy & Gold",
    primary: "#0f172a",
    secondary: "#1e3a8a",
    accent: "#f59e0b",
    badgeBg: "#1e293b",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #172554 100%)",
    lightAccent: "#dbeafe"
  },
  {
    id: "crimson",
    name: "Crimson & Bronze",
    primary: "#450a0a",
    secondary: "#991b1b",
    accent: "#f59e0b",
    badgeBg: "#7f1d1d",
    gradient: "linear-gradient(135deg, #450a0a 0%, #991b1b 60%, #7f1d1d 100%)",
    lightAccent: "#fee2e2"
  },
  {
    id: "emerald",
    name: "Emerald & Silver",
    primary: "#022c22",
    secondary: "#065f46",
    accent: "#34d399",
    badgeBg: "#047857",
    gradient: "linear-gradient(135deg, #022c22 0%, #065f46 60%, #064e3b 100%)",
    lightAccent: "#d1fae5"
  },
  {
    id: "purple",
    name: "Imperial Violet & Cyan",
    primary: "#2e1065",
    secondary: "#581c87",
    accent: "#38bdf8",
    badgeBg: "#4c1d95",
    gradient: "linear-gradient(135deg, #2e1065 0%, #581c87 60%, #3b0764 100%)",
    lightAccent: "#f3e8ff"
  },
  {
    id: "carbon",
    name: "Midnight Onyx",
    primary: "#09090b",
    secondary: "#27272a",
    accent: "#60a5fa",
    badgeBg: "#18181b",
    gradient: "linear-gradient(135deg, #09090b 0%, #27272a 60%, #18181b 100%)",
    lightAccent: "#f4f4f5"
  }
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["Male", "Female", "Non-Binary", "Other"];

export const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year (Dual Degree)",
  "Final Year",
  "Postgraduate (Year 1)",
  "Postgraduate (Year 2)",
  "Ph.D / Research Scholar"
];

// Sections 1 to 22 as requested by user, plus common letter sections
export const sectionOptions = [
  ...Array.from({ length: 22 }, (_, i) => `Section ${i + 1}`),
  "Section A",
  "Section B",
  "Section C",
  "Section D",
  "Batch 1",
  "Batch 2",
  "Batch 3"
];

export const departmentOptions = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Data Science & Analytics",
  "Cyber Security & Forensics",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Aerospace & Aeronautical Engineering",
  "Biotechnology & Bioinformatics",
  "Chemical Engineering",
  "Business Administration & Management",
  "Commerce & Financial Studies",
  "Computer Applications (BCA / MCA)",
  "Physics & Applied Sciences",
  "Mathematics & Computing",
  "Humanities, Arts & Social Sciences"
];

export const courseOptions = [
  "B.Tech Computer Science & Engineering",
  "B.Tech Information Technology",
  "B.Tech Artificial Intelligence & ML",
  "B.Tech Electronics & Communication",
  "B.Tech Mechanical Engineering",
  "B.Tech Civil Engineering",
  "B.Tech Electrical Engineering",
  "B.E. Computer Science",
  "BCA (Bachelor of Computer Applications)",
  "B.Sc Computer Science",
  "B.Sc Information Technology",
  "B.Sc Data Science",
  "BBA (Bachelor of Business Admin)",
  "B.Com (Honours)",
  "B.A. Economics / English",
  "M.Tech Computer Science",
  "M.Tech Artificial Intelligence",
  "MCA (Master of Computer Applications)",
  "MBA (Master of Business Admin)",
  "M.Sc Computer Science",
  "Ph.D Research Fellow"
];

export const academicSessionOptions = [
  "2025 - 2029",
  "2024 - 2028",
  "2023 - 2027",
  "2022 - 2026",
  "2021 - 2025",
  "2025 - 2028",
  "2024 - 2027",
  "2023 - 2026",
  "2025 - 2027",
  "2024 - 2026",
  "2023 - 2025",
  "2025 - 2030",
  "2024 - 2029",
  "2025 - 2026",
  "2024 - 2025",
  "2026 - 2027"
];

export const collegeOptions = [
  "Apex Institute of Science & Technology",
  "Stanford Institute of Higher Education",
  "Massachusetts Institute of Technology (MIT)",
  "Oxford Academic University",
  "Indian Institute of Technology (IIT)",
  "Imperial College of Engineering & Research",
  "Harvard Academy of Technology",
  "Cambridge International University",
  "California State Polytechnic University",
  "National University of Singapore (NUS)",
  "Melbourne Institute of Technology",
  "University of Toronto & Technology",
  "National Institute of Technology (NIT)",
  "Delhi Technological University",
  "ETH Zurich University of Technology"
];

export const presetLogos = [
  {
    id: "classic",
    name: "Academic Shield (Gold & Navy)",
    icon: "book",
    shape: "shield",
    primaryColor: "#1e3a8a",
    accentColor: "#f59e0b",
    monogram: "AIST",
    estYear: "1985"
  },
  {
    id: "tech",
    name: "Quantum Tech & Innovation",
    icon: "atom",
    shape: "hexagon",
    primaryColor: "#0f172a",
    accentColor: "#38bdf8",
    monogram: "MIT",
    estYear: "1960"
  },
  {
    id: "pillars",
    name: "Classical Heritage Pillars",
    icon: "pillars",
    shape: "circle",
    primaryColor: "#450a0a",
    accentColor: "#fbbf24",
    monogram: "OXF",
    estYear: "1872"
  },
  {
    id: "torch",
    name: "Beacon of Excellence (Torch)",
    icon: "torch",
    shape: "shield",
    primaryColor: "#064e3b",
    accentColor: "#34d399",
    monogram: "IIT",
    estYear: "1951"
  },
  {
    id: "crown",
    name: "Imperial Royal Crown",
    icon: "crown",
    shape: "diamond",
    primaryColor: "#2e1065",
    accentColor: "#c084fc",
    monogram: "HARV",
    estYear: "1905"
  },
  {
    id: "cap",
    name: "Scholars Mortarboard Cap",
    icon: "cap",
    shape: "circle",
    primaryColor: "#172554",
    accentColor: "#60a5fa",
    monogram: "UNIV",
    estYear: "1992"
  }
];

export const initialLogoConfig = {
  mode: "preset",
  presetId: "classic",
  preset: presetLogos[0],
  customUpload: "",
  creator: {
    icon: "book",
    shape: "shield",
    bgColor: "#1e3a8a",
    accentColor: "#f59e0b",
    monogram: "AIST",
    estYear: "EST. 1985"
  }
};


