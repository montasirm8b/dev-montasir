import React from 'react';

const SkillItem = ({ logo, Icon, name, alt, iconBg = '', iconTone = 'text-sky-300' }) => {
  return (
    <div className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-sky-400/40 rounded-xl px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/20">
      <div className={`shrink-0 w-9 h-9 flex justify-center items-center rounded-lg ${iconBg || 'bg-white/10'} ring-1 ring-white/10`}>
        {Icon ? (
          <Icon size={18} className={iconTone} />
        ) : (
          <img src={logo} alt={alt || name} className="max-w-[80%] max-h-[80%] object-contain" />
        )}
      </div>
      <span className="text-slate-100 font-Nunito-regular text-sm md:text-base group-hover:text-white transition-colors">{name}</span>
    </div>
  );
};

export default SkillItem;
