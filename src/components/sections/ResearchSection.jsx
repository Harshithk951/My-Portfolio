import { Microscope, Award, Trophy } from 'lucide-react';

const RESEARCH = [
  {
    title: 'Federated continual learning with EWC for IoT edge devices',
    meta: 'IEEE Conference Paper · June 2026',
    stats: ['93.1% accuracy', '38% less catastrophic forgetting vs FedAvg']
  },
  {
    title: 'AgriCogNet — an explainable ensemble for detecting cognitive fatigue in farm workers',
    meta: 'IEEE Conference Paper · June 2026',
    stats: ['91.3% accuracy', '0.962 AUC', '<38ms inference on Raspberry Pi 4']
  }
];

const CERTIFICATIONS = [
  { name: 'Oracle Cloud Infrastructure Generative AI Professional', issuer: 'Oracle · 2025' },
  { name: 'AWS Solutions Architecture', issuer: 'Amazon Web Services' },
  { name: 'Open Source Contribution', issuer: 'GirlScript Summer of Code (GSSoC)' }
];

const HACKATHONS = [
  { name: 'Smart India Hackathon — internal round selection', detail: 'Uni-Connect Hub' },
  { name: 'Dev Bhoomi University Lakshagriha Global Hackathon', detail: 'Built and deployed two working web apps in 24 hours' }
];

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 relative bg-black/50 backdrop-blur-xl" aria-labelledby="research-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 id="research-title" className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            Research &amp; Credentials
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full" aria-hidden="true" />
        </div>

        <div className="research-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Research group */}
          <article className="glow-card glow-pink p-6 sm:p-7 md:p-8 flex flex-col" aria-labelledby="research-group-title">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-2xl" aria-hidden="true">
                <Microscope size={28} className="text-white" />
              </div>
              <h3 id="research-group-title" className="text-xl sm:text-2xl font-bold text-white">Research</h3>
            </div>

            <ul className="space-y-5" aria-label="IEEE conference papers">
              {RESEARCH.map((paper) => (
                <li key={paper.title} className="list-none">
                  <p className="font-semibold text-white/90 leading-snug mb-1">{paper.title}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-3">{paper.meta}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Reported metrics">
                    {paper.stats.map((stat) => (
                      <li
                        key={stat}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-white/75 list-none"
                      >
                        {stat}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </article>

          {/* Certifications group */}
          <article className="glow-card glow-yellow p-6 sm:p-7 md:p-8 flex flex-col" aria-labelledby="certifications-group-title">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-2xl" aria-hidden="true">
                <Award size={28} className="text-white" />
              </div>
              <h3 id="certifications-group-title" className="text-xl sm:text-2xl font-bold text-white">Certifications</h3>
            </div>

            <ul className="space-y-4" aria-label="Certifications">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name} className="list-none">
                  <p className="font-medium text-white/90 leading-snug">{cert.name}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* Hackathons group */}
          <article className="glow-card glow-green p-6 sm:p-7 md:p-8 flex flex-col" aria-labelledby="hackathons-group-title">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-2xl" aria-hidden="true">
                <Trophy size={28} className="text-white" />
              </div>
              <h3 id="hackathons-group-title" className="text-xl sm:text-2xl font-bold text-white">Hackathons</h3>
            </div>

            <ul className="space-y-4" aria-label="Hackathons">
              {HACKATHONS.map((item) => (
                <li key={item.name} className="list-none">
                  <p className="font-medium text-white/90 leading-snug">{item.name}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
