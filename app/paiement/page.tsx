'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useRouter } from 'next/navigation'

export default function Paiement() {
  const router = useRouter()
  const [methode, setMethode] = useState<'carte'|'apple'|'paypal'>('carte')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading] = useState(false)

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g,'').substring(0,16)
    return digits.match(/.{1,4}/g)?.join(' ') || digits
  }
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g,'').substring(0,4)
    return digits.length >= 2 ? digits.substring(0,2)+'/'+digits.substring(2) : digits
  }
  const confirmer = () => {
    if (methode==='carte' && (!cardNum||cardNum.length<19||!cardExpiry||!cardCvv)) {
      alert('Veuillez renseigner tous les champs.')
      return
    }
    setLoading(true)
    setTimeout(() => router.push('/attente'), 1500)
  }

  const inp: React.CSSProperties = {
    width:'100%', padding:'11px 14px',
    border:'1.5px solid rgba(27,140,140,0.18)',
    borderRadius:10, fontFamily:'Inter,sans-serif',
    fontSize:14, color:'#0D2D3D',
    outline:'none', boxSizing:'border-box'
  }

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", background:'#F4FAFA', minHeight:'100vh' }}>
      <style>{`
        .paiement-body { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        .card-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 768px) {
          .paiement-body { grid-template-columns: 1fr !important; }
          .card-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', padding:'110px 24px 44px', textAlign:'center', color:'white' }}>
        <h1 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:8 }}>Paiement sécurisé</h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Pharmacie Saint-Jean · Marseille 1er</p>
      </div>

      {/* PROGRESS */}
      <div style={{ maxWidth:560, margin:'0 auto', padding:'24px 16px 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {['Documents','Pharmacie','Panier','Paiement'].map((label, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background:i<3?'#DCFCE7':i===3?'#1B8C8C':'white', color:i<3?'#15803D':i===3?'white':'#B0C4C4', border:i<3?'2px solid #15803D':i===3?'none':'2px solid #E5E7EB', boxShadow:i===3?'0 0 0 4px rgba(27,140,140,0.2)':'none' }}>
                {i<3?'✓':i+1}
              </div>
              <div style={{ fontSize:10, fontWeight:600, marginTop:4, color:i<3?'#15803D':i===3?'#1B8C8C':'#B0C4C4' }}>{label}</div>
            </div>
            {i<3 && <div style={{ width:32, height:2, background:i<3?'#1B8C8C':'#E5E7EB', marginBottom:18 }}></div>}
          </div>
        ))}
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'24px 16px 80px' }}>
        <div className="paiement-body">

          {/* GAUCHE */}
          <div>

            {/* CE QU'ON PAYE MAINTENANT */}
            <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>Ce que vous payez maintenant</div>
              <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:16 }}>Montants connus et fixes</div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#EAF7F7', color:'#0F766E', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:20, border:'1px solid rgba(27,140,140,0.2)', marginBottom:16 }}>
                <span style={{ width:7, height:7, background:'#1B8C8C', borderRadius:'50%', display:'inline-block' }}></span>
                Débit immédiat à la confirmation
              </div>
              {[
                { label:'Parapharmacie', sub:'Avène SPF50+ · Vitamine D3 · HE Lavande ×2', val:'47,20 €' },
                { label:'Livraison express', sub:'Pharmacie Saint-Jean · ~28 min', val:'3,90 €', teal:true },
              ].map((line, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
                  <div>
                    <div style={{ fontSize:14, color:'#3D5A5A' }}>{line.label}</div>
                    <div style={{ fontSize:11, color:'#B0C4C4', marginTop:2 }}>{line.sub}</div>
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:line.teal?'#1B8C8C':'#0D2D3D' }}>{line.val}</div>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:17, fontWeight:800, color:'#0D2D3D', padding:'12px 0 0', marginTop:6, borderTop:'2px solid rgba(27,140,140,0.12)' }}>
                <span>Total débité maintenant</span><span>51,10 €</span>
              </div>
            </div>

            {/* MÉDICAMENTS TEMPS 2 */}
            <div style={{ background:'#FFF8E7', border:'1.5px solid #F5D87A', borderRadius:14, padding:18, marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <span style={{ fontSize:20 }}>💊</span>
                <div style={{ fontSize:14, fontWeight:700, color:'#92400E' }}>Médicaments — après validation pharmacien</div>
              </div>
              <div style={{ fontSize:13, color:'#78350F', lineHeight:1.7, marginBottom:10 }}>
                Votre pharmacien vérifie l'ordonnance et calcule le reste à charge. Vous recevrez une notification avant tout prélèvement.
              </div>
              {['Le pharmacien traite votre ordonnance (10–20 min)','Vous recevez une notification avec le montant exact','Vous validez — votre CB est débitée, le livreur part'].map((step, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#92400E', marginBottom:6 }}>
                  <div style={{ width:22, height:22, background:'#F59E0B', color:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                  {step}
                </div>
              ))}
            </div>

            {/* MOYEN DE PAIEMENT */}
            <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:4 }}>Moyen de paiement</div>
              <div style={{ fontSize:13, color:'#7A9A9A', marginBottom:16 }}>CB enregistrée via Stripe — aucune donnée stockée chez nous</div>

              <div style={{ display:'flex', gap:8, marginBottom:18 }}>
                {([
                  { id:'carte', label:'💳 Carte' },
                  { id:'apple', label:' Apple Pay' },
                  { id:'paypal', label:'🅿️ PayPal' },
                ] as const).map(m => (
                  <div key={m.id} onClick={() => setMethode(m.id)}
                    style={{ flex:1, padding:'10px 8px', border:`1.5px solid ${methode===m.id?'#1B8C8C':'rgba(27,140,140,0.15)'}`, borderRadius:10, textAlign:'center', cursor:'pointer', fontSize:13, fontWeight:500, color:methode===m.id?'#0F766E':'#5A7878', background:methode===m.id?'#EAF7F7':'white', transition:'all 0.2s' }}>
                    {m.label}
                  </div>
                ))}
              </div>

              {methode==='carte' && (
                <div>
                  {/* Carte visuelle */}
                  <div style={{ background:'linear-gradient(135deg,#1B8C8C,#0D5555)', borderRadius:14, padding:18, color:'white', marginBottom:18, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, background:'rgba(255,255,255,0.06)', borderRadius:'50%' }}/>
                    <div style={{ width:30, height:22, background:'rgba(255,255,255,0.25)', borderRadius:4, marginBottom:12 }}/>
                    <div style={{ fontSize:14, fontWeight:600, letterSpacing:'0.1em', marginBottom:10, opacity:.9 }}>{cardNum||'•••• •••• •••• ••••'}</div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, opacity:.7 }}>
                      <span>{cardName.toUpperCase()||'PRÉNOM NOM'}</span>
                      <span>{cardExpiry||'MM/AA'}</span>
                    </div>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Numéro de carte</label>
                    <input type="text" placeholder="1234 5678 9012 3456" value={cardNum} maxLength={19} onChange={e => setCardNum(formatCard(e.target.value))} style={inp}/>
                  </div>
                  <div className="card-row" style={{ marginBottom:14 }}>
                    <div>
                      <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Expiration</label>
                      <input type="text" placeholder="MM/AA" value={cardExpiry} maxLength={5} onChange={e => setCardExpiry(formatExpiry(e.target.value))} style={inp}/>
                    </div>
                    <div>
                      <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>CVV</label>
                      <input type="text" placeholder="123" value={cardCvv} maxLength={3} onChange={e => setCardCvv(e.target.value.replace(/\D/g,''))} style={inp}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0D2D3D', marginBottom:7 }}>Nom sur la carte</label>
                    <input type="text" placeholder="Marie Dupont" value={cardName} onChange={e => setCardName(e.target.value)} style={inp}/>
                  </div>
                </div>
              )}

              {methode==='apple' && (
                <div style={{ padding:'24px', textAlign:'center', background:'#F4FAFA', borderRadius:12, color:'#7A9A9A', fontSize:14 }}>
                  Utilisez Face ID ou Touch ID pour confirmer
                </div>
              )}
              {methode==='paypal' && (
                <div style={{ padding:'24px', textAlign:'center', background:'#FFF9F0', borderRadius:12, color:'#7A9A9A', fontSize:14 }}>
                  Vous serez redirigé vers PayPal
                </div>
              )}

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' as const, marginTop:14, paddingTop:14, borderTop:'1px solid rgba(0,0,0,0.06)' }}>
                {['🔒 SSL 256 bits','✓ Stripe PCI DSS','🛡️ 3D Secure'].map(b => (
                  <div key={b} style={{ fontSize:11, color:'#7A9A9A' }}>{b}</div>
                ))}
              </div>
            </div>
          </div>

          {/* RÉCAP DROITE */}
          <div style={{ background:'white', borderRadius:16, border:'1px solid rgba(27,140,140,0.08)', padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize:15, fontWeight:700, color:'#0D2D3D', marginBottom:14 }}>Récapitulatif</div>
            {[
              { label:'Parapharmacie', val:'47,20 €' },
              { label:'Livraison', val:'3,90 €', teal:true },
              { label:'Médicaments', val:'Après pharmacien', small:true },
            ].map((l,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'7px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', color:'#5A7878' }}>
                <span>{l.label}</span>
                <span style={{ fontWeight:l.small?400:600, color:l.teal?'#1B8C8C':l.small?'#B0C4C4':'#0D2D3D', fontStyle:l.small?'italic':'normal', fontSize:l.small?12:13 }}>{l.val}</span>
              </div>
            ))}
            <div style={{ background:'#EAF7F7', borderRadius:10, padding:'12px', margin:'12px 0' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#0F766E', marginBottom:4 }}>DÉBITÉ MAINTENANT</div>
              <div style={{ fontSize:22, fontWeight:800, color:'#0D2D3D' }}>51,10 €</div>
              <div style={{ fontSize:11, color:'#7A9A9A', marginTop:2 }}>Parapharmacie + livraison</div>
            </div>
            <div style={{ background:'#FFF8E7', borderRadius:10, padding:'12px', marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#92400E', marginBottom:4 }}>APRÈS PHARMACIEN</div>
              <div style={{ fontSize:13, fontWeight:700, color:'#78350F' }}>Reste à charge médicaments</div>
              <div style={{ fontSize:11, color:'#92400E', marginTop:2 }}>Notification avant tout débit</div>
            </div>
            <button onClick={confirmer} disabled={loading}
              style={{ width:'100%', padding:14, background:loading?'#7A9A9A':'#1B8C8C', color:'white', border:'none', borderRadius:11, fontFamily:'Inter,sans-serif', fontSize:15, fontWeight:700, cursor:loading?'default':'pointer', marginBottom:8 }}>
              {loading?'⏳ Traitement...':'🔒 Payer 51,10 €'}
            </button>
            <div style={{ textAlign:'center' as const, fontSize:11, color:'#B0C4C4', marginBottom:10 }}>Paiement sécurisé · Stripe</div>
            <Link href="/panier" style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#B0C4C4', textDecoration:'none' }}>← Modifier mon panier</Link>
          </div>
        </div>
      </div>
    </main>
  )
}