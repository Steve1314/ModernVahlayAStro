import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Star, Moon, Sparkles, ChevronDown,
  Flame, Droplets, Wind, Leaf,
  ArrowRight, CircleDot
} from "lucide-react";

const SIGNS = [
  { name: 'Aries', sym: '♈', date: 'Mar 21 – Apr 19', element: 'Fire', desc: 'Bold, ambitious and driven. A natural-born leader with unstoppable energy and unbreakable courage.' },
  { name: 'Taurus', sym: '♉', date: 'Apr 20 – May 20', element: 'Earth', desc: 'Patient, reliable and devoted. A lover of beauty, comfort and the finest earthly pleasures.' },
  { name: 'Gemini', sym: '♊', date: 'May 21 – Jun 20', element: 'Air', desc: 'Curious, adaptable and quick-witted. A master of communication gifted with beautiful duality.' },
  { name: 'Cancer', sym: '♋', date: 'Jun 21 – Jul 22', element: 'Water', desc: 'Intuitive, emotional and nurturing. Deeply connected to home, family and the tides of the heart.' },
  { name: 'Leo', sym: '♌', date: 'Jul 23 – Aug 22', element: 'Fire', desc: 'Charismatic, creative and generous. Born to shine brighter than any star and lead with passion.' },
  { name: 'Virgo', sym: '♍', date: 'Aug 23 – Sep 22', element: 'Earth', desc: 'Analytical, precise and devoted. A perfectionist whose compassionate soul seeks pure excellence.' },
  { name: 'Libra', sym: '♎', date: 'Sep 23 – Oct 22', element: 'Air', desc: 'Balanced, charming and fair-minded. An eternal seeker of harmony, beauty and cosmic justice.' },
  { name: 'Scorpio', sym: '♏', date: 'Oct 23 – Nov 21', element: 'Water', desc: 'Intense, passionate and transformative. A master of mystery wielding the deepest cosmic power.' },
  { name: 'Sagittarius', sym: '♐', date: 'Nov 22 – Dec 21', element: 'Fire', desc: 'Adventurous, optimistic and philosophical. A free spirit forever chasing the golden horizon.' },
  { name: 'Capricorn', sym: '♑', date: 'Dec 22 – Jan 19', element: 'Earth', desc: 'Disciplined, ambitious and patient. A master builder of legacies destined to last lifetimes.' },
  { name: 'Aquarius', sym: '♒', date: 'Jan 20 – Feb 18', element: 'Air', desc: 'Innovative, independent and humanitarian. A visionary soul born far ahead of their time.' },
  { name: 'Pisces', sym: '♓', date: 'Feb 19 – Mar 20', element: 'Water', desc: 'Empathetic, artistic and dreamy. A luminous soul that flows gracefully between hidden worlds.' },
];

const ELEM_ICON = {
  Fire: <Flame size={11} color="#ff8040" />,
  Water: <Droplets size={11} color="#40a0ff" />,
  Air: <Wind size={11} color="#a0d0ff" />,
  Earth: <Leaf size={11} color="#60b060" />,
};
const ELEM_COLOR = { Fire: '#ff8040', Water: '#40a0ff', Air: '#a0d0ff', Earth: '#60b060' };

const GOLD = '#d4a853';
const lerp = (a, b, f) => a + (b - a) * f;
const clamp01 = v => Math.max(0, Math.min(1, v));

/* ─ Zodiac glyph symbol component ─ */
function ZodiacGlyph({ sym, size = '3.2rem', active = false }) {
  return (
    <div style={{
      fontSize: size, lineHeight: 1, fontFamily: '"Segoe UI Symbol",serif',
      color: active ? '#ffd060' : GOLD,
      textShadow: active
        ? `0 0 12px ${GOLD}, 0 0 40px ${GOLD}88, 0 0 80px ${GOLD}44`
        : `0 0 8px ${GOLD}66`,
      transition: 'all .5s ease',
      userSelect: 'none',
    }}>{sym}</div>
  );
}

/* ─ Element badge with lucide icon ─ */
function ElementBadge({ element }) {
  const col = ELEM_COLOR[element];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase',
      color: col, padding: '3px 12px',
      border: `1px solid ${col}44`, borderRadius: '20px',
      background: `${col}11`, fontFamily: 'Georgia,serif',
    }}>
      {ELEM_ICON[element]} {element}
    </span>
  );
}

/* ─ Sign popup card ─ */
function SignPopup({ sign, visible }) {
  return (
    <div style={{
      position: 'absolute', bottom: '11%', left: '50%',
      transform: 'translateX(-50%)',
      minWidth: '290px', maxWidth: '350px',
      background: 'rgba(3,1,16,.78)',
      backdropFilter: 'blur(32px) saturate(170%)',
      WebkitBackdropFilter: 'blur(32px) saturate(170%)',
      border: '1px solid rgba(212,168,83,.2)',
      borderRadius: '22px', padding: '28px 44px', textAlign: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity .6s ease',
      boxShadow: '0 8px 50px rgba(0,0,0,.55),0 0 80px rgba(212,168,83,.05),inset 0 1px 0 rgba(255,255,255,.05)',
      pointerEvents: 'none',
    }}>
      {sign && <>
        <div style={{ marginBottom: '10px' }}>
          <ZodiacGlyph sym={sign.sym} active size="3.4rem" />
        </div>
        <div style={{ fontSize: '1.1rem', color: '#fff', letterSpacing: '.32em', marginBottom: '8px', fontFamily: 'Georgia,serif', fontWeight: 300 }}>
          {sign.name}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <ElementBadge element={sign.element} />
        </div>
        <div style={{ fontSize: '.6rem', color: 'rgba(180,155,255,.42)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'Georgia,serif' }}>
          {sign.date}
        </div>
        <div style={{ fontSize: '.78rem', color: 'rgba(225,215,255,.85)', lineHeight: 1.82, fontFamily: 'Georgia,serif' }}>
          {sign.desc}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: .4 }}>
          <CircleDot size={10} color={GOLD} /><CircleDot size={10} color={GOLD} /><CircleDot size={10} color={GOLD} />
        </div>
      </>}
    </div>
  );
}

/* ─ Scroll hint ─ */
function ScrollHint({ visible }) {
  return (
    <div style={{
      position: 'absolute', bottom: '38px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      opacity: visible ? 1 : 0, transition: 'opacity .6s ease', pointerEvents: 'none',
    }}>
      <span style={{ fontSize: '.58rem', color: 'rgba(180,155,255,.32)', letterSpacing: '.24em', textTransform: 'uppercase', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>
        Scroll to explore
      </span>
      {[0, 1, 2].map(i => (
        <ChevronDown key={i} size={14} color="rgba(180,155,255,.22)"
          style={{ marginTop: i === 0 ? 0 : -10, animation: `chevBounce 1.8s ease ${i * .22}s infinite` }} />
      ))}
    </div>
  );
}

/* ─ Brand header ─ */
function Brand() {
  return (
    <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '7px' }}>
        <Moon size={18} color={GOLD} style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }} />
        <h1 style={{
          fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', color: GOLD, letterSpacing: '.42em',
          textTransform: 'uppercase', fontFamily: 'Georgia,serif', fontWeight: 400,
          textShadow: `0 0 50px ${GOLD}bb,0 0 120px ${GOLD}44`
        }}>Vahlay Astro</h1>
        <Moon size={18} color={GOLD} style={{ filter: `drop-shadow(0 0 8px ${GOLD})`, transform: 'scaleX(-1)' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Star size={8} color={`${GOLD}88`} />
        <p style={{ fontSize: '.62rem', color: 'rgba(180,155,255,.5)', letterSpacing: '.28em', textTransform: 'uppercase', fontFamily: 'Georgia,serif' }}>
          Navigate Your Celestial Destiny
        </p>
        <Star size={8} color={`${GOLD}88`} />
      </div>
    </div>
  );
}

/* ─ Next section ─ */
function NextSection() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom,#000008 0%,#020009 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Sparkles size={22} color={GOLD} style={{ filter: `drop-shadow(0 0 10px ${GOLD})` }} />
        <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2.3rem)', color: GOLD, letterSpacing: '.3em', textTransform: 'uppercase', fontFamily: 'Georgia,serif', fontWeight: 400, textShadow: `0 0 40px ${GOLD}88` }}>
          Your Cosmic Journey
        </h2>
        <Sparkles size={22} color={GOLD} style={{ filter: `drop-shadow(0 0 10px ${GOLD})` }} />
      </div>
      <p style={{ fontSize: '.68rem', color: 'rgba(180,155,255,.45)', letterSpacing: '.22em', textTransform: 'uppercase', fontFamily: 'Georgia,serif' }}>
        Discover what the stars hold for you
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px',
        padding: '10px 24px', border: `1px solid ${GOLD}33`, borderRadius: '30px',
        background: `${GOLD}08`, cursor: 'pointer', color: GOLD,
        fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: 'Georgia,serif'
      }}>
        <Star size={13} color={GOLD} /> Begin Reading <ArrowRight size={13} color={GOLD} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════ Main Component ═══════════════════════════════ */
export default function App() {
  const canvasRef = useRef(null);
  const s = useRef({
    t: 0, scroll: 0, mx: 0, my: 0,
    renderer: null, scene: null, camera: null, wGrp: null,
    segMats: [], segGlowMats: [], symMats: [],
    bkLight: null, pageM: null, bookGrp: null, bTop: null, bookAura: null,
    eTorus: null, wHaloM: null, raySprites: [], ptGeo: null, ptVel: [], ptN: 300,
    focLight: null, curSign: -1, raf: null,
  });
  const setSign_r = useRef(null);
  const setPopup_r = useRef(null);
  const setHint_r = useRef(null);

  const [focusedSign, setFocusedSign] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    setSign_r.current = setFocusedSign;
    setPopup_r.current = setPopupVisible;
    setHint_r.current = setHintVisible;
  });

  useEffect(() => {
    const R = s.current;
    const canvas = canvasRef.current;
    const W = () => canvas.clientWidth || window.innerWidth;
    const H = () => canvas.clientHeight || window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W(), H(), false);
    renderer.setClearColor(0x000008, 1);
    R.renderer = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000008, .014);
    R.scene = scene;

    const camera = new THREE.PerspectiveCamera(60, W() / H(), .1, 200);
    camera.position.set(0, .6, 9.5);
    R.camera = camera;

    // Lights
    scene.add(new THREE.AmbientLight(0x08052e, 1.4));
    const bkLight = new THREE.PointLight(0xf0c050, 3.5, 10);
    bkLight.position.set(0, -1.6, .8); scene.add(bkLight); R.bkLight = bkLight;
    const blueLight = new THREE.PointLight(0x1530ff, 1.8, 18); blueLight.position.set(-5, 3, -3); scene.add(blueLight);
    const purpleLight = new THREE.PointLight(0x9020ff, 1.2, 14); purpleLight.position.set(5, 4, -3); scene.add(purpleLight);
    const focLight = new THREE.PointLight(0xd4a853, 5, 6); scene.add(focLight); R.focLight = focLight;
    const fillLight = new THREE.PointLight(0x4060ff, 1, 12); fillLight.position.set(0, -3, 3); scene.add(fillLight);

    // Glow texture helper
    const gTex = (r, g, b, ia = 0, a = 1) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 256;
      const cx = cv.getContext('2d');
      const gr = cx.createRadialGradient(128, 128, ia * 128, 128, 128, 128);
      gr.addColorStop(0, `rgba(${r},${g},${b},${a})`);
      gr.addColorStop(.35, `rgba(${r},${g},${b},${a * .45})`);
      gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      cx.fillStyle = gr; cx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(cv);
    };
    const mkSpr = (tex, x, y, z, sx, sy, op = 1) => {
      const m = new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, transparent: true, opacity: op });
      const sp = new THREE.Sprite(m); sp.position.set(x, y, z); sp.scale.set(sx, sy, 1); return sp;
    };

    // Stars
    {
      const N = 7000, geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 35 + Math.random() * 80;
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); pos[i * 3 + 2] = r * Math.cos(ph);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: .14, transparent: true, opacity: .75, sizeAttenuation: true })));
    }

    // Nebulae
    const nt1 = gTex(28, 18, 110, 0, .8), nt2 = gTex(90, 25, 110, 0, .7), nt3 = gTex(18, 55, 140, 0, .8);
    [[-7, 3, -18, 22, 16, nt1], [8, -3, -20, 24, 17, nt2], [0, 6, -22, 28, 20, nt3], [4, -6, -14, 16, 13, nt2], [-3, 8, -16, 18, 14, nt1]]
      .forEach(([x, y, z, sx, sy, t]) => scene.add(mkSpr(t, x, y, z, sx, sy, .12)));

    // Dust particles
    const ptN = R.ptN, ptGeo = new THREE.BufferGeometry();
    const ppos = new Float32Array(ptN * 3); R.ptVel = [];
    for (let i = 0; i < ptN; i++) {
      ppos[i * 3] = (Math.random() - .5) * 22; ppos[i * 3 + 1] = (Math.random() - .5) * 14; ppos[i * 3 + 2] = (Math.random() - .5) * 10;
      R.ptVel.push({ x: (Math.random() - .5) * .0018, y: Math.random() * .0025 + .0008, z: (Math.random() - .5) * .001 });
    }
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0xd4a853, size: .055, transparent: true, opacity: .55, sizeAttenuation: true, blending: THREE.AdditiveBlending })));
    R.ptGeo = ptGeo;

    // Book
    const bookGrp = new THREE.Group(); bookGrp.position.set(0, -2.3, 0); scene.add(bookGrp); R.bookGrp = bookGrp;
    const goldM = new THREE.MeshStandardMaterial({ color: 0xd4a853, metalness: .9, roughness: .15, emissive: 0xd4a853, emissiveIntensity: .45 });
    const darkM = new THREE.MeshStandardMaterial({ color: 0x0e0709, metalness: .1, roughness: .88, emissive: 0x0a0406, emissiveIntensity: .15 });
    const pageM = new THREE.MeshStandardMaterial({ color: 0xfff4d4, metalness: 0, roughness: .85, emissive: 0xd4a853, emissiveIntensity: .2 }); R.pageM = pageM;
    const glowM = new THREE.MeshStandardMaterial({ color: 0xfff0a0, metalness: 0, roughness: 1, emissive: 0xffc840, emissiveIntensity: .8, transparent: true, opacity: .6, blending: THREE.AdditiveBlending });
    const bBot = new THREE.Mesh(new THREE.BoxGeometry(2.6, .07, 3.5), darkM); bBot.position.y = -.18; bookGrp.add(bBot);
    const bookBase = new THREE.Mesh(new THREE.BoxGeometry(2.66, .035, 3.56), goldM); bookBase.position.y = -.21; bookGrp.add(bookBase);
    bookGrp.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, .26, 3.32), pageM));
    const bTop = new THREE.Mesh(new THREE.BoxGeometry(2.6, .07, 3.5), darkM); bTop.position.y = .18; bTop.rotation.x = -.18; bookGrp.add(bTop); R.bTop = bTop;
    const bookSpine = new THREE.Mesh(new THREE.BoxGeometry(.13, .42, 3.56), goldM); bookSpine.position.x = -1.3; bookGrp.add(bookSpine);
    const bookEdge = new THREE.Mesh(new THREE.BoxGeometry(.035, .26, 3.32), goldM); bookEdge.position.x = 1.22; bookGrp.add(bookEdge);
    bookGrp.add(new THREE.Mesh(new THREE.PlaneGeometry(2.1, .22), glowM));
    const bookAuraT = gTex(255, 200, 80), bookAura = mkSpr(bookAuraT, 0, 0, .3, 5, 3.5, .3); bookGrp.add(bookAura); R.bookAura = bookAura;

    // Zodiac Wheel
    const wGrp = new THREE.Group(); wGrp.position.set(0, 3.5, 0); wGrp.rotation.x = .2; wGrp.rotation.z = Math.PI / 2; wGrp.scale.setScalar(.5);
    scene.add(wGrp); R.wGrp = wGrp;
    const SEG = 2 * Math.PI / 12, IR = 1.28, OR = 2.75, MR = (IR + OR) / 2;
    const tM = e => new THREE.MeshStandardMaterial({ color: 0xd4a853, metalness: .85, roughness: .18, emissive: 0xd4a853, emissiveIntensity: e });
    wGrp.add(new THREE.Mesh(new THREE.TorusGeometry(OR, .065, 18, 100), tM(.55)));
    wGrp.add(new THREE.Mesh(new THREE.TorusGeometry(MR, .022, 10, 80), tM(.35)));
    wGrp.add(new THREE.Mesh(new THREE.TorusGeometry(IR, .052, 14, 80), tM(.45)));
    wGrp.add(new THREE.Mesh(new THREE.CircleGeometry(IR - .05, 64),
      new THREE.MeshStandardMaterial({ color: 0x080420, metalness: .2, roughness: .8, emissive: 0x12083a, emissiveIntensity: .6, side: THREE.DoubleSide })));

    // Center glyph
    {
      const cv = document.createElement('canvas'); cv.width = cv.height = 256;
      const cx = cv.getContext('2d');
      const gr = cx.createRadialGradient(128, 128, 0, 128, 128, 110);
      gr.addColorStop(0, 'rgba(212,168,83,.15)'); gr.addColorStop(1, 'rgba(212,168,83,0)');
      cx.fillStyle = gr; cx.fillRect(0, 0, 256, 256);
      cx.font = '52px serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillStyle = 'rgba(212,168,83,0.5)'; cx.shadowColor = 'rgba(212,168,83,.9)'; cx.shadowBlur = 14; cx.fillText('✦', 128, 108);
      cx.font = '10px Georgia'; cx.shadowBlur = 6; cx.fillStyle = 'rgba(212,168,83,0.28)'; cx.fillText('VAHLAY ASTRO', 128, 152);
      const centerMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(IR * 1.8, IR * 1.8),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, opacity: .9, blending: THREE.NormalBlending, side: THREE.DoubleSide })
      );
      centerMesh.position.set(0, 0, .02);
      wGrp.add(centerMesh);
    }

    const mkSegGeo = (iR, oR, sA, eA) => {
      const sh = new THREE.Shape();
      sh.moveTo(Math.cos(sA) * iR, Math.sin(sA) * iR); sh.lineTo(Math.cos(sA) * oR, Math.sin(sA) * oR);
      sh.absarc(0, 0, oR, sA, eA, false); sh.lineTo(Math.cos(eA) * iR, Math.sin(eA) * iR); sh.absarc(0, 0, iR, eA, sA, true);
      return new THREE.ShapeGeometry(sh, 8);
    };
    const mkSymTex = sg => {
      const sz = 256, cv = document.createElement('canvas'); cv.width = cv.height = sz;
      const cx = cv.getContext('2d');
      const gr = cx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz * .42);
      gr.addColorStop(0, 'rgba(212,168,83,.14)'); gr.addColorStop(1, 'rgba(212,168,83,0)');
      cx.fillStyle = gr; cx.fillRect(0, 0, sz, sz);
      cx.font = `${sz * .42}px serif`; cx.textAlign = 'center'; cx.textBaseline = 'middle';
      cx.fillStyle = '#d4a853'; cx.shadowColor = 'rgba(212,168,83,.95)'; cx.shadowBlur = 18;
      cx.fillText(sg.sym, sz / 2, sz * .38);
      cx.font = `${sz * .1}px Georgia`; cx.shadowBlur = 8; cx.fillStyle = 'rgba(212,168,83,.7)';
      cx.fillText(sg.name.toUpperCase(), sz / 2, sz * .7);
      return new THREE.CanvasTexture(cv);
    };
    const glowT = gTex(212, 168, 83);
    for (let i = 0; i < 12; i++) {
      const sA = i * SEG, eA = sA + SEG, mA = sA + SEG / 2;
      const sm = new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x1c1038 : 0x130a28, metalness: .25, roughness: .75, emissive: 0x1c1038, emissiveIntensity: .2, transparent: true, opacity: .88, side: THREE.DoubleSide });
      R.segMats.push(sm);
      const seg = new THREE.Mesh(mkSegGeo(IR + .06, OR - .06, sA, eA), sm); seg.position.z = .001; wGrp.add(seg);
      const dv = new THREE.Mesh(new THREE.BoxGeometry(.022, OR - IR - .06, .018), new THREE.MeshStandardMaterial({ color: 0xd4a853, emissive: 0xd4a853, emissiveIntensity: .6, metalness: .8, roughness: .1 }));
      dv.position.set(Math.cos(sA) * (IR + (OR - IR) / 2), Math.sin(sA) * (IR + (OR - IR) / 2), .02); dv.rotation.z = sA + Math.PI / 2; wGrp.add(dv);
      const sph = new THREE.Mesh(new THREE.SphereGeometry(.055, 8, 8), new THREE.MeshStandardMaterial({ color: 0xd4a853, emissive: 0xd4a853, emissiveIntensity: .9, metalness: .9, roughness: .08 }));
      sph.position.set(Math.cos(sA) * OR, Math.sin(sA) * OR, .06); wGrp.add(sph);
      const symM = new THREE.SpriteMaterial({ map: mkSymTex(SIGNS[i]), transparent: true, opacity: .88 }); R.symMats.push(symM);
      const sp = new THREE.Sprite(symM); sp.position.set(Math.cos(mA) * MR, Math.sin(mA) * MR, .12); sp.scale.set(.72, .72, 1); wGrp.add(sp);
      const gm = new THREE.SpriteMaterial({ map: glowT, transparent: true, opacity: .05, blending: THREE.AdditiveBlending }); R.segGlowMats.push(gm);
      const gs = new THREE.Sprite(gm); gs.position.set(Math.cos(mA) * MR, Math.sin(mA) * MR, .08); gs.scale.set(1.3, 1.3, 1); wGrp.add(gs);
    }
    const eTorus = new THREE.Mesh(new THREE.TorusGeometry(OR * 1.14, .018, 8, 80), new THREE.MeshBasicMaterial({ color: 0xd4a853, transparent: true, opacity: .28, blending: THREE.AdditiveBlending }));
    wGrp.add(eTorus); R.eTorus = eTorus;
    const wHaloT = gTex(212, 168, 83, 0, .6), wHaloM = new THREE.SpriteMaterial({ map: wHaloT, transparent: true, opacity: .18, blending: THREE.AdditiveBlending });
    const wHalo = new THREE.Sprite(wHaloM); wHalo.scale.set(9, 9, 1); wGrp.add(wHalo); R.wHaloM = wHaloM;

    // Volumetric rays
    const rayT = gTex(212, 168, 83, 0, .5);
    for (let i = 0; i < 6; i++) {
      const rm = new THREE.SpriteMaterial({ map: rayT, transparent: true, opacity: .04, blending: THREE.AdditiveBlending });
      const rs = new THREE.Sprite(rm); const ox = (Math.random() - .5) * 3;
      rs.position.set(ox, 0, .5); rs.scale.set(1.5 + Math.random() * 2, 6 + Math.random() * 4, 1);
      scene.add(rs); R.raySprites.push({ s: rs, m: rm, ox, phase: Math.random() * Math.PI * 2 });
    }

    // Animation
    let pendingTimer = null, lastFoc = -1;
    function animate() {
      R.raf = requestAnimationFrame(animate);
      R.t += .016;
      const totalH = document.body.scrollHeight - window.innerHeight;
      const sp = totalH > 0 ? clamp01(R.scroll / totalH) : 0;
      const p1 = clamp01(sp / .28), p2 = clamp01((sp - .18) / .67), p3 = clamp01((sp - .85) / .15);

      const tarCZ = 9.5 - p2 * 2.8 - p3 * .5, tarCY = .6 - p2 * .5;
      camera.position.x = lerp(camera.position.x, R.mx * .22, .024);
      camera.position.y = lerp(camera.position.y, tarCY - R.my * .12, .024);
      camera.position.z = lerp(camera.position.z, tarCZ, .028);
      camera.lookAt(0, -p2 * .25, 0);

      R.bookGrp.position.y = -2.3 + Math.sin(R.t * .48) * .08;
      R.bookGrp.rotation.y = Math.sin(R.t * .28) * .04;
      R.bTop.rotation.x = -.18 - p3 * .32;
      R.bkLight.intensity = 3 + p1 * 2.5 + p3 * 5;
      R.pageM.emissiveIntensity = .2 + p1 * .15 + p3 * .55;
      R.bookAura.material.opacity = .15 + p1 * .2 + p3 * .4;

      wGrp.position.y = lerp(wGrp.position.y, lerp(3.5, 1.0, p1), .04);
      const ws = lerp(.5, 1.0, p1);
      wGrp.scale.x = lerp(wGrp.scale.x, ws, .04); wGrp.scale.y = lerp(wGrp.scale.y, ws, .04); wGrp.scale.z = lerp(wGrp.scale.z, ws, .04);
      if (p2 < .015) { wGrp.rotation.z += .0035; }
      else { wGrp.rotation.z = lerp(wGrp.rotation.z, Math.PI / 2 - p2 * Math.PI * 2, .065); }
      wGrp.rotation.y = Math.sin(R.t * .2) * .015;

      if (p2 > .025 && p2 < .975) {
        const foc = Math.min(11, Math.floor(p2 * 12));
        for (let i = 0; i < 12; i++) {
          const a = i === foc;
          R.segMats[i].emissiveIntensity = lerp(R.segMats[i].emissiveIntensity, a ? .75 : .18, .08);
          R.segMats[i].emissive.lerp(a ? new THREE.Color(0x3a2060) : new THREE.Color(0x1a0f30), .08);
          R.segGlowMats[i].opacity = lerp(R.segGlowMats[i].opacity, a ? .32 : .045, .08);
          R.symMats[i].opacity = lerp(R.symMats[i].opacity, a ? 1 : .78, .07);
        }
        R.focLight.position.set(wGrp.position.x + R.mx * .05, wGrp.position.y + MR * .97 * wGrp.scale.y, wGrp.position.z + MR * .2 * wGrp.scale.z + .8);
        R.focLight.intensity = 4.5 + Math.sin(R.t * 1.8) * .5;
        if (foc !== lastFoc) {
          lastFoc = foc;
          setSign_r.current(null); setPopup_r.current(false);
          if (pendingTimer) clearTimeout(pendingTimer);
          pendingTimer = setTimeout(() => { setSign_r.current(SIGNS[foc]); setPopup_r.current(true); }, 350);
        }
        setHint_r.current(false);
      } else {
        setPopup_r.current(false); lastFoc = -1;
        if (p2 <= .025) setHint_r.current(true);
        R.focLight.intensity = lerp(R.focLight.intensity, 0, .05);
        for (let i = 0; i < 12; i++) {
          R.segMats[i].emissiveIntensity = lerp(R.segMats[i].emissiveIntensity, .18, .05);
          R.segGlowMats[i].opacity = lerp(R.segGlowMats[i].opacity, .045, .05);
          R.symMats[i].opacity = lerp(R.symMats[i].opacity, .85, .05);
        }
      }
      if (p3 > .0) { R.wHaloM.opacity = lerp(R.wHaloM.opacity, .18 + p3 * .3, .04); wGrp.scale.x = lerp(wGrp.scale.x, 1.12, .015); wGrp.scale.y = lerp(wGrp.scale.y, 1.12, .015); }
      else { R.wHaloM.opacity = lerp(R.wHaloM.opacity, .18, .03); }
      R.eTorus.material.opacity = (.22 + Math.sin(R.t * 1.6) * .07) + (p3 ? .28 + p3 * .25 : 0);
      R.eTorus.scale.x = 1 + Math.sin(R.t * .9) * .018; R.eTorus.scale.y = R.eTorus.scale.x;
      R.raySprites.forEach(r => {
        r.s.position.x = lerp(r.s.position.x, wGrp.position.x + r.ox * .3, .02);
        r.s.position.y = lerp(r.s.position.y, wGrp.position.y, .02);
        r.m.opacity = (.03 + p1 * .04 + p3 * .03) * (.7 + .3 * Math.sin(R.t * .7 + r.phase));
      });
      const pa = R.ptGeo.attributes.position.array;
      for (let i = 0; i < ptN; i++) { pa[i * 3] += R.ptVel[i].x; pa[i * 3 + 1] += R.ptVel[i].y; pa[i * 3 + 2] += R.ptVel[i].z; if (pa[i * 3 + 1] > 7) pa[i * 3 + 1] = -7; }
      R.ptGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => { renderer.setSize(W(), H(), false); camera.aspect = W() / H(); camera.updateProjectionMatrix(); };
    const onScroll = () => { R.scroll = window.scrollY; };
    const onMouse = e => { R.mx = (e.clientX / window.innerWidth - .5) * 2; R.my = (e.clientY / window.innerHeight - .5) * 2; };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(R.raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#000;overflow-x:hidden}
        @keyframes chevBounce{0%,100%{opacity:.12;transform:translateY(0)}60%{opacity:.7;transform:translateY(4px)}}
        @keyframes fadeUpIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Scroll container */}
      <div style={{ height: '700vh', background: '#000008', position: 'relative' }}>

        {/* Fixed Three.js canvas */}
        <canvas ref={canvasRef} style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          display: 'block', zIndex: 0, pointerEvents: 'none',
        }} />

        {/* Fixed UI overlay */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
          <Brand />
          <SignPopup sign={focusedSign} visible={popupVisible} />
          <ScrollHint visible={hintVisible} />
        </div>
      </div>

      {/* Next section */}
      <NextSection />
    </>
  );
}
