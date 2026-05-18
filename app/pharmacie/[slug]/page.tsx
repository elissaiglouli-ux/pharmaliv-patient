'use client'
import { useState, use } from 'react'
import Link from 'next/link'

const catalogues: Record<string, {
  nom: string
  adresse: string
  delai: string
  note: number
  avis: number
  produits: {
    id: number
    nom: string
    desc: string
    prix: number
    emoji: string
    cat: string
    stock: 'ok' | 'low'
  }[]
}> = {
  'saint-jean': {
    nom: 'Pharmacie Saint-Jean',
    adresse: '12 Rue de la République, 13001',
    delai: '28 min',
    note: 4.9,
    avis: 128,
    produits: [
      { id:1, nom:'Avène SPF50+ Crème 50ml', desc:"Protection haute. Peaux sensibles.", prix:14.90, emoji:'☀️', cat:'Solaire', stock:'low' },
      { id:2, nom:'Vitamine D3 1000UI — 90 gélules', desc:"Immunité et vitalité. Cure 3 mois.", prix:12.50, emoji:'💊', cat:'Compléments', stock:'ok' },
      { id:3, nom:'Avène Crème Hydratante 40ml', desc:"Hydratation 24h. Peaux sensibles.", prix:16.90, emoji:'🧴', cat:'Soins visage', stock:'ok' },
      { id:4, nom:'Sérum Acide Hyaluronique 30ml', desc:"Repulpant et lissant. Tous types de peau.", prix:22.50, emoji:'💧', cat:'Soins visage', stock:'ok' },
      { id:5, nom:'Magnésium Marin — 60 comprimés', desc:"Anti-fatigue. Haute biodisponibilité.", prix:14.90, emoji:'🧡', cat:'Compléments', stock:'ok' },
      { id:6, nom:'Sérum physiologique — 30 unidoses', desc:"Nettoyage nez et yeux bébé.", prix:6.90, emoji:'👶', cat:'Bébé', stock:'ok' },
      { id:7, nom:'HE Lavande vraie 10ml', desc:"100% pure. Apaisement et sommeil.", prix:9.90, emoji:'🌿', cat:'Aromathérapie', stock:'ok' },
      { id:8, nom:'Dentifrice blancheur 75ml', desc:"Fluor 1450ppm. Eclat naturel.", prix:7.50, emoji:'🦷', cat:'Hygiène', stock:'ok' },
    ]
  },
  'prado': {
    nom: 'Grande Pharmacie du Prado',
    adresse: '8 Avenue du Prado, 13006',
    delai: '34 min',
    note: 4.7,
    avis: 89,
    produits: [
      { id:1, nom:'La Roche-Posay Anthelios SPF50+', desc:"Texture ultra-légère. Résistant à l'eau.", prix:17.50, emoji:'☀️', cat:'Solaire', stock:'ok' },
      { id:2, nom:'Oméga 3 — 60 capsules', desc:"Coeur, cerveau et articulations.", prix:18.90, emoji:'🌿', cat:'Compléments', stock:'ok' },
      { id:3, nom:'Crème change bébé 75ml', desc:"Protège et apaise.", prix:7.90, emoji:'👶', cat:'Bébé', stock:'ok' },
      { id:4, nom:'Gel douche surgras 250ml', desc:"Peaux sèches et sensibles.", prix:5.90, emoji:'🧼', cat:'Hygiène', stock:'ok' },
    ]
  },
  'castellane': {
    nom: 'Pharmacie Castellane',
    adresse: '3 Place Castellane, 13006',
    delai: '41 min',
    note: 4.8,
    avis: 213,
    produits: [
      { id:1, nom:'HE Tea Tree 10ml', desc:"Purifiante. Anti-imperfections.", prix:8.90, emoji:'🍃', cat:'Aromathérapie', stock:'ok' },
      { id:2, nom:'Crème Nuit Régénérante 50ml', desc:"Régénération cellulaire pendant le sommeil.", prix:19.90, emoji:'🌸', cat:'Soins visage', stock:'ok' },
      { id:3, nom:'Eau Micellaire 400ml', desc:"Démaquille sans rincer.", prix:8.90, emoji:'🫧', cat:'Soins visage', stock:'ok' },
    ]
  },
  'vieux-port': {
    nom: 'Pharmacie du Vieux-Port',
    adresse: '2 Quai du Port, 13002',
    delai: '52 min',
    note: 4.6,
    avis: 64,
    produits: [
      { id:1, nom:'Vitamine C 1000mg — 30 comprimés', desc:"Immunité et tonus. Effervescent.", prix:8.90, emoji:'🍊', cat:'Compléments', stock:'ok' },
      { id:2, nom:'Spray nasal décongestionnant', desc:"Soulagement rapide en cas de rhume.", prix:6.50, emoji:'💨', cat:'Hygiène', stock:'low' },
    ]
  }
}

const toutesCategories = ['Tout', 'Solaire', 'Soins visage', 'Compléments', 'Bébé', 'Aromathérapie', 'Hygiène']

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

export default function PharmaciePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const pharma = catalogues[slug]

  const [panier, setPanier] = useState<Record<number, number>>({})
  const [cat, setCat] = useState('Tout')
  const [ordoOuverte, setOrdoOuverte] = useState(false)

  if (!pharma) return (
    <div style={{ padding:80, textAlign:'center', fontFamily:'Inter,sans-serif' }}>
      <p style={{ fontSize:18, color:'#7A9A9A' }}>Pharmacie introuvable.</p>
      <Link href="/pharmacies" style={{ color:'#1B8C8C', textDecoration:'none', fontWeight:600 }}>← Retour aux pharmacies</Link>
    </div>
  )

  const produitsFiltres = pharma.produits.filter(p => cat === 'Tout' || p.cat === cat)
  const totalItems = Object.values(panier).reduce((a, b) => a + b, 0)
  const totalPrix = pharma.produits.reduce((acc, p) => acc + (panier[p.id] || 0) * p.prix, 0)
  const ajouterAuPanier = (id: number) => setPanier(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const retirerDuPanier = (id: number) => setPanier(prev => {
    const next = { ...prev }
    if (next[id] > 1) next[id]--
    else delete next[id]
    return next
  })

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
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            {totalItems > 0 && (
              <div style={{ background:'#1B8C8C', color:'white', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:600 }}>
                🛒 {totalItems} · {totalPrix.toFixed(2).replace('.',',')} €
              </div>
            )}
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:6, background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
              Mon compte
            </Link>
          </div>
        </div>
      </nav>

      {/* ── COVER photo nette sans filtre couleur ── */}
      <div style={{ height:200, marginTop:70, position:'relative', overflow:'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=90&fit=crop&crop=center"
          alt="Pharmacie"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        {/* Overlay minimal — juste pour lisibilité du logo en bas */}
        <div style={{ position:'absolute', inset:0, background:'rgba(13,45,61,0.35)' }}/>
        <div style={{ position:'absolute', bottom:-28, left:32, width:72, height:72, background:'white', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, boxShadow:'0 4px 16px rgba(0,0,0,0.15)', border:'3px solid white' }}>
          🏥
        </div>
      </div>

      {/* ── INFOS PHARMACIE sticky ── */}
      <div style={{ background:'white', padding:'44px 32px 20px', borderBottom:'1px solid rgba(0,0,0,0.06)', position:'sticky', top:70, zIndex:40 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, color:'#0D2D3D', marginBottom:6 }}>{pharma.nom}</h1>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'center' }}>
              <span style={{ fontSize:13, color:'#7A9A9A' }}>📍 {pharma.adresse}</span>
              <span style={{ fontSize:12, fontWeight:600, background:'#DCFCE7', color:'#15803D', padding:'3px 10px', borderRadius:8 }}>Ouvert</span>
              <span style={{ fontSize:12, fontWeight:600, background:'#EAF7F7', color:'#0F766E', padding:'3px 10px', borderRadius:8 }}>⚡ {pharma.delai}</span>
              <span style={{ fontSize:13, color:'#0D2D3D', fontWeight:600 }}>⭐ {pharma.note} <span style={{ color:'#B0C4C4', fontWeight:400 }}>({pharma.avis} avis)</span></span>
            </div>
          </div>
          <button onClick={() => setOrdoOuverte(true)} style={{ display:'flex', alignItems:'center', gap:8, background:'#EAF7F7', color:'#1B8C8C', border:'1.5px solid rgba(27,140,140,0.25)', padding:'10px 18px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer' }}>
            📋 Ajouter une ordonnance
          </button>
        </div>
      </div>

      {/* ── CATALOGUE + PANIER ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'28px 28px 80px', display:'grid', gridTemplateColumns:'1fr 300px', gap:28, alignItems:'start' }}>

        {/* Catalogue */}
        <div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
            {toutesCategories.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding:'7px 16px', borderRadius:20, border:`1.5px solid ${cat===c?'#1B8C8C':'rgba(27,140,140,0.15)'}`, background:cat===c?'#1B8C8C':'white', color:cat===c?'white':'#5A7878', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
            {produitsFiltres.map(p => (
              <div key={p.id} style={{ background:'white', borderRadius:14, border:'1px solid rgba(27,140,140,0.08)', overflow:'hidden', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ height:120, background:'#EAF7F7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, position:'relative' }}>
                  {p.emoji}
                  {p.stock==='low' && <span style={{ position:'absolute', top:8, right:8, background:'#FEF3C7', color:'#92400E', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:8 }}>Stock limité</span>}
                </div>
                <div style={{ padding:14 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:'#1B8C8C', marginBottom:4 }}>{p.cat}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:4, lineHeight:1.3 }}>{p.nom}</div>
                  <div style={{ fontSize:12, color:'#B0C4C4', marginBottom:12, lineHeight:1.5 }}>{p.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontSize:18, fontWeight:800, color:'#0D2D3D' }}>{p.prix.toFixed(2).replace('.',',')} €</div>
                    {panier[p.id] ? (
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <button onClick={() => retirerDuPanier(p.id)} style={{ width:28, height:28, borderRadius:7, border:'1.5px solid rgba(27,140,140,0.2)', background:'white', cursor:'pointer', fontSize:16, color:'#1B8C8C', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                        <span style={{ fontSize:14, fontWeight:700, minWidth:16, textAlign:'center' as const }}>{panier[p.id]}</span>
                        <button onClick={() => ajouterAuPanier(p.id)} style={{ width:28, height:28, borderRadius:7, background:'#1B8C8C', border:'none', cursor:'pointer', fontSize:16, color:'white', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => ajouterAuPanier(p.id)} style={{ width:34, height:34, borderRadius:9, background:'#1B8C8C', border:'none', cursor:'pointer', fontSize:20, color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panier sticky */}
        <div style={{ position:'sticky', top:200, background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.1)', padding:20, boxShadow:'0 4px 16px rgba(27,140,140,0.08)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>🛒 Mon panier</div>
          <div style={{ fontSize:12, color:'#B0C4C4', marginBottom:16 }}>{pharma.nom}</div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#0D2D3D', marginBottom:8, display:'flex', justifyContent:'space-between' }}>
              📋 Ordonnance
              <button onClick={() => setOrdoOuverte(true)} style={{ fontSize:11, color:'#1B8C8C', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>+ Ajouter</button>
            </div>
            <button onClick={() => setOrdoOuverte(true)} style={{ width:'100%', padding:'10px', background:'#F4FAFA', border:'1.5px dashed rgba(27,140,140,0.25)', borderRadius:9, fontSize:13, fontWeight:600, color:'#1B8C8C', cursor:'pointer' }}>
              📋 Ajouter une ordonnance
            </button>
          </div>
          {totalItems === 0 ? (
            <div style={{ textAlign:'center', padding:'20px 0', color:'#B0C4C4', fontSize:13 }}>Votre panier est vide</div>
          ) : (
            <div>
              {pharma.produits.filter(p => panier[p.id]).map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', fontSize:13, gap:8 }}>
                  <span style={{ flex:1, color:'#0D2D3D', fontWeight:500, lineHeight:1.3 }}>{p.nom}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                    <button onClick={() => retirerDuPanier(p.id)} style={{ width:22, height:22, borderRadius:6, border:'1px solid rgba(27,140,140,0.2)', background:'white', cursor:'pointer', fontSize:14, color:'#1B8C8C', fontWeight:700 }}>−</button>
                    <span style={{ fontSize:13, fontWeight:600, minWidth:14, textAlign:'center' as const }}>{panier[p.id]}</span>
                    <button onClick={() => ajouterAuPanier(p.id)} style={{ width:22, height:22, borderRadius:6, background:'#1B8C8C', border:'none', cursor:'pointer', fontSize:14, color:'white', fontWeight:700 }}>+</button>
                  </div>
                  <span style={{ fontWeight:700, color:'#0D2D3D', flexShrink:0 }}>{(p.prix*panier[p.id]).toFixed(2).replace('.',',')} €</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:800, color:'#0D2D3D', padding:'14px 0 0', marginTop:8, borderTop:'2px solid rgba(27,140,140,0.12)' }}>
                <span>Total</span>
                <span>{totalPrix.toFixed(2).replace('.',',')} €</span>
              </div>
              <div style={{ fontSize:12, color:'#B0C4C4', marginBottom:14, textAlign:'right' as const }}>+ livraison 3,90 €</div>
              <Link href="/panier" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px', borderRadius:11, fontSize:15, fontWeight:700, textDecoration:'none' }}>
                Valider mon panier →
              </Link>
              <div style={{ textAlign:'center' as const, fontSize:11, color:'#B0C4C4', marginTop:8 }}>🔒 Paiement sécurisé Stripe</div>
            </div>
          )}
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
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:12, padding:16, background:'#EAF7F7', borderRadius:12, textDecoration:'none', marginBottom:12 }}>
              <span style={{ fontSize:28 }}>🔢</span>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D' }}>Code Ségur</div>
                <div style={{ fontSize:12, color:'#7A9A9A' }}>Recommandé — depuis votre médecin</div>
              </div>
            </Link>
            <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:12, padding:16, background:'#F4FAFA', borderRadius:12, textDecoration:'none' }}>
              <span style={{ fontSize:28 }}>📸</span>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D' }}>Photo / PDF</div>
                <div style={{ fontSize:12, color:'#7A9A9A' }}>Photo de votre ordonnance papier</div>
              </div>
            </Link>
          </div>
        </div>
      )}

    </main>
  )
}