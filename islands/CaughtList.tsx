import { Signal, signal } from "@preact/signals-core";
import { useEffect } from "preact/hooks";
import { PokemonList } from "../_types.ts";
import { CaughtCard } from "../components/CaughtCard.tsx";
export const caughtPokemonList: Signal<PokemonList> = signal([]);

export default function CaughtList(props: { caught: PokemonList; }) {
  useEffect(() => {
    caughtPokemonList.value = props.caught;
  }, []);
  return (<div class="caught-list">
    {(caughtPokemonList.value.sort((a, b) => a.id > b.id ? 1 : -1).map(p => <>
      <CaughtCard key={p.id} pokemon={p} /><br />
    </>))}
  </div>);
}