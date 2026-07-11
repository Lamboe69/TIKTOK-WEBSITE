import { Icons } from './Icons'

export default function Stepper({ steps, checked, onToggle }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dynasty-purple to-dynasty-orange" />

      <div className="space-y-6">
        {steps.map((step, i) => {
          const isChecked = checked?.[i] || false
          return (
            <div
              key={i}
              id={step.id || `step-${i + 1}`}
              className="relative flex gap-6"
            >
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg shadow-lg transition-all duration-300 ${
                  isChecked
                    ? 'bg-green-500 text-white scale-110'
                    : 'bg-dynasty-purple text-white'
                }`}>
                  {isChecked ? (
                    <span className="w-5 h-5 block">{Icons.check}</span>
                  ) : (
                    i + 1
                  )}
                </div>
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${
                      isChecked ? 'text-green-600' : 'text-dynasty-charcoal'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isChecked ? 'text-gray-400 line-through' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {onToggle && (
                    <button
                      onClick={() => onToggle(i)}
                      className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        isChecked
                          ? 'bg-green-50 border-green-200 text-green-600'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-dynasty-purple/30 hover:text-dynasty-purple'
                      }`}
                    >
                      {isChecked ? 'Done' : 'Mark done'}
                    </button>
                  )}
                </div>

                {step.prayer && (
                  <div className="mt-3 p-4 bg-dynasty-cream rounded-lg border border-dynasty-purple/10">
                    <p className="text-xs text-dynasty-purple font-medium mb-1">Sample Prayer:</p>
                    <p className="text-sm text-dynasty-charcoal italic">"{step.prayer}"</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
