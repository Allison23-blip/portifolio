/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ContactButton } from './components/ContactButton';
import { FadeIn } from './components/FadeIn';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div
      id="portfolio-main"
      className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] select-none"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={handleOpenContact} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={handleOpenContact} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* Bottom Contact / Footer section */}
      <footer
        id="contact"
        className="w-full bg-[#0C0C0C] border-t border-neutral-900 py-16 sm:py-24 px-6 md:px-10 flex flex-col items-center justify-center text-center gap-8 relative z-20"
      >
        <FadeIn delay={0.1} y={20} duration={0.7} className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light">
            Pronto para iniciar uma parceria?
          </p>
          <h2
            className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight"
          >
            Vamos Criar Juntos
          </h2>
          <div className="mt-4">
            <ContactButton onClick={handleOpenContact} id="footer-contact-button" />
          </div>
        </FadeIn>

        <div className="w-full max-w-6xl pt-12 mt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#D7E2EA]/40 uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Jack &mdash; 3D Creator. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#D7E2EA] transition-colors">
              Voltar ao topo &uarr;
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </div>
  );
}
