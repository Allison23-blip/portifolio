import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        className="absolute inset-0 select-none"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', id }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charCounter = 0;
  const totalChars = text.length;

  return (
    <p ref={containerRef} id={id} className={className}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <React.Fragment key={`word-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIndex) => {
                const currentIndex = charCounter++;
                const start = currentIndex / totalChars;
                const end = Math.min(1, (currentIndex + 1) / totalChars);
                return (
                  <Character
                    key={`char-${wordIndex}-${charIndex}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIndex < words.length - 1 && (
              <span className="inline-block">
                {(() => {
                  const spaceIndex = charCounter++;
                  const start = spaceIndex / totalChars;
                  const end = Math.min(1, (spaceIndex + 1) / totalChars);
                  return (
                    <Character
                      char=" "
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })()}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;
