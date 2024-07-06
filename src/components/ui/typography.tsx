// community
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

type VariantKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "table"
  | "list"
  | "code"
  | "large"
  | "anchor";

type AffectsKey =
  | "lead"
  | "small"
  | "muted"
  | "removePaddingMargin"
  | undefined;

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",

      blockquote: "mt-6 border-l-2 pl-6 italic",
      table:
        "w-full [&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left [&_td]:[&[align=center]]:text-center [&_td]:[&[align=right]]:text-right [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_th]:[&[align=center]]:text-center [&_th]:[&[align=right]]:text-right [&_tr]:m-0 [&_tr]:border-t [&_tr]:p-0 even:[&_tr]:bg-muted",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      large: "text-lg font-semibold",
      anchor: "font-medium text-primary underline underline-offset-4",
    },
    affects: {
      lead: "text-xl text-muted-foreground",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      removePaddingMargin: "[&:not(:first-child)]:mt-0",
    },
  },
});

const variantToTag: Record<VariantKey, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",

  blockquote: "blockquote",
  table: "table",
  list: "ul",
  code: "code",
  large: "div",
  anchor: "a",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantKey;
  affects?: AffectsKey;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disableSelect?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "p",
      affects = undefined,
      children,
      className,
      asChild = false,
      disableSelect = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : variantToTag[variant];

    return (
      <Comp
        className={cn(
          typographyVariants({ variant, affects, className }),
          disableSelect ? "select-none" : ""
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
