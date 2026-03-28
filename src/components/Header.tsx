interface HeaderProps {
  className?: string;
  onOrderClick?: () => void;
}

export default function Header({ className, onOrderClick }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-wide">Artisana</div>
        <nav className="flex gap-8 items-center">
          <a
            href="#about"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm"
          >
            Коллекция
          </a>
          <button
            onClick={onOrderClick}
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm"
          >
            Заказать
          </button>
        </nav>
      </div>
    </header>
  );
}
