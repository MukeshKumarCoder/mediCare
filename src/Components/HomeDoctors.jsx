import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X, Medal } from "lucide-react";

// Import images from assets
import D1 from "../assets/D1.png";
import D2 from "../assets/D2.png";
import D3 from "../assets/D3.png";
import D4 from "../assets/D4.png";
import D5 from "../assets/D5.png";
import D6 from "../assets/D6.png";
import D7 from "../assets/D7.png";
import D8 from "../assets/D8.png";
import D9 from "../assets/D11.png";
import D10 from "../assets/HD2.png";
import D11 from "../assets/HD1.png";
import D12 from "../assets/HD2.png";

const HomeDoctors = () => {
  // Static Doctors Data
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Richard James",
      specialization: "General Physician",
      image: D1,
      experience: "4",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Anne Williams",
      specialization: "Cardiologist",
      image: D2,
      experience: "5",
      available: true,
    },
    {
      id: 3,
      name: "Dr. Christopher Lee",
      specialization: "Dermatologist",
      image: D3,
      experience: "7",
      available: true,
    },
    {
      id: 4,
      name: "Dr. Sarah Abbot",
      specialization: "Pediatricians",
      image: D4,
      experience: "3",
      available: true,
    },
    {
      id: 5,
      name: "Dr. Jennifer Garcia",
      specialization: "Neurologist",
      image: D5,
      experience: "10",
      available: true,
    },
    {
      id: 6,
      name: "Dr. Andrew Williams",
      specialization: "Gastroenterologist",
      image: D6,
      experience: "6",
      available: true,
    },
    {
      id: 7,
      name: "Dr. Christopher Kelly",
      specialization: "General Physician",
      image: D7,
      experience: "8",
      available: true,
    },
    {
      id: 8,
      name: "Dr. Timothy White",
      specialization: "Dermatologist",
      image: D8,
      experience: "2",
      available: true,
    },
    {
      id: 9,
      name: "Dr. Jeffrey King",
      specialization: "Pediatricians",
      image: D9,
      experience: "4",
      available: true,
    },
    {
      id: 10,
      name: "Dr. Nathan Harris",
      specialization: "Neurologist",
      image: D10,
      experience: "9",
      available: true,
    },
    {
      id: 11,
      name: "Dr. Kelly Williams",
      specialization: "Cardiologist",
      image: D11,
      experience: "6",
      available: true,
    },
    {
      id: 12,
      name: "Dr. Richard James",
      specialization: "General Physician",
      image: D12,
      experience: "4",
      available: true,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Search filter logic
  const filteredDoctors = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return doctorsData;
    return doctorsData.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q),
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 py-8 sm:py-10 px-3 sm:px-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative z-10 font-serif">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Find Your Specialist
          </h1>
          <p className="text-sm sm:text-base text-emerald-700 font-light">
            Search through our top-rated medical professionals
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-8 sm:mb-12 animate-slide-up">
          <div className="relative w-full max-w-xl transition-all duration-500 px-2 sm:px-0">
            <input
              type="text"
              placeholder="Who are you looking for? (Name or Specialty)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 sm:py-4 pl-12 pr-10 text-sm sm:text-lg rounded-full border border-emerald-300 bg-white/90 text-emerald-800 placeholder-emerald-400 shadow-md sm:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:shadow-xl transition-all duration-300 hover:shadow-2xl"
            />
            <Search className="absolute left-4 top-3 sm:top-4 text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />
            {searchTerm.length > 0 && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 sm:top-4 text-emerald-600 hover:text-emerald-800 transition"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 transition-all duration-300"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            paddingBottom: "40px",
          }}
        >
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className={
                doctor.available
                  ? "bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 md:p-6 text-center transition-all duration-300 hover:shadow-xl animate-fade-in-up"
                  : "opacity-80"
              }
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image Section */}
              <div className="relative mx-auto mb-4 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-36 lg:h-36">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full rounded-full object-cover border-4 border-emerald-200 shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Body Section */}
              <div
                className="p-3 sm:p-4 md:p-5 font-serif"
                style={{ padding: "15px", textAlign: "center" }}
              >
                <h3 className="text-base sm:text-lg md:text-md whitespace-nowrap lg:text-lg font-bold text-emerald-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm sm:text-sm md:text-sm text-emerald-600 font-medium mb-3">
                  {doctor.specialization}
                </p>

                {/* Experience Badge */}
                <div
                  className="mt-3 flex items-center justify-between text-sm text-gray-600"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0",
                  }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-emerald-50 border border-emerald-300 shadow-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Medal size={16} className="w-4 h-4" />
                    <span>{doctor.experience} years exp.</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="mt-3">
                  <Link
                    to={`/doctors/${doctor.id}`}
                    state={{ doctor }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-full font-medium transition-all duration-300 text-sm bg-linear-to-r from-emerald-300 to-teal-500 text-white hover:shadow-lg"
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <span>&gt; Book Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeDoctors;
