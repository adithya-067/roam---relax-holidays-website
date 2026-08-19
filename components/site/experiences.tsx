import { EXPERIENCES } from '@/lib/site-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

export function Experiences() {
  return (
    <section id="experiences" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Travel Your Way"
          description="Whatever the occasion, we design the journey around you — every trip tailored to how you love to travel."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.name} delay={(i % 3) * 100}>
              <article className="group relative h-72 overflow-hidden rounded-sm">
                <img
                  src={exp.image || '/placeholder.svg'}
                  alt={exp.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/10" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-2xl text-white">{exp.name}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-white/80">
                      <span className="mt-2 block">{exp.description}</span>
                    </p>
                  </div>
                  <span className="mt-3 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-16" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
