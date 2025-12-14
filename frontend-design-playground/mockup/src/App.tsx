import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-black/80 flex items-center justify-center">
              <span className="text-xs font-semibold">HW</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Hallo Welt</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Über uns</a>
            <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Leistungen</a>
            <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Projekte</a>
            <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Kontakt</a>
          </nav>
          <button className="border border-black/80 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">
            Anfrage
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                Hallo Welt.
                <br />
                <span className="font-semibold">Willkommen bei uns.</span>
              </h1>
              <p className="text-black/60 text-lg leading-relaxed mb-8 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-black/80 transition-colors">
                  Mehr erfahren
                </button>
                <button className="border border-black/30 px-6 py-3 text-sm font-medium hover:border-black transition-colors">
                  Kontakt
                </button>
              </div>
            </div>
            <div className="border border-black/20 bg-neutral-100 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-black/40">
                <svg className="w-16 h-16 mx-auto mb-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="text-sm">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-b border-black/20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-black/50 mb-4 block">Unsere Leistungen</span>
            <h2 className="text-3xl font-semibold">Was wir bieten</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Beratung', icon: '01' },
              { title: 'Entwicklung', icon: '02' },
              { title: 'Support', icon: '03' },
            ].map((service) => (
              <div key={service.title} className="border border-black/20 bg-white p-8 hover:border-black/40 transition-colors">
                <div className="w-12 h-12 border border-black/20 flex items-center justify-center mb-6">
                  <span className="text-sm font-medium text-black/50">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-b border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="border border-black/20 bg-neutral-100 aspect-square flex items-center justify-center order-2 md:order-1">
              <div className="text-center text-black/40">
                <svg className="w-16 h-16 mx-auto mb-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <span className="text-sm">Team Photo</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs tracking-widest uppercase text-black/50 mb-4 block">Über uns</span>
              <h2 className="text-3xl font-semibold mb-6">Wer wir sind</h2>
              <p className="text-black/60 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-black/60 leading-relaxed mb-8">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
                <div>
                  <div className="text-3xl font-semibold">150+</div>
                  <div className="text-sm text-black/50">Projekte</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">12</div>
                  <div className="text-sm text-black/50">Jahre</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">25</div>
                  <div className="text-sm text-black/50">Mitarbeiter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-black/20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-px bg-black/10">
            {[
              { label: 'Qualität', desc: 'Lorem ipsum dolor sit amet' },
              { label: 'Innovation', desc: 'Consectetur adipiscing elit' },
              { label: 'Effizienz', desc: 'Sed do eiusmod tempor' },
              { label: 'Zuverlässigkeit', desc: 'Incididunt ut labore' },
            ].map((item) => (
              <div key={item.label} className="bg-white p-8 text-center">
                <h4 className="font-semibold mb-2">{item.label}</h4>
                <p className="text-sm text-black/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="border border-black/20 bg-neutral-100 p-12 md:p-16 text-center">
            <h2 className="text-3xl font-semibold mb-4">Bereit zu starten?</h2>
            <p className="text-black/60 max-w-md mx-auto mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kontaktieren Sie uns für ein unverbindliches Gespräch.
            </p>
            <button className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-black/80 transition-colors">
              Jetzt anfragen
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                  <span className="text-xs font-semibold">HW</span>
                </div>
                <span className="font-semibold">Hallo Welt</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-sm">Unternehmen</h5>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-sm">Leistungen</h5>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Beratung</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Entwicklung</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-sm">Kontakt</h5>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Musterstraße 123</li>
                <li>12345 Berlin</li>
                <li>info@hallowelt.de</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">&copy; 2024 Hallo Welt GmbH. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
