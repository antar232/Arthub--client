// import { auth } from "../auth";
// import { headers } from "next/headers";
// //import { redirect } from "next/navigation";

// export const getUserSession = async () => {
//     const session = await auth.api.getSession({
//         headers: await headers() // some endpoints might require headers
//     })

//     return session?.user || null;
// }

import { auth } from "@/lib/auth";

export async function getUserSession() {
  try {
    const session = await auth.api.getSession();

    return session?.user || null;
  } catch (err) {
    console.log(err);

    return null;
  }
}