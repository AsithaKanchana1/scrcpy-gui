import { CheckCircle2, Download, Smartphone, Cpu, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    binaryStatus: { found: boolean; message: string };
    devices: string[];
    onDownload: () => void;
    isDownloading: boolean;
    downloadProgress: number;
    onComplete: () => void;
}

export default function OnboardingModal({
    isOpen,
    onClose,
    binaryStatus,
    devices,
    onDownload,
    isDownloading,
    downloadProgress,
    onComplete
}: OnboardingModalProps) {
    if (!isOpen) return null;

    const steps = [
        {
            id: 'binaries',
            title: 'Core Components',
            description: 'Scrcpy and ADB binaries are required to communicate with your device.',
            status: binaryStatus.found ? 'completed' : 'pending',
            icon: <Cpu size={20} className={binaryStatus.found ? "text-emerald-400" : "text-zinc-500"} />
        },
        {
            id: 'connection',
            title: 'Device Detection',
            description: 'Connect your Android device via USB or Wireless ADB.',
            status: devices.length > 0 ? 'completed' : 'pending',
            icon: <Smartphone size={20} className={devices.length > 0 ? "text-emerald-400" : "text-zinc-500"} />,
            optional: true
        }
    ];

    const isReady = binaryStatus.found;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500"></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                <div className="absolute top-0 right-0 p-6 z-30">
                    <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side: Branding/Logo */}
                    <div className="hidden md:flex md:w-1/3 bg-primary/10 border-r border-zinc-800 p-8 flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                                scrcpy <span className="text-primary not-italic">GUI</span>
                            </h2>
                            <p className="text-[10px] uppercase font-black tracking-widest text-primary mt-2">v3.1 Onboarding</p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm">
                                <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                                    "Welcome to ScrcpyGUI. Let's get your workstation ready for professional Android mirroring."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Checklist */}
                    <div className="flex-1 p-8 sm:p-12">
                        <div className="mb-10">
                            <h3 className="text-2xl font-black tracking-tight text-white mb-2 uppercase italic">Setup Checklist</h3>
                            <p className="text-zinc-500 text-sm font-medium">Follow these steps to initialize the environment.</p>
                        </div>

                        <div className="space-y-8">
                            {steps.map((step) => (
                                <div key={step.id} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${step.status === 'completed'
                                            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                            : 'bg-zinc-900 border-zinc-800 group-hover:border-zinc-700'
                                            }`}>
                                            {step.status === 'completed' ? <CheckCircle2 size={20} className="text-emerald-400" /> : step.icon}
                                        </div>
                                        <div className="w-0.5 h-full bg-zinc-800/50 mt-2 min-h-[20px] last:hidden" />
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className={`text-sm font-black uppercase tracking-widest ${step.status === 'completed' ? 'text-white' : 'text-zinc-400'}`}>
                                                {step.title}
                                            </h4>
                                            {step.optional && <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">Ready check</span>}
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed font-medium mb-3">{step.description}</p>

                                        {step.id === 'binaries' && step.status !== 'completed' && (
                                            <div className="space-y-3">
                                                <button
                                                    onClick={onDownload}
                                                    disabled={isDownloading}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    {isDownloading ? (
                                                        <><RefreshCcw size={12} className="animate-spin" /> Fetching Components...</>
                                                    ) : (
                                                        <><Download size={12} /> Auto-Install Core</>
                                                    )}
                                                </button>

                                                {isDownloading && (
                                                    <div className="w-full max-w-[200px]">
                                                        <div className="flex justify-between text-[8px] font-black uppercase text-zinc-500 mb-1">
                                                            <span>Progress</span>
                                                            <span>{downloadProgress}%</span>
                                                        </div>
                                                        <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                                                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {step.id === 'connection' && devices.length === 0 && (
                                            <div className="flex items-center gap-2 text-yellow-500/80">
                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Waiting for hardware...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Quick Tip</span>
                                <span className="text-[11px] font-medium text-zinc-400">USB Debugging must be enabled on Android.</span>
                            </div>

                            <button
                                onClick={onComplete}
                                disabled={!isReady}
                                className={`group flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isReady
                                    ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,255,255,0.1)]'
                                    : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                                    }`}
                            >
                                Get Started
                                <ArrowRight size={16} className={`transition-transform duration-300 ${isReady ? 'group-hover:translate-x-1' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for spinning refresh icon (needed for isDownloading state in steps)
const RefreshCcw = ({ size, className }: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
    </svg>
);
