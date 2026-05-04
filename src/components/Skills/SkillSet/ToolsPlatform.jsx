import nextLogo from '../../../assets/icons/logo-nextjs.png';
import reactLogo from '../../../assets/icons/logo-react.png';
import reduxLogo from '../../../assets/icons/logo-redux.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: nextLogo, name: 'VS Code', iconBg: 'bg-slate-200' },
  { logo: reactLogo, name: 'Git & GitHub' },
  { logo: reduxLogo, name: 'Vercel' },
  { logo: reduxLogo, name: 'Netlify' },
  { logo: reduxLogo, name: 'Postman' },
  { logo: reduxLogo, name: 'Figma' },
];

const ToolsPlatform = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-Merriweather-bold mb-3 lg:mb-4">Tools and Platforms</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item, idx) => (
          <SkillItem key={`${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ToolsPlatform;
