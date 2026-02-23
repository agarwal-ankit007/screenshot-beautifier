import { useCallback, useEffect } from 'react'
import { Upload } from 'lucide-react'

export default function Uploader({ onImageLoad }) {
    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = (e) => onImageLoad(e.target.result)
        reader.readAsDataURL(file)
    }

    const onDrop = useCallback((e) => {
        e.preventDefault()
        handleFile(e.dataTransfer.files[0])
    }, [])

    const onDragOver = (e) => e.preventDefault()

    useEffect(() => {
        const handlePaste = (e) => {
            const items = e.clipboardData?.items
            if (!items) return
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    handleFile(items[i].getAsFile())
                    break
                }
            }
        }
        window.addEventListener('paste', handlePaste)
        return () => window.removeEventListener('paste', handlePaste)
    }, [])

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="w-full max-w-2xl h-80 border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-800/50 hover:bg-slate-800/80 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload').click()}
        >
            <Upload size={48} className="mb-4 text-slate-500" />
            <p className="text-lg font-medium mb-1">Click or drag image to upload</p>
            <p className="text-sm text-slate-500">You can also paste (Ctrl+V) from your clipboard</p>

            <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
    )
}
