'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NavLogo = () => (
  <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
    <defs>
      <linearGradient id="g1" x1="21" y1="2" x2="21" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#4DCFCF"/><stop offset="1" stopColor="#0D8080"/></linearGradient>
      <linearGradient id="g2" x1="2" y1="21" x2="40" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#3DC4C4"/><stop offset="1" stopColor="#1B8C8C"/></linearGradient>
    </defs>
    <rect x="14" y="2" width="14" height="38" rx="7" fill="url(#g1)"/>
    <rect x="2" y="14" width="38" height="14" rx="7" fill="url(#g2)" opacity=".9"/>
    <rect x="10" y="17" width="22" height="8" rx="4" fill="white" opacity=".92" stroke="#0D7070" strokeWidth="1.2"/>
    <rect x="10" y="17" width="11" height="8" rx="4" fill="#A8E6E6" opacity=".7"/>
  </svg>
)

export default function Suivi() {
  // ─── Simulation progression livraison ────────────────────────────────────
  const [etape, setEtape] = useState(3)
  const [seconds, setSeconds] = useState(18 * 60)

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(timer)
  }, [])

  const mins = Math.floor(seconds / 60).toString().padStart(2,'0')
  const secs = (seconds % 60).toString().padStart(2,'0')

  const etapes = [
    { id:1, icon:'✓', label:'Commande reçue', desc:'Transmise à la Pharmacie Saint-Jean', time:'14h32', done:true, active:false },
    { id:2, icon:'✓', label:'Commande acceptée', desc:'Le pharmacien a pris en charge votre demande', time:'14h48', done:true, active:false },
    { id:3, icon:'✓', label:'Reste à charge validé', desc:'6,05 € confirmés — paiement effectué', time:'14h52', done:true, active:false },
    { id:4, icon:'📦', label:'Préparation en cours', desc:'Vos médicaments et produits sont en cours de préparation', time:'15h00', done:false, active:true },
    { id:5, icon:'🛵', label:'Livreur en route', desc:'Un livreur partenaire récupère votre commande', time:'', done:false, active:false },
    { id:6, icon:'🏠', label:'Livraison', desc:'Votre commande arrive à votre adresse', time:'', done:false, active:false },
  ]

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(0,0,0,0.07)', height:70, display:'flex', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:1320, margin:'0 auto', padding:'0 28px', display:'flex', alignItems:'center' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <NavLogo />
            <div>
              <div style={{ display:'flex' }}>
                <span style={{ fontSize:19, fontWeight:800, color:'#0D2D3D' }}>Pharma</span>
                <span style={{ fontSize:19, fontWeight:800, background:'linear-gradient(135deg,#2BBFBF,#1B8C8C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Liv</span>
              </div>
              <div style={{ fontSize:10, color:'#8AABAB' }}>Votre pharmacie, livrée.</div>
            </div>
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:24, marginLeft:32, flex:1 }}>
            <Link href="/parapharmacie" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Parapharmacie</Link>
            <Link href="/ordonnance" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Ordonnance</Link>
            <Link href="/pharmacies" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Nos pharmacies</Link>
          </div>
          <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:6, background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
            Mon compte
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 32px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>
          Suivi de commande
        </h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Commande #PL-0851 · Pharmacie Saint-Jean</p>
      </div>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'32px 20px 80px' }}>

        {/* ── STATUT PRINCIPAL ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:24, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)', textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
          <div style={{ fontSize:20, fontWeight:800, color:'#0D2D3D', marginBottom:6 }}>Préparation en cours</div>
          <div style={{ fontSize:14, color:'#7A9A9A', marginBottom:16 }}>12 Rue de la Paix, 13001 Marseille</div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'10px 20px', borderRadius:20, fontWeight:600, fontSize:15 }}>
            ⏱ Arrivée estimée : 16h15 — dans {mins}:{secs}
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:24, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:20 }}>Historique</div>

          {etapes.map((e, i) => (
            <div key={e.id} style={{ display:'flex', gap:16, paddingBottom: i<etapes.length-1 ? 24 : 0, position:'relative' }}>
              {i < etapes.length-1 && (
                <div style={{ position:'absolute', left:19, top:40, bottom:0, width:2, background: e.done ? '#1B8C8C' : 'rgba(27,140,140,0.15)' }}/>
              )}
              <div style={{
                width:40, height:40, borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: e.active ? 14 : 16,
                background: e.done ? '#1B8C8C' : e.active ? 'white' : '#F4FAFA',
                border: e.done ? 'none' : e.active ? '2px solid #1B8C8C' : '2px solid #E5E7EB',
                color: e.done ? 'white' : e.active ? '#1B8C8C' : '#B0C4C4',
                boxShadow: e.active ? '0 0 0 4px rgba(27,140,140,0.15)' : 'none',
                position:'relative', zIndex:1
              }}>
                {e.active ? (
                  <div style={{ width:16, height:16, border:'2.5px solid rgba(27,140,140,0.2)', borderTopColor:'#1B8C8C', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
                ) : e.done ? '✓' : e.icon}
              </div>
              <div style={{ flex:1, paddingTop:6 }}>
                <div style={{ fontSize:14, fontWeight:600, color: e.active ? '#1B8C8C' : e.done ? '#0D2D3D' : '#B0C4C4', marginBottom:3 }}>{e.label}</div>
                <div style={{ fontSize:13, color: e.done || e.active ? '#7A9A9A' : '#D1D5DB', lineHeight:1.5 }}>{e.desc}</div>
                {e.time && <div style={{ fontSize:12, color:'#22C55E', fontWeight:500, marginTop:4 }}>{e.time}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* ── PHARMACIE + LIVREUR ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:14 }}>Votre pharmacie</div>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#F4FAFA', borderRadius:12, border:'1px solid rgba(27,140,140,0.1)' }}>
            <div style={{ width:44, height:44, background:'#EAF7F7', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🏥</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Pharmacie Saint-Jean</div>
              <div style={{ fontSize:12, color:'#7A9A9A' }}>📍 12 Rue de la République, 13001</div>
            </div>
            <a href="tel:+33491000000" style={{ padding:'8px 16px', background:'#EAF7F7', color:'#1B8C8C', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none', border:'1px solid rgba(27,140,140,0.2)' }}>
              📞 Appeler
            </a>
          </div>
        </div>

        {/* ── RÉCAP COMMANDE ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:14 }}>Récapitulatif</div>
          {[
            { label:'Parapharmacie', val:'47,20 €', color:'#0D2D3D' },
            { label:'Reste à charge médicaments', val:'6,05 €', color:'#0D2D3D' },
            { label:'Livraison express', val:'3,90 €', color:'#1B8C8C' },
            { label:'Total payé', val:'57,15 €', color:'#0D2D3D', bold:true },
          ].map((line, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom: i<3 ? '1px solid rgba(0,0,0,0.05)' : 'none', fontSize: line.bold ? 16 : 14, fontWeight: line.bold ? 800 : 400 }}>
              <span style={{ color:'#5A7878' }}>{line.label}</span>
              <span style={{ color:line.color, fontWeight: line.bold ? 800 : 600 }}>{line.val}</span>
            </div>
          ))}
        </div>

        {/* ── ACTIONS ── */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' as const }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:7, background:'#1B8C8C', color:'white', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none' }}>
            Retour à l'accueil
          </Link>
          <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:7, background:'white', color:'#5A7878', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:500, textDecoration:'none', border:'1px solid rgba(0,0,0,0.1)' }}>
            Nouvelle commande
          </Link>
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

    </main>
  )
}