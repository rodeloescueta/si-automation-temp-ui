import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SI Automation Tools</h1>
          <p className="text-lg text-muted-foreground">
            A collection of automation tools to streamline your workflow
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/pitch-template-generator" className="block">
            <div className="group hover:shadow-lg transition-all duration-200 rounded-xl border p-6 space-y-4">
              <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                Pitch Template Generator
              </h2>
              <p className="text-muted-foreground">
                Generate customized pitch templates for leads using Attio data
              </p>
            </div>
          </Link>

          {/* Add more feature cards here as they become available */}
        </div>
      </main>
    </div>
  );
}
