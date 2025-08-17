/**
 * BackToTop floating button
 * Appears after scrolling down and scrolls smoothly to the top.
 */
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { Button } from './ui/button';

const BackToTop: React.FC = () => {
  const visible = useScrollTrigger(400);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        className="bg-transparent border-[#9c7860] text-[#9c7860] hover:bg-[#9c7860] hover:text-white dark:border-[#d9cab1] dark:text-[#d9cab1] dark:hover:bg-[#d9cab1] dark:hover:text-[#1a1a1a]"
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BackToTop;
