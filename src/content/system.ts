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

const mesa1: SystemFile = {
  display: "mesa_lead.txt",
  type: FileType.f,
  content: [
    `Mesa Natural Gas Solutions LLC`,
    `Loveland, CO`,
    `Lead Software Engineer August 2023 - Present`,
    `Worked with stakeholders to develop product plans for new applications.`,
    `Led the process of simplifying system architecture`,
    `Identified conferences and workshops for team members to further develop their skills.`,
    `Worked with each team member to determine career paths, set clear expectations, and create goals for career development.`,
    `Promoted high performing team member.`,
    `Reworked existing job descriptions and career paths.`,
    `Established clear standards, processes, and best practices for the software engineering team.`
  ],
};

const mesa0: SystemFile = {
  display: "mesa.txt",
  type: FileType.f,
  content: [
    `Mesa Natural Gas Solutions LLC`,
    `Loveland, CO`,
    `Software Engineer I, May 2021 - May 2022`,
    `Software Engineer II, May 2022 - August 2023`,
    `Refactored data aggregation system for time series data to improve performance, reduce code footprint, and reduce number of database tables. (Python)`,
    `Worked with one other developer to analyze web app usage patterns in order to identify unused or underutilized features. (Python)`,
    `Used Terraform for the configuration of web app resources in Azure. (DevOps)`,
    `Created pipelines in Azure to deploy mobile app and containerized web apps. (DevOps, Docker, Flutter, Android, IOS)`,
    `Led teams first code reviews during project and first project review post project.`,
    `Led two other developers through all stages of the software development lifecycle to deliver an improved rental order management system. (TypeScript, Remix)`,
    `Created dev containers in VSCode for more consistent dev environments and to help onboard team members onto new projects more quickly. (DevOps, Docker)`,
    `Established a software development methodology based on principles of agile software development and taking inspiration from multiple methodologies and sources which best suited our team and purposes.`,
    `Onboarded and mentored newly hired junior developers.`,
    `Worked through all stages of the software development lifecycle to deliver a mobile app on Android and IOS to assist field operations with managing rental order information. (Dart, Flutter)`,
    `Worked through all stages of the software development lifecycle to deliver various features to web app including approval system for rental order changes and an engineering change request system. (Python, Django)`,
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
  children: [current, previous, mesa1, mesa0, elite, ncar],
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
