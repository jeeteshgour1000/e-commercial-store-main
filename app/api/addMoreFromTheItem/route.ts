import { Database } from "@/app/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
  
);

export const dynamic = "force-dynamic";


export async function POST(request: Request) {
  const data = await request.json();

  try {

    if(data.quantity==0){
      await supabase
      .from("tb_cart")
      .delete()
      .eq("id", data.id);
    }
    else{
      await supabase
        .from("tb_cart")
        .update({ quantity: data.quantity })
        .eq("id", data.id);
    }


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
