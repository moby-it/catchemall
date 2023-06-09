import { useSignal, useSignalEffect } from "@preact/signals";
import { asset } from "$fresh/runtime.ts";
import { Pokemon } from "../_types.ts";
import { caughtPokemonList } from "../islands/CaughtList.tsx";
import { useState } from "preact/hooks"

export function PokemonCard(props: { pokemon: Pokemon; }) {
  const catchAttempted = useSignal(false);
  const caught = useSignal(false);
  const pokemon = props.pokemon;
  const [cardClass, setCardClass] = useState("pokecard");
  useSignalEffect(() => {
    if (caught.value) {
      fetch("api/catch", { body: JSON.stringify(pokemon), method: "POST" }).then(r => r.json()).then(pl => {
        caughtPokemonList.value = pl;
        setCardClass(cardClass + " caught");
      });
    }
  });
  return (
    <div class={cardClass} style={{ "cursor": !catchAttempted.value ? "pointer" : "default" }} onClick={() => {
      if (catchAttempted.value) return;
      catchAttempted.value = true;
      const r = Math.random();
      // 50% chance to catch the pokemon
      caught.value = r > 0.5;
    }}>
      <h2># {pokemon.id} {caught.value && <img width="20" src={asset("favicon.ico")} />} </h2>
      <h2>{pokemon.name}</h2>
      <h3>{pokemon.types.map(t => t.type.name).join(", ")}</h3>
      <img src={pokemon.imageUrl} />
      <button class="btn" disabled={catchAttempted.value}>Catch</button>
    </div>
  );
}
