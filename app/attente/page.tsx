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

export default function Attente() {
  // ─── Compte à rebours 12 minutes ─────────────────────────────────────────
  const [seconds, setSeconds] = useState(12 * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')

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
            <Link href="/pharmacies" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Nos pharmacies</Link>
            <Link href="/ordonnance" style={{ fontSize:14, fontWeight:500, color:'#3D5A5A', textDecoration:'none' }}>Ordonnance</Link>
          </div>
          <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:6, background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
            Mon compte
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 32px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>
          Votre commande est en cours
        </h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Commande #PL-0851 · Pharmacie Saint-Jean</p>
      </div>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'32px 20px 80px' }}>

        {/* ── CONFIRMATION PAIEMENT ── */}
        <div style={{ background:'#F0FDF4', border:'1.5px solid #86EFAC', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
          <div style={{ width:44, height:44, background:'#22C55E', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, color:'white', fontWeight:700, flexShrink:0 }}>✓</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:'#15803D', marginBottom:2 }}>51,10 € débités avec succès</div>
            <div style={{ fontSize:13, color:'#166534' }}>Parapharmacie + livraison · Carte ••••&nbsp;4242 · Stripe</div>
          </div>
        </div>

        {/* ── TIMER ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:'24px', marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)', textAlign:'center' }}>
          <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:8 }}>Temps estimé avant validation pharmacien</div>
          <div style={{ fontSize:42, fontWeight:800, color:'#1B8C8C', letterSpacing:'0.05em', marginBottom:6 }}>
            {mins}:{secs}
          </div>
          <div style={{ fontSize:12, color:'#B0C4C4' }}>Vous serez notifié dès que c'est prêt</div>
        </div>

        {/* ── PHARMACIE ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>

          {/* Infos pharmacie */}
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:14, background:'#F4FAFA', borderRadius:12, border:'1px solid rgba(27,140,140,0.1)', marginBottom:20 }}>
            <div style={{ width:50, height:50, background:'#EAF7F7', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>🏥</div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:2 }}>Pharmacie Saint-Jean</div>
              <div style={{ fontSize:13, color:'#7A9A9A' }}>📍 12 Rue de la République, 13001 · Ouvert jusqu'à 20h</div>
            </div>
          </div>

          {/* ── TIMELINE STATUTS ── */}
          <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:20 }}>Suivi de votre demande</div>

          {[
            { done:true, active:false, icon:'✓', title:'Commande reçue', desc:"Votre ordonnance et vos produits ont été transmis à la pharmacie.", time:'Il y a 2 min' },
            { done:true, active:false, icon:'✓', title:'Paiement confirmé', desc:'51,10 € débités — parapharmacie et livraison.', time:'Il y a 1 min' },
            { done:false, active:true, icon:'⏳', title:'Vérification ordonnance en cours…', desc:'Le pharmacien examine votre ordonnance et calcule votre reste à charge.', time:'En cours · ~10–20 min' },
            { done:false, active:false, icon:'💶', title:'Validation reste à charge', desc:'Vous recevrez le montant exact — un clic pour valider.', time:'' },
            { done:false, active:false, icon:'📦', title:'Préparation de la commande', desc:'Médicaments et produits conditionnés pour la livraison.', time:'' },
            { done:false, active:false, icon:'🛵', title:'Livreur en route', desc:'Suivi en temps réel disponible dès l\'assignation.', time:'' },
          ].map((step, i) => (
            <div key={i} style={{ display:'flex', gap:16, paddingBottom: i<5 ? 24 : 0, position:'relative' }}>
              {/* Ligne verticale */}
              {i < 5 && <div style={{ position:'absolute', left:19, top:40, bottom:0, width:2, background:'rgba(27,140,140,0.15)' }}/>}

              {/* Dot */}
              <div style={{
                width:40, height:40, borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:step.active ? 14 : 16,
                background: step.done ? '#1B8C8C' : step.active ? 'white' : '#F4FAFA',
                border: step.done ? 'none' : step.active ? '2px solid #1B8C8C' : '2px solid #E5E7EB',
                color: step.done ? 'white' : step.active ? '#1B8C8C' : '#B0C4C4',
                boxShadow: step.active ? '0 0 0 4px rgba(27,140,140,0.15)' : 'none',
                position:'relative', zIndex:1
              }}>
                {step.active ? (
                  // Spinner animé pour l'étape en cours
                  <div style={{ width:16, height:16, border:'2.5px solid rgba(27,140,140,0.2)', borderTopColor:'#1B8C8C', borderRadius:'50%', animation:'spin 1s linear infinite' }}/>
                ) : step.icon}
              </div>

              {/* Contenu */}
              <div style={{ flex:1, paddingTop:6 }}>
                <div style={{ fontSize:14, fontWeight:600, color: step.active ? '#1B8C8C' : step.done ? '#0D2D3D' : '#B0C4C4', marginBottom:3 }}>{step.title}</div>
                <div style={{ fontSize:13, color: step.done || step.active ? '#7A9A9A' : '#D1D5DB', lineHeight:1.5 }}>{step.desc}</div>
                {step.time && <div style={{ fontSize:12, color: step.active ? '#1B8C8C' : '#22C55E', fontWeight:500, marginTop:4 }}>{step.time}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* ── NOTIFICATIONS ── */}
        <div style={{ background:'#EAF7F7', border:'1.5px solid rgba(27,140,140,0.2)', borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#0F766E', marginBottom:8 }}>🔔 Vous serez notifié</div>
          <div style={{ fontSize:13, color:'#0F766E', lineHeight:1.6, marginBottom:12 }}>
            Dès que le pharmacien a calculé le reste à charge, vous recevrez une notification avec le montant exact. Vous aurez 30 minutes pour valider.
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' as const }}>
            {['📱 SMS', '✉️ Email', '🔔 Notification app'].map(c => (
              <span key={c} style={{ fontSize:12, background:'white', border:'1px solid rgba(27,140,140,0.2)', color:'#0F766E', padding:'5px 12px', borderRadius:8, fontWeight:500 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* ── RECAP PAIEMENTS ── */}
        <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:16 }}>Récapitulatif des paiements</div>
          {[
            { label:'Parapharmacie', val:'47,20 €', status:'✓ débité', statusColor:'#22C55E' },
            { label:'Livraison express', val:'3,90 €', status:'✓ débité', statusColor:'#22C55E' },
            { label:'Médicaments (reste à charge)', val:'', status:'En attente pharmacien', statusColor:'#F59E0B' },
          ].map((line, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom: i<2 ? '1px solid rgba(0,0,0,0.05)' : 'none', fontSize:14 }}>
              <span style={{ color:'#5A7878' }}>{line.label}</span>
              <div style={{ textAlign:'right' as const }}>
                {line.val && <div style={{ fontWeight:700, color:'#0D2D3D' }}>{line.val}</div>}
                <div style={{ fontSize:12, color:line.statusColor, fontWeight:500 }}>{line.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── ACTIONS ── */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' as const }}>
          <Link href="/suivi" style={{ display:'flex', alignItems:'center', gap:7, background:'#1B8C8C', color:'white', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none', transition:'all 0.2s' }}>
            Suivre ma commande →
          </Link>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:7, background:'white', color:'#5A7878', padding:'12px 22px', borderRadius:10, fontSize:14, fontWeight:500, textDecoration:'none', border:'1px solid rgba(0,0,0,0.1)', transition:'all 0.2s' }}>
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* ── CSS spinner ── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>

    </main>
  )
}