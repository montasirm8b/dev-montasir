import cLogo from '../../../assets/icons/logo-cprog.png';
import cppLogo from '../../../assets/icons/logo-cpp.png';
import pythonLogo from '../../../assets/icons/logo-python.png';
import jsLogo from '../../../assets/icons/logo-js.png';
import nodejsLogo from '../../../assets/icons/logo-nodejs.png';
import tsLogo from '../../../assets/icons/logo-ts.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: cLogo, name: 'C' },
  { logo: cppLogo, name: 'C++' },
  { logo: jsLogo, name: 'Javascript (ES6)', iconBg: 'bg-yellow-500' },
  { logo: nodejsLogo, name: 'Node js' },
  { logo: tsLogo, name: 'Typescript' },
  { logo: pythonLogo, name: 'Python' },
];

const ProgrammingLanguages = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-DynaPuff-bold mb-3 lg:mb-4">Programming Languages</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProgrammingLanguages;
