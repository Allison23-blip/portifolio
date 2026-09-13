import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { processAvatarImage } from '../utils/imageProcess';

const DEFAULT_PORTRAIT =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [portraitSrc, setPortraitSrc] = useState<string>(DEFAULT_PORTRAIT);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Check local storage for user chosen portrait
    const saved = localStorage.getItem('jack_custom_portrait');
    if (saved) {
      setPortraitSrc(saved);
      return;
    }

    // 2. Check if user added /Design sem nome.png or /avatar.png to public/
    const candidates = ['/Design sem nome.png', '/avatar.png', '/hero-portrait.png'];
    candidates.forEach((path) => {
      const img = new Image();
      img.onload = () => {
        setPortraitSrc(path);
      };
      img.src = path;
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const processedDataUrl = await processAvatarImage(file);
      setPortraitSrc(processedDataUrl);
      localStorage.setItem('jack_custom_portrait', processedDataUrl);
    } catch (err) {
      console.error('Error processing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetPortrait = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('jack_custom_portrait');
    setPortraitSrc(DEFAULT_PORTRAIT);
  };

  const navLinks = [
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* Hidden file input to pick replacement 3D avatar */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="avatar-file-input"
      />

      {/* Navbar */}
      <FadeIn
        delay={0}
        y={-20}
        duration={0.7}
        as="nav"
        className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30"
        id="navbar"
      >
        <ul className="flex items-center justify-between w-full list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden z-0">
        <FadeIn delay={0.15} y={40} duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Olá, sou o jack
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FadeIn delay={0.6} y={30} duration={0.8}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center relative cursor-pointer"
          >
            <div
              className="relative w-full flex justify-center items-end"
              onClick={() => fileInputRef.current?.click()}
              title="Clique para selecionar ou alterar a imagem 3D (ex: Design sem nome.png)"
            >
              <img
                src={portraitSrc}
                alt="Jack - 3D Creator Portrait"
                className="w-full max-h-[68vh] object-contain drop-shadow-2xl pointer-events-none select-none transition-all duration-300 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Hover Badge / Quick Switcher */}
              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/30 backdrop-blur-md text-[#D7E2EA] text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all duration-300 ${
                  isHovered || isProcessing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <Camera size={14} className="text-[#D7E2EA]" />
                <span>
                  {isProcessing ? 'Processando...' : 'Trocar Imagem 3D'}
                </span>
                {portraitSrc !== DEFAULT_PORTRAIT && (
                  <button
                    type="button"
                    onClick={handleResetPortrait}
                    className="ml-2 hover:text-white p-0.5 rounded-full hover:bg-neutral-800 transition-colors"
                    title="Restaurar imagem padrão"
                  >
                    <RefreshCw size={12} />
                  </button>
                )}
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end relative z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            um criador 3d movido pela criação de projetos marcantes e inesquecíveis
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton id="hero-contact-button" onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
