import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Handshake,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// ✅ Dynamic JSON data import (NO hardcoding inside JSX)
import siteData from "../data/siteConfig.json";

// ✅ Icon mapper (because JSON can't store components directly)
const ICONS = {
  Users,
  Award,
  Clock,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Handshake,
  MapPin,
  Phone,
  Mail,
};

export default function About() {
  const {
    siteConfig,
    siteStats,
    coreValues,
    leadershipTeam,
    contactInfo,
    contactSubjects,
    siteImages,
  } = siteData;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                About <span className="text-[#0072D5]">{siteConfig.name}</span>
              </h1>

              <p className="mb-6 text-lg text-gray-600">
                Founded in {siteConfig.foundedYear}, {siteConfig.name} has been
                at the forefront of healthcare innovation, connecting patients
                with world-class medical professionals across all specialties.
              </p>

              <p className="text-gray-600">
                Our mission is to make quality healthcare accessible to
                everyone. We believe that every person deserves access to
                exceptional medical care, delivered with compassion and powered
                by innovation.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={siteImages.aboutHero}
                  alt={`${siteConfig.name} medical facility`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {siteStats.map((stat) => {
              const StatIcon = ICONS[stat.icon];
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0072D5]/10">
                    {StatIcon ? (
                      <StatIcon className="h-6 w-6 text-[#0072D5]" />
                    ) : null}
                  </div>

                  <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              These principles guide everything we do at {siteConfig.name}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const ValueIcon = ICONS[value.icon];
              return (
                <div
                  key={value.title}
                  className="rounded-xl border bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0072D5]/10">
                    {ValueIcon ? (
                      <ValueIcon className="h-7 w-7 text-[#0072D5]" />
                    ) : null}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Leadership Team
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Meet the dedicated professionals leading {siteConfig.name} to
              excellence
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipTeam.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Our Mission
              </h2>

              <p className="mb-4 text-gray-600">
                At {siteConfig.name}, we are dedicated to transforming
                healthcare delivery through innovation, compassion, and
                excellence. We strive to create a healthcare ecosystem where
                every patient receives personalized, high-quality care.
              </p>

              <p className="mb-6 text-gray-600">
                We connect patients with the best healthcare professionals,
                leveraging technology to make appointments seamless and care
                accessible. Our commitment to continuous improvement drives us
                to constantly enhance our services.
              </p>

              {/* Scroll to contact section */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-[#0072D5] px-4 py-2 text-white hover:bg-[#005bb0] transition-all cursor-pointer"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={siteImages.missionImage}
                  alt="Healthcare team meeting"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Contact Us</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Have questions? We are here to help. Reach out to us anytime.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-white shadow-sm">
                <div className="border-b p-6">
                  <h3 className="text-lg font-semibold">Send us a Message</h3>
                </div>

                <div className="p-6">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0072D5]/10">
                        <CheckCircle2 className="h-8 w-8 text-[#0072D5]" />
                      </div>

                      <h3 className="mb-2 text-xl font-semibold">
                        Message Sent Successfully!
                      </h3>

                      <p className="text-gray-600">
                        Thank you for contacting us. We will get back to you
                        soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <input
                            className="w-full rounded-md border px-3 py-2"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            className="w-full rounded-md border px-3 py-2"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <input
                            className="w-full rounded-md border px-3 py-2"
                            type="tel"
                            placeholder={siteConfig.contact.phone}
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <select
                            className="w-full rounded-md border px-3 py-2"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                          >
                            <option value="">Select a subject</option>
                            {contactSubjects.map((subject) => (
                              <option key={subject.value} value={subject.value}>
                                {subject.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea
                          className="w-full rounded-md border px-3 py-2"
                          rows={5}
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-md bg-[#0072D5] px-5 py-2 text-white hover:bg-[#005bb0] transition-all cursor-pointer"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const InfoIcon = ICONS[info.icon];
                return (
                  <div
                    key={info.title}
                    className="rounded-xl border bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0072D5]/10">
                        {InfoIcon ? (
                          <InfoIcon className="h-6 w-6 text-[#0072D5]" />
                        ) : null}
                      </div>

                      <div>
                        <h3 className="mb-1 font-semibold">{info.title}</h3>
                        {info.details.map((detail) => (
                          <p key={detail} className="text-sm text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0072D5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Experience {siteConfig.name}?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Join thousands of satisfied patients who have made {siteConfig.name}{" "}
            their trusted healthcare partner.
          </p>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-[#0072D5] hover:bg-white/90 transition-all cursor-pointer"
          >
            Find a Doctor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
