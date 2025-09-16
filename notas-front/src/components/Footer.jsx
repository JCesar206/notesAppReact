import React from "react"; // Componente Footer...
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-center py-4 mt-auto">
      <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} Juls Devps | All right reserved </p>
      <div className="flex justify-center space-x-6 mb-2">
        <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noreferrer">
          <FaHome  className="hover:text-purple-600/70 transition-colors" size={20}/>
        </a>
				<a href="https://github.com/JCesar206" target="_blank" rel="noreferrer">
          <FaGithub  className="hover:text-purple-600/70 transition-colors" size={20}/>
        </a>
				<a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noreferrer">
          <FaLinkedin  className="hover:text-purple-600/70 transition-colors" size={20}/>
        </a>
        <a href="mailto:jcesar206@hotmail.com">
          <FaEnvelope  className="hover:text-purple-600/70 transition-colors" size={20}/>
        </a>
        <a href="mailto:jcesary06@gmail.com">
          <SiGmail  className="hover:text-purple-600/70 transition-colors" size={20}/>
        </a>
			</div>
    </footer>
  );
}

export default Footer;