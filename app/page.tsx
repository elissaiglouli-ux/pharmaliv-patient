import Link from 'next/link'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>

      <Nav />

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', paddingTop: 70 }}>
        <div style={{ background: 'linear-gradient(160deg,#C2EBEB 0%,#DCF5F5 28%,#EDF9F9 55%,#F6FDFD 78%,#FFFFFF 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 52px 80px' }}>
          <h1 style={{ fontSize: 'clamp(36px,3.8vw,55px)', fontWeight: 900, color: '#0D2D3D', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: 22 }}>
            Vos médicaments<br/>livrés à domicile<br/>en moins d'une<br/>heure<span style={{ color: '#1B8C8C' }}>*</span>
          </h1>
          <p style={{ fontSize: 17, color: '#3D5A5A', lineHeight: 1.65, maxWidth: 400, marginBottom: 36 }}>
            Téléchargez votre ordonnance, choisissez votre pharmacie, on s'occupe du reste.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13, maxWidth: 330 }}>
            <Link href="/ordonnance" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', background: '#0D2D3D', color: 'white', padding: '15px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Télécharger mon ordonnance
            </Link>
            <Link href="/parapharmacie" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', background: 'transparent', color: '#0D2D3D', padding: '14px 24px', borderRadius: 12, border: '1.5px solid rgba(13,45,61,0.2)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              › Parcourir la parapharmacie
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px', marginTop: 44 }}>
            {[
              { icon: '✓', text: 'Ordonnance validée\npar votre pharmacien' },
              { icon: '💳', text: 'Paiement sécurisé\nCB ou mutuelle' },
              { icon: '⚡', text: 'Livraison rapide\nen 1h chez vous' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', border: '1.5px solid rgba(27,140,140,0.2)', background: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0D2D3D', lineHeight: 1.45, paddingTop: 3 }}>
                  {item.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, fontSize: 12, color: '#8AABAB', fontStyle: 'italic' }}>*Délai indicatif selon disponibilité et localisation.</p>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', background: '#0D2D3D' }}>
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&fit=crop&crop=center" alt="Soins à domicile" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82 }}/>
          <div style={{ position: 'absolute', bottom: 44, right: 28, display: 'flex', flexDirection: 'column', gap: 13, width: 284 }}>
            <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '15px 17px', display: 'flex', alignItems: 'center', gap: 13, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: '#EAF7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🕐</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D2D3D', marginBottom: 2 }}>Livraison prévue</div>
                <div style={{ fontSize: 13, color: '#6B8888' }}>Aujourd'hui entre 14h et 15h</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '15px 17px', display: 'flex', alignItems: 'center', gap: 13, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏥</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#16A34A', marginBottom: 2 }}>
                  <span style={{ width: 7, height: 7, background: '#22C55E', borderRadius: '50%', display: 'inline-block' }}></span>
                  Commande préparée
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0D2D3D' }}>Pharmacie de la Préfecture</div>
                <div style={{ fontSize: 12, color: '#8AABAB' }}>★★★★★ 4,9 (128 avis)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}