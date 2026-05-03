import nextLogo from '../../../assets/icons/logo-nextjs.png';
import reactLogo from '../../../assets/icons/logo-react.png';
import reduxLogo from '../../../assets/icons/logo-redux.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: nextLogo, name: 'MongoDB', iconBg: 'bg-slate-200' },
  { logo: reactLogo, name: 'PostgreSQL' },
  { logo: reduxLogo, name: 'MySQL' },
  { logo: reduxLogo, name: 'Firebase Firestore' },
  { logo: reduxLogo, name: 'SQLite' },
];

const DataBase = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-DynaPuff-bold mb-3 lg:mb-4">Database</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item, idx) => (
          <SkillItem key={`${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default DataBase;
