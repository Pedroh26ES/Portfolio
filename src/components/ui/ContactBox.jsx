import React from "react";

const ContactBox = ({ icon: Icon, value, isLightMode }) => (
  <div
    className={`flex items-center border p-4 transition-all duration-300 hover:border-samurai-gold/60 group ${
      isLightMode
        ? "border-[#d4d4d4] bg-[#f9f9f9]"
        : "border-neutral-800 bg-[#0d0d0d]"
    }`}
  >
    <div
      className={`p-3 border mr-5 flex-shrink-0 group-hover:border-samurai-gold/50 transition-colors ${
        isLightMode ? "border-[#d4d4d4]" : "border-neutral-800"
      }`}
    >
      <Icon size={15} className="text-samurai-gold" />
    </div>
    <span
      className={`font-mono text-sm font-bold tracking-widest break-all ${
        isLightMode ? "text-neutral-800" : "text-neutral-300"
      }`}
    >
      {value}
    </span>
  </div>
);

export default ContactBox;
