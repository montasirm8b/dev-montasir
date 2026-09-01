import { SiOpenai } from 'react-icons/si';
import { TbRobot } from 'react-icons/tb';
import { HiOutlineChip, HiOutlineDocumentSearch, HiOutlineLightningBolt } from 'react-icons/hi';
import { FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SkillItem from '../SkillItem';

const items = [
  { Icon: SiOpenai, name: 'OpenAI API', iconTone: 'text-emerald-300' },
  { Icon: TbRobot, name: 'Claude Agent SDK', iconTone: 'text-orange-300' },
  { Icon: HiOutlineChip, name: 'Model Context Protocol (MCP)', iconTone: 'text-sky-300' },
  { Icon: FaBrain, name: 'Prompt Engineering', iconTone: 'text-pink-300' },
  { Icon: HiOutlineDocumentSearch, name: 'RAG & Document Ingestion', iconTone: 'text-indigo-300' },
  { Icon: HiOutlineLightningBolt, name: 'Agentic Workflows', iconTone: 'text-amber-300' },
];

const AI = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-base lg:text-lg text-sky-300 font-Merriweather-bold mb-3 lg:mb-4">AI & Machine Learning</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
        {items.map((item) => (
          <SkillItem key={item.name} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default AI;
