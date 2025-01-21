export default {};
export enum FileType {
  d,
  f,
}

export type SystemFile = {
  display: string;
  type: FileType;
  children?: SystemFile[];
  parent?: SystemFile;
  content?: string[];
};

const previous: SystemFile = {
  display: "..",
  type: FileType.d,
  children: [],
};

const current: SystemFile = {
  display: ".",
  type: FileType.d,
  children: [],
};

const bachelors: SystemFile = {
  display: "bachelors.txt",
  type: FileType.f,
  content: [`Arizona State University`, `B.S. Information Technology`, `2021`],
};

const masters: SystemFile = {
  display: "masters_wip.txt",
  type: FileType.f,
  content: [
    `Arizona State University`,
    `M.S. Complex Systems Science`,
    `Expected 2025`,
  ],
};

const asu: SystemFile = {
  display: "asu",
  type: FileType.d,
  children: [current, previous, bachelors, masters],
};

const col: SystemFile = {
  display: "col.txt",
  type: FileType.f,
  content: [
    `City of Loveland Water & Power`,
    `Loveland, CO`,
    `Utility Systems Analyst, October 2024 - Present`,
    `Assessed existing Python code base and developed a plan for improvements 
     including use of VCS, more controlled deployments, and better monitoring and logs. (Python)`,
  ],
};

const mesa2: SystemFile = {
  display: "mesa_lead.txt",
  type: FileType.f,
  content: [
    `Mesa Natural Gas Solutions LLC`,
    `Loveland, CO`,
    `Lead Software Engineer August 2023 - October 2024`,
    `Led the development of experimental machine learning models 
     for predicting IOT device events. (TensorFlow, Python)`,
    `Led the redesign and improvement of internal operations software 
     and external SAAS product used for viewing telemetry data, including 
     adding features to view realtime telemetry data and notifications and 
     implementing a more intuitive UI. (Django, Python)`,
    `Led the effort to eliminate repetitive system errors resulting in a 99% 
     reduction in automated error emails from about 300 a day to about 1 a day. (Django, Python, Azure)`,
    `Led improvements in the usage of cloud resources to improve system uptime. (Azure)`,
    `Led migration of cron jobs from VM to an Azure container app to provide better control over source 
     code and to automate the release process. (Azure, TypeScript, CI/CD)`,
    `Led the deprecation and replacement of multiple backend systems including messaging systems and disparate 
     data storage solutions with simpler alternatives. (Azure)`,
    `Worked with stakeholders to develop product plans for new applications.`,
    `Worked with each team member to determine career paths, set clear expectations, and create goals for career development.`,
    `Established clear standards, processes, and best practices for the software engineering team.`,
  ],
};

const mesa1: SystemFile = {
  display: "mesa_se2.txt",
  type: FileType.f,
  content: [
    `Mesa Natural Gas Solutions LLC`,
    `Loveland, CO`,
    `Software Engineer II, May 2022 - August 2023`,
    `Established a software development methodology based on principles of agile software development and taking inspiration 
     from multiple methodologies and sources which best suited our team and purposes.`,
    `Refactored data aggregation system for better performance. (Django, Python)`,
  ],
};

const mesa0: SystemFile = {
  display: "mesa_se1.txt",
  type: FileType.f,
  content: [
    `Mesa Natural Gas Solutions LLC`,
    `Loveland, CO`,
    `Software Engineer I, May 2021 - August 2022`,
    `Worked through all stages of the software development lifecycle to deliver a mobile app on Android and IOS 
     allowing operations to record equipment movements. (Dart, Flutter)`,
    `Implemented new features and fixed bugs as assigned. (Django, Python)`,
  ],
};

const elite: SystemFile = {
  display: "elite.txt",
  type: FileType.f,
  content: [
    `Elite Health Partners LLC`,
    `Longmont, CO`,
    `Information Systems Technician, May 2020 - May 2021`,
    `Developed a ticketing system that integrated with Slack. (Python, Flask)`,
    `Administered Zoho products and Google Workspace.`,
    `Performed other IT duties as assigned.`,
  ],
};

const ncar: SystemFile = {
  display: "ncar.txt",
  type: FileType.f,
  content: [
    `National Center for Atmospheric Research`,
    `Boulder, CO`,
    `Student Assistant I/II, October 2018 - September 2019`,
    `Migrated DART team website to GitHub pages.`,
    `Wrote a script to convert html files to markdown.`,
    `Worked on integrating automatic api documentation for Fortran source files into CI/CD pipeline.`,
    `Created a how to presentation for setting up GitHub pages sites and using CircleCi for CI/CD.`,
    `Updated documentation and tested benchmarks used for HPC procurement process.`,
    `Wrote Python and Perl scripts to manage datasets in the research data archive (RDA).`,
  ],
};

const education: SystemFile = {
  display: "education",
  type: FileType.d,
  children: [current, previous, asu],
};

const experience: SystemFile = {
  display: "experience",
  type: FileType.d,
  children: [current, previous, col, mesa2, mesa1, mesa0, elite, ncar],
};

const root: SystemFile = {
  display: "/",
  type: FileType.d,
  children: [current, education, experience],
};

education.parent = root;
experience.parent = root;
asu.parent = education;

export const system: { [index: string]: SystemFile } = {
  previous,
  current,
  education,
  experience,
  root,
  asu,
};
