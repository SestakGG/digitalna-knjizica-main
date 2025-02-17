import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import { A } from "@solidjs/router";
import { AuthProvider , useAuth } from "./components/AuthProvider";
import { Show } from "solid-js";
import Authors from "./pages/authors";
import Books from "./pages/books";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <Router root={Layout}>
        <Route path="/Home" component={Home} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignOut" component={SignOut} />
        <Route path="/books" component={Books} />
        <Route path="/authors" component={Authors} />
        <Route path="/Register" component={Register} />
      </Router>
    </AuthProvider>
  );


function Layout(props) {
  const appName = import.meta.env.VITE_APP_NAME;
  const session = useAuth();

  return (
    <>
      <div class="bg-gray-900 text-white min-h-screen">
        <header class="p-4 flex justify-between items-center max-w-screen-xl mx-auto">
          <div class="text-4xl font-bold tracking-wider">{appName}</div>
          <div class="flex gap-4 items-center">
            <A href="/Home" class="nav-link">🏠Naslovnica</A>
            <Show when={session()}>
              <A href="/books" class="nav-link">Dodavanje knjiga</A>
            </Show>
            <Show when={session()}>
              <A href="/authors" class="nav-link">Autori</A>
            </Show>
            <Show when={session()}>
              <A href="/signout" class="nav-link">Odjava</A>
            </Show>
            <Show when={!session()}>
              <details class="relative">
                <summary class="cursor-pointer nav-link">Korisnički račun</summary>
                <ul class="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg p-2">
                  <li><A href="signin" class="block px-4 py-2 hover:bg-gray-700">Prijava</A></li>
                  <li><A href="register" class="block px-4 py-2 hover:bg-gray-700">Registracija</A></li>
                </ul>
              </details>
            </Show>
          </div>
        </header>
  
        <main class="min-h-[75vh] w-11/12 mx-auto mt-8 mb-16">
          {props.children}
        </main>
  
        <footer class="text-center text-xs py-4 bg-neutral-800 text-white">
          <p>&copy; {new Date().getFullYear()} Sva prava pridržana.</p>
        </footer>
      </div>
    </>
  );
}
}