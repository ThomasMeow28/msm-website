import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import CommitteePage from './pages/CommitteePage'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import LanguageProvider from './i18n/LanguageProvider'
import { useContent } from './i18n'
import AuthProvider from './auth/AuthProvider'

/** Separate component so it can read the language context App itself provides. */
function SkipLink() {
  const { ui } = useContent()

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-msm-ink focus:px-4 focus:py-2 focus:text-white"
    >
      {ui.skipToContent}
    </a>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <ScrollManager />
          <SkipLink />
          <NavBar />
          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Both committee routes render one component, driven by the content bundle */}
              <Route path="/momc" element={<CommitteePage slug="momc" />} />
              <Route path="/motc" element={<CommitteePage slug="motc" />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}
