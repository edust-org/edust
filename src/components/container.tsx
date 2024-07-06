import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const containerVariants = cva("container mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    variant: { containerFluid: "max-w-none px-4 sm:px-6 lg:px-8" },
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

/**
 * `Container` Component
 *
 * A flexible container component used to wrap content with consistent padding and
 * horizontal centering according to the application's design system. This component
 * is highly customizable through its props and supports responsive design adjustments.
 *
 * The component can be used as a standard `div` or as a React Fragment if no additional
 * DOM element is desired, controlled by the `asChild` prop.
 *
 * Usage:
 *
 * To use the `Container` component, simply wrap your content with it and optionally
 * provide any desired props for customization.
 *
 * Example 1 - Standard usage:
 * ```
 * <Container>
 *   Your content here
 * </Container>
 * ```
 *
 * Example 2 - Use as a React Fragment:
 * ```
 * <Container asChild>
 *   Your content here, without an additional div wrapper
 * </Container>
 * ```
 *
 * Example 3 - Custom class name:
 * ```
 * <Container className="customClass">
 *   Your content here with additional custom styling
 * </Container>
 * ```
 */
const Container: React.FC<ContainerProps> = ({
  asChild,
  className,
  children,
  variant,
  ...props
}) => {
  const Comp = asChild ? React.Fragment : "div";
  const containerClasses = cn(containerVariants({ variant }), className);

  return (
    <Comp className={containerClasses} {...props}>
      {children}
    </Comp>
  );
};

export { Container };
