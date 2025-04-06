import appointment_img from './appointment_img.png';
import header_img from './header_img.png';
//import profile_pic from './profile_pic.jpg'
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.png';
import contact_image from './contact_image.png';
import about_image from './about_image.png';
import logo from './logo.png';
import dropdown_icon from './dropdown_icon.png';
import menu_icon from './menu_icon.png';
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.png';
import verified_icon from './verified_icon.png';
import arrow_icon from './arrow_icon.png';
import info_icon from './info_icon.png';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
// import razorpay_logo from './razorpay_logo.png';

// Importing Doctor Profile Images
import doc1 from './doc1.png';
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';

// Importing Speciality Icons
import Dermatologist from './Dermatologist.png';
import Gastroenterologist from './Gastroenterologist.png';
import General_physician from './General_physician.png';
import Gynecologist from './Gynecologist.png';
import Neurologist from './Neurologist.png';
import Pediatrician from './Pediatrician.png';

export const assets={
    appointment_img,
    header_img,
    group_profiles,
    profile_pic,
    contact_image,
    about_image,
    logo,
    dropdown_icon,
    menu_icon,
    cross_icon,
    chats_icon,
    verified_icon,
    arrow_icon,
    info_icon,
    upload_icon,
    stripe_logo,
    // razorpay_logo,
};

export const specialityData = [
    { speciality: 'General Physician', image: General_physician },
    { speciality: 'Gynecologist', image: Gynecologist },
    { speciality: 'Dermatologist', image: Dermatologist },
    { speciality: 'Gastroenterologist', image: Gastroenterologist },
    { speciality: 'Neurologist', image: Neurologist },
    { speciality: 'Pediatrician', image: Pediatrician }
];

export const doctors = [
    { _id: 'doc1', name: 'Dr. Richard James', image: doc1, speciality: 'General Physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care.', fees: 50, address: { line1: '17th Cross Richmond', line2: 'Circle, Ring Road, London' } },
    { _id: 'doc2', name: 'Dr. Sarah Patel', image: doc2, speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Year', about: 'Dr. Patel has a strong commitment to delivering comprehensive medical care.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
    { _id: 'doc3', name: 'Dr. Rohit Sharma', image: doc3, speciality: 'Cardiologist', degree: 'MD Cardiology', experience: '5 Years', about: 'Dr. Sharma is known for his expertise in heart surgeries.', fees: 50, address: { line1: '22nd Avenue, Connaught Place', line2: 'New Delhi, India' } },
    { _id: 'doc4', name: 'Dr. Priya Singh', image: doc4, speciality: 'Neurologist', degree: 'MD Neurology', experience: '7 Years', about: 'Dr. Singh is renowned for her in-depth knowledge of neurological disorders.', fees: 60, address: { line1: '45th Street, Indira Nagar', line2: 'Mumbai, India' } },
    { _id: 'doc5', name: 'Dr. Amit Verma', image: doc5, speciality: 'Orthopedic', degree: 'MS Orthopedics', experience: '3 Years', about: 'Dr. Verma specializes in joint replacement surgeries.', fees: 40, address: { line1: '10th Lane, Sector 15', line2: 'Chandigarh, India' } },
    { _id: 'doc6', name: 'Dr. Neha Kapoor', image: doc6, speciality: 'Pediatrician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Kapoor is caring and experienced with children’s health.', fees: 35, address: { line1: '5th Block, Koramangala', line2: 'Bangalore, India' } },
    { _id: 'doc7', name: 'Dr. Anil Gupta', image: doc7, speciality: 'General Physician', degree: 'MBBS', experience: '8 Years', about: 'Dr. Gupta is a trusted general physician with a comprehensive care approach.', fees: 25, address: { line1: 'Baker Street', line2: 'London, UK' } },
    { _id: 'doc8', name: 'Dr. Ritu Mehra', image: doc8, speciality: 'Gynecologist', degree: 'MD Gynecology', experience: '6 Years', about: 'Dr. Mehra provides excellent care for women’s health.', fees: 45, address: { line1: 'Sector 18', line2: 'Gurgaon, India' } },
    { _id: 'doc9', name: 'Dr. Karan Malik', image: doc9, speciality: 'ENT', degree: 'MS ENT', experience: '3 Years', about: 'Dr. Malik specializes in ear, nose, and throat conditions.', fees: 30, address: { line1: '12th Road, Sultanpur', line2: 'Delhi, India' } },
    { _id: 'doc10', name: 'Dr. Alisha Khan', image: doc10, speciality: 'Ophthalmologist', degree: 'MS Ophthalmology', experience: '5 Years', about: 'Dr. Khan is known for her expert eye care and surgeries.', fees: 55, address: { line1: 'M.G. Road', line2: 'Pune, India' } },
    { _id: 'doc11', name: 'Dr. Virender Singh', image: doc11, speciality: 'Urologist', degree: 'MS Urology', experience: '7 Years', about: 'Dr. Singh is renowned for his urological expertise.', fees: 60, address: { line1: 'Laxmi Nagar', line2: 'Jaipur, India' } },
    { _id: 'doc12', name: 'Dr. Pooja Reddy', image: doc12, speciality: 'Dentist', degree: 'BDS', experience: '4 Years', about: 'Dr. Reddy provides quality dental care.', fees: 35, address: { line1: 'Banjara Hills', line2: 'Hyderabad, India' } },
    { _id: 'doc13', name: 'Dr. Sameer Desai', image: doc13, speciality: 'Oncologist', degree: 'DM Oncology', experience: '10 Years', about: 'Dr. Desai is a leading expert in cancer treatment.', fees: 80, address: { line1: 'Vidyasagar Road', line2: 'Kolkata, India' } },
    { _id: 'doc14', name: 'Dr. Meera Joshi', image: doc14, speciality: 'Psychiatrist', degree: 'MD Psychiatry', experience: '8 Years', about: 'Dr. Joshi is committed to providing compassionate mental health care.', fees: 40, address: { line1: 'Park Street', line2: 'Mumbai, India' } },
    { _id: 'doc15', name: 'Dr. Kavita Sharma', image: doc15, speciality: 'Gastroenterologist', degree: 'DM Gastroenterology', experience: '9 Years', about: 'Dr. Sharma specializes in digestive system disorders.', fees: 70, address: { line1: 'MG Road', line2: 'Bangalore, India' } }
];