/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Play, 
  Menu, 
  X, 
  ChevronDown, 
  Instagram, 
  Video, 
  Camera, 
  Film, 
  Mail, 
  MessageSquare,
  Award,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  Share2,
  Link,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  client: string;
  goal: string;
  results: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// --- Data ---
const CATEGORIES = ['Todos', 'Institucional', 'Moda', 'Documentários', 'Artísticos'];

const PROJECTS: Project[] = [
  {
    id: '11',
    title: 'RICK SANTANA - OVERTHINKER - MUVPRO 2025',
    category: 'Artísticos',
    thumbnail: 'https://img.youtube.com/vi/9mwmFa3fcjM/maxresdefault.jpg',
    videoUrl: '9mwmFa3fcjM',
    description: 'Uma pessoa que pensa o tempo todo\nNão tem nada em que pensar, exceto pensamentos\nEntão Ele perde o contato com a realidade\nE vive em um mundo de ilusões\nPor pensamentos, quero dizer especificamente\nTagarelice no crânio\nRepetição perpétua e compulsiva de palavras\nDe estimativas e cálculos\nNão estou dizendo que pensar seja ruim\nComo tudo o mais\nÉ útil com moderação\nUm bom servo, mas um mau mestre\nE todos os povos ditos civilizados\nTêm cada vez mais se tornado loucos e autodestrutivos\nPorque\nAtravés do pensamento excessivo perderam o contato com a realidade\nQuer dizer\nNós confundimos sinais, com o mundo real.',
    client: 'MUVPRO',
    goal: 'Trabalho de conclusão do projeto @muuv.pro. REALIZAÇÃO DE UM GRANDE SONHO!',
    results: 'Direção Geral: @riicksantana. Captação de Imagem: @mateusbslopes @artyfilmes. Edição: Rick Santana. Locação: @culturadoguettooficial. Música @inzomusic - Overthinker. Muver\'s: @patrickvilar_, @sarah.versiani, @luizacomzlopes, vitor_ms95, @rian.lipi, @laura.dgm, maryc_zambrano, analidiapoeta @isadorabergamini, @liviamartinslopes @maricardoso8, samilith_dancer.'
  },
  {
    id: '12',
    title: 'Do Barro Vem, Ao Barro Volta',
    category: 'Documentários',
    thumbnail: 'https://img.youtube.com/vi/f4J8VmWjEY4/maxresdefault.jpg',
    videoUrl: 'f4J8VmWjEY4',
    description: 'Um documentário que mergulha nas raízes de Brumadinho, transformando a dor em arte através do barro. A terra que outrora soterrou sonhos agora molda novas perspectivas e memórias de resistência.',
    client: 'Bárbara Pessali / Lei Paulo Gustavo',
    goal: 'Explorar a resiliência de uma comunidade através de seu elemento primordial, criando uma ponte entre o trauma e a reconstrução cultural.',
    results: 'Selecionado para festivais regionais de cinema e utilizado como material educativo em centros culturais de Minas Gerais.'
  },
  {
    id: '13',
    title: 'O Barro que Cura',
    category: 'Artísticos',
    thumbnail: 'https://img.youtube.com/vi/T3ZT3Jm7VuY/maxresdefault.jpg',
    videoUrl: 'T3ZT3Jm7VuY',
    description: 'Uma jornada sensorial onde o toque, a lama e o corpo se fundem. Este projeto investiga o ato de "se sujar" como um processo de purificação e reencontro com a natureza selvagem.',
    client: 'Bárbara Pessali / Ecovila Coração da Mata',
    goal: 'Produzir uma videoperformance que comunique a bioconstrução e a cura espiritual sem o uso de palavras, apenas através da dança e do movimento.',
    results: 'Viralizou em plataformas de permacultura e arte ecológica, gerando novos engajamentos para a ecovila.'
  },
  {
    id: '1',
    title: 'Avant-Garde Boutique',
    category: 'Moda',
    thumbnail: 'https://img.youtube.com/vi/vxEKS9WafeE/maxresdefault.jpg',
    videoUrl: 'vxEKS9WafeE',
    description: 'A moda encontra o brutalismo. Capturamos a agressividade das texturas industriais contrastando com a leveza dos tecidos de alta costura em um ambiente de desconstrução urbana.',
    client: 'Vanguarda Studio',
    goal: 'Criar um teaser comercial que fuja do clichê editorial, focando em ritmos rápidos e cortes que acompanham a pulsação da música technográfica.',
    results: 'Utilizado no lançamento global da marca, resultando em um aumento de 30% na interação orgânica no Instagram.'
  },
  {
    id: '2',
    title: 'Fragmentos de Movimento',
    category: 'Artísticos',
    thumbnail: 'https://img.youtube.com/vi/uDtUiZ-0FOM/maxresdefault.jpg',
    videoUrl: 'uDtUiZ-0FOM',
    description: 'Como a luz desenha o corpo no escuro? Um estudo experimental sobre a persistência da visão e o rastro deixado pelo movimento do bailarino no vácuo.',
    client: 'Cia de Dança Contemporânea',
    goal: 'Documentar a coreografia "Sombras" com um olhar cinematográfico que valorizasse o chiaroscuro e a fluidez do gesto técnico.',
    results: 'Peça selecionada para exibição em loop na galeria de artes digitais do SESC.'
  },
  {
    id: '3',
    title: 'Legado em Construção',
    category: 'Institucional',
    thumbnail: 'https://img.youtube.com/vi/uc8a-nhnJeI/maxresdefault.jpg',
    videoUrl: 'uc8a-nhnJeI',
    description: 'Um olhar humano sobre o aço. Mostramos que por trás das grandes estruturas existem mãos calejadas e propósitos claros. Uma história de 50 anos de solidez e inovação.',
    client: 'Grupo Industrial Horizonte',
    goal: 'Humanizar a imagem industrial da empresa para atrair novos talentos e fortalecer a cultura interna baseada em valores familiares.',
    results: 'Vídeo institucional com maior taxa de retenção da história da empresa, com feedback positivo de 95% dos stakeholders.'
  },
  {
    id: '4',
    title: 'Urban Nomads',
    category: 'Moda',
    thumbnail: 'https://img.youtube.com/vi/oN5BuOG6oCM/maxresdefault.jpg',
    videoUrl: 'oN5BuOG6oCM',
    description: 'O asfalto é o palco. Um fashion film dinâmico que celebra a liberdade de movimento do streetwear em meio ao caos organizado do centro de Belo Horizonte.',
    client: 'Metro Wear',
    goal: 'Demonstrar a durabilidade e o caimento das peças em situações reais de movimento urbano (skate e dança de rua).',
    results: 'Aumento direto nas vendas da "Coleção Nômade" e reconhecimento da marca como expoente do lifestyle mineiro.'
  },
  {
    id: '5',
    title: 'Sinfonia das Sombras',
    category: 'Artísticos',
    thumbnail: 'https://img.youtube.com/vi/m-oKUSaZKuA/maxresdefault.jpg',
    videoUrl: 'm-oKUSaZKuA',
    description: 'Inspirado no expressionismo alemão, este ensaio visual explora a dualidade entre luz e sombra, transformando o corpo em uma escultura viva de alto contraste.',
    client: 'Rick Santana Arts',
    goal: 'Desenvolver uma linguagem visual proprietária que servisse de laboratório para técnicas de iluminação low-key aplicadas ao cinema.',
    results: 'Destaque no canal Vimeo Staff Picks e base para a estética visual de futuras campanhas de luxo.'
  },
  {
    id: '6',
    title: 'Raízes do Ser',
    category: 'Documentários',
    thumbnail: 'https://img.youtube.com/vi/t105wG2XD4c/maxresdefault.jpg',
    videoUrl: 't105wG2XD4c',
    description: 'A voz do povo mineiro contada através de sua artesanato. Capturamos o tempo expandido da tecelagem manual e o som do tear como trilha sonora da vida.',
    client: 'Secretaria de Cultura MG',
    goal: 'Preservar em formato digital o saber de mestras tecelãs que representam o patrimônio imaterial do Vale do Jequitinhonha.',
    results: 'Acervo oficial da Secretaria e ferramenta de fomento para novas políticas de valorização do artesanato mineiro.'
  },
  {
    id: '7',
    title: 'Lumière et Soie',
    category: 'Moda',
    thumbnail: 'https://img.youtube.com/vi/PYUdWQJ8fSY/maxresdefault.jpg',
    videoUrl: 'PYUdWQJ8fSY',
    description: 'A luz francesa encontra a elegância brasileira. Um filme poético sobre a textura da seda e o brilho dos bordados manuais sob o sol da manhã.',
    client: 'Alta Costura Belo Horizonte',
    goal: 'Reposicionar a marca no segmento Premium, focando nos detalhes microscópicos que justificam o valor da alta costura.',
    results: 'Consolidação da presença da marca em boutiques internacionais após a divulgação deste material visual.'
  },
  {
    id: '8',
    title: 'Diálogos Silenciosos',
    category: 'Artísticos',
    thumbnail: 'https://img.youtube.com/vi/DM8QN3Ltnfs/maxresdefault.jpg',
    videoUrl: 'DM8QN3Ltnfs',
    description: 'Dois corpos, uma conversa. Sem som original, a trilha sonora foi composta a partir da respiração e dos passos dos bailarinos, criando uma intimidade visceral.',
    client: 'Coletivo de Artes BH',
    goal: 'Explorar a tradução simultânea entre a música contemporânea e a improvisação de dança em tempo real.',
    results: 'Apresentado em festivais multidisciplinares, tornando-se referência em videodança de baixo orçamento com alto impacto.'
  },
  {
    id: '9',
    title: 'A Nova Era Produtiva',
    category: 'Institucional',
    thumbnail: 'https://img.youtube.com/vi/YuS9n1jGAy4/maxresdefault.jpg',
    videoUrl: 'YuS9n1jGAy4',
    description: 'A sincronia perfeita entre máquinas e humanos. Um tour visual épico por centros de distribuição que mostra a coreografia invisível por trás de cada entrega nacional.',
    client: 'Innova Logist',
    goal: 'Transmitir segurança e tecnologia para investidores estrangeiros através de imagens de drones e câmeras de alta precisão.',
    results: 'Captação de novos parceiros logísticos no primeiro trimestre após o lançamento do vídeo institucional.'
  },
  {
    id: '10',
    title: 'Chromatica Mood',
    category: 'Moda',
    thumbnail: 'https://img.youtube.com/vi/HWweCdQriOU/maxresdefault.jpg',
    videoUrl: 'HWweCdQriOU',
    description: 'Explosão de neon e atitude. Um Reels-first fashion film focado em tendências jovens, onde a cor dita o ritmo da edição frenética.',
    client: 'Pop Bijoux',
    goal: 'Atingir o público da Geração Z com uma estética saturada que se destaca no scroll infinito das redes sociais.',
    results: 'Vídeo mais compartilhado do ano pela marca, com mais de 2.000 saves em coleções privadas dos usuários.'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    role: 'Diretora Criativa, Luxe Couture',
    content: 'Trabalhar com o Rick foi um divisor de águas. Ele não apenas filmou nossa coleção; ele contou sua alma. O filme resultante superou nossas expectativas.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Fundador, Heritage Woodworks',
    content: 'A atenção aos detalhes e a habilidade de capturar o "filé" do nosso artesanato foi incrível. Trabalho de altíssima qualidade, o melhor que já contratamos.',
    avatar: 'https://i.pravatar.cc/150?u=james'
  }
];

const FAQS = [
  {
    question: "Quais são os prazos de entrega?",
    answer: "Normalmente, um primeiro rascunho é entregue em 10 a 15 dias úteis, dependendo do escopo do projeto. A entrega final ocorre após os ciclos de revisão."
  },
  {
    question: "Quais equipamentos você utiliza?",
    answer: "Utilizamos equipamentos de nível cinematográfico, incluindo câmeras RED e Arri, iluminação profissional e equipamentos de som de alta fidelidade para garantir o mais alto valor de produção."
  },
  {
    question: "Você viaja para projetos?",
    answer: "Com certeza. Temos experiência filmando em 4 continentes e adoramos projetos em destinos distantes, seja para moda, casamentos ou documentários."
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'A Arte do Sizzle Reel',
    date: '12 Out 2023',
    excerpt: 'Por que seus primeiros 15 segundos são a parte mais importante do seu portfólio.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Escolhendo sua Colorização',
    date: '05 Nov 2023',
    excerpt: 'Como a teoria das cores pode mudar todo o impacto emocional do seu filme.',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80'
  }
];

// --- Sub-components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Trabalhos', href: '#works' },
    { name: 'Sobre', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-display font-black tracking-tighter uppercase whitespace-nowrap">
          RICK<span className="text-cinema-accent">SANTANA</span> FILMS
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-[11px] uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "transition-opacity",
                i === 0 ? "border-b-2 border-cinema-accent pb-1" : "opacity-50 hover:opacity-100"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/5 transition-colors rounded-sm"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-cinema-black border-l border-white/10 p-10 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="text-xl font-display font-black tracking-tighter uppercase">
                  RICK<span className="text-cinema-accent">SANTANA</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 hover:bg-white/5 transition-colors rounded-sm"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase tracking-tighter hover:text-cinema-accent transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">Redes Sociais</p>
                <div className="flex gap-6">
                  <a href="#" className="text-white/50 hover:text-cinema-accent transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-white/50 hover:text-cinema-accent transition-colors"><Video size={20} /></a>
                  <a href="#" className="text-white/50 hover:text-cinema-accent transition-colors"><Mail size={20} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-xl font-display group-hover:text-white/80 transition-colors">{title}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pb-6 text-white/50 text-sm leading-relaxed max-w-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const ShareModal = ({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !project) return null;

  const shareUrl = `${window.location.origin}/#project-${project.id}`;
  const shareTitle = `Confira o projeto "${project.title}" de Rick Santana Films`;

  const shareLinks = [
    { name: 'WhatsApp', icon: <MessageSquare size={20} />, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, color: 'bg-green-600' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-blue-400' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'bg-blue-700' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, color: 'bg-blue-600' },
    { name: 'E-mail', icon: <Mail size={20} />, href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Veja este projeto: ' + shareUrl)}`, color: 'bg-gray-600' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#111] border border-white/10 p-8 w-full max-w-md relative"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">Compartilhar Projeto</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex bg-black border border-white/10 group focus-within:border-cinema-accent transition-colors">
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="bg-transparent border-none px-4 py-3 flex-1 text-xs text-gray-400 outline-none" 
              />
              <button 
                onClick={() => copyToClipboard(shareUrl)}
                className="px-6 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-cinema-accent hover:text-white transition-colors"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {shareLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={cn("w-12 h-12 flex items-center justify-center rounded-sm transition-transform group-hover:scale-110", link.color)}>
                  {link.icon}
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sharingProject, setSharingProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(p => 
    activeCategory === 'Todos' ? true : p.category === activeCategory
  );

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-cinema-black selection:bg-white selection:text-black">
        <Helmet>
          <title>Rick Santana Films | Videomaker BH & Diretor de Fotografia MG</title>
          <meta name="description" content="Rick Santana Films: Especialista em cinematografia de moda, institucional de luxo e projetos artísticos em Belo Horizonte. Transformando conceitos em legados visuais." />
          <meta name="keywords" content="videomaker BH, diretor de fotografia MG, produção audiovisual Belo Horizonte, fashion film Brasil, vídeo institucional luxo, Rick Santana Films" />
          <meta property="og:title" content="Rick Santana Films | Narrativas em Movimento" />
          <meta property="og:description" content="Cinematografia de alto impacto em Belo Horizonte. Transformando ritmo e emoção em experiências visuais únicas." />
          <meta property="og:type" content="website" />
        </Helmet>
        
        {selectedProject && (
          <Helmet>
            <title>{`${selectedProject.title} | Rick Santana Films`}</title>
            <meta name="description" content={`${selectedProject.description} - Projeto de Rick Santana, videomaker e diretor de fotografia especializado em ${selectedProject.category}.`} />
          </Helmet>
        )}
      <Nav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden bg-cinema-black">
        {/* Background Typography Layer */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <span className="text-[20rem] md:text-[32rem] font-black leading-none uppercase">MOTION</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6"
          >
            <p className="text-cinema-accent text-sm font-bold tracking-[0.3em] uppercase mb-4">
              Diretor & Cinegrafista
            </p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase mb-8 tracking-tighter">
              A Arte<br/>do<br/><span className="text-transparent border-t-2 border-b-2 border-white/20">Movimento</span>
            </h1>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-10 border-l-2 border-cinema-accent pl-4 font-light">
              Transformando ritmo e emoção em experiências cinematográficas de alto impacto. Especializado em filmes de moda, arte e institucional de luxo.
            </p>
            <button className="bg-white text-black px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-cinema-accent hover:text-white transition-colors">
              Agendar Projeto
            </button>
          </motion.div>

          {/* Showreel Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 relative"
          >
            <div className="relative group">
              <div className="w-full aspect-video bg-[#111] border border-white/10 rounded-sm overflow-hidden flex items-center justify-center relative shadow-2xl">
                {/* Mock Video UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <img 
                  src="https://img.youtube.com/vi/9mwmFa3fcjM/maxresdefault.jpg" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity"
                  alt="Rick Santana - Overthinker"
                  loading="lazy"
                  decoding="async"
                />
                <div 
                  onClick={() => setSelectedProject(PROJECTS[0])}
                  className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 z-10 transition-transform bg-white/5 hover:bg-white hover:text-black group-hover:border-white"
                >
                  <Play size={32} />
                </div>
                <div className="absolute bottom-6 left-6 flex flex-col z-10 pr-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cinema-accent">Reproduzindo</span>
                  <span className="text-lg font-bold">OVERTHINKER | MUVPRO 2025</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-cinema-accent w-1/3 z-10"></div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-cinema-accent pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/20 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="works" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cinema-accent font-bold mb-4 block">Portfólio Selecionado</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Trabalhos <br /> <span className="text-transparent border-b-2 border-white/20">Em Destaque</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 text-[10px] uppercase font-black tracking-[0.2em] transition-all border border-white/10",
                  activeCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "text-white/40 hover:text-white hover:border-white/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[16/10] bg-cinema-gray overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.thumbnail} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="absolute top-4 right-4 group-hover:opacity-100 opacity-0 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSharingProject(project);
                      }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{project.category}</span>
                  <h3 className="text-xl font-bold uppercase">{project.title}</h3>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    Ver Estudo de Caso <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#080808] py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-widest text-cinema-accent font-bold mb-4 block">Depoimentos</span>
            <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">Vozes & Visões</h2>
            <p className="text-gray-500 text-sm font-light uppercase tracking-widest">O impacto do nosso olhar contado por quem confia em nossa lente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="relative p-12 border border-white/5 bg-cinema-black group hover:border-cinema-accent/30 transition-colors">
                <MessageSquare className="absolute top-10 right-10 text-white/5 group-hover:text-cinema-accent/10 transition-colors" size={80} />
                <p className="text-xl font-light text-white/80 mb-10 leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-5">
                  <img src={t.avatar} className="w-14 h-14 rounded-sm border border-cinema-accent grayscale group-hover:grayscale-0 transition-all" alt={t.name} loading="lazy" decoding="async" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-cinema-accent z-0" />
          <div className="relative overflow-hidden z-10 bg-zinc-900 aspect-[4/5]">
            <img 
              src="https://i.postimg.cc/qMZ0df28/20260428-210709-IMG-STYLE.jpg" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
              alt="Rick Santana"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-cinema-accent text-black p-10 font-display font-black text-6xl hidden md:block z-20 shadow-2xl">
            10+ <br /> <span className="text-2xl uppercase tracking-tighter">ANOS</span>
          </div>
        </div>
        <div className="md:pl-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cinema-accent font-bold mb-4 block">Sobre o Diretor</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.85] tracking-tighter">O Olhar <br /> <span className="text-transparent border-t-2 border-b-2 border-white/20">Por Trás.</span></h2>
          <div className="space-y-6 text-gray-400 text-sm leading-relaxed border-l-2 border-cinema-accent/30 pl-6 font-light">
            <p>Minha trajetória é impulsionada pela fusão entre o movimento do corpo e a precisão da lente. Como bailarino de formação, desenvolvi uma percepção rítmica única, que hoje aplico em cada frame e corte que realizo na Rick Santana Films.</p>
            <p>Baseado em Belo Horizonte, busco transcender o óbvio em produções de moda, institucional de luxo e projetos artísticos. Cada projeto é uma busca pela verdade narrativa, transformando momentos efêmeros em legados visuais memoráveis.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            {[
              { icon: <Film size={20} />, text: "Direção" },
              { icon: <Camera size={20} />, text: "Cinematografia" },
              { icon: <Video size={20} />, text: "Musicalidade" },
              { icon: <Award size={20} />, text: "Colorização" },
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <div className="text-cinema-accent">{skill.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{skill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-cinema-accent font-bold mb-4 block">Conhecimento</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Diário</h2>
          </div>
          <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-cinema-accent transition-colors border-b border-white/20 pb-1">Ver Todos os Artigos</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-8 border border-white/5 relative">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-cinema-accent font-black mb-4 block">{post.date}</span>
              <h3 className="text-3xl font-black uppercase leading-tight group-hover:text-cinema-accent transition-colors tracking-tighter">{post.title}</h3>
              <p className="mt-4 text-gray-500 text-sm font-light leading-relaxed max-w-md">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & Contact */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-cinema-accent font-bold mb-4 block">Processo</span>
          <h2 className="text-5xl font-black uppercase mb-16 tracking-tighter leading-[0.9]">Dúvidas <br /> <span className="text-transparent border-b-2 border-white/20">Frequentes</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} title={faq.question}>
                <span className="font-sans text-gray-400 leading-relaxed text-sm">{faq.answer}</span>
              </AccordionItem>
            ))}
          </div>
        </div>
        
        <div className="bg-[#0a0a0a] p-12 relative border border-white/5">
          <div className="absolute -top-4 -right-4 w-20 h-20 border-t border-r border-cinema-accent" />
          <h2 className="text-5xl font-black uppercase mb-10 tracking-tighter leading-[0.9]">Iniciar <br /> Um Projeto</h2>
          <form className="space-y-8">
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] text-cinema-accent font-black mb-3 block">Seu Nome</label>
              <input type="text" className="w-full bg-cinema-black border-b border-white/10 px-0 py-3 focus:border-cinema-accent outline-none transition-colors text-sm font-medium" placeholder="Nome Completo" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] text-cinema-accent font-black mb-3 block">Endereço de E-mail</label>
              <input type="email" className="w-full bg-cinema-black border-b border-white/10 px-0 py-3 focus:border-cinema-accent outline-none transition-colors text-sm font-medium" placeholder={FAQS[0] ? "santanasrick@gmail.com" : "email@exemplo.com"} />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] text-cinema-accent font-black mb-3 block">Escopo do Projeto</label>
              <textarea rows={4} className="w-full bg-cinema-black border border-white/10 p-4 focus:border-cinema-accent outline-none transition-colors text-sm resize-none font-medium" placeholder="Descreva sua visão cinematográfica..."></textarea>
            </div>
            <button className="w-full bg-white text-black py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-cinema-accent hover:text-white transition-all">
              Enviar Mensagem <Mail size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer Grid Navigation */}
      <footer className="border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#0a0a0a]">
        <div className="p-8 border-b sm:border-b-0 sm:border-r border-white/10">
          <span className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1">01 / Categorias</span>
          <span className="text-xs font-bold uppercase">Institucional & Moda</span>
        </div>
        <div className="p-8 border-b sm:border-b-0 lg:border-r border-white/10">
          <span className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1">02 / Localização</span>
          <span className="text-xs font-bold uppercase">Belo Horizonte, MG</span>
        </div>
        <div className="p-8 border-b sm:border-b-0 sm:border-r border-white/10">
          <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">03 / Projetos</span>
          <span className="text-xs font-black uppercase">+150 Concluídos</span>
        </div>
        <div className="p-8 bg-cinema-accent flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <span className="text-xs font-black uppercase tracking-tighter text-black group-hover:text-black">Ver Estudos de Caso</span>
          <ArrowRight className="w-4 h-4 text-black group-hover:text-black" strokeWidth={3} />
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cinema-black w-full max-w-6xl min-h-[90vh] relative overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-white/60 hover:text-white"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/3 aspect-video bg-black">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedProject.videoUrl}?autoplay=1`}
                    title={selectedProject.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="w-full lg:w-1/3 p-8 md:p-12 border-l border-white/5 bg-[#0a0a0a]">
                  <span className="text-[10px] uppercase tracking-widest text-cinema-accent font-bold mb-4 block">{selectedProject.category}</span>
                  <h2 className="text-4xl font-black uppercase mb-10 tracking-tighter leading-[0.9]">{selectedProject.title}</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-white/30">
                        <Video size={14} className="text-cinema-accent" /> Sobre o Projeto
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed font-light italic">"{selectedProject.description}"</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-white/30">
                        <MessageSquare size={14} className="text-cinema-accent" /> Cliente & Briefing
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        <span className="text-white font-bold">{selectedProject.client}:</span> {selectedProject.goal}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-white/30">
                        <CheckCircle2 size={14} className="text-cinema-accent" /> Resultados
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed font-light">{selectedProject.results}</p>
                    </div>
 
                    <div className="pt-10">
                      <button className="w-full py-5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-cinema-accent hover:text-white transition-all">
                        Ver Projeto Completo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ShareModal 
        project={sharingProject!} 
        isOpen={!!sharingProject} 
        onClose={() => setSharingProject(null)} 
      />
    </div>
  </HelmetProvider>
  );
}
