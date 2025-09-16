import React, { useContext } from "react"; // Componente AboutModal
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiExpress } from "react-icons/si";
import { LangContext } from "../App";

function AboutModal({ close }) {
  const { lang } = useContext(LangContext);

  const t = {
    es: {
      title: "Acerca de",
      desc: "Aplicación de notas desarrollada por Julio César Yañez M. con tecnologías modernas.",
      close: "Cerrar"
    },
    en: {
      title: "About",
      desc: "Notes app developed by Julio César Yañez M. using modern technologies.",
      close: "Close"
    }
  }[lang];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-md w-full p-6 text-center relative">
        {/* Foto */}
        <img
          src="./myPhoto.jpg"
          alt="Foto profesional"
          className="w-32 h-32 mx-auto rounded-full object-cover shadow-md mb-4 border-4 border-gray-200 dark:border-gray-700"
        />

        {/* Texto */}
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 font-semibold">{t.desc}</p>

        {/* Tecnologías */}
        <div className="flex justify-center gap-6 text-4xl mb-6">
          <FaReact className="text-blue-500" title="React" />
          <SiTailwindcss className="text-sky-400" title="Tailwind CSS" />
          <FaNodeJs className="text-green-600" title="Node.js" />
          <SiExpress className="text-gray-700 dark:text-gray-300" title="Express" />
          <FaDatabase className="text-yellow-600" title="MySQL" />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={close}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}

export default AboutModal;