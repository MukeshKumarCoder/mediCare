import React from "react";

function AppointmentsPage() {
  return (
    <div className="h-[50vh] bg-linear-to-b from-[#e6f4ec] to-[#cfe9dc] py-16 px-4">
      {/* Doctor Appointments */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1b6b57] mb-4">
          Your Doctor Appointments
        </h1>

        <p className="text-[#1b6b57] text-lg mb-16">
          No doctor appointments found.
        </p>

        {/* Services */}
        <h2 className="text-4xl font-bold text-[#1d4ed8] mb-4">
          Your Booked Services
        </h2>

        <p className="text-[#1d4ed8] text-lg">No service bookings found.</p>
      </div>
    </div>
  );
}

export default AppointmentsPage;
