'use client'
import { useState } from 'react'
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

type Produit = { id:number; nom:string; marque:string; prix:number; emoji:string; badge:string|null; tag:string }

const tous: Produit[] = [
  { id:1, nom:'Avène SPF50+ Crème 50ml', marque:'Avène', prix:14.90, emoji:'☀️', badge:'#1 vente', tag:'ete' },
  { id:2, nom:'La Roche-Posay Anthelios SPF50+', marque:'La Roche-Posay', prix:17.50, emoji:'🌞', badge:'Bestseller', tag:'ete' },
  { id:3, nom:'Après-soleil Hydra 400ml', marque:'Bioderma', prix:12.90, emoji:'🌊', badge:'Nouveau', tag:'ete' },
  { id:4, nom:'Stick lèvres SPF30', marque:'Avène', prix:7.50, emoji:'👄', badge:null, tag:'ete' },
  { id:5, nom:'Niacinamide 10% sérum 30ml', marque:'The Ordinary', prix:9.90, emoji:'✨', badge:'Viral', tag:'skincare' },
  { id:6, nom:'Sérum Acide Hyaluronique 30ml', marque:'CeraVe', prix:22.50, emoji:'💧', badge:'Coup de cœur', tag:'skincare' },
  { id:7, nom:'Crème barrière peaux sensibles', marque:'Avène', prix:19.90, emoji:'🧴', badge:null, tag:'skincare' },
  { id:8, nom:'Crème contour des yeux 15ml', marque:'La Roche-Posay', prix:24.90, emoji:'👁️', badge:'Anti-âge', tag:'skincare' },
  { id:9, nom:'Vitamine D3 1000UI — 90 gélules', marque:'Solgar', prix:12.50, emoji:'💊', badge:'Essentiel', tag:'complements' },
  { id:10, nom:'Magnésium Marin 300mg', marque:'Oligomax', prix:14.90, emoji:'🧡', badge:'Top pharmacie', tag:'complements' },
  { id:11, nom:'Probiotiques 10 milliards', marque:'Pileje', prix:28.90, emoji:'🦠', badge:'Immunité', tag:'complements' },
  { id:12, nom:'Vitamine C 1000mg effervescent', marque:'Generique', prix:8.90, emoji:'🍊', badge:'Tendance', tag:'complements' },
]

export default function Parapharmacie() {
  const [actif, setActif] = useState('tout')
  const [search, setSearch] = useState('')
  const [panier, setPanier] = useState<number[]>([])
  const [flash, setFlash] = useState<number|null>(null)

  const filtres = [
    { id:'tout', label:'Tout' },
    { id:'ete', label:'☀️ Été' },
    { id:'skincare', label:'✨ Skincare' },
    { id:'complements', label:'💊 Compléments' },
  ]

  const produits = tous.filter(p => {
    const matchTag = actif === 'tout' || p.tag === actif
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase()) || p.marque.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  const ajouter = (id: number) => {
    setPanier(prev => [...prev, id])
    setFlash(id)
    setTimeout(() => setFlash(null), 900)
  }

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F0FAFA', minHeight:'100vh' }}>

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
            <Link href="/parapharmacie" style={{ fontSize:14, fontWeight:700, color:'#1B8C8C', textDecoration:'none', borderBottom:'2px solid #1B8C8C', paddingBottom:2 }}>Parapharmacie</Link>
            <Link href="/ordonnance" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Ordonnance</Link>
            <Link href="/pharmacies" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Nos pharmacies</Link>
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            {panier.length > 0 && (
              <Link href="/panier" style={{ background:'#0D2D3D', color:'white', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                🛒 {panier.length}
              </Link>
            )}
            <Link href="/ordonnance" style={{ background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
              Mon compte
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SPLIT ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'92vh', paddingTop:70 }}>

        {/* Gauche — texte */}
        <div style={{ background:'white', display:'flex', flexDirection:'column', justifyContent:'center', padding:'64px 64px 64px 80px', position:'relative', overflow:'hidden' }}>
          {/* Cercle décoratif */}
          <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, background:'#EAF7F7', borderRadius:'50%', opacity:.6 }}/>
          <div style={{ position:'absolute', bottom:-40, left:-40, width:180, height:180, background:'#D4EEEE', borderRadius:'50%', opacity:.4 }}/>

          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#EAF7F7', color:'#1B8C8C', fontSize:12, fontWeight:700, padding:'6px 14px', borderRadius:20, marginBottom:24 }}>
              <span style={{ width:7, height:7, background:'#22C55E', borderRadius:'50%', display:'inline-block', animation:'blink 2s infinite' }}></span>
              Livré en moins d'une heure · Marseille
            </div>
            <h1 style={{ fontSize:'clamp(38px,4vw,60px)', fontWeight:900, color:'#0D2D3D', lineHeight:1.05, letterSpacing:'-0.04em', marginBottom:20 }}>
              La meilleure<br/>
              <span style={{ color:'#1B8C8C' }}>parapharmacie</span><br/>
              de Marseille.
            </h1>
            <p style={{ fontSize:17, color:'#5A7878', lineHeight:1.7, maxWidth:400, marginBottom:36 }}>
              Produits sélectionnés par vos pharmaciens, livrés chez vous en moins d'une heure.
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => document.getElementById('produits')?.scrollIntoView({behavior:'smooth'})}
                style={{ background:'#1B8C8C', color:'white', padding:'14px 28px', borderRadius:12, fontSize:15, fontWeight:700, border:'none', cursor:'pointer' }}>
                Découvrir les produits ↓
              </button>
              <Link href="/pharmacies" style={{ background:'transparent', color:'#1B8C8C', padding:'14px 24px', borderRadius:12, fontSize:15, fontWeight:600, border:'1.5px solid rgba(27,140,140,0.3)', textDecoration:'none', display:'flex', alignItems:'center' }}>
                Nos pharmacies →
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display:'flex', gap:32, marginTop:48, paddingTop:36, borderTop:'1px solid rgba(0,0,0,0.06)' }}>
              {[{val:'50+', label:'Pharmacies partenaires'},{val:'1h',label:'Délai moyen'},{val:'4.9★',label:'Note moyenne'}].map(s => (
                <div key={s.val}>
                  <div style={{ fontSize:24, fontWeight:800, color:'#1B8C8C' }}>{s.val}</div>
                  <div style={{ fontSize:12, color:'#B0C4C4', marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Droite — visuel produits */}
        <div style={{ background:'linear-gradient(160deg,#0D5555 0%,#1B8C8C 60%,#2BBFBF 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:48, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, right:0, bottom:0, left:0, backgroundImage:'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 60%)' }}/>

          {/* Grid de produits flottants */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, position:'relative', zIndex:1 }}>
            {[
              { emoji:'☀️', nom:'SPF50+', marque:'Avène', prix:'14,90€', rotate:'-3deg' },
              { emoji:'✨', nom:'Niacinamide', marque:'The Ordinary', prix:'9,90€', rotate:'2deg' },
              { emoji:'💧', nom:'Hyaluronique', marque:'CeraVe', prix:'22,50€', rotate:'-2deg' },
              { emoji:'💊', nom:'Vitamine D3', marque:'Solgar', prix:'12,50€', rotate:'3deg' },
            ].map((p, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.95)', borderRadius:16, padding:16, transform:`rotate(${p.rotate})`, boxShadow:'0 8px 32px rgba(0,0,0,0.15)', backdropFilter:'blur(8px)' }}>
                <div style={{ fontSize:36, marginBottom:8, textAlign:'center' as const }}>{p.emoji}</div>
                <div style={{ fontSize:12, fontWeight:700, color:'#1B8C8C', marginBottom:2 }}>{p.marque}</div>
                <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D', marginBottom:6, lineHeight:1.3 }}>{p.nom}</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#1B8C8C' }}>{p.prix}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SÉLECTIONS RAPIDES ── */}
      <div style={{ background:'white', padding:'0 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0, maxWidth:1200, margin:'0 auto' }}>
          {[
            { emoji:'☀️', titre:'Spécial été', desc:'Solaires, après-soleil, protection', bg:'#FFF7ED', color:'#92400E', tag:'ete' },
            { emoji:'✨', titre:'Skincare', desc:'Sérum, crème, contour des yeux', bg:'#FDF4FF', color:'#6D28D9', tag:'skincare' },
            { emoji:'💊', titre:'Compléments', desc:'Vitamines, minéraux, probiotiques', bg:'#F0FDF4', color:'#15803D', tag:'complements' },
          ].map(cat => (
            <div key={cat.tag} onClick={() => { setActif(cat.tag); document.getElementById('produits')?.scrollIntoView({behavior:'smooth'}) }}
              style={{ padding:'32px 40px', cursor:'pointer', borderRight:'1px solid rgba(0,0,0,0.06)', transition:'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background=cat.bg)}
              onMouseLeave={e => (e.currentTarget.style.background='white')}>
              <div style={{ fontSize:32, marginBottom:12 }}>{cat.emoji}</div>
              <div style={{ fontSize:18, fontWeight:800, color:'#0D2D3D', marginBottom:6 }}>{cat.titre}</div>
              <div style={{ fontSize:13, color:'#7A9A9A', lineHeight:1.5 }}>{cat.desc}</div>
              <div style={{ fontSize:13, fontWeight:600, color:cat.color, marginTop:12 }}>Voir les produits →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUITS ── */}
      <div id="produits" style={{ maxWidth:1200, margin:'0 auto', padding:'56px 28px 80px' }}>

        {/* Toolbar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div style={{ display:'flex', gap:8 }}>
            {filtres.map(f => (
              <button key={f.id} onClick={() => setActif(f.id)}
                style={{ padding:'9px 20px', borderRadius:20, border:`1.5px solid ${actif===f.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, background:actif===f.id?'#1B8C8C':'white', color:actif===f.id?'white':'#5A7878', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>
                {f.label}
              </button>
            ))}
          </div>
          <input type="text" placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:'10px 16px', border:'1.5px solid rgba(27,140,140,0.18)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:13, color:'#0D2D3D', outline:'none', width:220 }}/>
        </div>

        {/* Grille */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {produits.map(p => (
            <div key={p.id} style={{ background:'white', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', border:'1px solid rgba(27,140,140,0.06)', transition:'all 0.25s', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 12px 32px rgba(27,140,140,0.14)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 2px 8px rgba(0,0,0,0.05)' }}>

              {/* Image */}
              <div style={{ height:140, background:'linear-gradient(145deg,#EAF7F7,#C8EDEE)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, position:'relative' }}>
                {p.emoji}
                {p.badge && (
                  <div style={{ position:'absolute', top:10, left:10, background:'#0D2D3D', color:'white', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>
                    {p.badge}
                  </div>
                )}
              </div>

              <div style={{ padding:16 }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#1B8C8C', marginBottom:3, letterSpacing:'0.04em' }}>{p.marque.toUpperCase()}</div>
                <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:12, lineHeight:1.35, minHeight:38 }}>{p.nom}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontSize:19, fontWeight:900, color:'#0D2D3D' }}>{p.prix.toFixed(2).replace('.',',')} €</div>
                  <button onClick={() => ajouter(p.id)}
                    style={{ padding:'8px 16px', background: flash===p.id ? '#22C55E' : '#1B8C8C', color:'white', border:'none', borderRadius:9, fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.2s', transform: flash===p.id ? 'scale(1.05)' : 'scale(1)' }}>
                    {flash===p.id ? '✓ Ajouté' : '+ Panier'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BANNIÈRE ORDONNANCE ── */}
      <div style={{ background:'#0D2D3D', margin:'0 28px 60px', borderRadius:24, padding:'48px 64px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center', maxWidth:1144, marginLeft:'auto', marginRight:'auto' }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'#2BBFBF', marginBottom:12 }}>Vous avez une ordonnance ?</div>
          <h3 style={{ fontSize:28, fontWeight:900, color:'white', letterSpacing:'-0.03em', marginBottom:10, lineHeight:1.2 }}>
            Recevez aussi vos médicaments<br/>en même temps.
          </h3>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.55)', lineHeight:1.7, maxWidth:480 }}>
            Ajoutez votre ordonnance. Le pharmacien calcule le reste à charge et livre tout en une seule fois.
          </p>
        </div>
        <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'16px 28px', borderRadius:14, fontSize:15, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' as const, flexShrink:0 }}>
          📋 Envoyer mon ordonnance →
        </Link>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }
      `}</style>

    </main>
  )
}