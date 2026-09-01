import { HiOutlineExternalLink, HiOutlineClock } from "react-icons/hi";

const BlogCard = ({ post }) => {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 via-blue-500/15 to-blue-900/25 ring-1 ring-white/10 hover:ring-sky-400/40 shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-[150px] w-full overflow-hidden bg-slate-900/60">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-sky-500/20 to-indigo-500/20">
            <span className="font-Josefin-Slab-600 text-2xl text-white/30">M</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        {post.tags?.[0] && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-Nunito-regular text-sky-200 bg-slate-950/50 backdrop-blur-sm ring-1 ring-white/10 rounded-full px-2.5 py-0.5">
            {post.tags[0]}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col px-4 pt-3 pb-4">
        <h3 className="font-Merriweather-bold text-sm lg:text-[15px] text-white leading-snug line-clamp-2 group-hover:text-sky-200 transition-colors">
          {post.title}
        </h3>

        {post.snippet && (
          <p className="mt-1.5 text-slate-300/90 font-Nunito-light text-xs leading-relaxed line-clamp-2">
            {post.snippet}
          </p>
        )}

        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-Nunito-light">
          <span>{post.date}</span>
          <span className="flex items-center gap-2">
            {post.readTimeMinutes && (
              <span className="flex items-center gap-1">
                <HiOutlineClock size={12} /> {post.readTimeMinutes} min
              </span>
            )}
            <span className="flex items-center gap-1 text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Read <HiOutlineExternalLink size={12} />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
