import { LinkButton } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const defaultProps = {
  heading: "Call to Action",
  description:
    "Get access to our collection of pre-built blocks and components today.",
  buttons: {
    primary: {
      text: "Get Access",
      url: "https://shadcnblocks.com",
    },
    secondary: {
      text: "Schedule a Demo",
      url: "https://shadcnblocks.com",
    },
  },
};

const Cta10 = (props) => {
  const { heading, description, buttons, reference, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("py-12 md:py-16 lg:py-32", className)}>
      <div className="container mx-auto">
          <div
            className="data-plate relative mx-auto flex w-full flex-col gap-16 bg-primary p-8 lg:flex-row lg:items-center lg:p-12">
            <div className="flex flex-1 flex-col gap-3 md:gap-4 lg:gap-6">
              {reference && (
                <span className="data-plate-ref text-[11px] uppercase text-white/40">
                  {reference}
                </span>
              )}
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
                {heading}
              </h2>
              <p className="max-w-xl text-white lg:text-lg">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {buttons?.secondary && (
                <LinkButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white" href={buttons.secondary.url}>
                  {buttons.secondary.text}
                </LinkButton>
              )}
              {buttons?.primary && (
                <LinkButton size="lg" className="bg-white text-primary hover:bg-white/90" href={buttons.primary.url}>
                  {buttons.primary.text}
                </LinkButton>
              )}
            </div>
          </div>
      </div>
    </section>
  );
};

export { Cta10 };
