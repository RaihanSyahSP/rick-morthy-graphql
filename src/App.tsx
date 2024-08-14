import { ApolloProvider } from "@apollo/client";
import PageWrapper from "./layouts/PageWrapper";
import client from "./apolloClient";
import { Grid } from "@/components";

function App() {
  return (
    <ApolloProvider client={client}>
      <PageWrapper title="Rick Morthy App">
        <main className="layout min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-5xl font-bold">
              Rick & Morty -{" "}
              <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                GraphQl
              </span>
            </h1>
            <Grid />
          </div>
        </main>
      </PageWrapper>
    </ApolloProvider>
  );
}

export default App;
