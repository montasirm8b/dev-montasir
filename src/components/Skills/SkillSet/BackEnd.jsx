import nodejsLogo from '../../../assets/icons/logo-nodejs.png';
import expressLogo from '../../../assets/icons/logo-express.png';
import firebaseLogo from '../../../assets/icons/logo-firebase.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: nodejsLogo, name: 'Node JS' },
  { logo: expressLogo, name: 'Express JS' },
  { logo: firebaseLogo, name: 'Firebase' },
];

const BackEnd = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-DynaPuff-bold mb-3 lg:mb-4">Back-End Technologies</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default BackEnd;
