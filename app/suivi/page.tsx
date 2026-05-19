'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function Suivi() {
  const [seconds, setSeconds] = useState(18 * 60)

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(timer)
  }, [])

  const mins = Math.floor(seconds / 60).toString().padStart(2,'0')
  const secs = (seconds % 60).toString().padStart(2,'0')

  const etapes = [
    { done:true, active:false, icon:'✓', label:'Commande reçue', desc:'Transmise à la Pharmacie Saint-Jean', time:'14h32' },
    { done:true, active:false, icon:'✓', label:'Commande acceptée', desc:'Le pharmacien a pris en charge votre demande', time:'14h48' },
    { done:true, active:false, icon:'✓', label:'Reste à charge validé', desc:'6,05 € confirmés — paiement effectué', time:'14h52' },
    { done:false, active:true, icon:'📦', label:'Préparation en cours', desc:'Sac opaque scellé en cours de préparation', time:'15h00' },
    { done:false, active:false, icon:'🛵', label:'Livreur en route', desc:'Un livreur partenaire récupère votre commande', time:'' },
    { done:false, active:false, icon:'🔐', label:'Livraison — code requis', desc:'Remise en main propre · Code de réception obligatoire', time:'' },
  ]

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      <Nav />

      {/* HERO */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 24px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>
          Suivi de commande
        </h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Commande #PL-0851 · Pharmacie Saint-Jean</p>
      </div>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'24px 16px 80px' }}>

        {/* STATUT PRINCIPAL */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)', textAlign:'center' }}>
          <div style={{ fontSize:44, marginBottom:10 }}>📦</div>
          <div style={{ fontSize:18, fontWeight:800, color:'#0D2D3D', marginBottom:6 }}>Préparation en cours</div>
          <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:14 }}>12 Rue de la Paix, 13001 Marseille</div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'10px 20px', borderRadius:20, fontWeight:600, fontSize:14 }}>
            ⏱ Arrivée estimée : 16h15 — dans {mins}:{secs}
          </div>
        </div>

        {/* CODE DE RÉCEPTION */}
        <div style={{ background:'#0D2D3D', borderRadius:14, padding:'18px 20px', marginBottom:16, display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontSize:32, flexShrink:0 }}>🔐</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', marginBottom:6 }}>VOTRE CODE DE RÉCEPTION</div>
            <div style={{ fontSize:32, fontWeight:900, color:'white', letterSpacing:'0.2em', marginBottom:6 }}>4829</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.55)', lineHeight:1.5 }}>
              À donner au livreur. Remise en main propre obligatoire.<br/>En cas d'absence, la commande retourne à la pharmacie.
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:18 }}>Historique</div>
          {etapes.map((e, i) => (
            <div key={i} style={{ display:'flex', gap:14, paddingBottom:i<etapes.length-1?20:0, position:'relative' }}>
              {i<etapes.length-1 && <div style={{ position:'absolute', left:18, top:38, bottom:0, width:2, background:e.done?'#1B8C8C':'rgba(27,140,140,0.15)' }}/>}
              <div style={{ width:38, height:38, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, background:e.done?'#1B8C8C':e.active?'white':'#F4FAFA', border:e.done?'none':e.active?'2px solid #1B8C8C':'2px solid #E5E7EB', color:e.done?'white':e.active?'#1B8C8C':'#B0C4C4', boxShadow:e.active?'0 0 0 4px rgba(27,140,140,0.15)':'none', position:'relative', zIndex:1 }}>
                {e.active ? <div style={{ width:14, height:14, border:'2.5px solid rgba(27,140,140,0.2)', borderTopColor:'#1B8C8C', borderRadius:'50%', animation:'spin 1s linear infinite' }}/> : e.done?'✓':e.icon}
              </div>
              <div style={{ flex:1, paddingTop:5 }}>
                <div style={{ fontSize:13, fontWeight:600, color:e.active?'#1B8C8C':e.done?'#0D2D3D':'#B0C4C4', marginBottom:3 }}>{e.label}</div>
                <div style={{ fontSize:12, color:e.done||e.active?'#7A9A9A':'#D1D5DB', lineHeight:1.5 }}>{e.desc}</div>
                {e.time && <div style={{ fontSize:11, color:'#22C55E', fontWeight:500, marginTop:3 }}>{e.time}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* PHARMACIE */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:12 }}>Votre pharmacie</div>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px', background:'#F4FAFA', borderRadius:12, border:'1px solid rgba(27,140,140,0.1)' }}>
            <div style={{ width:42, height:42, background:'#EAF7F7', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🏥</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Pharmacie Saint-Jean</div>
              <div style={{ fontSize:12, color:'#7A9A9A' }}>📍 12 Rue de la République, 13001</div>
            </div>
            <a href="tel:+33491000000" style={{ padding:'8px 14px', background:'#EAF7F7', color:'#1B8C8C', borderRadius:8, fontSize:12, fontWeight:600, textDecoration:'none', border:'1px solid rgba(27,140,140,0.2)', flexShrink:0 }}>
              📞 Appeler
            </a>
          </div>
        </div>

        {/* RÉCAP */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, marginBottom:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#0D2D3D', marginBottom:12 }}>Récapitulatif</div>
          {[
            { label:'Parapharmacie', val:'47,20 €' },
            { label:'Reste à charge médicaments', val:'6,05 €' },
            { label:'Livraison express', val:'3,90 €', teal:true },
            { label:'Total payé', val:'57,15 €', bold:true },
          ].map((line, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:i<3?'1px solid rgba(0,0,0,0.05)':'none', fontSize:line.bold?15:13, fontWeight:line.bold?800:400 }}>
              <span style={{ color:'#5A7878' }}>{line.label}</span>
              <span style={{ color:line.teal?'#1B8C8C':'#0D2D3D', fontWeight:line.bold?800:600 }}>{line.val}</span>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' as const }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:7, background:'#1B8C8C', color:'white', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none' }}>
            Retour à l'accueil
          </Link>
          <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:7, background:'white', color:'#5A7878', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:500, textDecoration:'none', border:'1px solid rgba(0,0,0,0.1)' }}>
            Nouvelle commande
          </Link>
        </div>

      </div>
    </main>
  )
}