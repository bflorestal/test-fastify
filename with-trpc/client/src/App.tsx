import { useState } from "react";
import { trpc } from "./utils/trpc";
import "./App.css";

type User = {
  name: string;
  bio?: string;
};

function App() {
  const [user, setUser] = useState<User>({ name: "", bio: "" });

  const {
    data: hello,
    error: greetingError,
    isLoading: greetingIsLoading,
  } = trpc.example.hello.useQuery({
    text: "tRPC",
  });

  const createUser = trpc.user.createUser.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser.mutate(user, {
      onSuccess: (newUser) => {
        console.dir(newUser);
        setUser({ name: "", bio: "" });
      },

      onError: (error) => {
        throw error;
      },
    });
  };

  if (greetingIsLoading) return <div>Loading...</div>;
  if (greetingError) return <div>{greetingError.message}</div>;

  return (
    <div className="App">
      <h1>{hello.greeting}</h1>

      <p>Fill this form to create a user. Then, check out the console!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username<sup>*</sup>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required={true}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </div>
        <button type="submit">Create user</button>
      </form>
    </div>
  );
}

export default App;
