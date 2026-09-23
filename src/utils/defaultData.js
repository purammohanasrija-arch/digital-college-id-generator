export const initialStudentState = {
  name: "Mohana P",
  fatherName: "Prasad P",
  studentId: "24CS1234",
  dob: "2004-05-18",
  gender: "Female",
  bloodGroup: "B+",
  phone: "+91 98765 43210",
  email: "mohana.p@vignan.ac.in",
  photo: "/student_mohana_portrait.png",
  college: "Vignan's Foundation for Science, Technology and Research",
  collegeChoice: "Vignan's Foundation for Science, Technology and Research",
  department: "Computer Science & Engineering",
  course: "B.Tech",
  year: "3rd Year",
  section: "Section A",
  hostel: "Girls Hostel - A",
  validUntil: "2028",
  academicYear: "2024 - 2028",
  address: "Girls Hostel - A, VFSTR Campus, Vadlamudi, AP 522213",
  emergencyContact: "+91 98480 12345 (Campus Warden)",
  tagline: "Learn\nInnovate\nLead ✨",
  motto: "For a Better Tomorrow"
};

export const sampleStudentData = { ...initialStudentState };

// 8 Selectable Card Templates as required
export const cardTemplates = [
  {
    id: "aurora",
    name: "Aurora",
    thumb: "/thumb_aurora.png",
    cardBg: "linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 245, 255, 0.78) 32%, rgba(228, 238, 255, 0.72) 68%, rgba(248, 238, 255, 0.84) 100%)",
    borderGlow: "rgba(168, 85, 247, 0.55)",
    textColor: "#0f172a",
    primaryColor: "#1e3a8a",
    styleDesc: "Translucent frosted glass with iridescent rainbow edges"
  },
  {
    id: "minimal",
    name: "Minimal",
    thumb: "/thumb_minimal.png",
    cardBg: "linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 250, 252, 0.92) 100%)",
    borderGlow: "rgba(255, 255, 255, 0.7)",
    textColor: "#0f172a",
    primaryColor: "#0284c7",
    styleDesc: "Crisp architectural white frost with clean lines"
  },
  {
    id: "classic",
    name: "Classic",
    thumb: "/thumb_classic.png",
    cardBg: "linear-gradient(145deg, rgba(241, 245, 249, 0.92) 0%, rgba(219, 234, 254, 0.86) 100%)",
    borderGlow: "rgba(59, 130, 246, 0.5)",
    textColor: "#0f172a",
    primaryColor: "#1d4ed8",
    styleDesc: "Royal academic navy and sapphire collegiate styling"
  },
  {
    id: "dark",
    name: "Dark",
    thumb: "/thumb_dark.png",
    cardBg: "linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.94) 100%)",
    borderGlow: "rgba(168, 85, 247, 0.4)",
    textColor: "#ffffff",
    primaryColor: "#38bdf8",
    isDark: true,
    styleDesc: "Obsidian dark glass with luminous typography"
  },
  {
    id: "holographic",
    name: "Holographic",
    thumb: "/thumb_aurora.png",
    cardBg: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(236, 72, 153, 0.3) 35%, rgba(56, 189, 248, 0.3) 70%, rgba(255, 255, 255, 0.9) 100%)",
    borderGlow: "rgba(236, 72, 153, 0.6)",
    textColor: "#0f172a",
    primaryColor: "#7e22ce",
    styleDesc: "Prismatic chromatic sheen with vivid rainbow refraction"
  },
  {
    id: "neon",
    name: "Neon",
    thumb: "/thumb_dark.png",
    cardBg: "linear-gradient(145deg, rgba(6, 7, 18, 0.94) 0%, rgba(17, 24, 39, 0.96) 100%)",
    borderGlow: "rgba(6, 182, 212, 0.8)",
    textColor: "#ffffff",
    primaryColor: "#22d3ee",
    isDark: true,
    styleDesc: "Cyberpunk electric cyan and ultraviolet edge illumination"
  },
  {
    id: "glass",
    name: "Glass",
    thumb: "/thumb_minimal.png",
    cardBg: "linear-gradient(145deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)",
    borderGlow: "rgba(255, 255, 255, 0.6)",
    textColor: "#0f172a",
    primaryColor: "#0f172a",
    styleDesc: "Ultra-pure transparent acrylic liquid glass"
  },
  {
    id: "university",
    name: "University",
    thumb: "/thumb_classic.png",
    cardBg: "linear-gradient(145deg, rgba(254, 252, 232, 0.92) 0%, rgba(254, 243, 199, 0.85) 100%)",
    borderGlow: "rgba(245, 158, 11, 0.5)",
    textColor: "#0f172a",
    primaryColor: "#b45309",
    styleDesc: "Prestigious Ivy-league heritage gold & ivory parchment"
  }
];

// 6 Selectable Accent Colors as required
export const accentColors = [
  { id: "purple", name: "Purple", hex: "#a855f7", ring: "#c084fc", glow: "rgba(168, 85, 247, 0.55)" },
  { id: "blue", name: "Blue", hex: "#3b82f6", ring: "#60a5fa", glow: "rgba(59, 130, 246, 0.55)" },
  { id: "pink", name: "Pink", hex: "#ec4899", ring: "#f472b6", glow: "rgba(236, 72, 153, 0.55)" },
  { id: "mint", name: "Mint", hex: "#10b981", ring: "#34d399", glow: "rgba(16, 185, 129, 0.55)" },
  { id: "orange", name: "Orange", hex: "#f97316", ring: "#fb923c", glow: "rgba(249, 115, 22, 0.55)" },
  { id: "cyan", name: "Cyan", hex: "#06b6d4", ring: "#38bdf8", glow: "rgba(6, 182, 212, 0.55)" }
];

// 10 Sample Colleges as required
export const sampleColleges = [
  {
    id: "vfstr",
    name: "Vignan's Foundation for Science, Technology and Research",
    shortName: "VFSTR",
    location: "Vadlamudi, Guntur, Andhra Pradesh",
    accreditation: "Deemed to be University • NAAC 'A+' Grade",
    tagline: "Learn\nInnovate\nLead ✨",
    motto: "For a Better Tomorrow",
    crestImg: "/vignan_crest_clean.png",
    bottomLogoImg: "/vignan_logo_bottom.png",
    primaryColor: "#1e3a8a",
    defaultLogo: {
      text: "VFSTR",
      shape: "shield",
      icon: "education",
      style: "gradient",
      bgColor: "#1e3a8a",
      textColor: "#ffffff",
      borderColor: "#38bdf8",
      border: "medium",
      size: 46
    }
  },
  {
    id: "iith",
    name: "IIT Hyderabad",
    shortName: "IITH",
    location: "Kandi, Sangareddy, Telangana",
    accreditation: "Institute of National Importance • NIRF #8",
    tagline: "Invention\nInnovation\nImpact ✨",
    motto: "Dedicated to the Nation",
    primaryColor: "#0f766e",
    defaultLogo: {
      text: "IITH",
      shape: "shield",
      icon: "technology",
      style: "gradient",
      bgColor: "#0f766e",
      textColor: "#ffffff",
      borderColor: "#2dd4bf",
      border: "medium",
      size: 46
    }
  },
  {
    id: "nitw",
    name: "NIT Warangal",
    shortName: "NITW",
    location: "Warangal, Telangana",
    accreditation: "Institute of National Importance • Estd. 1959",
    tagline: "Knowledge\nService\nExcellence ✨",
    motto: "Truth is Eternal",
    primaryColor: "#1e40af",
    defaultLogo: {
      text: "NITW",
      shape: "circle",
      icon: "science",
      style: "gradient",
      bgColor: "#1e40af",
      textColor: "#ffffff",
      borderColor: "#fbbf24",
      border: "medium",
      size: 46
    }
  },
  {
    id: "au",
    name: "Andhra University",
    shortName: "AU",
    location: "Visakhapatnam, Andhra Pradesh",
    accreditation: "Estd. 1926 • NAAC 'A++' Grade",
    tagline: "Tejasvinav\nAdhitamastu\nEver Forward ✨",
    motto: "May Our Study Be Glorious",
    primaryColor: "#701a75",
    defaultLogo: {
      text: "AU",
      shape: "badge",
      icon: "books",
      style: "solid",
      bgColor: "#701a75",
      textColor: "#ffffff",
      borderColor: "#f472b6",
      border: "medium",
      size: 46
    }
  },
  {
    id: "gitam",
    name: "GITAM University",
    shortName: "GITAM",
    location: "Visakhapatnam, Andhra Pradesh",
    accreditation: "Deemed to be University • NAAC 'A++'",
    tagline: "Explore\nDream\nAchieve ✨",
    motto: "Strive, Serve, Thrive",
    primaryColor: "#065f46",
    defaultLogo: {
      text: "GITAM",
      shape: "circle",
      icon: "university",
      style: "gradient",
      bgColor: "#065f46",
      textColor: "#ffffff",
      borderColor: "#34d399",
      border: "medium",
      size: 46
    }
  },
  {
    id: "klu",
    name: "KL University",
    shortName: "KLU",
    location: "Vaddeswaram, Guntur, AP",
    accreditation: "KLEF Deemed University • NAAC 'A++' (3.57/4)",
    tagline: "Innovate\nCreate\nTransform ✨",
    motto: "Focus on Excellence",
    primaryColor: "#991b1b",
    defaultLogo: {
      text: "KLU",
      shape: "square",
      icon: "technology",
      style: "solid",
      bgColor: "#991b1b",
      textColor: "#ffffff",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  },
  {
    id: "srm",
    name: "SRM University",
    shortName: "SRM",
    location: "Kattankulathur, Chennai / AP",
    accreditation: "Institute of Science & Technology • NAAC 'A++'",
    tagline: "Learn\nLeap\nLead ✨",
    motto: "Learn. Leap. Lead.",
    primaryColor: "#0284c7",
    defaultLogo: {
      text: "SRM",
      shape: "shield",
      icon: "education",
      style: "gradient",
      bgColor: "#0284c7",
      textColor: "#ffffff",
      borderColor: "#38bdf8",
      border: "medium",
      size: 46
    }
  },
  {
    id: "amrita",
    name: "Amrita Vishwa Vidyapeetham",
    shortName: "AMRITA",
    location: "Coimbatore / Amaravati",
    accreditation: "Institution of Eminence • NAAC 'A++'",
    tagline: "Education\nfor Life\nCompassion ✨",
    motto: "Living in Harmony",
    primaryColor: "#c2410c",
    defaultLogo: {
      text: "AMRITA",
      shape: "circle",
      icon: "star",
      style: "gradient",
      bgColor: "#c2410c",
      textColor: "#ffffff",
      borderColor: "#fb923c",
      border: "medium",
      size: 46
    }
  },
  {
    id: "vit",
    name: "VIT University",
    shortName: "VIT",
    location: "Vellore / AP",
    accreditation: "Institute of Eminence • NAAC 'A++'",
    tagline: "Aspire\nAchieve\nLead ✨",
    motto: "A Place to Learn, A Chance to Grow",
    primaryColor: "#1e3a8a",
    defaultLogo: {
      text: "VIT",
      shape: "hexagon",
      icon: "global",
      style: "solid",
      bgColor: "#1e3a8a",
      textColor: "#ffffff",
      borderColor: "#f59e0b",
      border: "medium",
      size: 46
    }
  },
  {
    id: "iiith",
    name: "IIIT Hyderabad",
    shortName: "IIITH",
    location: "Gachibowli, Hyderabad, Telangana",
    accreditation: "Premier Autonomous Research University",
    tagline: "Research\nDiscovery\nLeadership ✨",
    motto: "Transforming Society through Tech",
    primaryColor: "#312e81",
    defaultLogo: {
      text: "IIITH",
      shape: "shield",
      icon: "technology",
      style: "gradient",
      bgColor: "#312e81",
      textColor: "#ffffff",
      borderColor: "#818cf8",
      border: "medium",
      size: 46
    }
  }
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["Male", "Female", "Non-Binary", "Other"];

export const programOptions = [
  "B.Tech",
  "B.E.",
  "B.Sc",
  "B.Com",
  "BBA",
  "BCA",
  "B.Des",
  "B.Arch",
  "B.Pharm",
  "MBBS",
  "M.Tech",
  "M.E.",
  "M.Sc",
  "MBA",
  "MCA",
  "M.Des",
  "Ph.D / Doctorate",
  "Integrated M.Tech (5 Years)",
  "Diploma"
];

export const departmentOptions = [
  "Computer Science & Engineering",
  "CSE (Artificial Intelligence & ML)",
  "CSE (Data Science & Cyber Security)",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biotechnology & Bioinformatics",
  "Chemical & Petroleum Engineering",
  "Aerospace & Aeronautical Engineering",
  "Robotics & Automation",
  "Biomedical Engineering",
  "Business & Management Studies",
  "Commerce & Economics",
  "Sciences & Humanities",
  "Pharmacy & Pharmaceutical Sciences",
  "Architecture & Planning",
  "Design & Media Arts",
  "Law & Legal Studies",
  "Other"
];

export const hostelOptions = [
  "Girls Hostel - A",
  "Girls Hostel - B",
  "Girls Hostel - C",
  "Boys Hostel - A",
  "Boys Hostel - B",
  "Boys Hostel - C",
  "International Scholars Hostel",
  "Postgraduate & Research Block",
  "Executive Deluxe Hall",
  "Day Scholar (Bus Transport)",
  "Day Scholar (Self Commute)",
  "Off-Campus Residence",
  "Other"
];

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

export const validUntilOptions = [
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031"
];

export const logoShapes = [
  { id: "circle", label: "Circle" },
  { id: "shield", label: "Shield" },
  { id: "square", label: "Square" },
  { id: "hexagon", label: "Hexagon" },
  { id: "badge", label: "Crest / Badge" }
];

export const logoIcons = [
  { id: "education", label: "Education", emoji: "🎓" },
  { id: "university", label: "University", emoji: "🏛️" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "technology", label: "Technology", emoji: "💻" },
  { id: "star", label: "Star", emoji: "⭐" },
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
  activeLogo: { ...sampleColleges[0].defaultLogo },
  uploadShape: "circle",
  uploadBg: "white",
  uploadSize: 46,
  uploadFit: "contain"
};

export const initialLogoConfig = defaultLogoConfig;
