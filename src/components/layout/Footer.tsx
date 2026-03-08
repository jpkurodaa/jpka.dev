import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-ash px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-smoke">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
        <p className="text-xs text-smoke/50">
          Built with intention.
        </p>
      </div>
    </footer>
  );
}
