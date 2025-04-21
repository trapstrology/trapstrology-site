import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <img src="/trapstrology-logo.svg" alt="Trapstrology" width={200} />
      </Link>
    </header>
  );
}
