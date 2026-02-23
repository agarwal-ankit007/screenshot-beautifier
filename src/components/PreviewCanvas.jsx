const PATTERN_URLS = {
    none: '',
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    wavy: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.392-5.351 2.664-10.063 6.369-13.746 3.146-3.132 6.883-4.8 11.238-5.337C42.84.409 46.88.98 50.84 3.328c3.96 2.348 7.378 5.762 10.364 9.4 3.738 4.545 7.942 8.444 12.825 11.516C78.9 27.28 84.73 29.176 90.95 28.94c6.22-.235 11.96-2.527 16.51-6.6-4.55 4.073-10.29 6.365-16.51 6.6-6.22.236-12.05-1.66-16.92-4.696-4.883-3.072-9.087-6.97-12.825-11.516C58.218 9.09 54.8 5.676 50.84 3.328c-3.96-2.348-8-2.92-12.05-1.589-4.355.537-8.092 2.205-11.238 5.337C23.848 9.937 21.576 14.649 21.184 20H0v-2h21.184zm-2.074 0H0v-1h19.11z' fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
}

export default function PreviewCanvas({ image, settings }) {
    if (!image) return null

    // Ensure padding is applied to the wrapper to give room for the beautiful background
    return (
        <div
            className={`relative flex items-center justify-center transition-all duration-300 ${settings.background}`}
            style={{
                padding: `${settings.padding}px`,
                backgroundColor: settings.customColor || undefined,
                backgroundImage: settings.pattern && settings.pattern !== 'none'
                    ? PATTERN_URLS[settings.pattern]
                    : undefined
            }}
        >
            <img
                src={image}
                alt="Uploaded screenshot"
                className={`max-w-full max-h-full object-contain ${settings.shadow} transition-all duration-300 z-10`}
                style={{ borderRadius: `${settings.radius}px` }}
            />
        </div>
    )
}
