-- Run this AFTER 001_initial.sql to populate Taha's existing data

-- Get section IDs (run 001_initial.sql first)
DO $$
DECLARE
  edu_id uuid;
  exp_id uuid;
  pub_id uuid;
  proj_id uuid;
  skills_id uuid;
  ach_id uuid;
BEGIN

SELECT id INTO edu_id FROM sections WHERE slug = 'education' LIMIT 1;
SELECT id INTO exp_id FROM sections WHERE slug = 'experience' LIMIT 1;
SELECT id INTO pub_id FROM sections WHERE slug = 'publications' LIMIT 1;
SELECT id INTO proj_id FROM sections WHERE slug = 'projects' LIMIT 1;
SELECT id INTO skills_id FROM sections WHERE slug = 'skills' LIMIT 1;
SELECT id INTO ach_id FROM sections WHERE slug = 'achievements' LIMIT 1;

-- Education
INSERT INTO entries (section_id, data, position) VALUES (edu_id, '{
  "degree": "Bachelor of Science in Electrical Engineering",
  "institution": "National University of Sciences and Technology (NUST)",
  "location": "Islamabad, Pakistan",
  "duration": "2023 – 2027",
  "specialization": "Communications",
  "description": "Pursuing a rigorous undergraduate program with focus on communications engineering, signal processing, and autonomous systems. Active in research under faculty mentors, contributing to published IEEE conference papers.",
  "current": true
}'::jsonb, 1);

-- Experience
INSERT INTO entries (section_id, data, position) VALUES (exp_id, '{
  "position": "Research Assistant",
  "organization": "National University of Sciences and Technology (NUST) — SEECS",
  "supervisor": "Asst. Prof. Dr. Ahmed Naeem",
  "duration": "Jan 2026 – Present",
  "current": true,
  "type": "Research",
  "responsibilities": [
    "Conducting research on CFO-aware adaptive preamble selection for PRACH-based uplink synchronization in LEO NTN.",
    "Co-authoring IEEE conference papers on multi-objective UAV association with ISAC-enabled UAV swarms.",
    "Developing simulation frameworks in MATLAB and Python for evaluating communication protocols.",
    "Contributing to research on GPS integrity-aware dual-path detection for UAV spoofing and jamming attacks."
  ],
  "technologies": ["MATLAB", "Python", "LaTeX", "Signal Processing", "LEO NTN", "UAV Networks"]
}'::jsonb, 1);

INSERT INTO entries (section_id, data, position) VALUES (exp_id, '{
  "position": "IoT & Security Systems Intern",
  "organization": "YNS Systems — Pakistan",
  "duration": "Feb 2025 – Mar 2026",
  "current": false,
  "type": "Industry",
  "responsibilities": [
    "Designed and deployed IoT-based security and monitoring solutions for commercial clients.",
    "Integrated embedded systems (ESP, Arduino, Raspberry Pi) with cloud-based dashboards.",
    "Implemented ML-based facial recognition for automated access control systems.",
    "Developed mobile applications for real-time remote monitoring and alerts."
  ],
  "technologies": ["IoT", "ESP32", "Arduino", "Raspberry Pi", "Python", "OpenCV"]
}'::jsonb, 2);

-- Publications
INSERT INTO entries (section_id, data, position) VALUES (pub_id, '{
  "title": "A Multi-Objective Association for Post-Disaster UAVs with ISAC-Enabled UAV Swarms",
  "authors": ["M. Shakeel", "T. Mahmood", "A. Naeem"],
  "venue": "IEEE 34th Signal Processing and Communications Applications (SIU) Conference",
  "year": 2025,
  "status": "Accepted",
  "type": "Conference",
  "abstract": "Addresses multi-objective UAV association problems in post-disaster scenarios, leveraging ISAC-enabled UAV swarms for efficient communication and sensing.",
  "tags": ["UAV Networks", "ISAC", "Multi-Objective Optimization", "Disaster Response"],
  "doi": "",
  "paper_url": ""
}'::jsonb, 1);

INSERT INTO entries (section_id, data, position) VALUES (pub_id, '{
  "title": "CFO-Aware Adaptive Selection of LFM and HFM Preambles for Robust Synchronization in LEO-NTN",
  "authors": ["T. Mahmood", "M. Shakeel", "A. Naeem"],
  "venue": "IEEE Future Networks World Forum",
  "year": 2026,
  "status": "Under Review",
  "type": "Conference",
  "abstract": "Proposes a CFO-aware adaptive preamble selection framework using LFM and HFM waveforms for improved uplink synchronization robustness in LEO non-terrestrial networks.",
  "tags": ["LEO Satellites", "NTN", "Synchronization", "PRACH", "Signal Processing"],
  "doi": "",
  "paper_url": ""
}'::jsonb, 2);

INSERT INTO entries (section_id, data, position) VALUES (pub_id, '{
  "title": "GPS Integrity-Aware Dual-Path Detection Framework for UAV Spoofing and Jamming Attacks",
  "authors": ["M. H. Jehangir", "A. N. Anwar", "T. Mahmood", "A. Naeem"],
  "venue": "IEEE Future Networks World Forum",
  "year": 2026,
  "status": "Under Review",
  "type": "Conference",
  "abstract": "Introduces a GPS integrity-aware dual-path detection framework to identify and mitigate spoofing and jamming attacks against UAV navigation systems.",
  "tags": ["UAV Security", "GPS Spoofing", "Jamming Detection", "Cyber Security"],
  "doi": "",
  "paper_url": ""
}'::jsonb, 3);

-- Projects
INSERT INTO entries (section_id, data, position) VALUES (proj_id, '{
  "title": "Autonomous Flood Rescue UAV–USV System",
  "description": "Final Year Project. An autonomous UAV–USV cooperative system for flood disaster response. Features swarm-based aerial surveillance and active rescue with flotation device deployment, combining computer vision, autonomous navigation, and real-time coordination.",
  "category": ["Robotics", "AI", "Embedded Systems"],
  "technologies": ["ROS", "Python", "Computer Vision", "Mission Planner", "ArduPilot", "Jetson Nano"],
  "date": "2025 – Present",
  "github": "",
  "demo": "",
  "paper": ""
}'::jsonb, 1);

INSERT INTO entries (section_id, data, position) VALUES (proj_id, '{
  "title": "Autonomous Unmanned Surface Vehicle (USV)",
  "description": "Fully autonomous USV with dual-mode operation for real-time waterway missions, including water quality monitoring using pH, temperature, and turbidity sensors.",
  "category": ["Robotics", "IoT", "Embedded Systems"],
  "technologies": ["Arduino", "Raspberry Pi", "ROS", "Python", "pH/Temperature/Turbidity Sensors"],
  "date": "Sept 2025",
  "github": "",
  "demo": "",
  "paper": ""
}'::jsonb, 2);

INSERT INTO entries (section_id, data, position) VALUES (proj_id, '{
  "title": "EMG-Based Prosthetic Limb",
  "description": "Smart prosthetic arm controlled by EMG signals and computer vision, enabling intuitive dual-mode control with natural movement replication through advanced signal processing and gesture recognition.",
  "category": ["AI", "Embedded Systems", "Signal Processing"],
  "technologies": ["Python", "OpenCV", "Signal Processing", "Arduino", "EMG Sensors"],
  "date": "Dec 2025",
  "github": "",
  "demo": "",
  "paper": ""
}'::jsonb, 3);

INSERT INTO entries (section_id, data, position) VALUES (proj_id, '{
  "title": "ML-Based Facial Recognition Security System",
  "description": "IoT-based smart security system with ML-powered facial recognition for automated access control, with a mobile application for real-time alerts and remote monitoring.",
  "category": ["AI", "Machine Learning", "IoT"],
  "technologies": ["Python", "OpenCV", "TensorFlow", "Raspberry Pi", "Mobile App"],
  "date": "Dec 2024",
  "github": "",
  "demo": "",
  "paper": ""
}'::jsonb, 4);

INSERT INTO entries (section_id, data, position) VALUES (proj_id, '{
  "title": "Animal Voice Recognition System",
  "description": "ML model classifying animal species and emotional states from audio signals using MFCC and spectral features, deployed on Edge Impulse for real-time on-device inference.",
  "category": ["Machine Learning", "Signal Processing", "AI"],
  "technologies": ["Python", "TensorFlow", "Edge Impulse", "Audio DSP", "Scikit-Learn"],
  "date": "March 2024",
  "github": "",
  "demo": "",
  "paper": ""
}'::jsonb, 5);

-- Skills (single entry with all skill data)
INSERT INTO entries (section_id, data, position) VALUES (skills_id, '{
  "programming": [
    {"name": "Python", "level": 90, "icon": "🐍"},
    {"name": "MATLAB", "level": 88, "icon": "📊"},
    {"name": "C++", "level": 75, "icon": "⚡"},
    {"name": "LaTeX", "level": 85, "icon": "📄"}
  ],
  "frameworks": [
    {"name": "TensorFlow / Keras", "level": 80},
    {"name": "OpenCV", "level": 82},
    {"name": "NumPy / Pandas", "level": 85},
    {"name": "ROS", "level": 72},
    {"name": "Scikit-Learn", "level": 78}
  ],
  "hardware": ["Arduino", "ESP32 / ESP8266", "Raspberry Pi", "NVIDIA Jetson Nano", "Adalm Pluto SDR", "Agilent VSG & VSA", "Rohde & Schwarz VSG & VSA"],
  "software_tools": [
    {"name": "MATLAB", "category": "Simulation"},
    {"name": "GUROBI Optimizer", "category": "Optimization"},
    {"name": "Mission Planner", "category": "UAV"},
    {"name": "ArduPilot", "category": "UAV"},
    {"name": "Edge Impulse", "category": "Edge AI"},
    {"name": "LaTeX / Overleaf", "category": "Writing"},
    {"name": "Git / GitHub", "category": "DevOps"},
    {"name": "VS Code", "category": "IDE"}
  ],
  "soft_skills": ["Research & Technical Writing", "Problem Solving", "Team Collaboration", "Project Management", "Critical Thinking", "Presentation & Communication"],
  "languages": [
    {"name": "English", "level": "Advanced"},
    {"name": "Urdu", "level": "Native"}
  ]
}'::jsonb, 1);

-- Achievements
INSERT INTO entries (section_id, data, position) VALUES (ach_id, '{"title": "IEEE SIU 2025 — Accepted Publication", "description": "Research paper on multi-objective UAV association with ISAC-enabled UAV swarms accepted at IEEE 34th Signal Processing and Communications Applications Conference.", "year": "2025", "type": "Publication", "icon": "🏆"}'::jsonb, 1);
INSERT INTO entries (section_id, data, position) VALUES (ach_id, '{"title": "IEEE Future Networks World Forum — Submissions", "description": "Two papers submitted: CFO-aware adaptive preamble selection for LEO-NTN and GPS integrity-aware UAV spoofing detection framework.", "year": "2026", "type": "Publication", "icon": "📡"}'::jsonb, 2);
INSERT INTO entries (section_id, data, position) VALUES (ach_id, '{"title": "Research Assistantship at NUST SEECS", "description": "Appointed as Research Assistant under Asst. Prof. Dr. Ahmed Naeem, contributing to active research in NTN communications and UAV networks.", "year": "2026", "type": "Research", "icon": "🔬"}'::jsonb, 3);
INSERT INTO entries (section_id, data, position) VALUES (ach_id, '{"title": "IoT & Security Systems Internship", "description": "Completed industry internship at YNS Systems, gaining hands-on experience in IoT product development and smart security solutions.", "year": "2025", "type": "Experience", "icon": "💼"}'::jsonb, 4);

END $$;
