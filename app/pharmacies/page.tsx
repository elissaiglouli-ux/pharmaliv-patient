'use client'
import { useState } from 'react'
import Link from 'next/link'

const pharmacies = [
  { id:1, slug:'saint-jean', nom:'Pharmacie Saint-Jean', adresse:'12 Rue de la République, 13001', dist:'0,8 km', delai:'28 min', note:4.9, avis:128, ouvert:'Ferme à 20h', emoji:'🏥', produits:24 },
  { id:2, slug:'prado', nom:'Grande Pharmacie du Prado', adresse:'8 Avenue du Prado, 13006', dist:'1,4 km', delai:'34 min', note:4.7, avis:89, ouvert:'Ferme à 19h30', emoji:'💊', produits:18 },
  { id:3, slug:'castellane', nom:'Pharmacie Castellane', adresse:'3 Place Castellane, 13006', dist:'2,1 km', delai:'41 min', note:4.8, avis:213, ouvert:'Ferme à 21h', emoji:'🌿', produits:31 },
  { id:4, slug:'vieux-port', nom:'Pharmacie du Vieux-Port', adresse:'2 Quai du Port, 13002', dist:'2,8 km', delai:'52 min', note:4.6, avis:64, ouvert:'Ferme à 20h', emoji:'⚕️', produits:12 },
]

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

export default function Pharmacies() {
  const [selected, setSelected] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = pharmacies.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.adresse.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>

      {/* ── NAV complète ── */}
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
            <Link href="/pharmacies" style={{ fontSize:14, fontWeight:700, color:'#1B8C8C', textDecoration:'none', borderBottom:'2px solid #1B8C8C', paddingBottom:2 }}>Nos pharmacies</Link>
          </div>
          <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:6, background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
            Mon compte
          </Link>
        </div>
      </nav>

      {/* ── HERO photo médicaments nette ── */}
      <div style={{ position:'relative', padding:'110px 32px 56px', textAlign:'center', color:'white', overflow:'hidden', marginTop:70 }}>
        <img
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=90&fit=crop&crop=center"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{ position:'absolute', inset:0, background:'rgba(13,45,61,0.52)' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <h1 style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8, textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
            Nos pharmacies partenaires
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)' }}>
            Toutes livrent en moins d'une heure · Marseille et alentours
          </p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:'0 auto', padding:'32px 20px 80px' }}>

        {/* ── PROGRESS ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginBottom:32 }}>
          {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i===0?'#DCFCE7':i===1?'#1B8C8C':'white', color:i===0?'#15803D':i===1?'white':'#B0C4C4', border:i===0?'2px solid #15803D':i===1?'none':'2px solid #E5E7EB', boxShadow:i===1?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                  {i===0?'✓':i+1}
                </div>
                <div style={{ fontSize:11, fontWeight:600, marginTop:5, color:i===0?'#15803D':i===1?'#1B8C8C':'#B0C4C4' }}>{label}</div>
              </div>
              {i<3 && <div style={{ width:48, height:2, background:i===0?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
            </div>
          ))}
        </div>

        {/* ── LIVRAISON RAPIDE ── */}
        <Link href="/pharmacie/saint-jean" style={{ textDecoration:'none' }}>
          <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, cursor:'pointer' }}>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:'white', marginBottom:2 }}>⚡ Livraison la plus rapide</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)' }}>Pharmacie Saint-Jean · 28 min · 0,8 km</div>
            </div>
            <div style={{ background:'white', color:'#1B8C8C', padding:'8px 18px', borderRadius:8, fontSize:13, fontWeight:700, flexShrink:0 }}>
              Voir le catalogue →
            </div>
          </div>
        </Link>

        {/* ── RECHERCHE ── */}
        <input
          type="text"
          placeholder="🔍 Rechercher par nom ou adresse..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width:'100%', padding:'13px 16px', border:'1.5px solid rgba(27,140,140,0.18)', borderRadius:12, fontFamily:'Inter,sans-serif', fontSize:14, color:'#0D2D3D', outline:'none', background:'white', boxSizing:'border-box' as const, marginBottom:16 }}
        />

        {/* ── LISTE ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {filtered.map(p => (
            <div key={p.id}
              style={{ background:selected===p.id?'#F0FAFA':'white', borderRadius:16, border:`2px solid ${selected===p.id?'#1B8C8C':'rgba(27,140,140,0.08)'}`, padding:'20px 24px', display:'grid', gridTemplateColumns:'auto 1fr auto', gap:16, alignItems:'center', cursor:'pointer', transition:'all 0.2s', boxShadow:selected===p.id?'0 4px 20px rgba(27,140,140,0.12)':'0 2px 8px rgba(0,0,0,0.04)' }}
              onClick={() => setSelected(p.id)}
            >
              <div style={{ width:52, height:52, background:'#EAF7F7', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{p.emoji}</div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>{p.nom}</div>
                <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:8 }}>📍 {p.adresse}</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' as const }}>
                  <span style={{ fontSize:12, fontWeight:600, background:'#DCFCE7', color:'#15803D', padding:'3px 10px', borderRadius:8 }}>Ouvert · {p.ouvert}</span>
                  <span style={{ fontSize:12, fontWeight:600, background:'#EAF7F7', color:'#0F766E', padding:'3px 10px', borderRadius:8 }}>⚡ {p.delai}</span>
                  <span style={{ fontSize:12, color:'#7A9A9A', padding:'3px 10px', borderRadius:8, background:'#F4FAFA' }}>📍 {p.dist}</span>
                  <span style={{ fontSize:12, color:'#7A9A9A', padding:'3px 10px', borderRadius:8, background:'#F4FAFA' }}>📦 {p.produits} produits</span>
                </div>
              </div>
              <div style={{ textAlign:'right' as const, flexShrink:0 }}>
                <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>⭐ {p.note}</div>
                <div style={{ fontSize:12, color:'#B0C4C4', marginBottom:12 }}>{p.avis} avis</div>
                <Link
                  href={`/pharmacie/${p.slug}`}
                  onClick={e => { if(selected!==p.id){ e.preventDefault(); setSelected(p.id) } }}
                  style={{ display:'inline-block', padding:'8px 18px', background:selected===p.id?'#1B8C8C':'#F4FAFA', color:selected===p.id?'white':'#5A7878', borderRadius:9, fontSize:13, fontWeight:600, textDecoration:'none', border:`1px solid ${selected===p.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, transition:'all 0.2s' }}>
                  {selected===p.id?'Voir catalogue →':'Choisir'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ position:'sticky', bottom:24, marginTop:24 }}>
            <Link href={`/pharmacie/${pharmacies.find(p=>p.id===selected)?.slug}`} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#1B8C8C', color:'white', padding:'16px', borderRadius:14, fontSize:15, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 24px rgba(27,140,140,0.3)' }}>
              Voir le catalogue de {pharmacies.find(p=>p.id===selected)?.nom} →
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}