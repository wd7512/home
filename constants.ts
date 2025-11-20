import { ExperienceItem, EducationItem, ProjectItem, PublicationItem, SkillCategory } from './types';
import { Linkedin, Github, Mail } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "William Dennis",
  title: "Machine Learning Researcher & Computational Modeller",
  tagline: "Building robust systems using ML/AI with 3 years of industry experience.",
  contact: {
    email: "wwdennis.home@gmail.com",
    phone: "+44 (0) 7887360418",
    linkedin: "https://www.linkedin.com/in/williamdennis5/",
    github: "https://github.com/wd7512"
  }
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Energy Modeller",
    company: "Aurora Energy Research",
    location: "Oxford, UK",
    period: "Oct 2024 – Present",
    description: [
      "Applied convex optimisation and maximum likelihood estimation methods to forecasting energy markets.",
      "Presented and developed a use case for reinforcement learning to improve the energy pricing methodology.",
      "Lead modeller of the Polish, Czech and Slovak energy market model, building features and debugging user errors.",
      "Developed a range of tooling in Python using Streamlit for clear data analysis and SQL queries.",
      "Applied best software engineering practises with test driven development, git control and agile/scrum team planning."
    ]
  },
  {
    role: "Data Scientist",
    company: "JP Morgan",
    location: "Bristol, UK",
    period: "Feb 2024 – Jul 2024",
    description: [
      "Lead a team of 4 data scientists to produce in-house quant level research into the development of trading signals derived from millisecond level limit-order-book data.",
      "Built tooling for my team to parse millions of rows of raw text data on local machines using JIT.",
      "Created baseline models using ARIMA, RNNs and LSTMs on level-1 data.",
      "Engineered 50+ features derived from cleaned up level-2 limit order book data."
    ]
  },
  {
    role: "Signal Processing Engineer",
    company: "Milbotix",
    location: "Bristol Robotics Lab, UK",
    period: "Feb 2024 – Oct 2024",
    description: [
      "Developed a two-stage machine learning pipeline optimised for use on embedded devices using accelerometer filtering and novel Fourier features.",
      "Internship extended twice to aid the development of SmartSocks© into a medical grade device.",
      "Achieved an error rate of <3bpm, allowing the device to be medical grade."
    ]
  },
  {
    role: "Intern Hedging Analyst (Risk Team)",
    company: "Ocean Partners",
    location: "Maidenhead, UK",
    period: "Jul 2021 – Jul 2022",
    description: [
      "Mitigated £250m of physical commodity transactions via the London Metal Exchange.",
      "Maintained a strong relationship with banks and brokers using responsive and professional communication.",
      "Automated a data analysis task for clearing transactions, saving 60 minutes of manual labour daily."
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "University of Bristol",
    degree: "MSc Data Science",
    details: "Distinction (Top 3 of cohort)",
    period: "Sep 2023 – Sep 2024",
    achievements: [
      "Deployed distributed cloud architectures on AWS using DynamoDB, SQS, SNS, S3 and EC2 services.",
      "Produced a report on migration patterns of people aged 20-25 in the UK utilising data visualisation.",
      "Member of Google Developer Student Club and Quantitative Analyst at Bristol Trading Society."
    ]
  },
  {
    institution: "University of Bath",
    degree: "BSc (Hons) Mathematical Sciences",
    details: "Scientific Computing (84%) and Machine Learning (91%)",
    period: "Sep 2019 – July 2023",
    achievements: [
      "Built websites in Python to support startups in Setsquared using Django.",
      "2019/2020 poker society winner."
    ]
  }
];

export const RESEARCH_PROJECTS: ProjectItem[] = [
  {
    title: "Robust ML in Harsh Environments",
    description: "A novel framework in Python with PyTorch for evaluating neural networks in harsh environments. Proposed two novel activation functions that proved to be more robust to SEE related errors.",
    tags: ["PyTorch", "Research", "Computer Vision"],
    year: "2025",
    links: [
      { label: "Framework (GitHub)", url: "https://github.com/wd7512/seu-injection-framework" },
      { label: "Interactive Explanation", url: "https://wd7512.github.io/robust-ml-in-harsh-environments-explained/" }
    ]
  },
  {
    title: "Classification of Signal Quality",
    description: "Developed novel time-series features for classification of photoplethysmography signal segments. Tested a range of ML architectures and hyperparameters using AUC+ROC metrics.",
    tags: ["Signal Processing", "Time-Series", "Medical ML"],
    year: "2024"
  }
];

export const PERSONAL_PROJECTS: ProjectItem[] = [
  {
    title: "Evolutionary Snake AI",
    description: "Built an evolutionary learning algorithm from scratch to play snake at a human like level using neural networks.",
    tags: ["Genetic Algorithms", "Neural Networks"],
    year: "2021",
    link: "https://github.com/wd7512/Snake-Learning"
  },
  {
    title: "Chess Bot Guides",
    description: "Wrote 3 guides to help people build their own chess bots.",
    tags: ["Education", "Game AI"],
    year: "2022",
    link: "https://medium.com/@williamdennis5"
  },
  {
    title: "Raspberry Pi Dashboard",
    description: "Temperature sensor with dashboard.",
    tags: ["IoT", "Raspberry Pi"],
    year: "2025",
    link: "https://github.com/wd7512/pi-temp"
  },
  {
    title: "AI Trader",
    description: "Reinforcement learning based AI trader using learntools on linear features.",
    tags: ["RL", "Finance"],
    year: "2023",
    link: "https://github.com/wd7512"
  },
  {
    title: "Steam Market Trading",
    description: "Averaged 366% yearly ROI trading on the Steam marketplace web scraping data.",
    tags: ["Web Scraping", "Automation"],
    year: "2020-2023",
    link: "https://github.com/wd7512"
  }
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: "A Framework for Developing Robust Machine Learning Models in Harsh Environments: A Review of CNN Design Choices",
    authors: "William Dennis and James Pope",
    venue: "ICAART 2025 (17th International Conference on Agents and Artificial Intelligence)",
    date: "Feb 2025",
    status: "Published",
    link: "https://research-information.bris.ac.uk/en/publications/a-framework-for-developing-robust-machine-learning-models-in-hars/"
  },
  {
    title: "Robust Machine Learning for Harsh Environments: A Framework and Evaluation of Key Architectural Choices",
    authors: "William Dennis and James Pope",
    venue: "Lecture Notes in AI, LNAI",
    date: "Dec 2025",
    status: "Published"
  },
  {
    title: "Classification of signal quality from ankle-based photoplethysmographic signals using machine learning",
    authors: "William Dennis",
    venue: "Publication Pending",
    date: "Pending",
    status: "Pending"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python (10 years)", "SQL", "C#", "R", "MATLAB", "Haskell", "TypeScript"]
  },
  {
    name: "Libraries & Frameworks",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "Streamlit", "Django"]
  },
  {
    name: "Cloud & Tools",
    skills: ["AWS", "Google Cloud", "Docker", "Git", "JIRA", "Agile"]
  }
];