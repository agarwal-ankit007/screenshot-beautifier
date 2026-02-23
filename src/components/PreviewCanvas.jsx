export default function PreviewCanvas({ image, settings }) {
    if (!image) return null

    // Ensure padding is applied to the wrapper to give room for the beautiful background
    return (
        <div
            className={`relative flex items-center justify-center transition-all duration-300 ${settings.background}`}
            style={{ padding: `${settings.padding}px` }}
        >
            <img
                src={image}
                alt="Uploaded screenshot"
                className={`max-w-full max-h-full object-contain ${settings.shadow} transition-all duration-300`}
                style={{ borderRadius: `${settings.radius}px` }}
            />
        </div>
    )
}
