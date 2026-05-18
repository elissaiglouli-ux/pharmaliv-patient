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

export default function Panier() {
  const [ordoOuverte, setOrdoOuverte] = useState(false)
  const [ordonnances, setOrdonnances] = useState([
    { id:1, nom:'Ordonnance Dr. Martin', meta:'Amoxicilline, Doliprane · 15/05/2025' }
  ])

  // ─── Produits fictifs dans le panier ─────────────────────────────────────
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
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>Mon panier</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Pharmacie Saint-Jean · Marseille 1er</p>
      </div>

      {/* ── PROGRESS ── */}
      <div style={{ maxWidth:560, margin:'0 auto', padding:'28px 20px 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i<2?'#DCFCE7':i===2?'#1B8C8C':'white', color:i<2?'#15803D':i===2?'white':'#B0C4C4', border:i<2?'2px solid #15803D':i===2?'none':'2px solid #E5E7EB', boxShadow:i===2?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                {i<2?'✓':i+1}
              </div>
              <div style={{ fontSize:11, fontWeight:600, marginTop:5, color:i<2?'#15803D':i===2?'#1B8C8C':'#B0C4C4' }}>{label}</div>
            </div>
            {i<3 && <div style={{ width:48, height:2, background:i<2?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:960, margin:'0 auto', padding:'28px 24px 80px', display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>

        {/* COLONNE GAUCHE */}
        <div>

          {/* ── ORDONNANCES — toujours visible ── */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D' }}>📋 Ordonnances</div>
              <button onClick={() => setOrdoOuverte(true)} style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', background:'none', border:'none', cursor:'pointer' }}>+ Ajouter</button>
            </div>

            {/* Liste ordonnances */}
            {ordonnances.map(o => (
              <div key={o.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'#F4FAFA', borderRadius:10, border:'1px solid rgba(27,140,140,0.1)', marginBottom:8 }}>
                <span style={{ fontSize:20 }}>📋</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#0D2D3D' }}>{o.nom}</div>
                  <div style={{ fontSize:11, color:'#B0C4C4', marginTop:1 }}>{o.meta}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:600, background:'#FEF3C7', color:'#92400E', padding:'3px 9px', borderRadius:6 }}>En attente pharmacien</span>
                <button onClick={() => setOrdonnances(prev => prev.filter(x => x.id !== o.id))} style={{ background:'none', border:'none', cursor:'pointer', color:'#B0C4C4', fontSize:16 }}>✕</button>
              </div>
            ))}

            {/* Bouton ajouter une autre ordonnance */}
            <button onClick={() => setOrdoOuverte(true)} style={{ width:'100%', padding:'11px', background:'#F4FAFA', border:'1.5px dashed rgba(27,140,140,0.25)', borderRadius:10, fontSize:13, fontWeight:600, color:'#1B8C8C', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              + Ajouter une autre ordonnance
            </button>

            <div style={{ background:'#EAF7F7', borderRadius:9, padding:'10px 14px', fontSize:12, color:'#0F766E', marginTop:12, display:'flex', gap:8 }}>
              <span>💡</span>
              <span>Vous pouvez ajouter plusieurs ordonnances. Le pharmacien calculera le reste à charge pour chacune.</span>
            </div>
          </div>

          {/* ── PHARMACIE SÉLECTIONNÉE ── */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:14 }}>🏥 Pharmacie</div>
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px', background:'#F4FAFA', borderRadius:12, border:'1px solid rgba(27,140,140,0.1)' }}>
              <div style={{ width:44, height:44, background:'#EAF7F7', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🏥</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Pharmacie Saint-Jean</div>
                <div style={{ fontSize:12, color:'#7A9A9A' }}>📍 12 Rue de la République, 13001 · ⚡ 28 min</div>
              </div>
              <Link href="/pharmacies" style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', textDecoration:'none' }}>Changer</Link>
            </div>
          </div>

          {/* ── PRODUITS PARAPHARMACIE ── */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
              <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D' }}>🧴 Parapharmacie</div>
              <Link href="/pharmacie/saint-jean" style={{ fontSize:12, fontWeight:600, color:'#1B8C8C', textDecoration:'none' }}>+ Ajouter des produits</Link>
            </div>

            {produits.length === 0 ? (
              <div style={{ textAlign:'center', padding:'24px 0', color:'#B0C4C4', fontSize:13 }}>
                Aucun produit — <Link href="/pharmacie/saint-jean" style={{ color:'#1B8C8C', textDecoration:'none', fontWeight:600 }}>parcourir le catalogue</Link>
              </div>
            ) : (
              produits.map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', gap:12 }}>
                  <div style={{ flex:1, fontSize:14, fontWeight:500, color:'#0D2D3D' }}>{p.nom}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <button onClick={() => changer(p.id,-1)} style={{ width:26, height:26, borderRadius:7, border:'1.5px solid rgba(27,140,140,0.2)', background:'white', cursor:'pointer', fontSize:15, color:'#1B8C8C', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <span style={{ fontSize:14, fontWeight:700, minWidth:16, textAlign:'center' as const }}>{p.qty}</span>
                    <button onClick={() => changer(p.id,1)} style={{ width:26, height:26, borderRadius:7, background:'#1B8C8C', border:'none', cursor:'pointer', fontSize:15, color:'white', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', minWidth:64, textAlign:'right' as const }}>{(p.prix*p.qty).toFixed(2).replace('.',',')} €</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── RÉCAP DROITE ── */}
        <div style={{ position:'sticky', top:88, background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:20 }}>Récapitulatif</div>

          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
            <span>Parapharmacie</span>
            <span style={{ fontWeight:600, color:'#0D2D3D' }}>{sousTotalPara.toFixed(2).replace('.',',')} €</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
            <span>Médicaments</span>
            <span style={{ fontSize:12, color:'#B0C4C4', fontStyle:'italic' }}>Calculé par pharmacien</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
            <span>Livraison express</span>
            <span style={{ fontWeight:600, color:'#1B8C8C' }}>{livraison.toFixed(2).replace('.',',')} €</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:17, fontWeight:800, color:'#0D2D3D', padding:'14px 0 0', marginTop:6, borderTop:'2px solid rgba(27,140,140,0.12)' }}>
            <span>Total estimé</span>
            <span>{total.toFixed(2).replace('.',',')} €</span>
          </div>

          <div style={{ background:'#FFF8E7', borderRadius:9, padding:'10px 14px', fontSize:12, color:'#92400E', margin:'14px 0', lineHeight:1.6 }}>
            ⚕️ Le reste à charge médicaments sera calculé par le pharmacien et ajouté avant le paiement final.
          </div>

          <Link href="/paiement" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px', borderRadius:11, fontSize:15, fontWeight:700, textDecoration:'none', marginBottom:8 }}>
            Continuer vers le paiement →
          </Link>
          <div style={{ textAlign:'center' as const, fontSize:11, color:'#B0C4C4', marginBottom:12 }}>🔒 Paiement sécurisé Stripe</div>
          <Link href="/pharmacie/saint-jean" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontSize:13, color:'#7A9A9A', textDecoration:'none' }}>
            ← Continuer mes achats
          </Link>
        </div>
      </div>

      {/* ── MODAL ORDONNANCE ── */}
      {ordoOuverte && (
        <div onClick={() => setOrdoOuverte(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', borderRadius:20, padding:28, width:'100%', maxWidth:480, boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:'#0D2D3D' }}>Ajouter une ordonnance</h2>
              <button onClick={() => setOrdoOuverte(false)} style={{ width:30, height:30, background:'#F4FAFA', border:'none', borderRadius:7, cursor:'pointer', fontSize:15, color:'#7A9A9A' }}>✕</button>
            </div>

            {/* Ordonnances déjà dans le compte */}
            <div style={{ fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:10 }}>Ordonnances existantes</div>
            <div onClick={() => { setOrdonnances(prev => [...prev, { id:Date.now(), nom:'Ordonnance Dr. Lefebvre', meta:'Ventoline · 02/04/2025' }]); setOrdoOuverte(false) }} style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:'#F4FAFA', borderRadius:12, marginBottom:8, cursor:'pointer', border:'1.5px solid transparent', transition:'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor='#1B8C8C')}
              onMouseLeave={e => (e.currentTarget.style.borderColor='transparent')}>
              <span style={{ fontSize:22 }}>📋</span>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'#0D2D3D' }}>Ordonnance Dr. Lefebvre</div>
                <div style={{ fontSize:11, color:'#B0C4C4' }}>Ventoline · 02/04/2025</div>
              </div>
            </div>

            <div style={{ fontSize:13, fontWeight:600, color:'#0D2D3D', margin:'16px 0 10px' }}>Uploader une nouvelle</div>
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:'#EAF7F7', borderRadius:12, textDecoration:'none', marginBottom:8 }}>
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
                <div style={{ fontSize:11, color:'#7A9A9A' }}>Photo de votre ordonnance papier</div>
              </div>
            </Link>
          </div>
        </div>
      )}

    </main>
  )
}