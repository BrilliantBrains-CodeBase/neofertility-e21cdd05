import { useState } from "react";
import { Facebook, Instagram, Linkedin, Share2, Youtube } from "lucide-react";
import { CLINIC, track } from "@/lib/clinic";

/* Same four entries, same icons and same disc styling as the footer's social row. The
   list is duplicated rather than shared because the footer's version is part of a
   larger column layout there; only the shape is worth keeping identical. */
const socials = [
  { href: CLINIC.social.facebook, label: "Facebook", Icon: Facebook },
  { href: CLINIC.social.instagram, label: "Instagram", Icon: Instagram },
  { href: CLINIC.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CLINIC.social.youtube, label: "YouTube", Icon: Youtube },
];

/* Reveal is driven three ways so the fan is not hover-only: pointer hover, keyboard
   focus moving into the group, and an explicit click on the trigger. Click also covers
   the trackpad-less and touch-on-desktop cases, where hover never fires. */
const reveal =
  "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 " +
  "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 " +
  "group-data-[open=true]:visible group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100";

export function SocialRail({ sourcePage }: { sourcePage: string }) {
  const [open, setOpen] = useState(false);

  /* Hidden below lg: the MobileActionBar owns the persistent actions there, and this
     sits exactly where its Call segment is. Mirrors WhatsAppFloat's right-6 bottom-8. */
  return (
    <div
      data-open={open}
      onMouseLeave={() => setOpen(false)}
      className="group fixed bottom-8 left-6 z-40 hidden lg:block"
    >
      {/* pb-3 rather than mb-3: padding keeps this stack's hover box touching the
          trigger, so the pointer never crosses a dead gap on the way up and the fan
          stays open. invisible (not just opacity-0) also keeps the links out of the
          tab order and off the a11y tree while collapsed. */}
      <nav
        aria-label="Neo Fertility Clinic on social media"
        className={`absolute bottom-full left-0 flex flex-col-reverse items-center gap-3 pb-3 ${reveal} invisible translate-y-1 opacity-0 transition-all duration-200 ease-out`}
      >
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            onClick={() => track("social_click", { network: label, source_page: sourcePage })}
            className="flex size-11 items-center justify-center rounded-full bg-pink-50 text-plum-900 shadow-rail transition-colors hover:bg-pink-500 hover:text-paper"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-label="Share Neo Fertility Clinic"
        onClick={() => setOpen((v) => !v)}
        className="flex size-14 items-center justify-center rounded-full bg-pink-600 text-paper shadow-rail transition-transform hover:scale-105"
      >
        <Share2 className="size-6" />
      </button>
    </div>
  );
}
