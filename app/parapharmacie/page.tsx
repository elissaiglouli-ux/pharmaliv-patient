'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

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

const filtres = [
  { id:'tout', label:'Tout' },
  { id:'ete', label:'☀️ Été' },
  { id:'skincare', label:'✨ Skincare' },
  { id:'complements', label:'💊 Compléments' },
]

export default function Parapharmacie() {
  const [actif, setActif] = useState('tout')
  const [search, setSearch] = useState('')
  const [panier, setPanier] = useState<number[]>([])
  const [flash, setFlash] = useState<number|null>(null)

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
      <style>{`
        .para-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
        .para-cats { display: grid; grid-template-columns: repeat(3,1fr); }
        @media (max-width: 768px) {
          .para-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          .para-cats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav panierCount={panier.length} />

      {/* ── HERO avec photo produits para ── */}
      <div style={{ position:'relative', padding:'110px 24px 72px', textAlign:'center', color:'white', overflow:'hidden', minHeight:480, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img
          src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1400&q=90&fit=crop&crop=center"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(13,55,55,0.88) 0%, rgba(27,140,140,0.72) 100%)' }}/>

        <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:640, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.15)', padding:'5px 14px', borderRadius:20, fontSize:12, fontWeight:600, marginBottom:20, backdropFilter:'blur(4px)' }}>
            <span style={{ width:7, height:7, background:'#4ADE80', borderRadius:'50%', display:'inline-block' }}></span>
            Livré en moins d'une heure · Marseille
          </div>
          <h1 style={{ fontSize:'clamp(30px,5vw,54px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:14, lineHeight:1.08, textShadow:'0 2px 16px rgba(0,0,0,0.2)' }}>
            La meilleure<br/>
            <span style={{ color:'#7EE8E8' }}>parapharmacie</span><br/>
            de Marseille.
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.82)', marginBottom:28, lineHeight:1.6 }}>
            Produits sélectionnés par vos pharmaciens,<br/>livrés en moins d'une heure.
          </p>

          <div style={{ display:'flex', gap:8, maxWidth:520, margin:'0 auto' }}>
            <input type="text" placeholder="🔍 Rechercher un produit, une marque..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex:1, padding:'14px 16px', borderRadius:12, border:'none', fontFamily:'Inter,sans-serif', fontSize:14, color:'#0D2D3D', outline:'none', boxShadow:'0 4px 24px rgba(0,0,0,0.2)', minWidth:0 }}/>
            <button style={{ padding:'14px 20px', background:'white', color:'#1B8C8C', border:'none', borderRadius:12, fontSize:14, fontWeight:700, cursor:'pointer', flexShrink:0 }}>
              Chercher
            </button>
          </div>

          <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginTop:16 }}>
            {['☀️ Solaire', '💧 Skincare', '💊 Vitamines', '👶 Bébé'].map(tag => (
              <span key={tag} onClick={() => setSearch(tag.split(' ').slice(1).join(' '))}
                style={{ background:'rgba(255,255,255,0.18)', color:'white', padding:'7px 15px', borderRadius:20, fontSize:12, fontWeight:600, cursor:'pointer', border:'1px solid rgba(255,255,255,0.25)', backdropFilter:'blur(4px)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATÉGORIES ── */}
      <div style={{ background:'white', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
        <div className="para-cats" style={{ maxWidth:1200, margin:'0 auto' }}>
          {[
            { emoji:'☀️', titre:'Spécial été', desc:'Solaires, après-soleil, protection', color:'#92400E', tag:'ete' },
            { emoji:'✨', titre:'Skincare', desc:'Sérum, crème, contour des yeux', color:'#6D28D9', tag:'skincare' },
            { emoji:'💊', titre:'Compléments', desc:'Vitamines, minéraux, probiotiques', color:'#15803D', tag:'complements' },
          ].map(cat => (
            <div key={cat.tag} onClick={() => { setActif(cat.tag); document.getElementById('produits')?.scrollIntoView({behavior:'smooth'}) }}
              style={{ padding:'24px 28px', cursor:'pointer', borderRight:'1px solid rgba(0,0,0,0.05)', borderBottom:'1px solid rgba(0,0,0,0.04)', transition:'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background='#F4FAFA')}
              onMouseLeave={e => (e.currentTarget.style.background='white')}>
              <div style={{ fontSize:28, marginBottom:8 }}>{cat.emoji}</div>
              <div style={{ fontSize:16, fontWeight:800, color:'#0D2D3D', marginBottom:4 }}>{cat.titre}</div>
              <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:8 }}>{cat.desc}</div>
              <div style={{ fontSize:13, fontWeight:600, color:cat.color }}>Voir les produits →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUITS ── */}
      <div id="produits" style={{ maxWidth:1200, margin:'0 auto', padding:'32px 20px 80px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {filtres.map(f => (
              <button key={f.id} onClick={() => setActif(f.id)}
                style={{ padding:'9px 18px', borderRadius:20, border:`1.5px solid ${actif===f.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, background:actif===f.id?'#1B8C8C':'white', color:actif===f.id?'white':'#5A7878', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize:13, color:'#B0C4C4' }}>{produits.length} produit{produits.length>1?'s':''}</div>
        </div>

        <div className="para-grid">
          {produits.map(p => (
            <div key={p.id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', border:'1px solid rgba(27,140,140,0.06)', transition:'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 10px 28px rgba(27,140,140,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ height:120, background:'linear-gradient(145deg,#EAF7F7,#C8EDEE)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, position:'relative' }}>
                {p.emoji}
                {p.badge && (
                  <div style={{ position:'absolute', top:8, left:8, background:'#0D2D3D', color:'white', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20 }}>
                    {p.badge}
                  </div>
                )}
              </div>
              <div style={{ padding:14 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'#1B8C8C', marginBottom:3, letterSpacing:'0.04em' }}>{p.marque.toUpperCase()}</div>
                <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D', marginBottom:10, lineHeight:1.35, minHeight:34 }}>{p.nom}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontSize:17, fontWeight:900, color:'#0D2D3D' }}>{p.prix.toFixed(2).replace('.',',')} €</div>
                  <button onClick={() => ajouter(p.id)}
                    style={{ padding:'7px 12px', background:flash===p.id?'#22C55E':'#1B8C8C', color:'white', border:'none', borderRadius:8, fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.2s', transform:flash===p.id?'scale(1.05)':'scale(1)' }}>
                    {flash===p.id?'✓ Ajouté':'+ Panier'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BANNIÈRE ORDONNANCE ── */}
      <div style={{ background:'#0D2D3D', margin:'0 20px 60px', borderRadius:20, padding:'36px 28px', maxWidth:1160, marginLeft:'auto', marginRight:'auto' }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'#2BBFBF', marginBottom:10 }}>
          Vous avez une ordonnance ?
        </div>
        <h3 style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:900, color:'white', letterSpacing:'-0.02em', marginBottom:10, lineHeight:1.2 }}>
          Recevez aussi vos médicaments en même temps.
        </h3>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.6, marginBottom:20 }}>
          Ajoutez votre ordonnance. Le pharmacien calcule le reste à charge et livre tout en une seule fois.
        </p>
        <Link href="/ordonnance" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px 22px', borderRadius:12, fontSize:14, fontWeight:700, textDecoration:'none' }}>
          📋 Envoyer mon ordonnance →
        </Link>
      </div>

    </main>
  )
}