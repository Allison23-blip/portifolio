import React from 'react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: 'Modelagem 3D',
    description:
      'Criação de objetos detalhados, personagens e cenários personalizados para as necessidades do cliente, ideais para jogos, produtos e visualizações.',
  },
  {
    number: '02',
    name: 'Renderização',
    description:
      'Renders fotorrealistas de alta qualidade que destacam os designs com iluminação personalizada, texturas e materiais que dão vida aos conceitos.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Animações dinâmicas e motion graphics que agregam energia e narrativa a marcas, produtos e experiências digitais.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Desenvolvimento de identidades visuais coesas — de logotipos a sistemas completos de marca — que transmitem uma presença clara e memorável.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Design de sites modernos, limpos e focados em conversão, com atenção minuciosa ao layout, tipografia e experiência do usuário.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={30} duration={0.8}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Serviços
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col w-full">
          {servicesData.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              y={30}
              duration={0.7}
              id={`service-item-${item.number}`}
              className="border-b border-[#0C0C0C]/15 last:border-b-0 py-8 sm:py-10 md:py-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-10 md:gap-16">
                {/* Number on the left */}
                <span
                  className="font-black leading-none text-[#0C0C0C] select-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </span>

                {/* Name & Description stacked vertically on the right */}
                <div className="flex flex-col justify-center gap-2 sm:gap-3 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] leading-snug"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
