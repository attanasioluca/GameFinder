import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
        </ChakraProvider>
);
