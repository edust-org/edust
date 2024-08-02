import { useGetPokemonByNameQuery } from "@/app/pokemon";
import { Navbar } from "@/components";
import { Typography } from "@/components/ui";
import { Counter } from "@/features/counter";

export const Playground = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  return (
    <>
      <Navbar />
      <Typography variant="h1">Playground</Typography>
      <Counter />

      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>
    </>
  );
};
