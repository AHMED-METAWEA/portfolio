/**
 * ─────────────────────────────────────────────────────────────
 *  All site content lives here. Edit this file to update the
 *  portfolio — no need to touch the components.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Ahmed Metawea',
  firstName: 'Ahmed',
  initials: 'AM',
  title: 'AI & Data Science Engineer',
  roles: [
    'AI & Data Science Engineer',
    'Machine Learning Engineer',
    'Computer Vision Engineer',
    'NLP & LLM Engineer',
    'Multi-Agent Systems Builder',
  ],
  tagline:
    'I build end-to-end AI systems — from fine-tuned vision and language models to multi-agent LLM platforms — and ship them as products people can actually use.',
  location: 'Cairo, Egypt',
  email: 'ahmed.metawea001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ahmed-metawea-575569247',
  github: 'https://github.com/AHMED-METAWEA',
  kaggle: 'https://www.kaggle.com/ahmed1metawea',
  resume: '/Ahmed_Metawea_CV.pdf',
  /** Put your headshot at public/ahmed.jpg (square, ≥ 800×800). A monogram shows until then. */
  photo: '/ahmed.jpg',
  availability: 'Open to AI / ML roles & freelance projects',
}

export const heroChips = [
  { label: 'PyTorch · ViT · YOLOv11', position: 'top' as const },
  { label: 'LangGraph · FastAPI · AWS', position: 'bottom' as const },
]

export const about = {
  heading: ['Turning models into', 'products that work'],
  paragraphs: [
    "I'm Ahmed, an AI & Data Science engineer based in Cairo with a Bachelor's degree in Artificial Intelligence from Kafr Elsheikh University. What drives me is taking a model out of the notebook and all the way to something real — a web app, an API, or an automated pipeline that solves an actual problem.",
    'My work spans computer vision (Vision Transformers for skin-lesion diagnosis, real-time monitoring with YOLOv11 and FaceNet), NLP (translating Arabic dialects into Modern Standard Arabic with fine-tuned transformers), and LLM-powered multi-agent systems built with LangGraph.',
    'I care about systems that are reliable, not just impressive: deterministic computation where numbers matter, tests and Docker for reproducibility, and LLMs used where they add real value.',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Advanced' },
  ],
}

export type FocusIcon = 'vision' | 'nlp' | 'agents' | 'deploy'

export const focusAreas: { icon: FocusIcon; title: string; text: string }[] = [
  {
    icon: 'vision',
    title: 'Computer Vision',
    text: 'Classification, detection and recognition — from ViT fine-tuning to real-time YOLO monitoring.',
  },
  {
    icon: 'nlp',
    title: 'NLP & Arabic NLP',
    text: 'Transformer fine-tuning, machine translation and production text pipelines for Arabic and English.',
  },
  {
    icon: 'agents',
    title: 'LLMs & Multi-Agent Systems',
    text: 'LangGraph agents, RAG and multi-provider LLM layers that turn raw data into decisions.',
  },
  {
    icon: 'deploy',
    title: 'Applied ML & Deployment',
    text: 'Data preprocessing and modeling through Flask / FastAPI services, Docker and AWS.',
  },
]

export const stats = [
  { value: 6, suffix: '+', decimals: 0, label: 'End-to-end AI projects' },
  { value: 96.95, suffix: '%', decimals: 2, label: 'ViT validation accuracy' },
  { value: 71.56, suffix: '', decimals: 2, label: 'BLEU · Arabic dialect → MSA' },
  { value: 2, suffix: '', decimals: 0, label: 'Industry AI certifications' },
]

export type ProjectCategory = 'Agents & LLMs' | 'Computer Vision' | 'NLP' | 'Healthcare AI'
export type ProjectIcon = 'agents' | 'skin' | 'vision' | 'translate' | 'lab' | 'text'

export interface Project {
  title: string
  subtitle: string
  icon: ProjectIcon
  featured?: boolean
  badge?: string
  categories: ProjectCategory[]
  problem: string
  solution: string
  highlights?: string[]
  metrics: { value: string; label: string }[]
  stack: string[]
  role?: string
  repo: string
}

export const projects: Project[] = [
  {
    title: 'DAAS',
    subtitle: 'Data Analysis Automation System — Multi-Agent BI Platform',
    icon: 'agents',
    featured: true,
    badge: 'Featured',
    categories: ['Agents & LLMs'],
    problem:
      'Small and e-commerce businesses sit on valuable sales data but rarely have the analysts or tooling to clean it, forecast demand or spot customers who are about to churn.',
    solution:
      'A full-stack, multi-agent BI platform where owners ingest data from files, Google Sheets or a linked database and get automated cleaning, analytics, forecasting, marketing insights and churn prediction.',
    highlights: [
      '10 specialized agents: human-in-the-loop data cleaning, RFM segmentation, back-tested forecasting, churn prediction, root-cause analysis and scheduled autonomous monitoring with alerts.',
      'Deterministic-first architecture — every KPI, forecast and score is computed with pandas / scikit-learn / Prophet.',
      'Multi-provider LLM layer (Groq → Anthropic → OpenAI → OpenRouter) used only to narrate results — eliminating hallucinated figures.',
    ],
    metrics: [
      { value: '10', label: 'Specialized agents' },
      { value: '≈0.93', label: 'Churn model AUC' },
      { value: '4', label: 'LLM providers w/ failover' },
    ],
    stack: ['LangGraph', 'FastAPI', 'Next.js', 'PostgreSQL', 'pandas', 'scikit-learn', 'Prophet'],
    repo: 'https://github.com/AHMED-METAWEA/DAAS-Data-Analysis-Automation-System-',
  },
  {
    title: 'Safe Skin',
    subtitle: 'AI-Driven Skin Cancer Detection Platform',
    icon: 'skin',
    badge: 'Graduation Project',
    categories: ['Computer Vision', 'Healthcare AI'],
    problem:
      'Early skin-cancer screening depends on specialist access, and public lesion datasets are heavily imbalanced across classes.',
    solution:
      'Fine-tuned a Vision Transformer on HAM10000 with data augmentation and weighted cross-entropy loss, then shipped it in a full-stack Flask app with a Google Gemini chatbot and a Google Maps clinic locator.',
    metrics: [
      { value: '96.95%', label: 'Validation accuracy' },
      { value: '7', label: 'Lesion classes' },
    ],
    stack: ['PyTorch', 'Vision Transformer', 'Flask', 'Gemini API', 'Google Maps API'],
    repo: 'https://github.com/AHMED-METAWEA/Skin-Cancer-Classification-ViT',
  },
  {
    title: 'Sentinel CV',
    subtitle: 'Multi-Capability Vision Monitoring Platform',
    icon: 'vision',
    categories: ['Computer Vision'],
    problem:
      'Monitoring and proctoring setups usually need a separate system for every detection task — costly to run and hard to maintain.',
    solution:
      'A modular platform that unifies face recognition plus phone, violence, fall and cheating detection under one config-driven architecture, with lazy model loading and LRU caching.',
    metrics: [
      { value: '5', label: 'Vision capabilities' },
      { value: '54', label: 'Automated tests' },
    ],
    stack: ['YOLOv11', 'Keras', 'FaceNet', 'Streamlit', 'Docker'],
    repo: 'https://github.com/AHMED-METAWEA/Sentinel-Computer-Vision',
  },
  {
    title: 'Arabic Dialect → MSA',
    subtitle: 'Neural Machine Translation',
    icon: 'translate',
    categories: ['NLP'],
    problem:
      'Most Arabic NLP tools are built for Modern Standard Arabic, while everyday text is written in regional dialects.',
    solution:
      'Fine-tuned and benchmarked AraT5, mT5, NLLB and AraBART on the MADAR parallel corpus (Egyptian, Gulf and Levantine dialects), then served the best model through a Flask REST API.',
    metrics: [
      { value: '71.56', label: 'BLEU (AraT5)' },
      { value: '~51K', label: 'Sentence pairs' },
    ],
    stack: ['Hugging Face', 'AraT5', 'mT5', 'NLLB', 'AraBART', 'Flask'],
    repo: 'https://github.com/amr-ai/Arabic-Dialect-to-MSA/tree/main',
  },
  {
    title: 'SmartLab',
    subtitle: 'AI Medical Laboratory Analysis System',
    icon: 'lab',
    badge: 'Team Project',
    categories: ['Healthcare AI', 'NLP'],
    problem:
      'Lab reports are dense and hard for patients to interpret without a doctor walking them through the numbers.',
    solution:
      'An end-to-end pipeline that scans reports with OCR, classifies the report type with NLP and routes it to purpose-built models for CBC, liver, kidney and heart analysis — with an LLM chatbot that explains the results.',
    metrics: [
      { value: '98.76%', label: 'Top accuracy' },
      { value: '0.996', label: 'ROC-AUC' },
    ],
    stack: ['OCR', 'NLP', 'Stacking Ensemble', 'Random Forest', 'LLM Chatbot'],
    role: 'Built the OCR pipeline and the Liver Function ML model.',
    repo: 'https://github.com/amr-ai/Medical-Ai',
  },
  {
    title: 'Multilingual Text Preprocessing',
    subtitle: 'End-to-End NLP & MLOps Engine',
    icon: 'text',
    categories: ['NLP'],
    problem:
      'Arabic and English need very different cleaning pipelines, and ad-hoc scripts are hard to reuse in production.',
    solution:
      'A modular dual-language engine on FastAPI: Arabic normalization (tashkeel / tatweel removal, root extraction) and English tokenization, negation-aware stopwords and lemmatization — configurable per request via JSON.',
    metrics: [
      { value: '2', label: 'Languages' },
      { value: '1', label: 'Docker image, API + GUI' },
    ],
    stack: ['FastAPI', 'Pydantic', 'spaCy', 'NLTK', 'PyArabic', 'Docker'],
    repo: 'https://github.com/AHMED-METAWEA/Text-Preprocessor',
  },
]

export type SkillIcon = 'code' | 'ml' | 'dl' | 'nlp' | 'agents' | 'cloud'

export const skillGroups: { icon: SkillIcon; title: string; items: string[] }[] = [
  {
    icon: 'code',
    title: 'Languages & Backend',
    items: ['Python', 'SQL', 'FastAPI', 'Flask', 'Streamlit', 'Pydantic', 'REST APIs'],
  },
  {
    icon: 'ml',
    title: 'Machine Learning & Data',
    items: ['scikit-learn', 'pandas', 'Ensemble Models', 'Forecasting (Prophet)', 'RFM & Churn Analytics', 'PostgreSQL'],
  },
  {
    icon: 'dl',
    title: 'Deep Learning & Vision',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'Vision Transformers', 'YOLOv11', 'FaceNet', 'OpenCV'],
  },
  {
    icon: 'nlp',
    title: 'NLP & LLMs',
    items: ['Hugging Face', 'AraT5 / mT5 / NLLB', 'spaCy', 'NLTK', 'LangChain', 'RAG', 'FAISS'],
  },
  {
    icon: 'agents',
    title: 'Agents & AI Systems',
    items: ['LangGraph', 'Multi-Agent Orchestration', 'Multi-Provider LLMs', 'Human-in-the-Loop', 'OCR Pipelines'],
  },
  {
    icon: 'cloud',
    title: 'MLOps & Cloud',
    items: ['Docker', 'Amazon SageMaker', 'AWS ML Services', 'pytest', 'Git & GitHub'],
  },
]

export const softSkills = ['Teamwork', 'Effective Communication', 'Problem Solving', 'Continuous Learning']

export type TimelineKind = 'training' | 'education' | 'activity'

export const timeline: {
  kind: TimelineKind
  title: string
  org: string
  date: string
  place?: string
  points: string[]
}[] = [
  {
    kind: 'training',
    title: 'AI & Data Science Track',
    org: 'Digilians Initiative — Specialized Diploma (9 months)',
    date: 'Dec 2025 – Aug 2026',
    place: 'Military Academy, Egypt',
    points: [
      'Intensive, project-based program in the AI & Data Science track.',
      'Built end-to-end machine learning, deep learning, NLP and computer-vision projects — from data preparation to deployed apps.',
    ],
  },
  {
    kind: 'education',
    title: 'Bachelor of Artificial Intelligence',
    org: 'Faculty of Artificial Intelligence, Kafr Elsheikh University',
    date: 'Graduated Jul 2025',
    place: 'Kafr Elsheikh, Egypt',
    points: [
      'Graduated with an overall grade of Very Good.',
      'Graduation project: Safe Skin — a Vision Transformer skin-cancer detection platform (96.95% validation accuracy).',
      'Core coursework across machine learning, deep learning, computer vision and NLP.',
    ],
  },
  {
    kind: 'activity',
    title: 'Contestant',
    org: 'Egyptian Collegiate Programming Contest (ECPC)',
    date: '2023',
    place: 'Alexandria',
    points: ['Solved algorithmic and mathematical problems using data structures and algorithms under strict time limits.'],
  },
]

export const certifications: {
  title: string
  issuer: string
  date?: string
  highlight?: boolean
  url?: string
}[] = [
  {
    title: 'AWS Certified Machine Learning Engineer – Associate (MLA-C01)',
    issuer: 'Amazon Web Services',
    highlight: true,
    url: 'https://drive.google.com/file/d/1uX131rXBSAC2pIg_fCeChm0l-Q1-MMtz/view?usp=sharing',
  },
  {
    title: 'HCIA-AI — Huawei Certified ICT Associate, Artificial Intelligence',
    issuer: 'Huawei',
    highlight: true,
    url: 'https://drive.google.com/file/d/1NnLTrkq_ai9E4gaAj8a0F7VyAIV5oaf0/view?usp=sharing',
  },
  {
    title: 'IBM AI Engineering Professional Certificate',
    issuer: 'IBM · Coursera',
    url: 'https://www.coursera.org/account/accomplishments/specialization/7TVO1R3LUID9',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford · Andrew Ng',
  },
  {
    title: 'Artificial Intelligence A-Z 2025: Agentic AI, Gen AI & RL',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-897f700e-c2d8-492a-bb7d-714b091c17ae/',
  },
  {
    title: 'AI & Machine Learning with Quantum Computing Foundations',
    issuer: 'Ministry of Youth & Sports — Shabab Mobtakeron',
    date: 'Feb 2024',
    url: 'https://drive.google.com/file/d/1hLeC7HAwksaz4tM6S93Ebj9MsUDYUUho/view?usp=sharing',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
