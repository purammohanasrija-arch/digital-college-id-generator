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
  college: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
  collegeChoice: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
  customCollege: {
    name: "",
    shortName: "",
    location: ""
  },
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
  college: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
  collegeChoice: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
  customCollege: {
    name: "",
    shortName: "",
    location: ""
  },
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

export const sampleColleges = [
  {
    id: "vfstr",
    name: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
    shortName: "VFSTR",
    location: "Vadlamudi, Guntur, AP",
    accreditation: "NAAC A+ Accredited Deemed to be University",
    defaultLogo: {
      text: "VF",
      shape: "circle",
      icon: "education",
      style: "gradient",
      bgColor: "#0f3b7d",
      textColor: "#ffffff",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  },
  {
    id: "vignan-univ",
    name: "Vignan University",
    shortName: "VU",
    location: "Guntur, Andhra Pradesh",
    accreditation: "Estd. u/s 3 of UGC Act 1956",
    defaultLogo: {
      text: "VU",
      shape: "shield",
      icon: "college",
      style: "gradient",
      bgColor: "#1e3a8a",
      textColor: "#ffffff",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  },
  {
    id: "klu",
    name: "KL University",
    shortName: "KLU",
    location: "Vaddeswaram, Guntur, AP",
    accreditation: "Koneru Lakshmaiah Education Foundation (Deemed to be University)",
    defaultLogo: {
      text: "KL",
      shape: "rounded-square",
      icon: "technology",
      style: "solid",
      bgColor: "#991b1b",
      textColor: "#ffffff",
      borderColor: "#fbbf24",
      border: "medium",
      size: 46
    }
  },
  {
    id: "gitam",
    name: "GITAM University",
    shortName: "GITAM",
    location: "Visakhapatnam, Andhra Pradesh",
    accreditation: "Gandhi Institute of Technology and Management (NAAC A++)",
    defaultLogo: {
      text: "G",
      shape: "badge",
      icon: "university",
      style: "gradient",
      bgColor: "#065f46",
      textColor: "#ffffff",
      borderColor: "#facc15",
      border: "medium",
      size: 46
    }
  },
  {
    id: "andhra-univ",
    name: "Andhra University",
    shortName: "AU",
    location: "Visakhapatnam, Andhra Pradesh",
    accreditation: "Estd. 1926 • State Public University",
    defaultLogo: {
      text: "AU",
      shape: "circle",
      icon: "books",
      style: "outline",
      bgColor: "#581c87",
      textColor: "#e9d5ff",
      borderColor: "#c084fc",
      border: "thick",
      size: 46
    }
  },
  {
    id: "anu",
    name: "Acharya Nagarjuna University",
    shortName: "ANU",
    location: "Nagarjuna Nagar, Guntur, AP",
    accreditation: "State University Accredited with NAAC 'A' Grade",
    defaultLogo: {
      text: "ANU",
      shape: "shield",
      icon: "education",
      style: "gradient",
      bgColor: "#831843",
      textColor: "#fef08a",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  },
  {
    id: "iith",
    name: "IIT Hyderabad",
    shortName: "IITH",
    location: "Kandi, Sangareddy, Telangana",
    accreditation: "Institute of National Importance • Govt. of India",
    defaultLogo: {
      text: "IITH",
      shape: "hexagon",
      icon: "science",
      style: "solid",
      bgColor: "#0f172a",
      textColor: "#38bdf8",
      borderColor: "#38bdf8",
      border: "medium",
      size: 46
    }
  },
  {
    id: "nitw",
    name: "NIT Warangal",
    shortName: "NITW",
    location: "Warangal, Telangana",
    accreditation: "Institute of National Importance • NIRF Top Ranked",
    defaultLogo: {
      text: "NITW",
      shape: "shield",
      icon: "technology",
      style: "gradient",
      bgColor: "#14532d",
      textColor: "#ffffff",
      borderColor: "#fbbf24",
      border: "medium",
      size: 46
    }
  },
  {
    id: "iiith",
    name: "IIIT Hyderabad",
    shortName: "IIITH",
    location: "Gachibowli, Hyderabad, Telangana",
    accreditation: "International Institute of Information Technology",
    defaultLogo: {
      text: "IIITH",
      shape: "square",
      icon: "technology",
      style: "solid",
      bgColor: "#1e1b4b",
      textColor: "#c7d2fe",
      borderColor: "#818cf8",
      border: "thin",
      size: 46
    }
  },
  {
    id: "uoh",
    name: "University of Hyderabad",
    shortName: "UoH",
    location: "Prof. C.R. Rao Road, Hyderabad, TS",
    accreditation: "Institution of Eminence • Central University",
    defaultLogo: {
      text: "UoH",
      shape: "circle",
      icon: "global",
      style: "gradient",
      bgColor: "#1e293b",
      textColor: "#f8fafc",
      borderColor: "#38bdf8",
      border: "medium",
      size: 46
    }
  },
  {
    id: "srm",
    name: "SRM University",
    shortName: "SRM",
    location: "Kattankulathur, Chennai, TN",
    accreditation: "SRM Institute of Science and Technology (NAAC A++)",
    defaultLogo: {
      text: "SRM",
      shape: "badge",
      icon: "star",
      style: "gradient",
      bgColor: "#1e3a8a",
      textColor: "#fef08a",
      borderColor: "#f59e0b",
      border: "thick",
      size: 46
    }
  },
  {
    id: "amrita",
    name: "Amrita Vishwa Vidyapeetham",
    shortName: "AVV",
    location: "Coimbatore, Tamil Nadu",
    accreditation: "NAAC A++ Multi-Disciplinary Deemed University",
    defaultLogo: {
      text: "AVV",
      shape: "shield",
      icon: "education",
      style: "gradient",
      bgColor: "#7c2d12",
      textColor: "#ffedd5",
      borderColor: "#ea580c",
      border: "medium",
      size: 46
    }
  },
  {
    id: "custom",
    name: "Custom College",
    shortName: "CUSTOM",
    location: "",
    accreditation: "Higher Education Institution",
    defaultLogo: {
      text: "COL",
      shape: "circle",
      icon: "education",
      style: "gradient",
      bgColor: "#1e3a8a",
      textColor: "#ffffff",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  }
];

export const collegeOptions = [
  ...sampleColleges.map((c) => c.name)
];

export const logoShapes = [
  { id: "circle", label: "Circle" },
  { id: "shield", label: "Shield" },
  { id: "square", label: "Square" },
  { id: "rounded-square", label: "Rounded Square" },
  { id: "hexagon", label: "Hexagon" },
  { id: "badge", label: "Badge" }
];

export const logoIcons = [
  { id: "education", label: "Education", emoji: "🎓" },
  { id: "college", label: "College", emoji: "🏫" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "technology", label: "Technology", emoji: "💻" },
  { id: "star", label: "Star", emoji: "⭐" },
  { id: "university", label: "University", emoji: "🏛️" },
  { id: "global", label: "Global", emoji: "🌐" }
];

export const logoStyles = [
  { id: "solid", label: "Solid" },
  { id: "gradient", label: "Gradient" },
  { id: "outline", label: "Outline" }
];

export const borderOptions = [
  { id: "none", label: "None" },
  { id: "thin", label: "Thin" },
  { id: "medium", label: "Medium" },
  { id: "thick", label: "Thick" }
];

export const defaultLogoConfig = {
  mode: "default", // "default" | "creator" | "upload"
  customUpload: "",
  activeLogo: { ...sampleColleges[0].defaultLogo }
};

export const initialLogoConfig = defaultLogoConfig;



