import { Student } from '../types/student';

export const initialStudentData: Student = {
  id: '65f0123456789abcdef12345',
  basicInfo: {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    graduationYear: 2025,
    branch: 'Computer Science',
    university: 'Tech University',
    currentSemester: 6,
    points: 450
  },
  technicalSkills: {
    programmingLanguages: ['JavaScript', 'Python', 'Java', 'C++'],
    frameworks: ['React', 'Node.js', 'Express', 'Django'],
    tools: ['Git', 'Docker', 'AWS', 'MongoDB']
  },
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      role: 'Full Stack Developer',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      startDate: '2023-09-01',
      endDate: '2023-12-31',
      description: 'Built a full-featured e-commerce platform with user authentication, product management, and payment integration.',
      links: {
        github: 'https://github.com/johndoe/ecommerce',
        live: 'https://ecommerce-demo.example.com'
      }
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Hackathon Winner',
      date: '2023-11-15',
      description: 'Won first place in the University Annual Hackathon for developing an innovative AI-powered solution.'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Cloud Practitioner',
      provider: 'Amazon Web Services',
      issueDate: '2023-08-01',
      expiryDate: '2026-08-01',
      credentialUrl: 'https://aws.amazon.com/certification/verify'
    }
  ]
};