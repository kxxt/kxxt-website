const labels = {
  label_website: {
    zh: "个人网站",
    en: "Personal Website",
  },
  label_email: {
    zh: "邮箱",
    en: "Email",
  },
  label_about_me: {
    zh: "关于我(英文)",
    en: "About Me",
  },
  label_phone: {
    zh: "电话",
    en: "Phone",
  },
  label_education: {
    zh: "教育经历",
    en: "Education",
  },
  label_intern: {
    zh: "实习经历",
    en: "Internship",
  },
  label_competitions: {
    zh: "比赛经历",
    en: "Competitions",
  },
  label_skills: {
    zh: "技能",
    en: "Skills",
  },
  label_personal_projects: {
    zh: "个人项目",
    en: "Personal Projects",
  },
  label_course_projects: {
    zh: "课程大作业",
    en: "Course Projects",
  },
  label_other_experiences: {
    zh: "其他经历",
    en: "Other Experiences",
  },
  label_major: {
    zh: "$0 专业",
    en: "Majoring in $0",
  },
}

const education = {
  edu_sduwh: {
    zh: "山东大学(威海校区)",
    en: "Shandong University(WeiHai Campus)",
  },
  edu_major: {
    zh: "统计学(数据科学与人工智能)",
    en: "Statistics(Data Science and Artificial Intelligence)",
  },
  edu_status: {
    zh: "本科在读(大三)",
    en: "Undergraduate(Junior)",
  },
  edu_time: {
    zh: "2020.10 至今",
    en: "Oct. 2020 - Present",
  },
  edu_gpa: null,
}

const intern = {
  intern_archrv_time: {
    zh: "2023.3 至今",
    en: "Mar. 2023 - Present",
  },
  intern_archrv_job: {
    zh: "RISC-V Arch Linux 打包实习生",
    en: "RISC-V Arch Linux Packaging Intern",
  },
  intern_archrv_company: {
    zh: "中科院软件所 PLCT 实验室",
    en: "PLCT Lab, Institute of Software, Chinese Academy of Sciences",
  },
}

const competitions = {}

const locales = {
  ...labels,
  ...education,
  ...intern,
  ...competitions,
  getText(locale, key) {
    if (this[key] && this[key][locale]) {
      return this[key][locale]
    }
    return key
  },
}

export { locales }
