import { Handlers } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { Pokemon, PokemonList } from "../../_types.ts";

export const filepath = './data/caught.json';
export const handler: Handlers = {
  async GET() {
    try {
      const caughtList: string = await Deno.readTextFile(filepath);
      PokemonList.parse(JSON.parse(caughtList));
      return new Response(caughtList);
    } catch (e) {
      return new Response('[]', { headers: [["content-type", "application/json"]] });
    }
  },
  async POST(req) {
    const body = await req.json();
    Pokemon.parse(body);
    try {
      const caughtList: string = await Deno.readTextFile(filepath);
      const caught = JSON.parse(caughtList);
      PokemonList.parse(caught);
      caught.push(body);
      await Deno.writeTextFile(filepath, JSON.stringify(caught));
      return new Response(JSON.stringify(caught));
    } catch (e) {
      console.log("no caught file. Creating one....")
      const caught = [body];
      await Deno.writeTextFile(filepath, JSON.stringify(caught), { create: true });
      return new Response(JSON.stringify(caught));
    }
  }
};