import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
        <form action="/api/auth/sign-out" method="POST">
          <button
            type="submit"
            className="text-sm text-red-600 hover:text-red-800"
          >
            Sign Out
          </button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
