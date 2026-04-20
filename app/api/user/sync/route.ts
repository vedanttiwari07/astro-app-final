import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const syncedUser = await prisma.user.upsert({
    where: {
      clerkUserId: userId,
    },
    update: {
      email: email ?? "",
    },
    create: {
      clerkUserId: userId,
      email: email ?? "",
    },
  });

  return Response.json({
    message: "User synced successfully",
    user: syncedUser,
  });
}
