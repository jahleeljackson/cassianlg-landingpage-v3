import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { bookingHref } from "@/lib/site";

type BookingButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "inverse" | "line";
};

export function BookingButton({
  children,
  className = "",
  variant = "primary",
}: BookingButtonProps) {
  return (
    <ButtonLink href={bookingHref()} className={className} variant={variant}>
      {children}
    </ButtonLink>
  );
}
