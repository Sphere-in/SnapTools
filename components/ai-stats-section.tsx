import { Users, Zap, Shield, Star } from "lucide-react"

const stats = [
  {
    icon: Shield,
    value: "256-bit",
    label: "Encrypted",
    description: "Secure data transfers",
  },
  {
    icon: Zap,
    value: "1M+",
    label: "Daily Requests",
    description: "Scalable API infra",
  },
  {
    icon: Star,
    value: "99.99%",
    label: "Uptime",
    description: "Always online",
  },
  {
    icon: Users,
    value: "GDPR",
    label: "Compliant",
    description: "Meets key standards",
  },
]


export function AIStatsSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 animate-fade-in">
        <div

          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Powering AI Innovation</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who trust our AI-powered tools to enhance their productivity and creativity
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group animate-fade-in"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">{stat.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}