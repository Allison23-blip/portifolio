import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  topOffset?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  topOffset = 28,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      id={`project-card-container-${project.number}`}
      className="h-[85vh] w-full flex items-start justify-center relative"
    >
      <motion.div
        style={{
          scale,
          top: `calc(5rem + ${index * topOffset}px)`,
        }}
        id={`project-card-${project.number}`}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 shadow-2xl origin-top"
      >
        {/* Top Row: Number, category label, project name, Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/15 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
            >
              {project.number}
            </span>

            {/* Category label & Project name */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm md:text-base font-light tracking-widest">
                ({project.category})
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-lg sm:text-2xl md:text-3xl leading-snug">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton
            id={`live-project-btn-${project.number}`}
            href={project.link || '#'}
          />
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 w-full items-stretch">
          {/* Left Column (40% width ~ 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-between">
            {/* Col 1 Image 1 */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-neutral-900 border border-neutral-800"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>

            {/* Col 1 Image 2 */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-neutral-900 border border-neutral-800"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width ~ 7 cols) */}
          <div className="md:col-span-7 h-full min-h-[260px] sm:min-h-[340px] md:min-h-full">
            <div className="w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[460px] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-neutral-900 border border-neutral-800">
              <img
                src={project.images.col2}
                alt={`${project.name} showcase preview`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
