'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function Panier() {
  const [ordoOuverte, setOrdoOuverte] = useState(false)
  const [ordonnances, setOrdonnances] = useState([
    { id:1, nom:'Ordonnance Dr. Martin', meta:'Amoxicilline, Doliprane · 15/05/2025' }
  ])
  const [produits, setProduits] = useState([
    { id:1, nom:'Avène SPF50+ Crème 50ml', prix:14.90, qty:1 },
    { id:2, nom:'Vitamine D3 — 90 gélules', prix:12.50, qty:1 },
    { id:3, nom:'HE Lavande vraie 10ml', prix:9.90, qty:2 },
  ])

  const changer = (id: number, delta: number) => {
    setProduits(prev => prev
      .map(p => p.id === id ? { ...p, qty: p.qty + delta } : p)
      .filter(p => p.qty > 0)
    )
  }

  const sousTotalPara = produits.reduce((acc, p) => acc + p.prix * p.qty, 0)
  const livraison = 3.90
  const total = sousTotalPara + livraison

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>
      <style>{`
        .panier-body { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
        @media (max-width: 768px) {
          .panier-body { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 24px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>Mon panier</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Pharmacie Saint-Jean · Marseille 1er</p>
      </div>

      {/* PROGRESS */}
      <div style={{ maxWidth:560, margin:'0 auto', padding:'24px 16px 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i<2?'#DCFCE7':i===2?'#1B8C8C':'white', color:i<2?'#15803D':i===2?'white':'#B0C4C4', border:i<2?'2px solid #15803D':i===2?'none':'2px solid #E5E7EB', boxShadow:i===2?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                {i<2?'✓':i+1}
              </div>
              <div style={{ fontSize:10, fontWeight:600, marginTop:4, color:i<2?'#15803D':i===2?'#1B8C8C':'#B0C4C4' }}>{label}</div>
            </div>
            {i<3 && <div style={{ width:32, height:2, background:i<2?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
          </div>
        ))}
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'24px 16px 80px' }}>
        <div className="panier-body">

          {/* GAUCHE */}
          <div>

            {/* ORDONNANCES */}
            <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D' }}>📋 Ordonnances</div>
                <button onClick={() => setOrdoOuverte(true)} style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', background:'none', border:'none', cursor:'pointer' }}>+ Ajouter</button>
              </div>
              {ordonnances.map(o => (
                <div key={o.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#F4FAFA', borderRadius:10, border:'1px solid rgba(27,140,140,0.1)', marginBottom:8 }}>
                  <span style={{ fontSize:18 }}>📋</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#0D2D3D' }}>{o.nom}</div>
                    <div style={{ fontSize:11, color:'#B0C4C4', marginTop:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{o.meta}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:600, background:'#FEF3C7', color:'#92400E', padding:'3px 8px', borderRadius:6, flexShrink:0 }}>En attente</span>
                  <button onClick={() => setOrdonnances(prev => prev.filter(x => x.id !== o.id))} style={{ background:'none', border:'none', cursor:'pointer', color:'#B0C4C4', fontSize:16, flexShrink:0 }}>✕</button>
                </div>
              ))}
              <button onClick={() => setOrdoOuverte(true)} style={{ width:'100%', padding:'11px', background:'#F4FAFA', border:'1.5px dashed rgba(27,140,140,0.25)', borderRadius:10, fontSize:13, fontWeight:600, color:'#1B8C8C', cursor:'pointer' }}>
                + Ajouter une ordonnance
              </button>
              <div style={{ background:'#EAF7F7', borderRadius:9, padding:'10px 12px', fontSize:12, color:'#0F766E', marginTop:12, display:'flex', gap:8 }}>
                <span>⚠️</span>
                <span>Remise en main propre obligatoire pour les médicaments. Un code de réception vous sera envoyé.</span>
              </div>
            </div>

            {/* PHARMACIE */}
            <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:12 }}>🏥 Pharmacie</div>
              <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px', background:'#F4FAFA', borderRadius:12, border:'1px solid rgba(27,140,140,0.1)' }}>
                <div style={{ width:42, height:42, background:'#EAF7F7', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🏥</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Pharmacie Saint-Jean</div>
                  <div style={{ fontSize:12, color:'#7A9A9A' }}>📍 13001 · ⚡ 28 min</div>
                </div>
                <Link href="/pharmacies" style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', textDecoration:'none', flexShrink:0 }}>Changer</Link>
              </div>
            </div>

            {/* PRODUITS */}
            <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D' }}>🧴 Parapharmacie</div>
                <Link href="/pharmacie/saint-jean" style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', textDecoration:'none' }}>+ Ajouter</Link>
              </div>
              {produits.length === 0 ? (
                <div style={{ textAlign:'center', padding:'20px 0', color:'#B0C4C4', fontSize:13 }}>Panier vide</div>
              ) : produits.map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', gap:10 }}>
                  <div style={{ flex:1, fontSize:13, fontWeight:500, color:'#0D2D3D', minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{p.nom}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                    <button onClick={() => changer(p.id,-1)} style={{ width:26, height:26, borderRadius:7, border:'1.5px solid rgba(27,140,140,0.2)', background:'white', cursor:'pointer', fontSize:15, color:'#1B8C8C', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <span style={{ fontSize:14, fontWeight:700, minWidth:16, textAlign:'center' as const }}>{p.qty}</span>
                    <button onClick={() => changer(p.id,1)} style={{ width:26, height:26, borderRadius:7, background:'#1B8C8C', border:'none', cursor:'pointer', fontSize:15, color:'white', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', flexShrink:0 }}>{(p.prix*p.qty).toFixed(2).replace('.',',')} €</div>
                </div>
              ))}
            </div>
          </div>

          {/* RÉCAP */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:16 }}>Récapitulatif</div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
              <span>Parapharmacie</span><span style={{ fontWeight:600, color:'#0D2D3D' }}>{sousTotalPara.toFixed(2).replace('.',',')} €</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
              <span>Médicaments</span><span style={{ fontSize:12, color:'#B0C4C4', fontStyle:'italic' }}>Calculé par pharmacien</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
              <span>Livraison express</span><span style={{ fontWeight:600, color:'#1B8C8C' }}>{livraison.toFixed(2).replace('.',',')} €</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:17, fontWeight:800, color:'#0D2D3D', padding:'12px 0 0', marginTop:6, borderTop:'2px solid rgba(27,140,140,0.12)' }}>
              <span>Total estimé</span><span>{total.toFixed(2).replace('.',',')} €</span>
            </div>
            <div style={{ background:'#FFF8E7', borderRadius:9, padding:'10px 12px', fontSize:12, color:'#92400E', margin:'12px 0', lineHeight:1.6 }}>
              ⚕️ Le reste à charge médicaments sera ajouté après validation pharmacien.
            </div>
            <Link href="/paiement" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px', borderRadius:11, fontSize:15, fontWeight:700, textDecoration:'none', marginBottom:8 }}>
              Continuer vers le paiement →
            </Link>
            <div style={{ textAlign:'center' as const, fontSize:11, color:'#B0C4C4', marginBottom:10 }}>🔒 Paiement sécurisé Stripe</div>
            <Link href="/pharmacie/saint-jean" style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#7A9A9A', textDecoration:'none' }}>
              ← Continuer mes achats
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL ORDONNANCE */}
      {ordoOuverte && (
        <div onClick={() => setOrdoOuverte(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:20, padding:24, width:'100%', maxWidth:480, boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:'#0D2D3D' }}>Ajouter une ordonnance</h2>
              <button onClick={() => setOrdoOuverte(false)} style={{ width:30, height:30, background:'#F4FAFA', border:'none', borderRadius:7, cursor:'pointer', fontSize:15, color:'#7A9A9A' }}>✕</button>
            </div>
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:'#EAF7F7', borderRadius:12, textDecoration:'none', marginBottom:10 }}>
              <span style={{ fontSize:22 }}>🔢</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D' }}>Code Ségur</div>
                <div style={{ fontSize:11, color:'#7A9A9A' }}>Recommandé</div>
              </div>
            </Link>
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:'#F4FAFA', borderRadius:12, textDecoration:'none' }}>
              <span style={{ fontSize:22 }}>📸</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D' }}>Photo / PDF</div>
                <div style={{ fontSize:11, color:'#7A9A9A' }}>Photo de votre ordonnance</div>
              </div>
            </Link>
          </div>
        </div>
      )}

    </main>
  )
}