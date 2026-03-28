import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/9b3f7e16-0206-48e9-ac2f-593e2ce94276", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold mb-2">Заявка принята!</h2>
                <p className="text-neutral-500">Мы свяжемся с вами в ближайшее время.</p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-black text-white px-6 py-2 uppercase text-sm tracking-wide hover:bg-neutral-800 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1 uppercase tracking-tight">Оставить заявку</h2>
                <p className="text-neutral-500 text-sm mb-6">Расскажите, что вас интересует — мы ответим быстро</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                  <textarea
                    placeholder="Что вас интересует? (необязательно)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none"
                  />

                  {status === "error" && (
                    <p className="text-red-500 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-black text-white py-3 uppercase text-sm tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
