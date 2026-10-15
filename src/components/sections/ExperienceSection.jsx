import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ExperienceSection = () => {
  const bullets = [
    '5 pull requests merged into production codebases after maintainer code review: core library logic, CI/CD workflows, automated validation, and accessibility (WCAG) fixes.',
    'Cal.com (TypeScript/Node.js): tracked down a Day.js UTC/timezone plugin load-order bug and shipped a targeted fix on a platform used by 50k+ teams, verified through cross-browser testing.',
    'freeCodeCamp: built automated file-structure validation for workshops with directory scanning and unit tests; fixed a high-contrast navbar regression and added test coverage.'
  ];

  const repos = [
    { name: 'Cal.com', href: 'https://github.com/calcom/cal.com' },
    { name: 'freeCodeCamp', href: 'https://github.com/freeCodeCamp/freeCodeCamp' }
  ];

  return (
    <section id="experience" className="py-20 relative bg-black/50 backdrop-blur-xl" aria-labelledby="experience-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 id="experience-title" className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            Experience &amp; Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full" aria-hidden="true" />
        </div>

        <div className="experience-grid grid grid-cols-1 gap-6 md:gap-8">
          <article className="glow-card glow-blue p-6 sm:p-7 md:p-8 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/10 rounded-2xl" aria-hidden="true">
                  <Briefcase size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Open Source Contributor</h3>
                  <p className="text-white/60 font-light">Cal.com &amp; freeCodeCamp · Remote</p>
                </div>
              </div>
              <span className="self-start px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wide text-white/80 whitespace-nowrap">
                March 2026 – Present
              </span>
            </div>

            <ul className="space-y-3 mt-2" aria-label="Contributions">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-white/70 font-light leading-relaxed list-none">
                  <ArrowRight size={16} className="text-white/40 mt-1 shrink-0" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-3 mt-6" aria-label="Repositories">
              {repos.map((repo) => (
                <li key={repo.name} className="list-none">
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium tracking-wide text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <FaGithub size={16} aria-hidden="true" />
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          {/* Education row */}
          <div className="glow-card glow-green p-5 sm:p-6 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-full shrink-0" aria-hidden="true">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Education</p>
              <p className="font-medium text-white/90 leading-relaxed">
                B.Tech in Computer Science (AI &amp; Machine Learning) — Uttaranchal University, Dehradun · Expected May 2027
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
