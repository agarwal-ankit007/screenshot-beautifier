import React from 'react'

const BACKGROUNDS = [
    { name: 'Soft Dawn', value: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500', color: 'bg-pink-500' },
    { name: 'Deep Sea', value: 'bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-900', color: 'bg-blue-600' },
    { name: 'Aurora', value: 'bg-gradient-to-tr from-emerald-400 via-teal-500 to-sky-500', color: 'bg-teal-400' },
    { name: 'Sunset', value: 'bg-gradient-to-tr from-orange-400 via-rose-500 to-purple-600', color: 'bg-rose-500' },
    { name: 'Subtle Gray', value: 'bg-gradient-to-tr from-slate-200 to-slate-400', color: 'bg-slate-300' },
    { name: 'Dark Metal', value: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black', color: 'bg-gray-800' },
    { name: 'Clean White', value: 'bg-white', color: 'bg-white border border-slate-300' },
]

const SHADOWS = [
    { name: 'None', value: 'shadow-none' },
    { name: 'Soft', value: 'shadow-lg shadow-black/20' },
    { name: 'Medium', value: 'shadow-2xl shadow-black/40' },
    { name: 'Hard', value: 'shadow-[0_20px_50px_rgba(0,0,0,0.7)]' },
]

const PATTERNS = [
    { name: 'None', value: 'none' },
    { name: 'Dots', value: 'dots' },
    { name: 'Grid', value: 'grid' },
    { name: 'Wavy', value: 'wavy' },
]

export default function Controls({ settings, setSettings }) {
    const handleChange = (key, val) => {
        setSettings(prev => {
            const next = { ...prev, [key]: val }
            // If picking a preset class, clear the custom hex color
            if (key === 'background') next.customColor = ''
            // If picking a custom color, clear the tailwind gradient class
            if (key === 'customColor') next.background = ''
            return next
        })
    }

    return (
        <div className="space-y-8">

            {/* Backgrounds Section */}
            <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Background</label>

                <div className="flex flex-wrap gap-2 items-center">
                    {/* Custom Color Wheel */}
                    <div className="relative group flex items-center justify-center">
                        <input
                            type="color"
                            value={settings.customColor || '#000000'}
                            onChange={(e) => handleChange('customColor', e.target.value)}
                            className={`w-8 h-8 rounded-full cursor-pointer p-0 border-0 bg-transparent transition-transform hover:scale-110 ${settings.customColor ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-800' : ''
                                }`}
                            title="Custom Hex Color"
                            style={{ WebkitAppearance: 'none' }}
                        />
                    </div>

                    <div className="w-[1px] h-6 bg-slate-700 mx-1"></div>

                    {/* Preset Gradients */}
                    {BACKGROUNDS.map(bg => (
                        <button
                            key={bg.name}
                            title={bg.name}
                            onClick={() => handleChange('background', bg.value)}
                            className={`w-8 h-8 rounded-full ${bg.color} transition-transform hover:scale-110 ${settings.background === bg.value ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-800' : ''
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Patterns Section */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pattern Overlay</label>
                <div className="grid grid-cols-2 gap-2">
                    {PATTERNS.map(pat => (
                        <button
                            key={pat.name}
                            onClick={() => handleChange('pattern', pat.value)}
                            className={`py-2 px-3 text-sm rounded-lg border transition-colors ${settings.pattern === pat.value
                                    ? 'bg-slate-700 border-emerald-500 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                }`}
                        >
                            {pat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Padding Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Padding</label>
                    <span className="text-xs text-slate-300">{settings.padding}px</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="128"
                    value={settings.padding}
                    onChange={(e) => handleChange('padding', Number(e.target.value))}
                    className="w-full accent-emerald-500"
                />
            </div>

            {/* Radius Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Corner Radius</label>
                    <span className="text-xs text-slate-300">{settings.radius}px</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="48"
                    value={settings.radius}
                    onChange={(e) => handleChange('radius', Number(e.target.value))}
                    className="w-full accent-emerald-500"
                />
            </div>

            {/* Drop Shadows */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Drop Shadow</label>
                <div className="grid grid-cols-2 gap-2">
                    {SHADOWS.map(shadow => (
                        <button
                            key={shadow.name}
                            onClick={() => handleChange('shadow', shadow.value)}
                            className={`py-2 px-3 text-sm rounded-lg border transition-colors ${settings.shadow === shadow.value
                                    ? 'bg-slate-700 border-emerald-500 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                }`}
                        >
                            {shadow.name}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}
