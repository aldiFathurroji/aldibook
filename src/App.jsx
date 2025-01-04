import { AnimatePresence } from 'framer-motion';

function App() {
    return (
        <AnimatePresence mode="wait">
            <Router>
                <Routes>
                    {/* ... existing routes ... */}
                </Routes>
            </Router>
        </AnimatePresence>
    );
} 