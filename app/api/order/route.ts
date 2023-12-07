import { Database } from "@/app/types/supabase";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await supabase.from("tb_orders").select("*").order('id', { ascending: true });

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

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await supabase.from("tb_orders").insert([
      {
        client_id: data.client_id,
        item_id: data.item_id,
        quantity: data.quantity,
      },
    ]);

    await supabase.from("tb_cart").delete().eq("id", data.id);

    await supabase
      .from("tb_device_properties")
      .update({ quantity: data.left_items })
      .eq("id", data.item_id);

    return new Response(
      JSON.stringify({ message: "The item added to the cart successfully" }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "There is a problem" }), {
      headers: { "content-type": "application/json" },
      status: 400,
    });
  }
}
