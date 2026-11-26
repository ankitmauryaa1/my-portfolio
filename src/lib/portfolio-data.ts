export type ProjectCategory =
  | "AI & ML"
  | "Data Analytics"
  | "Business Intelligence"
  | "Web Concepts"
  | "Recommendation & NLP"
  | "E-commerce Data";

export type ProjectVisual = "conversation" | "radar" | "workflow" | "funnel" | "events" | "tracker";

export interface PortfolioProject {
  slug: string;
  name: string;
  shortName: string;
  category: ProjectCategory;
  status: "Project" | "Case Study" | "Concept";
  summary: string;
  description: string;
  role: string;
  timeline: string;
  inputs: string[];
  build: string[];
  stack: string[];
  architecture: string[];
  outcome: string;
  target?: string;
  demo?: { href: string; label: string };
  visual: ProjectVisual;
  differentiator: string[];
}

export const featuredProjects: [
  PortfolioProject,
  PortfolioProject,
  PortfolioProject,
  PortfolioProject,
] = [
  {
    slug: "querypilot",
    name: "QueryPilot — AI-Powered SQL Analyst",
    shortName: "QueryPilot",
    category: "AI & ML",
    status: "Project",
    summary: "Ask questions in plain language and explore the answers from a relational database.",
    description:
      "Developed an AI-powered SQL analytics application that converts natural-language questions into SQL queries and retrieves results from relational databases.",
    role: "Project",
    timeline: "",
    inputs: ["Natural-language questions", "Relational databases", "CSV datasets"],
    build: [
      "Natural-language-to-SQL generation",
      "SQL query execution",
      "Database Explorer",
      "CSV dataset uploading",
      "Interactive data visualizations",
      "Dynamic database schema exploration",
    ],
    stack: ["Python", "Streamlit", "MySQL", "SQLAlchemy", "Pandas", "Plotly", "LLM Integration"],
    architecture: [
      "Natural-language question",
      "Schema exploration",
      "SQL generation and execution",
      "Interactive results",
    ],
    outcome:
      "The application brings SQL generation, execution, database exploration, and charting into one interface.",
    visual: "conversation",
    differentiator: [],
  },
  {
    slug: "rockstar-games-dashboard",
    name: "Rockstar Games Business Analytics Dashboard",
    shortName: "Rockstar Games",
    category: "Business Intelligence",
    status: "Project",
    summary:
      "A four-page interactive Power BI dashboard covering business performance, player engagement, and GTA VI predictions.",
    description:
      "Developed an interactive Power BI dashboard with four pages covering Rockstar Games’ business performance.",
    role: "Project",
    timeline: "",
    inputs: [
      "Revenue and sales",
      "Daily and monthly active users",
      "Player retention",
      "Regional performance",
    ],
    build: ["Executive Overview", "Game Analytics", "Financial Performance", "GTA VI Predictions"],
    stack: ["Power BI", "DAX", "Power Query", "Excel"],
    architecture: ["Excel data", "Power Query", "DAX measures", "Power BI dashboard"],
    outcome:
      "The dashboard brings revenue, sales, engagement, retention, regional performance, and business KPIs together with a dedicated predictive analysis page.",
    visual: "funnel",
    differentiator: [],
  },
  {
    slug: "ola-uber-rapido",
    name: "Ola vs Uber vs Rapido — Competitive Market Analysis",
    shortName: "Ola vs Uber vs Rapido",
    category: "Business Intelligence",
    status: "Case Study",
    summary:
      "A competitive case study examining Ola’s declining ride trends alongside Uber and Rapido.",
    description:
      "Created a competitive analytics case study comparing Ola, Uber, and Rapido to examine Ola’s declining ride trends and identify city-level opportunities.",
    role: "Case Study",
    timeline: "",
    inputs: ["Market share", "Ride trends", "Platform revenue"],
    build: [
      "Market share and ride trends",
      "Platform revenue and competitor performance",
      "City-level opportunities",
      "Business recommendations",
    ],
    stack: ["Power BI", "DAX", "Data Analytics", "Business Intelligence"],
    architecture: ["Platform comparison", "KPI analysis", "City-level opportunities"],
    outcome:
      "The case study compares competitor performance and uses city-level analysis to frame business recommendations.",
    visual: "workflow",
    differentiator: [],
  },
  {
    slug: "civicpulse",
    name: "CivicPulse — Smart Complaint Management System",
    shortName: "CivicPulse",
    category: "Web Concepts",
    status: "Concept",
    summary:
      "A responsive web application concept for reporting and tracking public infrastructure issues.",
    description:
      "Designed a public issue management web application concept that helps citizens report and track infrastructure-related complaints.",
    role: "Concept",
    timeline: "",
    inputs: ["Infrastructure complaints"],
    build: [
      "Citizen complaint submission",
      "Issue management interface",
      "Public infrastructure issue tracking",
      "Responsive design",
    ],
    stack: [],
    architecture: ["Submit a complaint", "Manage the issue", "Track status"],
    outcome:
      "The concept illustrates how citizens could submit complaints and follow their status through a responsive interface.",
    visual: "radar",
    differentiator: [],
  },
];

export const medicalInsuranceProject: PortfolioProject = {
  slug: "medical-insurance",
  name: "Medical Insurance Cost Prediction",
  shortName: "Medical Insurance Cost Prediction",
  category: "AI & ML",
  status: "Project",
  summary:
    "A regression project using Linear Regression, Ridge, and Lasso to predict medical insurance costs.",
  description:
    "A regression project using Linear Regression, Ridge, and Lasso to predict medical insurance costs.",
  role: "Project",
  timeline: "",
  inputs: [],
  build: [],
  stack: ["Python", "Linear Regression", "Ridge", "Lasso"],
  architecture: [],
  outcome:
    "A regression project using Linear Regression, Ridge, and Lasso to predict medical insurance costs.",
  visual: "workflow",
  differentiator: [],
};

export const ecommerceDataProject: PortfolioProject = {
  slug: "ecommerce-data",
  name: "E-commerce Data Analysis",
  shortName: "E-commerce Data Analysis",
  category: "Data Analytics",
  status: "Project",
  summary: "An exploratory analysis of e-commerce data with SQL and Python.",
  description: "An exploratory analysis of e-commerce data with SQL and Python.",
  role: "Project",
  timeline: "",
  inputs: [],
  build: [],
  stack: ["SQL", "Python", "Pandas"],
  architecture: [],
  outcome: "An exploratory analysis of e-commerce data with SQL and Python.",
  visual: "workflow",
  differentiator: [],
};

export const additionalProjects: PortfolioProject[] = [
  {
    slug: "zomato-analytics",
    name: "Zomato Analytics Dashboard",
    shortName: "Zomato Analytics Dashboard",
    category: "Business Intelligence",
    status: "Project",
    summary: "A Power BI dashboard for Zomato analytics.",
    description: "A Power BI dashboard for Zomato analytics.",
    role: "Project",
    timeline: "",
    inputs: [],
    build: [],
    stack: ["Power BI"],
    architecture: [],
    outcome: "A Power BI dashboard for Zomato analytics.",
    visual: "funnel",
    differentiator: [],
  },
  {
    slug: "blinkit-sales",
    name: "Blinkit Sales Dashboard",
    shortName: "Blinkit Sales Dashboard",
    category: "Business Intelligence",
    status: "Project",
    summary: "A Power BI dashboard for exploring Blinkit sales.",
    description: "A Power BI dashboard for exploring Blinkit sales.",
    role: "Project",
    timeline: "",
    inputs: [],
    build: [],
    stack: ["Power BI"],
    architecture: [],
    outcome: "A Power BI dashboard for exploring Blinkit sales.",
    visual: "funnel",
    differentiator: [],
  },
  {
    slug: "luxury-cars-analytics",
    name: "Luxury Cars Analytics Dashboard",
    shortName: "Luxury Cars Analytics Dashboard",
    category: "Business Intelligence",
    status: "Project",
    summary: "A Power BI dashboard for luxury car analytics.",
    description: "A Power BI dashboard for luxury car analytics.",
    role: "Project",
    timeline: "",
    inputs: [],
    build: [],
    stack: ["Power BI"],
    architecture: [],
    outcome: "A Power BI dashboard for luxury car analytics.",
    visual: "funnel",
    differentiator: [],
  },
  {
    slug: "india-census",
    name: "India Census Analytics",
    shortName: "India Census Analytics",
    category: "Business Intelligence",
    status: "Project",
    summary: "Power BI analysis of India census data.",
    description: "Power BI analysis of India census data.",
    role: "Project",
    timeline: "",
    inputs: [],
    build: [],
    stack: ["Power BI"],
    architecture: [],
    outcome: "Power BI analysis of India census data.",
    visual: "funnel",
    differentiator: [],
  },
  {
    slug: "loan-approval",
    name: "Loan Approval Prediction",
    shortName: "Loan Approval Prediction",
    category: "AI & ML",
    status: "Project",
    summary:
      "A classification project using Random Forest and Decision Tree to predict loan approval.",
    description:
      "A classification project using Random Forest and Decision Tree to predict loan approval.",
    role: "Project",
    timeline: "",
    inputs: [],
    build: [],
    stack: ["Python", "Random Forest", "Decision Tree"],
    architecture: [],
    outcome:
      "A classification project using Random Forest and Decision Tree to predict loan approval.",
    visual: "workflow",
    differentiator: [],
  },
  medicalInsuranceProject,
  ecommerceDataProject,
];

export const projects = [...featuredProjects, ...additionalProjects];

export const writingPosts = featuredProjects.slice(0, 3).map((project) => ({
  title: project.name,
  topic: project.category,
  projectSlug: project.slug,
  excerpt: project.summary,
}));

export const navigationItems = [
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Writing", to: "/writing" as const },
  { label: "Services", to: "/services" as const },
  { label: "Contact", to: "/contact" as const },
];
