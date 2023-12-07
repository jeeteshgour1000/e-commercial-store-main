import { Database } from "@/app/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const data = await supabase
      .from("tb_devices")
      .select("*")
      .eq("type", params.name);

    console.log("hhhhhhhffvgffggfggffgfgfgfgffffgffgggfggffgffgfgfcfg");

    return new Response(JSON.stringify({ message: data.data }), {
      status: 200,
      headers: { revalidate: dynamic },
    });
  } catch (error) {
    console.error("Error fetching files: ", error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}
