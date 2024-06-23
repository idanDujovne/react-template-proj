import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('home')
    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>&nbsp;&nbsp;
                    <a onClick={() => setPage('about')} href="#">About</a>&nbsp;&nbsp;
                    <a onClick={() => setPage('book')} href="#">Books</a>&nbsp;&nbsp;
                </nav>
            </header>
            <main className="container">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}