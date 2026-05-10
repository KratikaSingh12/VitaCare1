import {
  Users,
  Award,
  Clock,
  Shield,
  Target,
  Heart,
  Lightbulb,
  Handshake,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Site-wide configuration
export const siteConfig = {
  name: "VitaCare",
  tagline: "Your Health, Our Priority",
  description:
    "Connect with top-rated doctors across all specialties. Book appointments instantly and take control of your healthcare journey.",
  foundedYear: 2010,
  contact: {
    phone: "+1 (234) 567-890",
    phoneAlt: "+1 (234) 567-891",
    email: "contact@vitacare.com",
    supportEmail: "support@vitacare.com",
    address: {
      street: "123 Medical Center Drive",
      city: "Healthcare City",
      state: "HC",
      zip: "12345",
      full: "123 Medical Center Drive, Healthcare City, HC 12345",
    },
  },
  workingHours: {
    weekdays: "Mon - Sat: 8:00 AM - 8:00 PM",
    sunday: "Sunday: 9:00 AM - 5:00 PM",
  },
  social: {
    twitter: "#",
    facebook: "#",
    linkedin: "#",
    instagram: "#",
  },
};

// Statistics displayed across the site
export const siteStats = [
  { value: "50,000+", label: "Patients Served", icon: Users },
  { value: "200+", label: "Expert Doctors", icon: Award },
  { value: "15+", label: "Years of Excellence", icon: Clock },
  { value: "98%", label: "Patient Satisfaction", icon: Target },
];

export const homeStats = [
  { label: "Happy Patients", value: "50K+", icon: Users },
  { label: "Expert Doctors", value: "200+", icon: Award },
  { label: "Years Experience", value: "15+", icon: Clock },
  { label: "Health Awards", value: "25+", icon: Shield },
];

// Features list
export const features = [
  "Board-certified specialists",
  "Same-day appointments available",
  "Online & in-person consultations",
  "Affordable pricing",
  "24/7 emergency support",
  "Patient-first approach",
];

// Core values
export const coreValues = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description:
      "Every decision we make is guided by what is best for our patients. Your health and comfort are our top priorities.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We maintain the highest standards of medical practice and ensure a safe, secure environment for all patients.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously adopt the latest medical technologies and treatments to provide cutting-edge healthcare solutions.",
  },
  {
    icon: Handshake,
    title: "Compassion",
    description:
      "We treat every patient with empathy, understanding, and respect, creating a supportive healing environment.",
  },
];

// Leadership team
export const leadershipTeam = [
  {
    name: "Dr. Richard Anderson",
    role: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. Patricia Hughes",
    role: "Medical Director",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. William Foster",
    role: "Head of Surgery",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. Elizabeth Chen",
    role: "Head of Pediatrics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
  },
];

// Contact information items
export const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      siteConfig.contact.address.street,
      `${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`,
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [siteConfig.contact.phone, siteConfig.contact.phoneAlt],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [siteConfig.contact.email, siteConfig.contact.supportEmail],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [siteConfig.workingHours.weekdays, siteConfig.workingHours.sunday],
  },
];

// Emergency types
export const emergencyTypes = [
  { value: "chest-pain", label: "Chest Pain / Heart Issues" },
  { value: "breathing", label: "Difficulty Breathing" },
  { value: "injury", label: "Severe Injury / Trauma" },
  { value: "allergic", label: "Allergic Reaction" },
  { value: "mental", label: "Mental Health Crisis" },
  { value: "other", label: "Other Emergency" },
];

// Contact form subjects
export const contactSubjects = [
  { value: "appointment", label: "Appointment Inquiry" },
  { value: "general", label: "General Inquiry" },
  { value: "billing", label: "Billing Question" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

// Navigation links
export const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "All Doctors", href: "/doctors" },
  { name: "Departments", href: "/departments" },
  { name: "About", href: "/about" },
];

export const footerLinks = {
  services: [
    { name: "Find Doctors", href: "/doctors" },
    { name: "Departments", href: "/departments" },
    { name: "Symptom Checker", href: "/symptom-checker" },
    { name: "Emergency Video Call", href: "/emergency" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    // { name: "Contact", href: "/about#contact" },
    { name: "Login", href: "/login" },
    // { name: "Careers", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

// Images used across the site
export const siteImages = {
  heroDoctor:
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=600&fit=crop",
  medicalFacility:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
  aboutHero:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
  missionImage:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
  emergencyDoctor:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
};
