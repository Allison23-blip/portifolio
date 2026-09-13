import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, CheckCircle2, Copy } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Modelagem 3D',
    message: '',
  });

  const emailAddress = 'hello@jack3dcreator.design';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="contact-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        >
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-lg rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-800 cursor-pointer"
              aria-label="Fechar modal"
            >
              <X size={22} />
            </button>

            <h3 className="hero-heading font-black uppercase text-2xl sm:text-3xl tracking-wide mb-2">
              Vamos Conversar
            </h3>
            <p className="text-[#D7E2EA]/70 text-sm mb-6">
              Tem uma ideia, projeto ou visualização em mente? Envie-me uma mensagem ou copie meu e-mail direto abaixo.
            </p>

            {/* Direct Email Pill */}
            <div className="flex items-center justify-between bg-neutral-900/80 border border-neutral-800 rounded-2xl px-4 py-3 mb-6">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail size={18} className="text-[#D7E2EA]/60 shrink-0" />
                <span className="text-xs sm:text-sm font-light truncate">{emailAddress}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white hover:text-[#BBCCD7] transition-colors shrink-0 ml-2 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={14} className="text-green-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                <CheckCircle2 size={44} className="text-green-400" />
                <h4 className="text-xl font-medium text-white uppercase">Mensagem Enviada!</h4>
                <p className="text-sm text-[#D7E2EA]/70">
                  Obrigado pelo contato. Retornarei sua mensagem em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1.5 font-light">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D7E2EA]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1.5 font-light">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nome@empresa.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D7E2EA]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1.5 font-light">
                    Serviço Desejado
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D7E2EA]/60 transition-colors cursor-pointer"
                  >
                    <option value="Modelagem 3D">Modelagem 3D</option>
                    <option value="Renderização">Renderização</option>
                    <option value="Motion Design">Motion Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Projeto Completo">Projeto Completo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1.5 font-light">
                    Detalhes do Projeto
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Conte-me sobre sua visão, prazos e objetivos..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D7E2EA]/60 transition-colors resize-none"
                  />
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm text-white font-medium uppercase tracking-widest cursor-pointer transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Send size={15} />
                    <span>Enviar Mensagem</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
