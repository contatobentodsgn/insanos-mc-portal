import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ARTICLES_DATA } from "../../data/articles";
import { ShareButtons } from "../../components/ShareButtons";
import { IconArrowRight } from "../../components/ui/Icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  if (!article) return { title: "Artigo Não Encontrado" };

  return {
    title: `${article.title} | 18News`,
    description: article.desc,
    openGraph: {
      title: `${article.title} | 18News`,
      description: article.desc,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = ARTICLES_DATA.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">

          {/* Article Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#F2C21B] text-black font-extrabold text-xs uppercase rounded">
                {article.tag}
              </span>
              <span className="text-xs text-[#AAA8A1] font-mono">{article.date} · {article.readTime}</span>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-6xl text-white leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#C7C5BF] leading-relaxed border-l-4 border-[#F2C21B] pl-4 mb-6">
              {article.desc}
            </p>

            {/* Social Share Bar Top */}
            <div className="pt-4 border-t border-white/10">
              <ShareButtons title={article.title} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 sm:h-[480px] object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none text-base sm:text-lg text-[#AAA8A1] leading-relaxed space-y-6 mb-16">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#D0CECB] leading-relaxed">
                {para.trim()}
              </p>
            ))}
          </div>

          {/* Social Share Bar Bottom */}
          <div className="p-6 rounded-xl bg-[#121316] border border-white/10 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-['Anton'] text-lg uppercase text-white">Gostou deste relato?</span>
            <ShareButtons title={article.title} />
          </div>

          {/* Author Box */}
          <div className="p-8 rounded-xl bg-[#121316] border border-white/10 flex items-center justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider block mb-1">
                Publicação Oficial
              </span>
              <h3 className="font-['Anton'] text-2xl uppercase text-white">{article.author}</h3>
              <p className="text-xs text-[#AAA8A1]">Divisão de Comunicação & 18News · Insanos Moto Clube</p>
            </div>
            <Link
              href="/18news"
              className="px-5 py-2.5 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded text-xs uppercase font-bold tracking-wider transition-colors duration-200"
            >
              Voltar ao 18News ←
            </Link>
          </div>

          {/* Related Articles */}
          <div className="pt-12 border-t border-white/10">
            <h3 className="font-['Anton'] text-2xl uppercase text-white mb-6">Outras Reportagens</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/18news/${rel.slug}`}
                  className="p-6 rounded-xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/50 transition-colors duration-200 group block hover-lift shadow-lg"
                >
                  <span className="text-xs uppercase font-bold text-[#F2C21B] block mb-2">{rel.tag}</span>
                  <h4 className="font-['Anton'] text-xl uppercase text-white group-hover:text-[#F2C21B] transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-[#C7C5BF] inline-flex items-center gap-1.5">
                    <span>{rel.readTime} · Ler</span>
                    <IconArrowRight className="w-3 h-3 text-[#F2C21B]" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
