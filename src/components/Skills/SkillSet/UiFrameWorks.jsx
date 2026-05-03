import tailwindcssLogo from '../../../assets/icons/logo-tailwindcss.png';
import bootstrapLogo from '../../../assets/icons/logo-bootstrap.png';
import daisyuiLogo from '../../../assets/icons/logo-daisyui.png';
import materialuiLogo from '../../../assets/icons/logo-materialui.png';
import chartjsLogo from '../../../assets/icons/logo-chartjs.png';
import threejsLogo from '../../../assets/icons/logo-threejs.png';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { logo: tailwindcssLogo, name: 'Tailwind CSS' },
  { logo: bootstrapLogo, name: 'Bootstrap 5' },
  { logo: daisyuiLogo, name: 'Daisy UI' },
  { logo: materialuiLogo, name: 'Material UI' },
  { logo: chartjsLogo, name: 'Chart JS' },
  { logo: threejsLogo, name: 'Three JS', iconBg: 'bg-slate-200' },
];

const UiFrameWork = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-DynaPuff-bold mb-3 lg:mb-4">UI Frameworks</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default UiFrameWork;
