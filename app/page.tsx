'use client'
import { useState } from 'react'
import Link from 'next/link'

type OrdoMethod = 'segur' | 'photo' | 'medecin'

export default function Ordonnance() {
  const [ordoMethod, setOrdoMethod] = useState<OrdoMethod>('segur')
  const [segurCode, setSegurCode] = useState('')
  const [segurValid, setSegurValid] = useState(false)
  const [ordoDone, setOrdoDone] = useState(false)
  const [vitaleDone, setVitaleDone] = useState(false)
  const [mutuelleDone, setMutuelleDone] = useState(false)
  const [couverture, setCouverture] = useState('standard')
  const [patientName, setPatientName] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [medecinLink, setMedecinLink] = useState('')

  const card = { background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:24, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }
  const inp: React.CSSProperties = { width:'100%', padding:'11px 14px', border:'1.5px solid rgba(27,140,140,0.18)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:14, color:'#0D2D3D', outline:'none', boxSizing:'border-box' }

  const genererLien = () => {
    if (patientName && patientEmail) {
      const code = Math.random().toString(36).substring(2,10).toUpperCase()
      setMedecinLink(`pharmaliv.fr/ordo/${code}`)
    }
  }

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(0,0,0,0.07)', height:70, display:'flex', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:1320, margin:'0 auto', padding:'0 28px', display:'flex', alignItems:'center' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
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
            <div>
              <div style={{ display:'flex' }}>
                <span style={{ fontSize:19, fontWeight:800, color:'#0D2D3D' }}>Pharma</span>
                <span style={{ fontSize:19, fontWeight:800, background:'linear-gradient(135deg,#2BBFBF,#1B8C8C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Liv</span>
              </div>
              <div style={{ fontSize:10, color:'#8AABAB' }}>Votre pharmacie, livrée.</div>
            </div>
          </Link>
          <div style={{ marginLeft:'auto' }}>
            <Link href="/" style={{ fontSize:13, color:'#5A7878', textDecoration:'none', padding:'8px 14px', border:'1px solid rgba(0,0,0,0.1)', borderRadius:8 }}>← Accueil</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 32px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>Envoyer mon ordonnance</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Étape 1 sur 4 — Documents + informations patient</p>
      </div>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'36px 20px 80px' }}>

        {/* PROGRESS */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginBottom:44 }}>
          {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i===0?'#1B8C8C':'white', color:i===0?'white':'#B0C4C4', border:i===0?'none':'2px solid #E5E7EB', boxShadow:i===0?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>{i+1}</div>
                <div style={{ fontSize:11, fontWeight:600, marginTop:5, color:i===0?'#1B8C8C':'#B0C4C4' }}>{label}</div>
              </div>
              {i<3 && <div style={{ width:48, height:2, background:'#E5E7EB', marginBottom:18 }}></div>}
            </div>
          ))}
        </div>

        {/* ── BLOC ORDONNANCE ── */}
        <div style={card}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>📋 Votre ordonnance</div>
          <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:20 }}>Choisissez comment transmettre votre ordonnance</div>

          {/* 3 MÉTHODES */}
          <div style={{ display:'flex', gap:10, marginBottom:24 }}>
            {([
              { id:'segur', emoji:'🔢', label:'Code Ségur', badge:'Recommandé', badgeBg:'#DCFCE7', badgeColor:'#15803D' },
              { id:'photo', emoji:'📸', label:'Photo / PDF', badge:null },
              { id:'medecin', emoji:'👨‍⚕️', label:'Mon médecin envoie', badge:'Nouveau', badgeBg:'#EFF6FF', badgeColor:'#1D4ED8' },
            ] as const).map(m => (
              <div key={m.id} onClick={() => setOrdoMethod(m.id as OrdoMethod)}
                style={{ flex:1, padding:'14px 8px', borderRadius:12, cursor:'pointer', textAlign:'center', border:`1.5px solid ${ordoMethod===m.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, background:ordoMethod===m.id?'#EAF7F7':'white', transition:'all 0.2s', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ fontSize:22 }}>{m.emoji}</div>
                <div style={{ fontSize:12, fontWeight:600, color:ordoMethod===m.id?'#0F766E':'#0D2D3D', lineHeight:1.3 }}>{m.label}</div>
                {m.badge && <span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:6, background:m.badgeBg, color:m.badgeColor }}>{m.badge}</span>}
              </div>
            ))}
          </div>

          {/* ── SÉGUR ── */}
          {ordoMethod==='segur' && (
            <div>
              <div style={{ background:'#EAF7F7', borderRadius:12, padding:16, marginBottom:16, fontSize:13, color:'#0F766E', lineHeight:1.7 }}>
                <strong>Comment ça marche ?</strong><br/>
                Depuis le 31 décembre 2024, les ordonnances sont numériques. Votre médecin vous envoie un code par SMS. Collez-le ici — la pharmacie récupère votre ordonnance directement depuis le système Ségur.
              </div>
              <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:8 }}>Code ordonnance numérique Ségur</label>
              <input type="text" value={segurCode}
                onChange={e => { setSegurCode(e.target.value.toUpperCase()); setSegurValid(e.target.value.length>=8) }}
                placeholder="Ex : 3F7K-9P2M" maxLength={12}
                style={{ ...inp, fontSize:20, fontWeight:700, letterSpacing:'0.1em', border:`2px solid ${segurValid?'#22C55E':'rgba(27,140,140,0.25)'}`, textAlign:'center', background:segurValid?'#F0FDF4':'white' }}/>
              {segurValid && (
                <div style={{ marginTop:12, background:'#F0FDF4', border:'1px solid #86EFAC', borderRadius:10, padding:'12px 16px', display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#15803D', fontWeight:500 }}>
                  <span style={{ fontSize:20 }}>✅</span> Code valide — l'ordonnance sera récupérée automatiquement par le pharmacien
                </div>
              )}
              <div style={{ marginTop:10, fontSize:12, color:'#B0C4C4', textAlign:'center' }}>Pas de code ? Votre médecin doit utiliser un logiciel agréé Ségur (obligatoire depuis fin 2024).</div>
            </div>
          )}

          {/* ── PHOTO ── */}
          {ordoMethod==='photo' && (
            <div>
              <div onClick={() => setOrdoDone(true)} style={{ border:`2px dashed ${ordoDone?'#22C55E':'rgba(27,140,140,0.35)'}`, borderRadius:14, padding:'36px 24px', textAlign:'center', background:ordoDone?'#F0FDF4':'#F0FAFA', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ fontSize:36, marginBottom:10 }}>{ordoDone?'✅':'📄'}</div>
                <div style={{ fontSize:15, fontWeight:600, color:'#0D2D3D', marginBottom:5 }}>{ordoDone?'Ordonnance ajoutée !':'Glissez votre ordonnance ici'}</div>
                <div style={{ fontSize:13, color:'#7A9A9A' }}>JPG, PNG ou PDF — max 10 Mo</div>
              </div>
              <div style={{ background:'#FFF8E7', borderLeft:'3px solid #F59E0B', borderRadius:8, padding:'12px 15px', fontSize:13, color:'#92400E', marginTop:14 }}>
                💡 Une simple photo suffit. Assurez-vous que tout le texte soit bien lisible.
              </div>
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'12px 15px', fontSize:13, color:'#DC2626', marginTop:10, display:'flex', gap:10 }}>
                <span>⚠️</span><span>Le pharmacien vérifie la validité de l'ordonnance et les dosages prescrits. Toute anomalie entraîne un refus automatique.</span>
              </div>
            </div>
          )}

          {/* ── MÉDECIN ENVOIE ── */}
          {ordoMethod==='medecin' && (
            <div>
              <div style={{ background:'#EAF7F7', borderRadius:12, padding:16, marginBottom:16, fontSize:13, color:'#0F766E', lineHeight:1.7 }}>
                <strong>Comment ça marche ?</strong><br/>
                Renseignez votre nom et email. On génère un <strong>lien unique sécurisé</strong> que vous envoyez à votre médecin par SMS ou email. Il clique, voit votre nom, et uploade votre ordonnance directement. Vous êtes notifié instantanément.
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Votre prénom et nom</label>
                  <input type="text" placeholder="Marie Dupont" value={patientName} onChange={e => setPatientName(e.target.value)} style={inp}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Votre email</label>
                  <input type="email" placeholder="marie@gmail.com" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} style={inp}/>
                </div>
              </div>

              {!medecinLink ? (
                <button onClick={genererLien} style={{ width:'100%', padding:'13px', background:patientName&&patientEmail?'#1B8C8C':'#E5E7EB', color:patientName&&patientEmail?'white':'#9CA3AF', border:'none', borderRadius:11, fontFamily:'Inter,sans-serif', fontSize:14, fontWeight:700, cursor:patientName&&patientEmail?'pointer':'default', transition:'all 0.2s' }}>
                  Générer le lien pour mon médecin
                </button>
              ) : (
                <div>
                  <div style={{ background:'#F0FDF4', border:'1px solid #86EFAC', borderRadius:12, padding:16, marginBottom:12 }}>
                    <div style={{ fontSize:12, color:'#15803D', fontWeight:600, marginBottom:8 }}>✅ Lien généré pour {patientName}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ flex:1, background:'white', border:'1px solid #BBF7D0', borderRadius:8, padding:'10px 14px', fontSize:13, fontWeight:600, color:'#0D2D3D', fontFamily:'monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {medecinLink}
                      </div>
                      <button onClick={() => navigator.clipboard.writeText(medecinLink)} style={{ padding:'10px 16px', background:'#1B8C8C', color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
                        Copier
                      </button>
                    </div>
                    <div style={{ fontSize:12, color:'#15803D', marginTop:8 }}>Envoyez ce lien à votre médecin par SMS ou email. Il peut uploader votre ordonnance directement.</div>
                  </div>
                  <div style={{ background:'#EAF7F7', borderRadius:10, padding:'10px 14px', fontSize:13, color:'#0F766E', display:'flex', gap:8 }}>
                    <span>🔔</span><span>Vous recevrez une notification sur <strong>{patientEmail}</strong> dès que votre médecin aura transmis l'ordonnance.</span>
                  </div>
                </div>
              )}
              <div style={{ marginTop:10, fontSize:12, color:'#B0C4C4' }}>Votre médecin doit utiliser un logiciel agréé Ségur. Disponible dans toute la France depuis janvier 2025.</div>
            </div>
          )}
        </div>

        {/* ── COUVERTURE SANTÉ ── */}
        <div style={card}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>🏥 Couverture santé</div>
          <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:20 }}>Permet au pharmacien de calculer votre reste à charge exact</div>
          {([
            { id:'css', label:'CSS / ex-CMU-C', desc:'Reste à charge généralement nul', badge:'CSS', badgeBg:'#DCFCE7', badgeColor:'#15803D' },
            { id:'acs', label:'ACS — Aide complémentaire', desc:'Réduction sur votre mutuelle', badge:'ACS', badgeBg:'#EFF6FF', badgeColor:'#1D4ED8' },
            { id:'standard', label:'SS + mutuelle privée', desc:'Couverture standard', badge:null },
          ] as const).map(opt => (
            <div key={opt.id} onClick={() => setCouverture(opt.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:14, border:`1.5px solid ${couverture===opt.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, borderRadius:12, cursor:'pointer', marginBottom:10, background:couverture===opt.id?'#EAF7F7':'white', transition:'all 0.2s' }}>
              <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, border:`2px solid ${couverture===opt.id?'#1B8C8C':'#C8D8D8'}`, background:couverture===opt.id?'#1B8C8C':'white', position:'relative' }}>
                {couverture===opt.id && <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:7, height:7, background:'white', borderRadius:'50%' }}></div>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#0D2D3D', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  {opt.label}
                  {opt.badge && <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:6, background:opt.badgeBg, color:opt.badgeColor }}>{opt.badge}</span>}
                </div>
                <div style={{ fontSize:13, color:'#5A7878', marginTop:2 }}>{opt.desc}</div>
              </div>
            </div>
          ))}
          {couverture!=='css' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:8 }}>
              {([
                { icon:'🩺', label:'Carte Vitale', done:vitaleDone, action:() => setVitaleDone(true) },
                { icon:'🛡️', label:couverture==='acs'?'Attestation ACS':'Carte mutuelle', done:mutuelleDone, action:() => setMutuelleDone(true) },
              ] as const).map((c, i) => (
                <div key={i} onClick={c.action} style={{ border:`2px dashed ${c.done?'#22C55E':'rgba(27,140,140,0.3)'}`, borderRadius:12, padding:'24px 16px', textAlign:'center', background:c.done?'#F0FDF4':'#EDF9F9', cursor:'pointer' }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{c.done?'✅':c.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#0D2D3D' }}>{c.done?'Ajoutée !':c.label}</div>
                  <div style={{ fontSize:12, color:'#7A9A9A' }}>Photo recto</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── INFOS PATIENT ── */}
        <div style={card}>
          <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>🪪 Informations patient</div>
          <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:20 }}>Pour que le pharmacien puisse préparer votre commande</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {([{label:'Prénom',ph:'Marie'},{label:'Nom',ph:'Dupont'},{label:'Date de naissance',ph:'JJ/MM/AAAA'},{label:'Téléphone',ph:'06 12 34 56 78'}] as const).map((f,i) => (
              <div key={i}>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>{f.label}</label>
                <input type="text" placeholder={f.ph} style={inp}/>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Numéro de sécurité sociale <span style={{ fontWeight:400, color:'#B0C4C4', fontSize:12 }}>(optionnel)</span></label>
            <input type="text" placeholder="1 85 05 13 XXX XXX XX" style={inp}/>
            <div style={{ fontSize:11, color:'#B0C4C4', marginTop:5 }}>15 chiffres — permet l'application automatique du tiers payant</div>
          </div>
          <div style={{ marginTop:14 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Adresse de livraison</label>
            <input type="text" placeholder="12 Rue de la Paix, 13001 Marseille" style={inp}/>
          </div>
          <div style={{ background:'#EAF7F7', borderRadius:10, padding:13, fontSize:13, color:'#0F766E', marginTop:16, display:'flex', gap:10, alignItems:'flex-start' }}>
            <span style={{ flexShrink:0 }}>🛡️</span>
            <span>Données médicales chiffrées, hébergées en France sur serveurs agréés HDS. Conformité RGPD & CNIL. Seul votre pharmacien y a accès.</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:28 }}>
          <Link href="/" style={{ fontSize:14, color:'#7A9A9A', textDecoration:'none' }}>← Retour</Link>
          <Link href="/pharmacies" style={{ display:'flex', alignItems:'center', gap:8, background:'#1B8C8C', color:'white', padding:'14px 28px', borderRadius:12, fontSize:15, fontWeight:700, textDecoration:'none' }}>
            Choisir ma pharmacie →
          </Link>
        </div>

      </div>
    </main>
  )
}