import { useLogoutMutation } from "@/app/api/v0/auth";
import { useGetPokemonByNameQuery } from "@/app/pokemon";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Counter } from "@/features/counter";

export const Playground = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log("Logged out successfully");
      // Optionally, redirect the user or update local state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Typography variant="h1">Playground</Typography>

        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>

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
      </div>
    </>
  );
};
