import ApolloClient  from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
    uri: "https://frozen-mountain-35840.herokuapp.com/"
});

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default ApolloProvider;