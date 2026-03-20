import React, { useState, useEffect, useRef } from "react";
import { Star, User, Briefcase } from "lucide-react";

const Testimonial = () => {
  const scrollRefLeft = useRef(null);
  const scrollRefRight = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Mock data for testimonials with professional avatars
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      rating: 5,
      text: "The appointment booking system is incredibly efficient. It saves me valuable time and helps me focus on patient care.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      type: "doctor",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Patient",
      rating: 5,
      text: "Scheduling appointments has never been easier. The interface is intuitive and reminders are very helpful!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      type: "patient",
    },
    {
      id: 3,
      name: "Dr. Robert Martinez",
      role: "Pediatrician",
      rating: 4,
      text: "This platform has streamlined our clinic operations significantly. Patient management is much more organized.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      type: "doctor",
    },
    {
      id: 4,
      name: "Emily Williams",
      role: "Patient",
      rating: 5,
      text: "Booking appointments online 24/7 is a game-changer. The confirmation system gives me peace of mind.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      type: "patient",
    },
    {
      id: 5,
      name: "Dr. Amanda Lee",
      role: "Dermatologist",
      rating: 5,
      text: "Excellent platform for managing appointments. Automated reminders reduce no-shows dramatically.",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      type: "doctor",
    },
    {
      id: 6,
      name: "David Thompson",
      role: "Patient",
      rating: 5,
      text: "The wait time has reduced significantly since using this platform. Very convenient and user-friendly!",
      image: "https://randomuser.me/api/portraits/men/94.jpg",
      type: "patient",
    },
  ];

  const leftTestimonials = testimonials.filter((t) => t.type === "doctor");
  const rightTestimonials = testimonials.filter((t) => t.type === "patient");

  // Animation Logic for Infinite Scrolling
  useEffect(() => {
    const scrollLeft = scrollRefLeft.current;
    const scrollRight = scrollRefRight.current;
    if (!scrollLeft || !scrollRight) return;

    let scrollSpeed = 0.6;
    let rafId;

    const smoothScroll = () => {
      if (!isPaused) {
        // Column 1 moves down
        scrollLeft.scrollTop += scrollSpeed;
        // Column 2 moves up
        scrollRight.scrollTop -= scrollSpeed;

        // Infinite loop logic: Reset when reaching half of the duplicated content
        if (scrollLeft.scrollTop >= scrollLeft.scrollHeight / 2) {
          scrollLeft.scrollTop = 0;
        }
        if (scrollRight.scrollTop <= 0) {
          scrollRight.scrollTop = scrollRight.scrollHeight / 2;
        }
      }
      rafId = requestAnimationFrame(smoothScroll);
    };

    // Initialize Right column position to half for seamless loop
    scrollRight.scrollTop = scrollRight.scrollHeight / 2;

    rafId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  // Render star ratings based on score
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
        }
      />
    ));

  // Individual Testimonial Card Component
  const TestimonialCard = ({ testimonial, direction }) => (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm mb-4 border-l-4 ${direction === "left" ? "border-blue-400" : "border-green-400"}`}
    >
      <div className="flex gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h4 className="font-bold text-gray-800 text-[14px]">
                {testimonial.name}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                {testimonial.role}
              </p>
            </div>
            <div className="flex gap-0.5">
              {renderStars(testimonial.rating)}
            </div>
          </div>
          <p className="text-gray-500 text-[12px] leading-relaxed italic">
            "{testimonial.text}"
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white font-sans">
      {/* Global style to hide scrollbars while keeping scroll functionality */}
      <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section with Updated Color and Size */}
        <div className="text-center mb-16">
          <h2 className="text-[64px] font-bold text-[#00c9ab] mb-2 tracking-tight">
            Voices of Trust
          </h2>
          <p className="text-[16px] text-gray-600 whitespace-nowrap overflow-hidden">
            Real stories from doctors and patients sharing their positive
            experiences with our healthcare platform.
          </p>
        </div>

        {/* Testimonial Columns Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[550px]">
          {/* Medical Professionals Column - Light Blue Container */}
          <div
            className="bg-[#ebf5ff] rounded-[1.5rem] p-4 flex flex-col overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center justify-center gap-2 mb-4 text-[#1a5f7a] font-bold">
              <Briefcase size={18} />
              <span>Medical Professionals</span>
            </div>

            <div
              className="flex-1 overflow-y-auto no-scrollbar"
              ref={scrollRefLeft}
            >
              <div className="flex flex-col">
                {/* Triplicating data for smoother loop transitions */}
                {[
                  ...leftTestimonials,
                  ...leftTestimonials,
                  ...leftTestimonials,
                ].map((t, i) => (
                  <TestimonialCard
                    key={`dr-${i}`}
                    testimonial={t}
                    direction="left"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Patients Column - Light Green Container */}
          <div
            className="bg-[#e8f8f0] rounded-[1.5rem] p-4 flex flex-col overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center justify-center gap-2 mb-4 text-[#1a5f7a] font-bold">
              <User size={18} />
              <span>Patients</span>
            </div>

            <div
              className="flex-1 overflow-y-auto no-scrollbar"
              ref={scrollRefRight}
            >
              <div className="flex flex-col">
                {[
                  ...rightTestimonials,
                  ...rightTestimonials,
                  ...rightTestimonials,
                ].map((t, i) => (
                  <TestimonialCard
                    key={`pa-${i}`}
                    testimonial={t}
                    direction="right"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
