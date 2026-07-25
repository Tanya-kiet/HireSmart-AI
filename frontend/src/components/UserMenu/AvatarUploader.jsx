import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";

function AvatarUploader({ avatarUrl, name, size = "md", onAvatarChange }) {
  const fileInputRef = useRef(null);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "TB";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  }[size] || "w-10 h-10 text-sm";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (onAvatarChange) onAvatarChange(url);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="relative group cursor-pointer shrink-0 select-none"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${sizeClasses} rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all`}
        />
      ) : (
        <div
          className={`${sizeClasses} rounded-full bg-slate-900 text-white flex items-center justify-center font-bold ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all`}
        >
          {initials}
        </div>
      )}

      {/* Hover Camera Overlay */}
      {onAvatarChange && (
        <div className="absolute inset-0 bg-slate-950/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <FaCamera className="text-xs" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default AvatarUploader;
