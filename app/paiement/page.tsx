'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

export default function Paiement() {
  const router = useRouter()
  const [methode, setMethode] = useState<'carte' | 'apple' | 'paypal'>('carte')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading] = useState(false)

  // ─── Formatage numéro de carte ────────────────────────────────────────────
  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, '').substring(0, 16)
    return digits.match(/.{1,4}/g)?.join(' ') || digits
  }

  // ─── Formatage date expiration ────────────────────────────────────────────
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').substring(0, 4)
    return digits.length >= 2 ? digits.substring(0,2) + '/' + digits.substring(2) : digits
  }

  // ─── Confirmer le paiement → page attente ────────────────────────────────
  const confirmer = () => {
    if (methode === 'carte' && (!cardNum || cardNum.length < 19 || !cardExpiry || !cardCvv)) {
      alert('Veuillez renseigner tous les champs de votre carte.')
      return
    }
    setLoading(true)
    setTimeout(() => router.push('/attente'), 1500)
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid rgba(27,140,140,0.18)',
    borderRadius: 10, fontFamily: 'Inter,sans-serif',
    fontSize: 14, color: '#0D2D3D', outline: 'none', boxSizing: 'border-box'
  }

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
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>Paiement sécurisé</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Pharmacie Saint-Jean · Marseille 1er</p>
      </div>

      {/* ── PROGRESS ── */}
      <div style={{ maxWidth:560, margin:'0 auto', padding:'28px 20px 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i<3?'#DCFCE7':i===3?'#1B8C8C':'white', color:i<3?'#15803D':i===3?'white':'#B0C4C4', border:i<3?'2px solid #15803D':i===3?'none':'2px solid #E5E7EB', boxShadow:i===3?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                {i<3?'✓':i+1}
              </div>
              <div style={{ fontSize:11, fontWeight:600, marginTop:5, color:i<3?'#15803D':i===3?'#1B8C8C':'#B0C4C4' }}>{label}</div>
            </div>
            {i<3 && <div style={{ width:48, height:2, background:i<3?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:960, margin:'0 auto', padding:'28px 24px 80px', display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>

        {/* GAUCHE */}
        <div>

          {/* ── CE QU'ON PAYE MAINTENANT ── */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>Ce que vous payez maintenant</div>
            <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:20 }}>Montants connus et fixes</div>

            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#EAF7F7', color:'#0F766E', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:20, border:'1px solid rgba(27,140,140,0.2)', marginBottom:20 }}>
              <span style={{ width:7, height:7, background:'#1B8C8C', borderRadius:'50%', display:'inline-block' }}></span>
              Débit immédiat à la confirmation
            </div>

            {[
              { label:'Parapharmacie', sub:'Avène SPF50+ · Vitamine D3 · HE Lavande ×2', val:'47,20 €' },
              { label:'Livraison express', sub:'Pharmacie Saint-Jean · ~28 min', val:'3,90 €', teal:true },
            ].map((line, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ fontSize:14, color:'#3D5A5A' }}>{line.label}</div>
                  <div style={{ fontSize:12, color:'#B0C4C4', marginTop:2 }}>{line.sub}</div>
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:line.teal?'#1B8C8C':'#0D2D3D' }}>{line.val}</div>
              </div>
            ))}

            <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:800, color:'#0D2D3D', padding:'14px 0 0', marginTop:8, borderTop:'2px solid rgba(27,140,140,0.12)' }}>
              <span>Total débité maintenant</span>
              <span>51,10 €</span>
            </div>
          </div>

          {/* ── MÉDICAMENTS — TEMPS 2 ── */}
          <div style={{ background:'#FFF8E7', border:'1.5px solid #F5D87A', borderRadius:14, padding:18, marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <span style={{ fontSize:22 }}>💊</span>
              <div style={{ fontSize:14, fontWeight:700, color:'#92400E' }}>Médicaments — prélevés après validation pharmacien</div>
            </div>
            <div style={{ fontSize:13, color:'#78350F', lineHeight:1.7, marginBottom:12 }}>
              Votre pharmacien va vérifier votre ordonnance et calculer le reste à charge exact. Vous recevrez une notification pour confirmer avant tout prélèvement.
            </div>
            {[
              '1. Le pharmacien traite votre ordonnance (10–20 min)',
              '2. Vous recevez une notification avec le montant exact',
              '3. Vous validez — votre CB est débitée, le livreur part',
            ].map((step, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#92400E', marginBottom:6 }}>
                <div style={{ width:22, height:22, background:'#F59E0B', color:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                {step.substring(3)}
              </div>
            ))}
          </div>

          {/* ── MÉTHODE DE PAIEMENT ── */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>Moyen de paiement</div>
            <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:20 }}>CB enregistrée via Stripe — aucune donnée bancaire stockée chez nous</div>

            {/* Méthodes */}
            <div style={{ display:'flex', gap:8, marginBottom:20 }}>
              {([
                { id:'carte', label:'💳 Carte bancaire' },
                { id:'apple', label:' Apple Pay' },
                { id:'paypal', label:'🅿️ PayPal' },
              ] as const).map(m => (
                <div key={m.id} onClick={() => setMethode(m.id)}
                  style={{ flex:1, padding:'11px 8px', border:`1.5px solid ${methode===m.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, borderRadius:10, textAlign:'center', cursor:'pointer', fontSize:13, fontWeight:500, color:methode===m.id?'#0F766E':'#5A7878', background:methode===m.id?'#EAF7F7':'white', transition:'all 0.2s' }}>
                  {m.label}
                </div>
              ))}
            </div>

            {/* Formulaire carte */}
            {methode === 'carte' && (
              <div>
                {/* Carte visuelle */}
                <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', borderRadius:14, padding:20, color:'white', marginBottom:20, position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, background:'rgba(255,255,255,0.06)', borderRadius:'50%' }}/>
                  <div style={{ width:32, height:24, background:'rgba(255,255,255,0.25)', borderRadius:5, marginBottom:14 }}/>
                  <div style={{ fontSize:15, fontWeight:600, letterSpacing:'0.12em', marginBottom:12, opacity:.9 }}>
                    {cardNum || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, opacity:.7 }}>
                    <span>{cardName.toUpperCase() || 'PRÉNOM NOM'}</span>
                    <span>{cardExpiry || 'MM/AA'}</span>
                  </div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Numéro de carte</label>
                  <input type="text" placeholder="1234 5678 9012 3456" value={cardNum} maxLength={19}
                    onChange={e => setCardNum(formatCard(e.target.value))} style={inp}/>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Expiration</label>
                    <input type="text" placeholder="MM/AA" value={cardExpiry} maxLength={5}
                      onChange={e => setCardExpiry(formatExpiry(e.target.value))} style={inp}/>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>CVV</label>
                    <input type="text" placeholder="123" value={cardCvv} maxLength={3}
                      onChange={e => setCardCvv(e.target.value.replace(/\D/g,''))} style={inp}/>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Nom sur la carte</label>
                  <input type="text" placeholder="Marie Dupont" value={cardName}
                    onChange={e => setCardName(e.target.value)} style={inp}/>
                </div>
              </div>
            )}

            {methode === 'apple' && (
              <div style={{ padding:'24px', textAlign:'center', background:'#F4FAFA', borderRadius:12, color:'#7A9A9A', fontSize:14 }}>
                Utilisez Face ID ou Touch ID pour confirmer
              </div>
            )}

            {methode === 'paypal' && (
              <div style={{ padding:'24px', textAlign:'center', background:'#FFF9F0', borderRadius:12, color:'#7A9A9A', fontSize:14 }}>
                Vous serez redirigé vers PayPal pour finaliser
              </div>
            )}

            {/* Réassurance */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginTop:16, paddingTop:16, borderTop:'1px solid rgba(0,0,0,0.06)' }}>
              {['🔒 SSL 256 bits', '✓ Stripe PCI DSS', '🛡️ 3D Secure', '🏥 Données HDS'].map(b => (
                <div key={b} style={{ fontSize:11, color:'#7A9A9A', display:'flex', alignItems:'center', gap:4 }}>{b}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RÉCAP DROITE ── */}
        <div style={{ position:'sticky', top:88, background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:22, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:16 }}>Récapitulatif</div>

          <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:'#B0C4C4', marginBottom:8 }}>Pharmacie</div>
          <div style={{ fontSize:13, color:'#5A7878', marginBottom:16, paddingBottom:16, borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
            Saint-Jean · Marseille 1er · ⚡ 28 min
          </div>

          <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:'#B0C4C4', marginBottom:8 }}>Parapharmacie</div>
          {[
            { nom:'Avène SPF50+', prix:'14,90 €' },
            { nom:'Vitamine D3', prix:'12,50 €' },
            { nom:'HE Lavande ×2', prix:'19,80 €' },
          ].map((p,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'4px 0', color:'#5A7878' }}>
              <span>{p.nom}</span><span style={{ fontWeight:600, color:'#0D2D3D' }}>{p.prix}</span>
            </div>
          ))}

          <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'4px 0', color:'#5A7878' }}>
              <span>Livraison express</span><span style={{ fontWeight:600, color:'#1B8C8C' }}>3,90 €</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'4px 0', color:'#5A7878' }}>
              <span>Médicaments</span><span style={{ fontSize:12, color:'#B0C4C4', fontStyle:'italic' }}>Après pharmacien</span>
            </div>
          </div>

          {/* Débité maintenant */}
          <div style={{ background:'#EAF7F7', borderRadius:10, padding:'12px 14px', margin:'14px 0' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#0F766E', marginBottom:4 }}>DÉBITÉ MAINTENANT</div>
            <div style={{ fontSize:22, fontWeight:800, color:'#0D2D3D' }}>51,10 €</div>
            <div style={{ fontSize:11, color:'#7A9A9A', marginTop:2 }}>Parapharmacie + livraison</div>
          </div>

          {/* Après pharmacien */}
          <div style={{ background:'#FFF8E7', borderRadius:10, padding:'12px 14px', marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#92400E', marginBottom:4 }}>APRÈS VALIDATION PHARMACIEN</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#78350F' }}>Reste à charge médicaments</div>
            <div style={{ fontSize:11, color:'#92400E', marginTop:2 }}>Notification envoyée · vous validez avant tout débit</div>
          </div>

          <button onClick={confirmer} disabled={loading}
            style={{ width:'100%', padding:14, background:loading?'#7A9A9A':'#1B8C8C', color:'white', border:'none', borderRadius:11, fontFamily:'Inter,sans-serif', fontSize:15, fontWeight:700, cursor:loading?'default':'pointer', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading ? '⏳ Traitement...' : '🔒 Confirmer et payer 51,10 €'}
          </button>

          <div style={{ textAlign:'center' as const, fontSize:11, color:'#B0C4C4', marginTop:8 }}>
            Paiement sécurisé · Stripe
          </div>
          <div style={{ textAlign:'center' as const, marginTop:10 }}>
            <Link href="/panier" style={{ fontSize:12, color:'#B0C4C4', textDecoration:'none' }}>← Modifier mon panier</Link>
          </div>
        </div>
      </div>
    </main>
  )
}