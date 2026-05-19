'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

const pharmacies = [
  { id:1, slug:'saint-jean', nom:'Pharmacie Saint-Jean', adresse:'12 Rue de la République, 13001', dist:'0,8 km', delai:'28 min', note:4.9, avis:128, ouvert:'Ferme à 20h', emoji:'🏥', produits:24 },
  { id:2, slug:'prado', nom:'Grande Pharmacie du Prado', adresse:'8 Avenue du Prado, 13006', dist:'1,4 km', delai:'34 min', note:4.7, avis:89, ouvert:'Ferme à 19h30', emoji:'💊', produits:18 },
  { id:3, slug:'castellane', nom:'Pharmacie Castellane', adresse:'3 Place Castellane, 13006', dist:'2,1 km', delai:'41 min', note:4.8, avis:213, ouvert:'Ferme à 21h', emoji:'🌿', produits:31 },
  { id:4, slug:'vieux-port', nom:'Pharmacie du Vieux-Port', adresse:'2 Quai du Port, 13002', dist:'2,8 km', delai:'52 min', note:4.6, avis:64, ouvert:'Ferme à 20h', emoji:'⚕️', produits:12 },
]

export default function Pharmacies() {
  const [selected, setSelected] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = pharmacies.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.adresse.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>
      <style>{`
        .pharma-card { display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center; }
        @media (max-width: 768px) {
          .pharma-card { grid-template-columns: auto 1fr !important; }
          .pharma-cta { display: none !important; }
          .pharma-card-mobile-cta { display: block !important; }
        }
        .pharma-card-mobile-cta { display: none; }
      `}</style>

      <Nav />

      {/* HERO */}
      <div style={{ position:'relative', padding:'110px 24px 56px', textAlign:'center', color:'white', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1400&q=90&fit=crop" alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(13,45,61,0.72)' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <h1 style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8, textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
            Nos pharmacies partenaires
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)' }}>Toutes livrent en moins d'une heure · Marseille</p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:'0 auto', padding:'24px 16px 80px' }}>

        {/* PROGRESS */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28 }}>
          {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i===0?'#DCFCE7':i===1?'#1B8C8C':'white', color:i===0?'#15803D':i===1?'white':'#B0C4C4', border:i===0?'2px solid #15803D':i===1?'none':'2px solid #E5E7EB', boxShadow:i===1?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                  {i===0?'✓':i+1}
                </div>
                <div style={{ fontSize:10, fontWeight:600, marginTop:4, color:i===0?'#15803D':i===1?'#1B8C8C':'#B0C4C4' }}>{label}</div>
              </div>
              {i<3 && <div style={{ width:32, height:2, background:i===0?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
            </div>
          ))}
        </div>

        {/* LIVRAISON RAPIDE */}
        <Link href="/pharmacie/saint-jean" style={{ textDecoration:'none' }}>
          <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, cursor:'pointer' }}>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:'white', marginBottom:2 }}>⚡ Livraison la plus rapide</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)' }}>Pharmacie Saint-Jean · 28 min · 0,8 km</div>
            </div>
            <div style={{ background:'white', color:'#1B8C8C', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:700, flexShrink:0 }}>
              Voir →
            </div>
          </div>
        </Link>

        {/* RECHERCHE */}
        <input type="text" placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width:'100%', padding:'13px 16px', border:'1.5px solid rgba(27,140,140,0.18)', borderRadius:12, fontFamily:'Inter,sans-serif', fontSize:14, color:'#0D2D3D', outline:'none', background:'white', boxSizing:'border-box' as const, marginBottom:14 }}/>

        {/* LISTE */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(p.id)}
              style={{ background:selected===p.id?'#F0FAFA':'white', borderRadius:16, border:`2px solid ${selected===p.id?'#1B8C8C':'rgba(27,140,140,0.08)'}`, padding:'18px 20px', cursor:'pointer', transition:'all 0.2s', boxShadow:selected===p.id?'0 4px 20px rgba(27,140,140,0.12)':'0 2px 8px rgba(0,0,0,0.04)' }}>

              <div className="pharma-card">
                <div style={{ width:48, height:48, background:'#EAF7F7', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{p.emoji}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>{p.nom}</div>
                  <div style={{ fontSize:12, color:'#7A9A9A', marginBottom:8 }}>📍 {p.adresse}</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const }}>
                    <span style={{ fontSize:11, fontWeight:600, background:'#DCFCE7', color:'#15803D', padding:'3px 9px', borderRadius:8 }}>Ouvert · {p.ouvert}</span>
                    <span style={{ fontSize:11, fontWeight:600, background:'#EAF7F7', color:'#0F766E', padding:'3px 9px', borderRadius:8 }}>⚡ {p.delai}</span>
                    <span style={{ fontSize:11, color:'#7A9A9A', padding:'3px 9px', borderRadius:8, background:'#F4FAFA' }}>📍 {p.dist}</span>
                  </div>
                </div>
                <div className="pharma-cta" style={{ textAlign:'right' as const, flexShrink:0 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>⭐ {p.note}</div>
                  <div style={{ fontSize:11, color:'#B0C4C4', marginBottom:10 }}>{p.avis} avis</div>
                  <Link href={`/pharmacie/${p.slug}`} onClick={e => { if(selected!==p.id){ e.preventDefault(); setSelected(p.id) } }}
                    style={{ display:'inline-block', padding:'8px 16px', background:selected===p.id?'#1B8C8C':'#F4FAFA', color:selected===p.id?'white':'#5A7878', borderRadius:9, fontSize:13, fontWeight:600, textDecoration:'none', border:`1px solid ${selected===p.id?'#1B8C8C':'rgba(27,140,140,0.15)'}` }}>
                    {selected===p.id?'Voir catalogue →':'Choisir'}
                  </Link>
                </div>
              </div>

              {/* CTA mobile */}
              <div className="pharma-card-mobile-cta" style={{ marginTop:12 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:13, color:'#0D2D3D', fontWeight:600 }}>⭐ {p.note} <span style={{ color:'#B0C4C4', fontWeight:400 }}>({p.avis} avis)</span></span>
                </div>
                <Link href={`/pharmacie/${p.slug}`} onClick={e => { if(selected!==p.id){ e.preventDefault(); setSelected(p.id) } }}
                  style={{ display:'block', padding:'11px', background:selected===p.id?'#1B8C8C':'#F4FAFA', color:selected===p.id?'white':'#5A7878', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none', border:`1px solid ${selected===p.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, textAlign:'center' as const }}>
                  {selected===p.id?'Voir le catalogue →':'Choisir cette pharmacie'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ position:'sticky', bottom:16, marginTop:20 }}>
            <Link href={`/pharmacie/${pharmacies.find(p=>p.id===selected)?.slug}`}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#1B8C8C', color:'white', padding:'15px', borderRadius:14, fontSize:15, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 24px rgba(27,140,140,0.3)' }}>
              Voir le catalogue de {pharmacies.find(p=>p.id===selected)?.nom} →
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}