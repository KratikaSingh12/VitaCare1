import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Video,
  Stethoscope,
  AlertCircle,
  Users,
} from "lucide-react";

// components
import DoctorCard from "../components/DoctorCard";
import { SpecialtyCard } from "../components/SpecialtyCard";

// data
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import deptData from "../data/departments.json"; // ✅ FIXED
import { siteConfig, homeStats, features, siteImages } from "../data/config";

export default function HomePage() {
  const { doctors } = useContext(AppContext);
  const featuredDoctors = doctors.slice(0, 4);
  

  // ✅ FIXED: departments.json me specialties array andar hai
  const featuredSpecialties = (deptData?.specialties || []).slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {String(siteConfig?.tagline || "").split(",")[0]},{" "}
                <span className="text-primary">
                  {String(siteConfig?.tagline || "").split(",")[1] ||
                    "Our Priority"}
                </span>
              </h1>

              <p className="mb-8 text-lg text-muted-foreground">
                {siteConfig?.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/doctors" className="inline-flex">
                  <button className="inline-flex items-center gap-2 rounded-md transition-all cursor-pointer bg-primary px-6 py-3 text-primary-foreground">
                    Find a Doctor <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link to="/about" className="inline-flex">
                  <button className="inline-flex items-center rounded-md border px-6 py-3 transition-all cursor-pointer hover:bg-emerald-500 hover:text-white hover:bg-emerald-500">
  Learn More
</button>

                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {(features || []).slice(0, 3).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <img
                  src={siteImages?.heroDoctor || "/placeholder.svg"}
                  alt="Healthcare professionals"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {homeStats?.[0]?.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Satisfied Patients
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Symptom Checker Card */}
            <div className="overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg">
              <div className="flex items-center gap-6 p-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    Symptom Checker
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Describe your symptoms and find the right specialist for
                    your needs
                  </p>

                  <Link to="/symptom-check" className="inline-flex">
                    <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm cursor-pointer">
                      Check Symptoms <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Emergency Video Call Card */}
            <div className="overflow-hidden rounded-xl border border-red-300 bg-red-50 transition-all hover:shadow-lg">
              <div className="flex items-center gap-6 p-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-200">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Emergency Video Call
                    </h3>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>

                  <p className="mb-3 text-sm text-muted-foreground">
                    Connect with a doctor instantly for urgent medical
                    consultation
                  </p>

                  <Link to="/emergency" className="inline-flex">
                    <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white cursor-pointer">
                      Start Video Call <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {(homeStats || []).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Browse by Specialty
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find the right specialist for your health needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {featuredSpecialties.map((specialty) => {
              const count = doctors.filter(
                (d) =>
                  String(d.specialization).toLowerCase() ===
                  String(specialty.name).toLowerCase()
              ).length;

              return (
                <SpecialtyCard
                  key={specialty.id}
                  specialty={specialty}
                  doctorCount={count}
                />
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/departments" className="inline-flex">
              <button className="inline-flex items-center gap-2 rounded-md border px-6 py-3 cursor-pointer">
                View All Departments <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Meet Our Top Doctors
              </h2>
              <p className="text-muted-foreground">
                Highly rated specialists ready to help you
              </p>
            </div>

            <Link to="/doctors" className="inline-flex">
              <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 cursor-pointer" >
                View All Doctors <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={siteImages?.medicalFacility || "/placeholder.svg"}
                  alt="Modern medical facility"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose {siteConfig?.name}?
              </h2>
              <p className="mb-6 text-muted-foreground">
                We are committed to providing exceptional healthcare services.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {(features || []).map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="mt-8 inline-flex">
                <button className="rounded-md bg-primary px-6 py-3 text-primary-foreground cursor-pointer">
                  Contact Us
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Book Your Appointment?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Join thousands of satisfied patients who trust {siteConfig?.name}.
          </p>

          <Link to="/doctors" className="inline-flex">
            <button className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-black cursor-pointer">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
