'use client'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', minHeight:'100vh', paddingTop:70 }}>

        <div style={{ background:'linear-gradient(160deg,#C2EBEB 0%,#DCF5F5 28%,#EDF9F9 55%,#F6FDFD 78%,#FFFFFF 100%)', display:'flex', flexDirection:'column', justifyContent:'center', padding: mobile ? '48px 24px 56px' : '64px 52px 80px' }}>
          <h1 style={{ fontSize: mobile ? '36px' : 'clamp(36px,3.8vw,55px)', fontWeight:900, color:'#0D2D3D', lineHeight:1.07, letterSpacing:'-0.03em', marginBottom:20 }}>
            Vos médicaments<br/>livrés à domicile<br/>en moins d'une<br/>heure<span style={{ color:'#1B8C8C' }}>*</span>
          </h1>
          <p style={{ fontSize: mobile ? 15 : 17, color:'#3D5A5A', lineHeight:1.65, marginBottom:32 }}>
            Téléchargez votre ordonnance, choisissez votre pharmacie, on s'occupe du reste.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#0D2D3D', color:'white', padding:'15px 24px', borderRadius:12, fontSize:15, fontWeight:600, textDecoration:'none' }}>
              Télécharger mon ordonnance
            </Link>
            <Link href="/parapharmacie" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', color:'#0D2D3D', padding:'14px 24px', borderRadius:12, border:'1.5px solid rgba(13,45,61,0.2)', fontSize:15, fontWeight:600, textDecoration:'none' }}>
              › Parcourir la parapharmacie
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 20px', marginTop:36 }}>
            {[
              { icon:'✓', text:'Ordonnance validée\npar votre pharmacien' },
              { icon:'💳', text:'Paiement sécurisé\nCB ou mutuelle' },
              { icon:'⚡', text:'Livraison rapide\nen 1h chez vous' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', border:'1.5px solid rgba(27,140,140,0.2)', background:'rgba(255,255,255,0.65)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:15 }}>{item.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:'#0D2D3D', lineHeight:1.45, paddingTop:4 }}>
                  {item.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop:24, fontSize:11, color:'#8AABAB', fontStyle:'italic' }}>*Délai indicatif selon disponibilité et localisation.</p>
        </div>

        {!mobile && (
          <div style={{ position:'relative', overflow:'hidden', background:'#0D2D3D' }}>
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&fit=crop&crop=center" alt="Soins à domicile" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.82 }}/>
            <div style={{ position:'absolute', bottom:44, right:28, display:'flex', flexDirection:'column', gap:13, width:284 }}>
              <div style={{ background:'rgba(255,255,255,0.97)', backdropFilter:'blur(8px)', borderRadius:16, padding:'15px 17px', display:'flex', alignItems:'center', gap:13, boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
                <div style={{ width:44, height:44, borderRadius:11, background:'#EAF7F7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🕐</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Livraison prévue</div>
                  <div style={{ fontSize:13, color:'#6B8888' }}>Aujourd'hui entre 14h et 15h</div>
                </div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.97)', backdropFilter:'blur(8px)', borderRadius:16, padding:'15px 17px', display:'flex', alignItems:'center', gap:13, boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
                <div style={{ width:44, height:44, borderRadius:11, background:'#FFF7ED', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🏥</div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:'#16A34A', marginBottom:2 }}>
                    <span style={{ width:7, height:7, background:'#22C55E', borderRadius:'50%', display:'inline-block' }}></span>
                    Commande préparée
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D' }}>Pharmacie de la Préfecture</div>
                  <div style={{ fontSize:12, color:'#8AABAB' }}>★★★★★ 4,9 (128 avis)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ background:'white', padding: mobile ? '56px 24px' : '80px 80px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'#1B8C8C', marginBottom:8 }}>Simple et rapide</div>
            <h2 style={{ fontSize: mobile ? '28px' : '38px', fontWeight:900, color:'#0D2D3D', letterSpacing:'-0.03em' }}>Comment ça marche ?</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(4,1fr)', gap: mobile ? 24 : 32 }}>
            {[
              { num:'01', icon:'📋', titre:'Votre ordonnance', desc:'Envoyez votre ordonnance par code Ségur, photo ou via votre médecin directement.' },
              { num:'02', icon:'🏥', titre:'Choisissez une pharmacie', desc:'Sélectionnez la pharmacie partenaire la plus proche de chez vous.' },
              { num:'03', icon:'💊', titre:'Le pharmacien prépare', desc:'Il valide votre ordonnance, calcule le reste à charge et prépare votre commande.' },
              { num:'04', icon:'🛵', titre:'Livraison à domicile', desc:'Un livreur récupère votre commande et vous la dépose en moins d\'une heure.' },
            ].map((step, i) => (
              <div key={i} style={{ textAlign:'center', padding: mobile ? '20px 16px' : '28px 20px', background:'#F4FAFA', borderRadius:20, border:'1px solid rgba(27,140,140,0.08)' }}>
                <div style={{ width:52, height:52, background:'linear-gradient(135deg,#1B8C8C,#0D5555)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, margin:'0 auto 16px' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:'#1B8C8C', letterSpacing:'0.08em', marginBottom:8 }}>ÉTAPE {step.num}</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#0D2D3D', marginBottom:10 }}>{step.titre}</div>
                <div style={{ fontSize:13, color:'#7A9A9A', lineHeight:1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHARMACIES PARTENAIRES ── */}
      <section style={{ background:'#F4FAFA', padding: mobile ? '48px 24px' : '64px 80px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'#1B8C8C', marginBottom:8 }}>Marseille</div>
          <h2 style={{ fontSize: mobile ? '26px' : '34px', fontWeight:900, color:'#0D2D3D', letterSpacing:'-0.02em', marginBottom:12 }}>Nos pharmacies partenaires</h2>
          <p style={{ fontSize:15, color:'#7A9A9A', marginBottom:40 }}>Toutes livrent en moins d'une heure</p>
          <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:16, marginBottom:36 }}>
            {[
              { nom:'Pharmacie Saint-Jean', dist:'0,8 km', delai:'28 min', emoji:'🏥', slug:'saint-jean' },
              { nom:'Grande Pharmacie du Prado', dist:'1,4 km', delai:'34 min', emoji:'💊', slug:'prado' },
              { nom:'Pharmacie Castellane', dist:'2,1 km', delai:'41 min', emoji:'🌿', slug:'castellane' },
              { nom:'Pharmacie du Vieux-Port', dist:'2,8 km', delai:'52 min', emoji:'⚕️', slug:'vieux-port' },
            ].map(p => (
              <Link key={p.slug} href={`/pharmacie/${p.slug}`} style={{ background:'white', borderRadius:16, padding:'20px 16px', textAlign:'center', textDecoration:'none', border:'1px solid rgba(27,140,140,0.08)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'block' }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{p.emoji}</div>
                <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D', marginBottom:6, lineHeight:1.3 }}>{p.nom}</div>
                <div style={{ fontSize:12, fontWeight:600, background:'#EAF7F7', color:'#0F766E', padding:'4px 10px', borderRadius:8, display:'inline-block' }}>⚡ {p.delai}</div>
              </Link>
            ))}
          </div>
          <Link href="/pharmacies" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px 28px', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none' }}>
            Voir toutes les pharmacies →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#0D2D3D', color:'white', padding: mobile ? '40px 24px 32px' : '56px 80px 40px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: mobile ? 32 : 48, marginBottom:48 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ fontSize:22, fontWeight:800 }}>Pharma<span style={{ background:'linear-gradient(135deg,#2BBFBF,#1B8C8C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Liv</span></div>
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.7, maxWidth:260 }}>La plateforme de livraison de médicaments à domicile. Vos pharmacies partenaires à Marseille.</p>
            </div>
            {[
              { titre:'Services', liens:[{l:'Ordonnance',h:'/ordonnance'},{l:'Parapharmacie',h:'/parapharmacie'},{l:'Nos pharmacies',h:'/pharmacies'}] },
              { titre:'Légal', liens:[{l:'Mentions légales',h:'/'},{l:'CGU',h:'/'},{l:'Confidentialité',h:'/'}] },
              { titre:'Contact', liens:[{l:'contact@pharmaliv.fr',h:'/'},{l:'Marseille, France',h:'/'},{l:'Support 7j/7',h:'/'}] },
            ].map(col => (
              <div key={col.titre}>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.4)', marginBottom:16 }}>{col.titre}</div>
                {col.liens.map(l => (
                  <Link key={l.l} href={l.h} style={{ display:'block', fontSize:13, color:'rgba(255,255,255,0.6)', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}>{l.l}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>© 2025 PharmaLiv — Paiement sécurisé par Stripe</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>🏥 Plateforme d'intermédiation — non pharmacie</div>
          </div>
        </div>
      </footer>

    </main>
  )
}