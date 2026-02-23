import { useState, useRef } from 'react'
import Uploader from './components/Uploader'
import PreviewCanvas from './components/PreviewCanvas'
import Controls from './components/Controls'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'

function App() {
  const [image, setImage] = useState(null)
  const [settings, setSettings] = useState({
    padding: 64,
    radius: 16,
    shadow: 'shadow-2xl',
    background: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500', // Pre-defined tailwind class
    customColor: '', // Used if they pick a color from the wheel
    pattern: 'none' // 'dots', 'grid', 'wavy', or 'none'
  })

  const previewRef = useRef(null)

  const handleExport = async () => {
    if (!previewRef.current) return
    try {
      // Small timeout trick or multiple passes sometimes helps html-to-image with external fonts/images
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = 'beautiful-screenshot.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export image', err)
      alert("Failed to export image.")
    }
  }

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">

      {/* Sidebar Controls */}
      <aside className="w-80 h-full bg-slate-800 border-r border-slate-700 flex flex-col z-10 shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Screenshot Beautifier
          </h1>
          <p className="text-xs text-slate-400 mt-1">Turn ideas into signal.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <Controls settings={settings} setSettings={setSettings} />
        </div>

        <div className="p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={handleExport}
            disabled={!image}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export Image
          </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 h-full relative flex items-center justify-center bg-slate-950/50 p-8">
        {!image ? (
          <Uploader onImageLoad={setImage} />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <button
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-sm border border-slate-600 transition-colors"
            >
              Clear Image
            </button>

            {/* The actual exportable canvas node */}
            <div ref={previewRef} className="max-w-full max-h-full flex items-center justify-center relative transition-all duration-300">
              <PreviewCanvas image={image} settings={settings} />
            </div>
          </div>
        )}
      </main>

    </div>
  )
}

export default App
