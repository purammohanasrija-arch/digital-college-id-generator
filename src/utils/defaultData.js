export const initialStudentState = {
  name: "",
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

