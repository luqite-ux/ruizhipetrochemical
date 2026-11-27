'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Layers, RotateCw, Pause, Play, Eye, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { withLocale, type Locale } from '@/lib/i18n'

type ModelKey = 'column' | 'exchanger' | 'reactor' | 'tank'

const MODELS_ZH: Record<
  ModelKey,
  {
    name: string
    code: string
    summary: string
    specs: { label: string; value: string }[]
  }
> = {
  column: {
    name: '工艺精馏塔',
    code: 'RZ-TW-DIST',
    summary: '多塔盘立式精馏与分离塔器，配备人孔、塔顶气相接管及可剖视塔盘内件结构。',
    specs: [
      { label: '塔体高度', value: '最高 108 米级' },
      { label: '设计压力', value: '≥ 0.1 MPa / 按需定制' },
      { label: '设计寿命', value: '10 年' },
      { label: '可选材质', value: '碳钢 / SS304 / SS316L / 合金' },
    ],
  },
  exchanger: {
    name: '管壳式换热器',
    code: 'RZ-HX-ST480',
    summary: '卧式工业管壳换热器，配备螺栓连接半球形管箱封头、管板及螺旋折流板管束剖视。',
    specs: [
      { label: '换热面积', value: '167 – 480 m²+' },
      { label: '折流板型式', value: '螺旋折流板 / 弓形折流板' },
      { label: '设计寿命', value: '10 年' },
      { label: '检验检测', value: '无损检测 + 水压 + 光谱复检' },
    ],
  },
  reactor: {
    name: '带搅拌压力反应釜',
    code: 'RZ-RX-AGIT',
    summary: '立式夹套压力反应容器，配备顶部搅拌驱动装置、多层搅拌桨轴及法兰工艺接管。',
    specs: [
      { label: '工作压力', value: '≥ 0.1 MPa (PV ≥ 2.5 MPa·L)' },
      { label: '装置形式', value: '带搅拌 / 环流中试 / 主反应器' },
      { label: '重型吊装实绩', value: '单台高达 386 吨' },
      { label: 'OEM / ODM', value: '按工艺数据表定制' },
    ],
  },
  tank: {
    name: '工业大型储罐',
    code: 'RZ-TK-1000',
    summary: '圆筒形常压及低压化工储罐，配备外盘梯加强圈、罐顶呼吸口与基础锚固环。',
    specs: [
      { label: '容积范围', value: '1,000 – 5,000 m³' },
      { label: '压力等级', value: '常压（< 0.1 MPa）' },
      { label: '常规交期', value: '30 – 45 天（标准配置）' },
      { label: '起订量', value: '1 台' },
    ],
  },
}

const MODELS: Record<
  ModelKey,
  {
    name: string
    code: string
    summary: string
    specs: { label: string; value: string }[]
  }
> = {
  column: {
    name: 'Distillation Column',
    code: 'RZ-TW-DIST',
    summary: 'Multi-tray vertical rectification & separation tower with manways, overhead vapor nozzle, and cutaway tray internals.',
    specs: [
      { label: 'Height Class', value: 'Up to 108 m' },
      { label: 'Design Pressure', value: '≥ 0.1 MPa / Custom' },
      { label: 'Design Life', value: '10 Years' },
      { label: 'Materials', value: 'CS / SS304 / SS316L / Alloy' },
    ],
  },
  exchanger: {
    name: 'Shell-and-Tube Exchanger',
    code: 'RZ-HX-ST480',
    summary: 'Horizontal industrial heat exchanger with bolted hemispherical channel heads, tube sheet, and helical baffle bundle cutaway.',
    specs: [
      { label: 'Heat Transfer Area', value: '167 – 480 m²+' },
      { label: 'Baffle Design', value: 'Helical / Segmental' },
      { label: 'Design Life', value: '10 Years' },
      { label: 'Inspection', value: 'NDT + Hydrostatic + PMI' },
    ],
  },
  reactor: {
    name: 'Agitated Pressure Reactor',
    code: 'RZ-RX-AGIT',
    summary: 'Vertical jacketed pressure reactor featuring top agitator drive, multi-blade shaft impeller, and flanged process nozzles.',
    specs: [
      { label: 'Working Pressure', value: '≥ 0.1 MPa (PV ≥ 2.5 MPa·L)' },
      { label: 'Configuration', value: 'Agitated / Loop Pilot / Main' },
      { label: 'Heavy Hoist Proven', value: 'Up to 386 Tons / Unit' },
      { label: 'OEM / ODM', value: 'Custom to Process Datasheet' },
    ],
  },
  tank: {
    name: 'Industrial Storage Tank',
    code: 'RZ-TK-1000',
    summary: 'Cylindrical atmospheric and low-pressure chemical storage tank with external access rings, roof vents, and base anchor ring.',
    specs: [
      { label: 'Capacity Range', value: '1,000 – 5,000 m³' },
      { label: 'Pressure Class', value: 'Atmospheric (< 0.1 MPa)' },
      { label: 'Lead Time', value: '30 – 45 Days (Standard)' },
      { label: 'MOQ', value: '1 Unit' },
    ],
  },
}

function buildAssembly(key: ModelKey, cutaway: boolean): THREE.Group {
  const group = new THREE.Group()

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xdbe4f0,
    metalness: 0.72,
    roughness: 0.28,
    side: THREE.DoubleSide,
  })
  const navyMat = new THREE.MeshStandardMaterial({
    color: 0x1b3670,
    metalness: 0.45,
    roughness: 0.35,
  })
  const crimsonMat = new THREE.MeshStandardMaterial({
    color: 0xd92027,
    metalness: 0.35,
    roughness: 0.4,
  })
  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.8,
    roughness: 0.22,
  })
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    metalness: 0.75,
    roughness: 0.3,
  })

  const thetaLength = cutaway ? Math.PI * 1.25 : Math.PI * 2

  if (key === 'column') {
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 3.6, 48, 1, cutaway, 0, thetaLength), steelMat)
    group.add(shell)
    const topCap = new THREE.Mesh(new THREE.SphereGeometry(0.68, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), steelMat)
    topCap.position.y = 1.8
    group.add(topCap)
    const botCap = new THREE.Mesh(new THREE.SphereGeometry(0.68, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), steelMat)
    botCap.position.y = -1.8
    group.add(botCap)
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.78, 0.55, 36), navyMat)
    skirt.position.y = -2.2
    group.add(skirt)

    // Internal sieve trays (visible in cutaway)
    for (let i = -1.2; i <= 1.2; i += 0.4) {
      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.04, 32), i === 0 ? crimsonMat : navyMat)
      tray.position.y = i
      group.add(tray)
    }
    // External stiffening / platform rings & nozzles
    for (const y of [-0.9, 0.3, 1.35]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.03, 12, 48), navyMat)
      ring.rotation.x = Math.PI / 2
      ring.position.y = y
      group.add(ring)
    }
    const topNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.45, 20), crimsonMat)
    topNozzle.position.y = 2.55
    group.add(topNozzle)
    const sideNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.45, 20), crimsonMat)
    sideNozzle.rotation.z = Math.PI / 2
    sideNozzle.position.set(-0.85, 0.5, 0)
    group.add(sideNozzle)
  } else if (key === 'exchanger') {
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 3.2, 48, 1, cutaway, 0, thetaLength), steelMat)
    shell.rotation.z = Math.PI / 2
    group.add(shell)

    // Bolted flanges & hemispherical heads
    for (const x of [-1.6, 1.6]) {
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.14, 36), navyMat)
      flange.rotation.z = Math.PI / 2
      flange.position.x = x
      group.add(flange)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 18), steelMat)
      head.position.x = x > 0 ? x + 0.05 : x - 0.05
      head.scale.set(0.75, 1, 1)
      group.add(head)
    }
    // Internal tube bundle + helical baffles
    for (let r = 0; r < 2; r++) {
      const count = r === 0 ? 1 : 8
      const rad = r === 0 ? 0 : 0.34
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.1, 12), copperMat)
        tube.rotation.z = Math.PI / 2
        tube.position.set(0, Math.sin(ang) * rad, Math.cos(ang) * rad)
        group.add(tube)
      }
    }
    for (let x = -1.1; x <= 1.1; x += 0.44) {
      const baffle = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.035, 28, 1, false, 0, Math.PI * 1.4), crimsonMat)
      baffle.rotation.z = Math.PI / 2
      baffle.rotation.x = x * 1.1
      baffle.position.x = x
      group.add(baffle)
    }
    // Saddles & nozzles
    for (const x of [-0.95, 0.95]) {
      const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.55, 0.95), navyMat)
      saddle.position.set(x, -0.75, 0)
      group.add(saddle)
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.42, 20), crimsonMat)
      nozzle.position.set(x, 0.78, 0)
      group.add(nozzle)
    }
  } else if (key === 'reactor') {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 2.2, 48, 1, cutaway, 0, thetaLength), steelMat)
    group.add(body)
    const jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 1.5, 48, 1, true, 0, thetaLength), navyMat)
    jacket.position.y = -0.15
    group.add(jacket)
    const topDome = new THREE.Mesh(new THREE.SphereGeometry(0.88, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), steelMat)
    topDome.position.y = 1.1
    group.add(topDome)
    const botDome = new THREE.Mesh(new THREE.SphereGeometry(0.88, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), steelMat)
    botDome.position.y = -1.1
    group.add(botDome)
    // Agitator motor & internal shaft + impellers
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.65, 24), crimsonMat)
    motor.position.y = 2.25
    group.add(motor)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 3.2, 16), tubeMat)
    shaft.position.y = 0.45
    group.add(shaft)
    for (const y of [-0.6, 0.15]) {
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.14, 0.04), crimsonMat)
      blade1.position.y = y
      blade1.rotation.x = 0.35
      group.add(blade1)
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 1.1), crimsonMat)
      blade2.position.y = y
      blade2.rotation.z = 0.35
      group.add(blade2)
    }
    // Support legs
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.1, 14), navyMat)
      leg.position.set(Math.cos(a) * 0.72, -1.55, Math.sin(a) * 0.72)
      group.add(leg)
    }
  } else {
    // 1,000 m3 vertical cylindrical storage tank
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 2.3, 56, 1, cutaway, 0, thetaLength), steelMat)
    group.add(wall)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.28, 0.38, 56), steelMat)
    roof.position.y = 1.34
    group.add(roof)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.38, 0.18, 56), navyMat)
    base.position.y = -1.24
    group.add(base)
    // Crimson brand band & internal fluid level plane
    const band = new THREE.Mesh(new THREE.CylinderGeometry(1.265, 1.265, 0.24, 56, 1, true, 0, thetaLength), crimsonMat)
    band.position.y = 0.55
    group.add(band)
    const rail = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.025, 10, 56), navyMat)
    rail.rotation.x = Math.PI / 2
    rail.position.y = 1.48
    group.add(rail)
    if (cutaway) {
      const liquid = new THREE.Mesh(
        new THREE.CylinderGeometry(1.18, 1.18, 1.35, 40),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.32, metalness: 0.1, roughness: 0.2 })
      )
      liquid.position.y = -0.45
      group.add(liquid)
    }
  }

  return group
}

export function ThreeVesselStudio({ locale = 'en' }: { locale?: Locale }) {
  const [active, setActive] = useState<ModelKey>('column')
  const [cutaway, setCutaway] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const mountRef = useRef<HTMLDivElement | null>(null)
  const visibleRef = useRef(true)
  const autoRotateRef = useRef(true)

  useEffect(() => {
    autoRotateRef.current = autoRotate
  }, [autoRotate])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    if (mq.matches) setAutoRotate(false)
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(container.clientWidth || 640, container.clientHeight || 420)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      36,
      (container.clientWidth || 640) / (container.clientHeight || 420),
      0.1,
      100
    )
    camera.position.set(0, 1.1, 6.4)
    camera.lookAt(0, 0, 0)

    // Crisp architectural light-studio lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 1.45)
    scene.add(hemi)
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.8)
    dir1.position.set(5, 8, 6)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(0xdbeafe, 0.9)
    dir2.position.set(-5, 3, -4)
    scene.add(dir2)

    // Subtle engineering reference floor grid
    const grid = new THREE.GridHelper(9, 18, 0xcbd5e1, 0xe2e8f0)
    grid.position.y = -2.45
    scene.add(grid)

    const assembly = buildAssembly(active, cutaway)
    assembly.rotation.y = 0.55
    scene.add(assembly)

    // Pointer drag orbit
    let dragging = false
    let prevX = 0
    let prevY = 0
    const onDown = (e: PointerEvent) => {
      dragging = true
      prevX = e.clientX
      prevY = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      prevX = e.clientX
      prevY = e.clientY
      assembly.rotation.y += dx * 0.01
      assembly.rotation.x = Math.max(-0.6, Math.min(0.6, assembly.rotation.x + dy * 0.008))
    }
    const onUp = () => {
      dragging = false
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries.some((e) => e.isIntersecting)
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    const onResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth || 640
      const h = container.clientHeight || 420
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let rafId = 0
    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop)
      if (!visibleRef.current || !renderer) return
      if (autoRotateRef.current && !dragging) {
        assembly.rotation.y += 0.0055
      }
      renderer.render(scene, camera)
    }
    if (reducedMotion) {
      renderer.render(scene, camera)
    } else {
      renderLoop()
    }

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      renderer?.domElement.removeEventListener('pointerdown', onDown)
      renderer?.dispose()
    }
  }, [active, cutaway, reducedMotion])

  const isZh = locale === 'zh'
  const modelsMap = isZh ? MODELS_ZH : MODELS
  const current = modelsMap[active]

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative min-w-0 flex flex-col border-b border-hairline lg:border-r lg:border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-alabaster/80 px-4 py-3">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(modelsMap) as ModelKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active === key
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white text-body border border-hairline hover:border-navy/40 hover:text-navy'
                  }`}
                >
                  {modelsMap[key].name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCutaway((v) => !v)}
                className="h-8 rounded-full text-xs"
              >
                <Layers className="mr-1.5 size-3.5 text-crimson" />
                {cutaway ? (isZh ? '剖视已开启' : 'Cutaway On') : isZh ? '完整壳体' : 'Full Shell'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAutoRotate((v) => !v)}
                className="h-8 rounded-full text-xs"
                aria-label={autoRotate ? (isZh ? '暂停旋转' : 'Pause rotation') : isZh ? '恢复旋转' : 'Resume rotation'}
              >
                {autoRotate ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </Button>
            </div>
          </div>

          <div
            ref={mountRef}
            className="blueprint-grid relative h-[360px] w-full cursor-grab active:cursor-grabbing sm:h-[430px]"
            aria-label={isZh ? `${current.name} 交互式 3D 剖视模型` : `Interactive 3D cutaway model of ${current.name}`}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-white px-4 py-2.5 text-xs text-body">
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Compass className="size-3.5 text-navy" />
              {isZh ? '拖动 360° 查看内部结构' : 'Drag 360° to inspect internal geometry'}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-navy">
              <Eye className="size-3.5" />
              {isZh ? 'WebGL 实时三维视图' : 'WebGL PBR Studio'}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex flex-col justify-between bg-white p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                {current.code}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-alabaster px-2.5 py-1 font-mono text-[11px] text-navy border border-hairline">
                <RotateCw className="size-3" /> {isZh ? '交互式 3D' : 'Interactive 3D'}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-ink">{current.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{current.summary}</p>

            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {current.specs.map((s) => (
                <div key={s.label} className="rounded-xl border border-hairline bg-alabaster/70 p-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
            <Button asChild className="rounded-full bg-navy px-6 text-white hover:bg-navy/90">
              <a href={withLocale('/products', locale)}>{isZh ? '浏览完整产品目录' : 'Browse Full Equipment Catalog'}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-5">
              <a href={withLocale('/contact#inquiry-rfq', locale)}>{isZh ? '提交工艺数据表' : 'Submit Process Datasheet'}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
