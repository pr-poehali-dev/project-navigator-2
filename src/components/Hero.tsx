import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/047a0852-2650-4319-84fa-bb5a47d147d7/files/4aef5765-8327-4e7f-abb3-57960f0e673a.jpg"
          alt="Куклы ручной работы"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          КУКЛЫ И<br/>ШАРФЫ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90 mb-10">
          Авторские куклы и вязаные шарфы ручной работы — каждое изделие неповторимо
        </p>
        <button
          onClick={onOrderClick}
          className="bg-white text-black px-8 py-3 uppercase text-sm tracking-wide font-medium hover:bg-neutral-200 transition-colors"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
}