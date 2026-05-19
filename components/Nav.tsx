'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Logo = () => (
  <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
    <defs>
      <linearGradient id="ng1" x1="21" y1="2" x2="21" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#4DCFCF"/><stop offset="1" stopColor="#0D8080"/></linearGradient>
      <linearGradient id="ng2" x1="2" y1="21" x2="40" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#3DC4C4"/><stop offset="1" stopColor="#1B8C8C"/></linearGradient>
    </defs>
    <rect x="14" y="2" width="14" height="38" rx="7" fill="url(#ng1)"/>
    <rect x="2" y="14" width="38" height="14" rx="7" fill="url(#ng2)" opacity=".9"/>
    <rect x="10" y="17" width="22" height="8" rx="4" fill="white" opacity=".92" stroke="#0D7070" strokeWidth="1.2"/>
    <rect x="10" y="17" width="11" height="8" rx="4" fill="#A8E6E6" opacity=".7"/>
  </svg>
)

const liens = [
  { href:'/parapharmacie', label:'Parapharmacie' },
  { href:'/ordonnance', label:'Ordonnance' },
  { href:'/pharmacies', label:'Nos pharmacies' },
]

export default function Nav({ panierCount = 0 }: { panierCount?: number }) {
  const path = usePathname()
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <>
      <style>{`
        .nav-liens { display: flex; }
        .nav-compte { display: flex; }
        .nav-burger { display: none !important; }
        .nav-tagline { display: block; }
        @media (max-width: 768px) {
          .nav-liens { display: none !important; }
          .nav-compte { display: none !important; }
          .nav-burger { display: flex !important; }
          .nav-tagline { display: none !important; }
        }
      `}</style>

      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(0,0,0,0.07)', height:70, display:'flex', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:1320, margin:'0 auto', padding:'0 20px', display:'flex', alignItems:'center' }}>

          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <Logo />
            <div>
              <div style={{ display:'flex' }}>
                <span style={{ fontSize:19, fontWeight:800, color:'#0D2D3D', letterSpacing:'-0.02em' }}>Pharma</span>
                <span style={{ fontSize:19, fontWeight:800, letterSpacing:'-0.02em', background:'linear-gradient(135deg,#2BBFBF,#1B8C8C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Liv</span>
              </div>
              <div className="nav-tagline" style={{ fontSize:10, color:'#8AABAB', marginTop:1 }}>Votre pharmacie, livrée.</div>
            </div>
          </Link>

          <div className="nav-liens" style={{ alignItems:'center', gap:24, marginLeft:32, flex:1 }}>
            {liens.map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize:14, fontWeight:path===l.href?700:500, color:path===l.href?'#1B8C8C':'#3D5A5A', textDecoration:'none', borderBottom:path===l.href?'2px solid #1B8C8C':'2px solid transparent', paddingBottom:2 }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10 }}>

            {/* Panier */}
            <Link href="/panier" style={{ position:'relative', width:40, height:40, border:'1.5px solid rgba(27,140,140,0.2)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', background:path==='/panier'?'#EAF7F7':'white' }}>
              <svg width="18" height="18" fill="none" stroke="#1B8C8C" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {panierCount > 0 && (
                <div style={{ position:'absolute', top:-6, right:-6, width:18, height:18, background:'#1B8C8C', color:'white', borderRadius:'50%', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {panierCount}
                </div>
              )}
            </Link>

            {/* Desktop — Vous êtes pharmacien + Mon compte */}
            <div className="nav-compte" style={{ alignItems:'center', gap:10 }}>
              <Link href="/pharmacien" style={{ display:'flex', alignItems:'center', gap:6, background:'white', color:'#1B8C8C', padding:'9px 16px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none', border:'1.5px solid rgba(27,140,140,0.3)' }}>
                Vous êtes pharmacien ?
              </Link>
              <Link href="/ordonnance" style={{ display:'flex', alignItems:'center', gap:6, background:'#1B8C8C', color:'white', padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, textDecoration:'none' }}>
                Mon compte
              </Link>
            </div>

            {/* Mobile — burger */}
            <button className="nav-burger" onClick={() => setMenuOuvert(!menuOuvert)}
              style={{ width:40, height:40, border:'1.5px solid rgba(27,140,140,0.2)', borderRadius:10, background:'white', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:5, cursor:'pointer', padding:0 }}>
              <div style={{ width:18, height:2, background:'#0D2D3D', borderRadius:2, transform:menuOuvert?'rotate(45deg) translate(5px, 5px)':'none', transition:'all 0.2s' }}/>
              <div style={{ width:18, height:2, background:'#0D2D3D', borderRadius:2, opacity:menuOuvert?0:1, transition:'all 0.2s' }}/>
              <div style={{ width:18, height:2, background:'#0D2D3D', borderRadius:2, transform:menuOuvert?'rotate(-45deg) translate(5px, -5px)':'none', transition:'all 0.2s' }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu déroulant mobile */}
      {menuOuvert && (
        <div style={{ position:'fixed', top:70, left:0, right:0, zIndex:499, background:'white', borderBottom:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 8px 32px rgba(0,0,0,0.1)', padding:'16px 20px 24px' }}>
          {liens.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOuvert(false)}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderRadius:12, background:path===l.href?'#EAF7F7':'transparent', color:path===l.href?'#1B8C8C':'#0D2D3D', textDecoration:'none', fontSize:15, fontWeight:path===l.href?700:500, marginBottom:4 }}>
              {l.label}
              <span style={{ color:'#B0C4C4', fontSize:18 }}>›</span>
            </Link>
          ))}
          <div style={{ height:1, background:'rgba(0,0,0,0.06)', margin:'12px 0' }}/>
          <Link href="/pharmacien" onClick={() => setMenuOuvert(false)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderRadius:12, color:'#1B8C8C', textDecoration:'none', fontSize:15, fontWeight:500, marginBottom:8, border:'1px solid rgba(27,140,140,0.2)' }}>
            Vous êtes pharmacien ?
            <span style={{ fontSize:18 }}>›</span>
          </Link>
          <Link href="/ordonnance" onClick={() => setMenuOuvert(false)}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#1B8C8C', color:'white', padding:'14px', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none' }}>
            Mon compte
          </Link>
        </div>
      )}
    </>
  )
}