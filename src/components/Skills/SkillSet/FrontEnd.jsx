import nextLogo from '../../../assets/icons/logo-nextjs.png';
import reactLogo from '../../../assets/icons/logo-react.png';
import reduxLogo from '../../../assets/icons/logo-redux.png';
import ejsLogo from '../../../assets/icons/logo-ejs.png';
import sassLogo from '../../../assets/icons/logo-sass.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: nextLogo, name: 'Next JS', iconBg: 'bg-slate-200' },
  { logo: reactLogo, name: 'React JS' },
  { logo: reduxLogo, name: 'Redux / Redux Toolkit', iconBg: 'bg-white/90' },
  { logo: ejsLogo, name: 'ejs Templating Engine', iconBg: 'bg-white/90' },
  { logo: sassLogo, name: 'SASS', iconBg: 'bg-pink-200' },
];

const FronteEnd = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-DynaPuff-bold mb-3 lg:mb-4">Front-End Technologies</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default FronteEnd;
